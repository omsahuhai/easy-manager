-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  full_name text,
  created_at timestamp with time zone default now() not null
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can delete own profile" on public.profiles for delete using (auth.uid() = id);

-- Businesses table
create table public.businesses (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  type text not null,
  created_at timestamp with time zone default now() not null
);
alter table public.businesses enable row level security;
create policy "Users can view own businesses" on public.businesses for select using (auth.uid() = owner_id);
create policy "Users can insert own businesses" on public.businesses for insert with check (auth.uid() = owner_id);
create policy "Users can update own businesses" on public.businesses for update using (auth.uid() = owner_id);
create policy "Users can delete own businesses" on public.businesses for delete using (auth.uid() = owner_id);
create index businesses_owner_id_idx on public.businesses (owner_id);

-- Fuel Rates table
create table public.fuel_rates (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  fuel_type text not null check (fuel_type in ('MS', 'HSD')),
  effective_date date not null,
  rate numeric(10, 2) not null,
  margin numeric(10, 4) not null,
  created_at timestamp with time zone default now() not null,
  unique (business_id, fuel_type, effective_date)
);
alter table public.fuel_rates enable row level security;
create policy "Users can access fuel_rates of their businesses" on public.fuel_rates for all using (
  exists (select 1 from public.businesses where businesses.id = fuel_rates.business_id and businesses.owner_id = auth.uid())
);
create index fuel_rates_business_id_fuel_type_effective_date_idx on public.fuel_rates (business_id, fuel_type, effective_date desc);

-- Daily Meter Readings table
create table public.daily_meter_readings (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  fuel_type text not null check (fuel_type in ('MS', 'HSD')),
  reading_date date not null,
  opening_reading numeric(12, 2) not null,
  closing_reading numeric(12, 2) not null check (closing_reading >= opening_reading),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique (business_id, fuel_type, reading_date)
);
alter table public.daily_meter_readings enable row level security;
create policy "Users can access daily_meter_readings of their businesses" on public.daily_meter_readings for all using (
  exists (select 1 from public.businesses where businesses.id = daily_meter_readings.business_id and businesses.owner_id = auth.uid())
);
create index daily_meter_readings_business_id_reading_date_idx on public.daily_meter_readings (business_id, reading_date desc);

-- Expenses table
create table public.expenses (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  expense_month date not null check (date_trunc('month', expense_month) = expense_month),
  category text not null,
  amount numeric(10, 2) not null,
  note text,
  created_at timestamp with time zone default now() not null
);
alter table public.expenses enable row level security;
create policy "Users can access expenses of their businesses" on public.expenses for all using (
  exists (select 1 from public.businesses where businesses.id = expenses.business_id and businesses.owner_id = auth.uid())
);
create index expenses_business_id_expense_month_idx on public.expenses (business_id, expense_month desc);

-- Daily Sales View
create or replace view public.daily_sales_view as
select 
  dmr.id as reading_id,
  dmr.business_id,
  dmr.fuel_type,
  dmr.reading_date,
  dmr.opening_reading,
  dmr.closing_reading,
  (dmr.closing_reading - dmr.opening_reading) as litres,
  fr.rate,
  fr.margin,
  ((dmr.closing_reading - dmr.opening_reading) * fr.rate) as sales,
  ((dmr.closing_reading - dmr.opening_reading) * fr.margin) as profit
from public.daily_meter_readings dmr
left join lateral (
  select rate, margin
  from public.fuel_rates fr_inner
  where fr_inner.business_id = dmr.business_id
    and fr_inner.fuel_type = dmr.fuel_type
    and fr_inner.effective_date <= dmr.reading_date
  order by fr_inner.effective_date desc
  limit 1
) fr on true;

-- Monthly Profit Summary View
create or replace view public.monthly_profit_summary_view as
with monthly_fuel as (
  select 
    business_id,
    date_trunc('month', reading_date)::date as profit_month,
    sum(sales) as total_fuel_sales,
    sum(profit) as total_ro_profit
  from public.daily_sales_view
  group by business_id, date_trunc('month', reading_date)::date
),
monthly_expenses as (
  select 
    business_id,
    expense_month,
    sum(amount) as total_expenses
  from public.expenses
  group by business_id, expense_month
)
select 
  coalesce(mf.business_id, me.business_id) as business_id,
  coalesce(mf.profit_month, me.expense_month) as profit_month,
  coalesce(mf.total_fuel_sales, 0) as total_fuel_sales,
  coalesce(mf.total_ro_profit, 0) as total_ro_profit,
  coalesce(me.total_expenses, 0) as total_expenses,
  (coalesce(mf.total_ro_profit, 0) - coalesce(me.total_expenses, 0)) as net_profit
from monthly_fuel mf
full outer join monthly_expenses me 
  on mf.business_id = me.business_id and mf.profit_month = me.expense_month;