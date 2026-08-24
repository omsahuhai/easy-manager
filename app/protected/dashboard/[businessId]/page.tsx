import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getReadingsWithContinuity } from "@/lib/queries/readings";
import { getTodayPerformance, getMonthlyProfitForMonth } from "@/lib/queries/reports";
import { getTodayIST, getCurrentMonthIST, formatMonthIST, formatDateIST } from "@/lib/date";
import { notFound, redirect } from "next/navigation";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee,
  Droplet,
  TrendingUp,
  ReceiptText,
  Activity,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const instant = false;

export default async function BusinessDashboard(props: {
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

  const todayIST = getTodayIST();
  const currentMonthIST = getCurrentMonthIST();
  const currentMonthLabel = formatMonthIST(currentMonthIST);

  // Parallelize independent data fetches from authoritative views
  const [business, todayPerf, currentMonthProfit, recentReadings] = await Promise.all([
    getBusinessById(businessId),
    getTodayPerformance(businessId, todayIST),
    getMonthlyProfitForMonth(businessId, currentMonthIST),
    getReadingsWithContinuity(businessId),
  ]);

  if (!business) {
    notFound();
  }

  // Check for any continuity mismatches in recent records
  const recentMismatches = recentReadings.filter((r) => r.has_opening_mismatch);
  const last7Readings = recentReadings.slice(0, 7);

  const todaySalesDisplay =
    todayPerf.totalSales !== null
      ? `₹${todayPerf.totalSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : todayPerf.hasRateMissing
      ? "Rate Missing"
      : "₹0.00";

  const todayProfitDisplay =
    todayPerf.totalROProfit !== null
      ? `₹${todayPerf.totalROProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : todayPerf.hasRateMissing
      ? "—"
      : "₹0.00";

  const monthExpensesDisplay =
    currentMonthProfit !== null
      ? `₹${currentMonthProfit.total_expenses.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "₹0.00";

  return (
    <div className="w-full space-y-6">
      {/* Alert Banner: Missing Fuel Rates */}
      {currentMonthProfit?.has_missing_rates && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">Missing Fuel Rates Detected</div>
              <div className="text-xs mt-0.5">
                {currentMonthProfit.days_without_rate} reading{" "}
                {currentMonthProfit.days_without_rate === 1 ? "day" : "days"} this month lack applicable selling rates. Financial figures are incomplete.
              </div>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="bg-background text-xs whitespace-nowrap">
            <Link href={`/protected/dashboard/${business.id}/rates`}>Manage Rates</Link>
          </Button>
        </div>
      )}

      {/* Alert Banner: Continuity Mismatches */}
      {recentMismatches.length > 0 && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-sm">Meter Reading Continuity Mismatch</div>
              <div className="text-xs mt-0.5">
                {recentMismatches.length} meter reading {recentMismatches.length === 1 ? "entry has" : "entries have"} opening numbers that do not match the previous closing.
              </div>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="bg-background text-xs whitespace-nowrap">
            <Link href={`/protected/dashboard/${business.id}/readings`}>Review Readings</Link>
          </Button>
        </div>
      )}

      {/* Operational Quick Actions */}
      <QuickActions businessId={business.id} />

      {/* Today's Authoritative Performance Metrics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Today&apos;s Performance</h2>
          <span className="text-xs text-muted-foreground font-medium">
            {todayPerf.hasReadings ? "Live View Calculation" : "No readings yet today"}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Today&apos;s Sales"
            value={todaySalesDisplay}
            icon={<IndianRupee className="h-4 w-4" />}
            description={
              todayPerf.hasRateMissing
                ? "Rate missing for today"
                : todayPerf.hasReadings
                ? "Total revenue from meter sales"
                : "No readings recorded yet"
            }
          />
          <StatCard
            title="Fuel Sold"
            value={`${todayPerf.totalLitres.toFixed(2)} L`}
            icon={<Droplet className="h-4 w-4" />}
            description="Total volume dispensed today"
          />
          <StatCard
            title="RO Profit"
            value={todayProfitDisplay}
            icon={<TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
            description={
              todayPerf.hasRateMissing
                ? "Pending rate setup"
                : "Estimated dealer margin earned"
            }
          />
          <StatCard
            title={`${currentMonthLabel} Expenses`}
            value={monthExpensesDisplay}
            icon={<ReceiptText className="h-4 w-4 text-red-500" />}
            description="Logged monthly operational costs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Fuel Breakdown */}
        <Card className="lg:col-span-1 shadow-sm border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Today&apos;s Fuel Breakdown</span>
              <Droplet className="h-4 w-4 text-primary" />
            </CardTitle>
            <CardDescription className="text-xs">
              Dispensed volume and sales by fuel type.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* MS Petrol */}
            <div className="p-3.5 rounded-lg border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="font-semibold text-sm">MS (Petrol)</span>
                </div>
                {todayPerf.msReading ? (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    Recorded
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    Not Entered
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <div className="font-bold text-sm">
                    {todayPerf.msReading ? `${todayPerf.msReading.litres.toFixed(2)} L` : "0.00 L"}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Sales:</span>
                  <div className="font-bold text-sm">
                    {todayPerf.msReading?.sales !== null && todayPerf.msReading?.sales !== undefined
                      ? `₹${todayPerf.msReading.sales.toFixed(2)}`
                      : todayPerf.msReading?.rate_missing
                      ? "Rate Missing"
                      : "₹0.00"}
                  </div>
                </div>
              </div>
            </div>

            {/* HSD Diesel */}
            <div className="p-3.5 rounded-lg border bg-card space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-sm">HSD (Diesel)</span>
                </div>
                {todayPerf.hsdReading ? (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    Recorded
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    Not Entered
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <div className="font-bold text-sm">
                    {todayPerf.hsdReading ? `${todayPerf.hsdReading.litres.toFixed(2)} L` : "0.00 L"}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Sales:</span>
                  <div className="font-bold text-sm">
                    {todayPerf.hsdReading?.sales !== null && todayPerf.hsdReading?.sales !== undefined
                      ? `₹${todayPerf.hsdReading.sales.toFixed(2)}`
                      : todayPerf.hsdReading?.rate_missing
                      ? "Rate Missing"
                      : "₹0.00"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Meter Activity */}
        <Card className="lg:col-span-2 shadow-sm border">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Recent Meter Activity
              </CardTitle>
              <CardDescription className="text-xs">
                Last recorded meter reading logs from the register.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href={`/protected/dashboard/${business.id}/readings`} className="flex items-center gap-1">
                Full Register <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {last7Readings.length === 0 ? (
              <div className="text-center text-muted-foreground py-10 text-xs">
                No meter readings recorded yet. Click &quot;Add Reading&quot; above to log your first meter entry.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="uppercase bg-muted/60 text-muted-foreground border-b text-[10px]">
                    <tr>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-2 py-2">Fuel</th>
                      <th className="px-3 py-2">Volume</th>
                      <th className="px-3 py-2">Sales</th>
                      <th className="px-3 py-2">RO Profit</th>
                      <th className="px-2 py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {last7Readings.map((r) => (
                      <tr key={r.reading_id} className="hover:bg-muted/30">
                        <td className="px-3 py-2.5 font-medium whitespace-nowrap">
                          {formatDateIST(r.reading_date)}
                        </td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                              r.fuel_type === "MS"
                                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                                : "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {r.fuel_type}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap font-semibold">
                          {r.litres.toFixed(2)} L
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          {r.sales !== null ? `₹${r.sales.toFixed(2)}` : "—"}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap text-emerald-600 dark:text-emerald-400 font-medium">
                          {r.profit !== null ? `₹${r.profit.toFixed(2)}` : "—"}
                        </td>
                        <td className="px-2 py-2.5 whitespace-nowrap text-right">
                          {r.has_opening_mismatch ? (
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/40 text-[9px] px-1 py-0">
                              Mismatch
                            </Badge>
                          ) : r.rate_missing ? (
                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 text-[9px] px-1 py-0">
                              No Rate
                            </Badge>
                          ) : r.is_first_reading ? (
                            <span className="text-[10px] text-muted-foreground">Starting</span>
                          ) : (
                            <span className="text-[10px] text-muted-foreground">OK</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
