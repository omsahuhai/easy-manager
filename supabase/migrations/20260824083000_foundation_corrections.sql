-- ============================================================
-- Easy Manager: Foundation Corrections
-- Migration: 20260824083000_foundation_corrections.sql
--
-- Implements findings from:
--   Pass 1 — Product Architecture Audit
--   Pass 2 — Domain/Database Architecture Audit
--
-- This migration:
--   1. Adds profile auto-creation trigger         (P0 bug fix)
--   2. Adds businesses.type DEFAULT 'petrol_pump'
--   3. Adds fuel_rates integrity constraints      (rate > 0, margin >= 0)
--   4. Adds expenses.amount integrity constraint  (amount > 0)
--   5. Adds meter reading non-negative constraints
--   6. Adds updated_at auto-maintenance trigger   (daily_meter_readings)
--   7. Recreates daily_sales_view                 (+ rate_missing flag)
--   8. Recreates monthly_profit_summary_view      (fixes silent-zero bug)
--
-- DOES NOT:
--   - Modify historical migrations
--   - Add nozzle/dispenser tables
--   - Change expense_month to expense_date
--   - Add intraday rate support
--   - Add shift, staff, or inventory tables
--   - Start Phase 4 features
--
-- Safe to re-run: OR REPLACE / IF NOT EXISTS / ON CONFLICT
-- ============================================================


-- ============================================================
-- PART 1: Profile auto-creation trigger
-- ============================================================
-- PROBLEM:
--   Supabase Auth creates auth.users on signup but nothing
--   creates public.profiles. businesses.owner_id FK references
--   profiles(id), so business creation fails for any user
--   without a profile row.
--
-- SECURITY DEFINER + set search_path = '':
--   Required because the trigger fires during the Auth signup
--   flow before the user has a JWT. Running as definer
--   (postgres) allows INSERT into public.profiles.
--   Empty search_path prevents search_path injection.
--
-- ON CONFLICT (id) DO NOTHING: idempotent, safe on re-runs.
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, created_at)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill: create profile rows for any existing auth users
-- who signed up before this trigger was in place.
insert into public.profiles (id, full_name, created_at)
select
  u.id,
  u.raw_user_meta_data ->> 'full_name',
  u.created_at
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
)
on conflict (id) do nothing;


-- ============================================================
-- PART 2: businesses.type — add DEFAULT 'petrol_pump'
-- ============================================================
-- PROBLEM: NOT NULL with no default; INSERT fails if type is
-- not explicitly supplied. Users must never select type in MVP.
-- No CHECK constraint added: keeps field extensible for future
-- business types (e.g. transport) without a schema change.
-- ============================================================

alter table public.businesses
  alter column type set default 'petrol_pump';


-- ============================================================
-- PART 3: fuel_rates integrity constraints
-- ============================================================
-- rate > 0:    A selling rate of 0 or negative is physically
--              meaningless and would corrupt sales figures.
-- margin >= 0: A negative RO margin corrupts profit figures.
--              Zero margin is unusual but technically valid
--              (dealer earns nothing per litre sold).
-- ============================================================

alter table public.fuel_rates
  add constraint fuel_rates_rate_positive
    check (rate > 0);

alter table public.fuel_rates
  add constraint fuel_rates_margin_non_negative
    check (margin >= 0);


-- ============================================================
-- PART 4: expenses amount integrity constraint
-- ============================================================
-- amount > 0: Zero or negative expense amounts are invalid
-- business records and would corrupt net profit calculations.
-- expense_month model is PRESERVED. No change to expense_date.
-- ============================================================

alter table public.expenses
  add constraint expenses_amount_positive
    check (amount > 0);


-- ============================================================
-- PART 5: Meter reading non-negative constraints
-- ============================================================
-- Physical meter readings cannot be negative.
-- Combined with existing closing_reading >= opening_reading:
--   Final invariant: 0 <= opening_reading <= closing_reading
-- closing_reading >= 0 is implied but stated explicitly for
-- documentation and independent constraint safety.
-- ============================================================

alter table public.daily_meter_readings
  add constraint daily_meter_readings_opening_non_negative
    check (opening_reading >= 0);

alter table public.daily_meter_readings
  add constraint daily_meter_readings_closing_non_negative
    check (closing_reading >= 0);


-- ============================================================
-- PART 6: Future-dated reading (no DB constraint — see note)
-- ============================================================
-- The rule "reading_date must not be in the future" is NOT
-- enforced with a PostgreSQL CHECK constraint.
--
-- Reason: CHECK constraints referencing CURRENT_DATE use a
-- non-immutable function. PostgreSQL disallows this with an
-- explicit error in most configurations, and behavior can be
-- undefined under logical replication and constraint
-- re-validation scenarios.
--
-- ENFORCEMENT: Server Actions / API layer (Pass 3 / Phase 4).
-- UI: date picker restricted to today or earlier.
-- Future-dated FUEL RATES remain fully allowed.
-- ============================================================
-- (No SQL for this rule)


-- ============================================================
-- PART 7: updated_at auto-maintenance trigger
-- ============================================================
-- PROBLEM: updated_at column exists but never updates on row
-- edits. Reading corrections leave a stale created_at value
-- in the updated_at field.
--
-- SOLUTION: BEFORE UPDATE trigger sets new.updated_at = now()
-- before the corrected row is written.
--
-- Generic function (set_updated_at) can be reused by other
-- tables in future migrations. Not SECURITY DEFINER — runs
-- with caller privileges, correct for data-mutation triggers.
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_daily_meter_readings_updated_at
  on public.daily_meter_readings;

