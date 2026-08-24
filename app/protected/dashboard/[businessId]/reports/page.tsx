import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getMonthlyProfitReports } from "@/lib/queries/reports";
import { notFound, redirect } from "next/navigation";
import { MonthlyProfitTable } from "@/components/reports/monthly-profit-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, IndianRupee, ReceiptText, BarChart3 } from "lucide-react";

export const instant = false;

export default async function MonthlyReportsPage(props: {
  params: Promise<{ businessId: string }>;
}) {
  const params = await props.params;
  const businessId = params.businessId;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [business, reports] = await Promise.all([
    getBusinessById(businessId),
    getMonthlyProfitReports(businessId),
  ]);

  if (!business) {
    notFound();
  }

  // Aggregate high-level summary across all recorded months (from views)
  let totalSalesSum = 0;
  let totalROProfitSum = 0;
  let totalExpensesSum = 0;
  let totalNetProfitSum = 0;
  let hasAnyMissingRates = false;

  reports.forEach((r) => {
    if (r.total_fuel_sales !== null) totalSalesSum += r.total_fuel_sales;
    if (r.total_ro_profit !== null) totalROProfitSum += r.total_ro_profit;
    totalExpensesSum += r.total_expenses;
    if (r.net_profit !== null) totalNetProfitSum += r.net_profit;
    if (r.has_missing_rates) hasAnyMissingRates = true;
  });

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Monthly Profit Reports</h2>
        <p className="text-sm text-muted-foreground">
          Historical overview of fuel sales, dealer commissions (RO profit), expenses, and net profit.
        </p>
      </div>

      {/* High-level Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Recorded Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              ₹{totalSalesSum.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Across all recorded months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total RO Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ₹{totalROProfitSum.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Total dealer margin earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Total Expenses</CardTitle>
            <ReceiptText className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-500">
              ₹{totalExpensesSum.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Total logged operational costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Cumulative Net Profit</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-xl sm:text-2xl font-bold ${
                totalNetProfitSum >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
              }`}
            >
              ₹{totalNetProfitSum.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {hasAnyMissingRates ? "May exclude days with missing rates" : "Net earnings after expenses"}
            </p>
          </CardContent>
        </Card>
      </div>

      <MonthlyProfitTable businessId={business.id} reports={reports} />
    </div>
  );
}
