-- Add index on expenses(business_id, category) for fast category filtering and aggregation
create index if not exists expenses_business_id_category_idx on public.expenses (business_id, category);
