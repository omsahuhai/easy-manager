"use client";

import { MonthlyProfitRecord } from "@/lib/types";
import { formatMonthIST } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MonthlyProfitTableProps {
  businessId: string;
  reports: MonthlyProfitRecord[];
}

export function MonthlyProfitTable({
  businessId,
  reports,
}: MonthlyProfitTableProps) {
  if (reports.length === 0) {
    return (
      <Card className="shadow-sm border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Monthly Profit Register</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Summary of fuel sales, dealer RO margin, expenses, and net profit by month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-sm text-muted-foreground space-y-3">
            <p>No monthly activity recorded yet.</p>
            <p className="text-xs">
              Record daily meter readings, fuel rates, and expenses to generate authoritative monthly profit reports.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button asChild size="sm" variant="outline">
                <Link href={`/protected/dashboard/${businessId}/readings`}>Record Readings</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={`/protected/dashboard/${businessId}/expenses`}>Add Expenses</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">Monthly Profit Register</CardTitle>
              <CardDescription className="text-xs">
                Authoritative financial summary calculated by PostgreSQL views.
              </CardDescription>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {reports.length} {reports.length === 1 ? "month" : "months"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {/* Mobile Card List (< 640px) */}
        <div className="divide-y sm:hidden">
          {reports.map((r) => {
            const monthLabel = formatMonthIST(r.profit_month);
            const isExpensesOnly = r.total_reading_days === 0 && r.total_expenses > 0;

            return (
              <div key={r.profit_month} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{monthLabel}</span>
                    {r.has_missing_rates && (
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/40 text-[10px] px-1.5 py-0">
                        {r.days_without_rate}d Missing Rate
                      </Badge>
                    )}
                    {isExpensesOnly && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        Expenses Only
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-xs">
                    <Link href={`/protected/dashboard/${businessId}/expenses?month=${r.profit_month}`}>
                      View Expenses <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>

                {r.has_missing_rates && (
                  <div className="p-2 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-1.5 border border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      {r.days_without_rate} of {r.total_reading_days} reading days are missing fuel rates. Profit is incomplete.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs bg-muted/40 p-2.5 rounded-md">
                  <div>
                    <span className="text-muted-foreground">Fuel Sales:</span>
                    <div className="font-semibold text-sm mt-0.5">
                      {r.total_fuel_sales !== null ? `₹${r.total_fuel_sales.toFixed(2)}` : "—"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RO Profit (Margin):</span>
                    <div className="font-semibold text-sm mt-0.5 text-emerald-600 dark:text-emerald-400">
                      {r.total_ro_profit !== null ? `₹${r.total_ro_profit.toFixed(2)}` : "—"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expenses:</span>
                    <div className="font-semibold text-sm mt-0.5 text-red-500">
                      ₹{r.total_expenses.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Net Profit:</span>
                    <div
                      className={`font-bold text-sm mt-0.5 ${
                        r.net_profit === null
                          ? "text-muted-foreground"
                          : r.net_profit >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {r.net_profit !== null ? `₹${r.net_profit.toFixed(2)}` : "—"}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center justify-between pt-1">
                  <span>Reading Days: {r.total_reading_days} days</span>
                  {r.has_missing_rates && (
                    <Link
                      href={`/protected/dashboard/${businessId}/rates`}
                      className="text-primary hover:underline font-medium"
                    >
                      Add Missing Rates →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table (>= 640px) */}
        <div className="hidden sm:block overflow-x-auto rounded-md border">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/60 text-muted-foreground border-b">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Month</th>
                <th scope="col" className="px-4 py-3 font-semibold">Readings</th>
                <th scope="col" className="px-4 py-3 font-semibold">Fuel Sales</th>
                <th scope="col" className="px-4 py-3 font-semibold">RO Profit</th>
                <th scope="col" className="px-4 py-3 font-semibold">Expenses</th>
                <th scope="col" className="px-4 py-3 font-semibold">Net Profit</th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reports.map((r) => {
                const monthLabel = formatMonthIST(r.profit_month);
                const isExpensesOnly = r.total_reading_days === 0 && r.total_expenses > 0;

                return (
                  <tr key={r.profit_month} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap font-bold text-foreground">
                      {monthLabel}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground">
                      {r.total_reading_days} {r.total_reading_days === 1 ? "day" : "days"}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-medium">
                      {r.total_fuel_sales !== null ? (
                        `₹${r.total_fuel_sales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-emerald-600 dark:text-emerald-400">
                      {r.total_ro_profit !== null ? (
                        `₹${r.total_ro_profit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-medium text-red-500">
                      ₹{r.total_expenses.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`px-4 py-3.5 whitespace-nowrap font-bold ${
                        r.net_profit === null
                          ? "text-muted-foreground"
                          : r.net_profit >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {r.net_profit !== null ? (
                        `₹${r.net_profit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right text-xs">
                      {r.has_missing_rates ? (
                        <span
                          title={`${r.days_without_rate} days lack applicable rates`}
                          className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Rate Missing
                        </span>
                      ) : isExpensesOnly ? (
                        <Badge variant="secondary" className="text-xs">
                          Expenses Only
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600 text-xs">
                          Complete
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
