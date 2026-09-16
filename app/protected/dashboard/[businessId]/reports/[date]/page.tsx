import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Droplet, IndianRupee, ReceiptText, TrendingUp, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBusinessById } from "@/lib/queries/businesses";
import { getDailyReportForDate } from "@/lib/queries/daily-reports";
import { formatDateIST } from "@/lib/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function DailyReportPage(props: {
  params: Promise<{ businessId: string; date: string }>;
}) {
  const { businessId, date } = await props.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const [business, records] = await Promise.all([
    getBusinessById(businessId),
    getDailyReportForDate(businessId, date),
  ]);

  if (!business) notFound();

  const totalLitres = records.reduce((sum, r) => sum + r.litres, 0);
  const completeRecords = records.filter((r) => !r.rate_missing && r.sales !== null && r.profit !== null);
  const hasMissingRate = records.some((r) => r.rate_missing);
  const totalSales = hasMissingRate ? null : completeRecords.reduce((sum, r) => sum + (r.sales ?? 0), 0);
  const totalProfit = hasMissingRate ? null : completeRecords.reduce((sum, r) => sum + (r.profit ?? 0), 0);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/protected/dashboard/${businessId}/reports`} aria-label="Back to reports">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <p className="text-xs text-muted-foreground">Daily Management Report</p>
          <h2 className="text-xl font-bold tracking-tight">{formatDateIST(date)}</h2>
        </div>
      </div>

      {hasMissingRate && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Incomplete financial picture</p>
            <p className="text-xs text-muted-foreground">One or more readings do not have an applicable fuel rate, so sales and RO profit are shown as unknown rather than zero.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><Droplet className="h-4 w-4" />Fuel Sold</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalLitres.toFixed(2)} L</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><IndianRupee className="h-4 w-4" />Sales</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalSales === null ? "—" : `₹${totalSales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" />RO Profit</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalProfit === null ? "—" : `₹${totalProfit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground flex items-center gap-2"><ReceiptText className="h-4 w-4" />Readings</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{records.length}/2</div></CardContent></Card>
      </div>

      <Card className="shadow-sm border">
        <CardHeader><CardTitle className="text-lg">Fuel Performance</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {records.length === 0 ? <p className="text-sm text-muted-foreground py-6 text-center">No readings recorded for this date.</p> : records.map((r) => (
            <div key={r.reading_id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${r.fuel_type === "MS" ? "bg-amber-500" : "bg-blue-500"}`} /><span className="font-bold">{r.fuel_type === "MS" ? "MS (Petrol)" : "HSD (Diesel)"}</span></div>
                {r.rate_missing ? <Badge variant="outline">Rate Missing</Badge> : <Badge>Calculated</Badge>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                <div><p className="text-xs text-muted-foreground">Opening</p><p className="font-semibold">{r.opening_reading.toFixed(2)} L</p></div>
                <div><p className="text-xs text-muted-foreground">Closing</p><p className="font-semibold">{r.closing_reading.toFixed(2)} L</p></div>
                <div><p className="text-xs text-muted-foreground">Volume</p><p className="font-semibold">{r.litres.toFixed(2)} L</p></div>
                <div><p className="text-xs text-muted-foreground">Rate</p><p className="font-semibold">{r.rate === null ? "—" : `₹${r.rate.toFixed(2)}`}</p></div>
                <div><p className="text-xs text-muted-foreground">Sales</p><p className="font-semibold">{r.sales === null ? "—" : `₹${r.sales.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
                <div><p className="text-xs text-muted-foreground">RO Profit</p><p className="font-semibold">{r.profit === null ? "—" : `₹${r.profit.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground flex items-center justify-between">
        <span>{business.name} · {formatDateIST(date)}</span>
        <Link className="text-primary hover:underline" href={`/protected/dashboard/${businessId}/readings`}>Open register →</Link>
      </div>
    </div>
  );
}
