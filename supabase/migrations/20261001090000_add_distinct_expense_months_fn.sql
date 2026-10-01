-- Create a function to return distinct expense months for a business.
-- This avoids fetching all expense rows client-side just to deduplicate months.
-- RLS is enforced because the function runs with SECURITY INVOKER (default).

create or replace function public.get_distinct_expense_months(p_business_id uuid)
returns table (expense_month date)
language sql
stable
as $$
  select distinct e.expense_month
  from public.expenses e
  where e.business_id = p_business_id
  order by e.expense_month desc;
$$;
