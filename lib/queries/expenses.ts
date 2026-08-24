import { createClient } from "@/lib/supabase/server";
import { Expense } from "@/lib/types";

/**
 * Fetches all expenses for a specific business and month (YYYY-MM-01).
 * Ordered by creation date descending.
 */
export async function getExpensesForMonth(
  businessId: string,
  expenseMonth: string
): Promise<Expense[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("expenses")
    .select("id, business_id, expense_month, category, amount, note, created_at")
    .eq("business_id", businessId)
    .eq("expense_month", expenseMonth)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching expenses for month:", error?.message);
    return [];
  }

  return (data as Expense[]).map((exp) => ({
    ...exp,
    amount: Number(exp.amount),
  }));
}

/**
 * Fetches the list of all distinct months (YYYY-MM-01) for which expenses have been recorded.
 */
export async function getDistinctExpenseMonths(
  businessId: string
): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("expenses")
    .select("expense_month")
    .eq("business_id", businessId)
    .order("expense_month", { ascending: false });

  if (error || !data) {
    return [];
  }

  const uniqueMonths = Array.from(
    new Set(data.map((item) => item.expense_month as string))
  );

  return uniqueMonths;
}