create trigger set_daily_meter_readings_updated_at
  before update on public.daily_meter_readings
  for each row execute procedure public.set_updated_at();


-- ============================================================
-- PART 8: Fix views — missing-rate transparency (P0 bug fix)
-- ============================================================
-- BUG A (daily_sales_view): No signal for missing rate.
--   The view returned NULL for sales/profit but provided no
--   clean boolean flag. Application had to inspect NULL columns.
--   FIX: Add (fr.rate is null) as rate_missing.
--   Also expose updated_at for "last corrected at" display.
--
-- BUG B (monthly_profit_summary_view): Silent zero (CRITICAL).
--   Original: COALESCE(sum(profit), 0)
--   When all readings in a month have NULL profit (no rate),
--   sum() = NULL, COALESCE converts to 0. A "no rate" month
--   is indistinguishable from a genuine zero-profit month.
--   This violates the domain rule: missing rate != zero profit.
--
--   FIX: Replace COALESCE on mf totals with CASE WHEN:
--
--     mf.business_id IS NULL (FULL OUTER JOIN, expenses-only
--       month, zero readings) → 0  (correct)
--
--     mf row exists but total_ro_profit IS NULL (readings
--       exist, all have no rate) → NULL  (UNKNOWN, not zero)
--       net_profit becomes NULL − expenses = NULL  (unknown)
--
--   COALESCE on me (monthly_expenses) is KEPT: a readings-only
--   month with no expenses should show total_expenses = 0.
--
--   ADDED: days_without_rate, total_reading_days, has_missing_rates
--   so the application can warn: "3 days are missing rates."
--
-- Rate-selection logic (lateral join) is UNCHANGED.
-- security_invoker = true is PRESERVED on both views.
-- ============================================================

-- Drop in dependency order
drop view if exists public.monthly_profit_summary_view;
drop view if exists public.daily_sales_view;

-- ---- daily_sales_view ----
-- New columns vs previous version:
--   + rate_missing  boolean  true when no applicable rate found
--   + updated_at             reading's last-corrected timestamp

create or replace view public.daily_sales_view
with (security_invoker = true) as
select
  dmr.id                                                        as reading_id,
  dmr.business_id,
  dmr.fuel_type,
  dmr.reading_date,
  dmr.opening_reading,
  dmr.closing_reading,
  dmr.created_at,
  dmr.updated_at,
  (dmr.closing_reading - dmr.opening_reading)                   as litres,
  fr.rate,
  fr.margin,
  (fr.rate is null)                                             as rate_missing,
  ((dmr.closing_reading - dmr.opening_reading) * fr.rate)       as sales,
  ((dmr.closing_reading - dmr.opening_reading) * fr.margin)     as profit
from public.daily_meter_readings dmr
left join lateral (
  select rate, margin
  from public.fuel_rates fr_inner
  where fr_inner.business_id  = dmr.business_id
    and fr_inner.fuel_type    = dmr.fuel_type
    and fr_inner.effective_date <= dmr.reading_date
  order by fr_inner.effective_date desc
  limit 1
) fr on true;

-- ---- monthly_profit_summary_view ----
-- Changes vs previous version:
--   ~ total_fuel_sales:  COALESCE → CASE WHEN
--   ~ total_ro_profit:   COALESCE → CASE WHEN
--   ~ net_profit:        COALESCE → CASE WHEN
--   + total_reading_days  count of reading rows in this month
--   + days_without_rate   count of readings missing a rate
--   + has_missing_rates   convenience boolean for application

create or replace view public.monthly_profit_summary_view
with (security_invoker = true) as
with monthly_fuel as (
  select
    business_id,
    date_trunc('month', reading_date)::date      as profit_month,
    count(*)                                     as total_reading_days,
    count(*) filter (where rate is null)         as days_without_rate,
    sum(sales)                                   as total_fuel_sales,
    sum(profit)                                  as total_ro_profit
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
  coalesce(mf.business_id, me.business_id)       as business_id,
  coalesce(mf.profit_month, me.expense_month)     as profit_month,

  -- total_fuel_sales:
  --   0     → no readings this month (expenses-only via FULL OUTER JOIN)
  --   NULL  → readings exist but all had no applicable rate (UNKNOWN)
  --   value → normal
  case
    when mf.business_id is null then cast(0 as numeric)
    else mf.total_fuel_sales
  end                                             as total_fuel_sales,

  -- total_ro_profit: same semantics as total_fuel_sales
  case
    when mf.business_id is null then cast(0 as numeric)
    else mf.total_ro_profit
  end                                             as total_ro_profit,

  -- total_expenses: COALESCE preserved — readings-only months
  -- correctly show total_expenses = 0 when no expense rows exist.
  coalesce(me.total_expenses, 0)                  as total_expenses,

  -- net_profit:
  --   NULL  → total_ro_profit is NULL (missing rate data — UNKNOWN)
  --   value → total_ro_profit − total_expenses
  case
    when mf.business_id is null
      then (cast(0 as numeric) - coalesce(me.total_expenses, 0))
    else
      (mf.total_ro_profit - coalesce(me.total_expenses, 0))
  end                                             as net_profit,

  -- Missing-rate metadata for application-layer warnings.
  -- Application should display something like:
  --   "3 of 25 reading days are missing fuel rates.
  --    Profit figures for this month may be incomplete."
  coalesce(mf.total_reading_days, 0)              as total_reading_days,
  coalesce(mf.days_without_rate, 0)               as days_without_rate,
  coalesce(mf.days_without_rate, 0) > 0           as has_missing_rates

from monthly_fuel mf
full outer join monthly_expenses me
  on  mf.business_id  = me.business_id
  and mf.profit_month = me.expense_month;
