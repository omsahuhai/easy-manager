-- Drop dependent view first
drop view if exists public.monthly_profit_summary_view;
drop view if exists public.daily_sales_view;

-- Recreate Daily Sales View with security_invoker = true
create or replace view public.daily_sales_view 
with (security_invoker = true) as
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

-- Recreate Monthly Profit Summary View with security_invoker = true
create or replace view public.monthly_profit_summary_view 
with (security_invoker = true) as
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