import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Droplet,
  IndianRupee,
  ReceiptText,
  TrendingUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getMonthlyProfitForMonth } from "@/lib/queries/reports";
import { getDailyReportsForMonth } from "@/lib/queries/daily-reports";
import { formatMonthIST } from "@/lib/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const instant = false;

function money(value: number | null) {
  return value === null
    ? "—"
    : `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T00:00:00+05:30`));
}

export default async function MonthlyReportDetailPage(props: {
  params: Promise<{ businessId: string; month: string }>;
}) {
  const { businessId, month } = await props.params;
  const normalizedMonth = `${month}-01`;

  if (!/^\d{4}-\d{2}$/.test(month)) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const [business, summary, dailyRecords] = await Promise.all([
    getBusinessById(businessId),
    getMonthlyProfitForMonth(businessId, normalizedMonth),
    getDailyReportsForMonth(businessId, normalizedMonth),
  ]);

  if (!business || !summary) notFound();

  const byDate = new Map<string, typeof dailyRecords>();
  for (const record of dailyRecords) {
    const existing = byDate.get(record.reading_date) ?? [];
    existing.push(record);
    byDate.set(record.reading_date, existing);
  }

  const days = Array.from(byDate.entries()).map(([date, records]) => {
    const missingRate = records.some((r) => r.rate_missing || r.sales === null || r.profit === null);
    const litres = records.reduce((sum, r) => sum + r.litres, 0);
    const sales = missingRate ? null : records.reduce((sum, r) => sum + (r.sales ?? 0), 0);
    const profit = missingRate ? null : records.reduce((sum, r) => sum + (r.profit ?? 0), 0);
    const ms = records.find((r) => r.fuel_type === "MS");
    const hsd = records.find((r) => r.fuel_type === "HSD");
    return { date, records, missingRate, litres, sales, profit, ms, hsd };
  }).sort((a, b) => b.date.localeCompare(a.date));

  const fuelStats = (["MS", "HSD"] as const).map((fuelType) => {
    const records = dailyRecords.filter((r) => r.fuel_type === fuelType);
    const litres = records.reduce((sum, r) => sum + r.litres, 0);
    const salesKnown = records.every((r) => r.sales !== null && !r.rate_missing);
    const profitKnown = records.every((r) => r.profit !== null && !r.rate_missing);
    return {
      fuelType,
      days: records.length,
      litres,
      sales: salesKnown ? records.reduce((sum, r) => sum + (r.sales ?? 0), 0) : null,
      profit: profitKnown ? records.reduce((sum, r) => sum + (r.profit ?? 0), 0) : null,
    };
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link href={`/protected/dashboard/${businessId}/reports`} aria-label="Back to reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Management Report</p>
            <h2 className="text-xl font-bold tracking-tight">{formatMonthIST(normalizedMonth)}</h2>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/protected/dashboard/${businessId}/expenses?month=${normalizedMonth}`}>
            <ReceiptText className="h-4 w-4 mr-2" /> Expenses
          </Link>
        </Button>
      </div>

      {summary.has_missing_rates && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Incomplete rate coverage</p>
            <p className="text-xs text-muted-foreground">
              {summary.days_without_rate} of {summary.total_reading_days} reading days are missing an applicable fuel rate. Affected sales and profit are shown as unknown rather than zero.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><IndianRupee className="h-4 w-4" />Fuel Sales</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{money(summary.total_fuel_sales)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" />RO Profit</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{money(summary.total_ro_profit)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><ReceiptText className="h-4 w-4" />Expenses</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-red-500">{money(summary.total_expenses)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" />Net Profit</CardTitle></CardHeader>
          <CardContent><div className={`text-2xl font-bold ${summary.net_profit === null ? "text-muted-foreground" : summary.net_profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{money(summary.net_profit)}</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fuelStats.map((fuel) => (
          <Card key={fuel.fuelType}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2"><Droplet className="h-4 w-4" />{fuel.fuelType === "MS" ? "MS (Petrol)" : "HSD (Diesel)"}</span>
                <Badge variant="secondary">{fuel.days} reading days</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3 text-sm">
              <div><p className="text-xs text-muted-foreground">Volume</p><p className="font-semibold">{fuel.litres.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L</p></div>
              <div><p className="text-xs text-muted-foreground">Sales</p><p className="font-semibold">{money(fuel.sales)}</p></div>
              <div><p className="text-xs text-muted-foreground">RO Profit</p><p className="font-semibold text-emerald-600 dark:text-emerald-400">{money(fuel.profit)}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm border">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Daily Reports</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Open any day for the complete MS/HSD calculation breakdown.</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{days.length} days</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {days.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">No daily readings recorded for this month.</div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/60 text-muted-foreground border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">MS</th>
                    <th className="px-4 py-3 font-semibold">HSD</th>
                    <th className="px-4 py-3 font-semibold">Total Volume</th>
                    <th className="px-4 py-3 font-semibold">Sales</th>
                    <th className="px-4 py-3 font-semibold">RO Profit</th>
                    <th className="px-4 py-3 font-semibold text-right">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {days.map((day) => {
                    const href = `/protected/dashboard/${businessId}/reports/${day.date}`;
                    return (
                      <tr key={day.date} className="group hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3.5 whitespace-nowrap font-semibold">
                          <Link href={href} className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                            {formatDate(day.date)}
                            {day.missingRate && <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-label="Incomplete rate data" />}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground"><Link href={href} className="block">{day.ms ? `${day.ms.litres.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L` : "—"}</Link></td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-muted-foreground"><Link href={href} className="block">{day.hsd ? `${day.hsd.litres.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L` : "—"}</Link></td>
                        <td className="px-4 py-3.5 whitespace-nowrap font-medium"><Link href={href} className="block">{day.litres.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L</Link></td>
                        <td className="px-4 py-3.5 whitespace-nowrap font-medium"><Link href={href} className="block">{money(day.sales)}</Link></td>
                        <td className="px-4 py-3.5 whitespace-nowrap font-semibold text-emerald-600 dark:text-emerald-400"><Link href={href} className="block">{money(day.profit)}</Link></td>
                        <td className="px-4 py-3.5 text-right"><Button asChild size="sm" variant="ghost" className="h-8"><Link href={href}><ArrowRight className="h-4 w-4" /></Link></Button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground flex items-center justify-between">
        <span>{business.name} · {formatMonthIST(normalizedMonth)}</span>
        <Link className="text-primary hover:underline" href={`/protected/dashboard/${businessId}/readings`}>Open register →</Link>
      </div>
    </div>
  );
}
