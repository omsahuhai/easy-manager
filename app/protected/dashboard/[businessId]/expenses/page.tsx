import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getExpensesForMonth, getDistinctExpenseMonths } from "@/lib/queries/expenses";
import { notFound, redirect } from "next/navigation";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { ExpenseList } from "@/components/expenses/expense-list";
import { MonthFilter } from "@/components/expenses/month-filter";
import { getCurrentMonthIST, formatMonthIST } from "@/lib/date";

export const instant = false;

export default async function ExpensesPage(props: {
  params: Promise<{ businessId: string }>;
  searchParams: Promise<{ month?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const businessId = params.businessId;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Determine selected month (defaults to current month in Asia/Kolkata)
  const rawMonth = searchParams.month;
  let selectedMonth = getCurrentMonthIST();

  if (rawMonth && /^\d{4}-\d{2}(-\d{2})?$/.test(rawMonth)) {
    const parts = rawMonth.split("-");
    selectedMonth = `${parts[0]}-${parts[1].padStart(2, "0")}-01`;
  }

  const [business, expenses, recordedMonths] = await Promise.all([
    getBusinessById(businessId),
    getExpensesForMonth(businessId, selectedMonth),
    getDistinctExpenseMonths(businessId),
  ]);

  if (!business) {
    notFound();
  }

  const monthLabel = formatMonthIST(selectedMonth);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Monthly Expenses</h2>
          <p className="text-sm text-muted-foreground">
            Manage operational costs like Electricity, Salaries, and Maintenance for {monthLabel}.
          </p>
        </div>
        <MonthFilter currentMonth={selectedMonth} recordedMonths={recordedMonths} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm businessId={business.id} selectedMonth={selectedMonth} />
        </div>
        <div className="lg:col-span-2">
          <ExpenseList
            businessId={business.id}
            selectedMonth={selectedMonth}
            expenses={expenses}
          />
        </div>
      </div>
    </div>
  );
}
