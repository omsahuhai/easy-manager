import { getAuthUser } from "@/lib/supabase/auth";
import { Expense } from "@/lib/types";

/**
 * Fetches all expenses for a specific business and month (YYYY-MM-01).
 * Ordered by creation date descending.
 */
export async function getExpensesForMonth(
  businessId: string,
  expenseMonth: string
): Promise<Expense[]> {
  const { supabase, user } = await getAuthUser();

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
 * Uses a database function (SELECT DISTINCT) to avoid fetching all expense rows.
 */
export async function getDistinctExpenseMonths(
  businessId: string
): Promise<string[]> {
  const { supabase, user } = await getAuthUser();

  if (!user) {
    return [];
  }

  // Use the database function for efficient DISTINCT query
  const { data, error } = await supabase.rpc("get_distinct_expense_months", {
    p_business_id: businessId,
  });

  if (error) {
    // Fallback: if the RPC function isn't deployed yet, use the old approach
    console.warn(
      "get_distinct_expense_months RPC failed, falling back to client-side dedup:",
      error.message
    );
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("expenses")
      .select("expense_month")
      .eq("business_id", businessId)
      .order("expense_month", { ascending: false });

    if (fallbackError || !fallbackData) {
      return [];
    }

    return Array.from(
      new Set(fallbackData.map((item) => item.expense_month as string))
    );
  }

  if (!data) {
    return [];
  }

  return (data as Array<{ expense_month: string }>).map(
    (item) => item.expense_month
  );
}
