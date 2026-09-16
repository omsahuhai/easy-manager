import { createClient } from "@/lib/supabase/server";
import { DailySalesRecord } from "@/lib/types";

const SELECT = "reading_id, business_id, fuel_type, reading_date, opening_reading, closing_reading, created_at, updated_at, litres, rate, margin, rate_missing, sales, profit";

function normalize(records: DailySalesRecord[]): DailySalesRecord[] {
  return records.map((r) => ({
    ...r,
    opening_reading: Number(r.opening_reading),
    closing_reading: Number(r.closing_reading),
    litres: Number(r.litres),
    rate: r.rate === null ? null : Number(r.rate),
    margin: r.margin === null ? null : Number(r.margin),
    sales: r.sales === null ? null : Number(r.sales),
    profit: r.profit === null ? null : Number(r.profit),
    rate_missing: Boolean(r.rate_missing),
  }));
}

export async function getDailyReportsForMonth(businessId: string, month: string): Promise<DailySalesRecord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const start = `${month.slice(0, 7)}-01`;
  const next = new Date(`${start}T00:00:00Z`);
  next.setUTCMonth(next.getUTCMonth() + 1);
  const end = next.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("daily_sales_view")
    .select(SELECT)
    .eq("business_id", businessId)
    .gte("reading_date", start)
    .lt("reading_date", end)
    .order("reading_date", { ascending: false })
    .order("fuel_type", { ascending: true });

  if (error || !data) return [];
  return normalize(data as DailySalesRecord[]);
}

export async function getDailyReportForDate(businessId: string, date: string): Promise<DailySalesRecord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("daily_sales_view")
    .select(SELECT)
    .eq("business_id", businessId)
    .eq("reading_date", date)
    .order("fuel_type", { ascending: true });

  if (error || !data) return [];
  return normalize(data as DailySalesRecord[]);
}
