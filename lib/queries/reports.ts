import { createClient } from "@/lib/supabase/server";
import { DailySalesRecord, MonthlyProfitRecord } from "@/lib/types";

/**
 * Fetches all monthly profit records from monthly_profit_summary_view
 * for a business, ordered by profit_month DESC.
 */
export async function getMonthlyProfitReports(
  businessId: string
): Promise<MonthlyProfitRecord[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("monthly_profit_summary_view")
    .select(
      "business_id, profit_month, total_fuel_sales, total_ro_profit, total_expenses, net_profit, total_reading_days, days_without_rate, has_missing_rates"
    )
    .eq("business_id", businessId)
    .order("profit_month", { ascending: false });

  if (error || !data) {
    console.error("Error fetching monthly profit summary:", error?.message);
    return [];
  }

  return (data as MonthlyProfitRecord[]).map((r) => ({
    business_id: r.business_id,
    profit_month: r.profit_month,
    total_fuel_sales: r.total_fuel_sales !== null ? Number(r.total_fuel_sales) : null,
    total_ro_profit: r.total_ro_profit !== null ? Number(r.total_ro_profit) : null,
    total_expenses: Number(r.total_expenses),
    net_profit: r.net_profit !== null ? Number(r.net_profit) : null,
    total_reading_days: Number(r.total_reading_days),
    days_without_rate: Number(r.days_without_rate),
    has_missing_rates: Boolean(r.has_missing_rates),
  }));
}

/**
 * Fetches the monthly profit record for a specific business and month (YYYY-MM-01).
 */
export async function getMonthlyProfitForMonth(
  businessId: string,
  month: string
): Promise<MonthlyProfitRecord | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("monthly_profit_summary_view")
    .select(
      "business_id, profit_month, total_fuel_sales, total_ro_profit, total_expenses, net_profit, total_reading_days, days_without_rate, has_missing_rates"
    )
    .eq("business_id", businessId)
    .eq("profit_month", month)
    .single();

  if (error || !data) {
    return null;
  }

  const r = data as MonthlyProfitRecord;
  return {
    business_id: r.business_id,
    profit_month: r.profit_month,
    total_fuel_sales: r.total_fuel_sales !== null ? Number(r.total_fuel_sales) : null,
    total_ro_profit: r.total_ro_profit !== null ? Number(r.total_ro_profit) : null,
    total_expenses: Number(r.total_expenses),
    net_profit: r.net_profit !== null ? Number(r.net_profit) : null,
    total_reading_days: Number(r.total_reading_days),
    days_without_rate: Number(r.days_without_rate),
    has_missing_rates: Boolean(r.has_missing_rates),
  };
}

export interface TodayPerformanceSummary {
  msReading: DailySalesRecord | null;
  hsdReading: DailySalesRecord | null;
  totalLitres: number;
  totalSales: number | null;
  totalROProfit: number | null;
  hasRateMissing: boolean;
  hasReadings: boolean;
}

/**
 * Fetches today's meter readings and calculations from daily_sales_view.
 */
export async function getTodayPerformance(
  businessId: string,
  todayIST: string
): Promise<TodayPerformanceSummary> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      msReading: null,
      hsdReading: null,
      totalLitres: 0,
      totalSales: null,
      totalROProfit: null,
      hasRateMissing: false,
      hasReadings: false,
    };
  }

  const { data, error } = await supabase
    .from("daily_sales_view")
    .select(
      "reading_id, business_id, fuel_type, reading_date, opening_reading, closing_reading, created_at, updated_at, litres, rate, margin, rate_missing, sales, profit"
    )
    .eq("business_id", businessId)
    .eq("reading_date", todayIST);

  if (error || !data || data.length === 0) {
    return {
      msReading: null,
      hsdReading: null,
      totalLitres: 0,
      totalSales: 0,
      totalROProfit: 0,
      hasRateMissing: false,
      hasReadings: false,
    };
  }

  const readings = data as DailySalesRecord[];
  const ms = readings.find((r) => r.fuel_type === "MS") || null;
  const hsd = readings.find((r) => r.fuel_type === "HSD") || null;

  let sumLitres = 0;
  let sumSales: number | null = 0;
  let sumProfit: number | null = 0;
  let hasMissing = false;

  for (const r of readings) {
    sumLitres += Number(r.litres);
    if (r.rate_missing || r.sales === null || r.profit === null) {
      hasMissing = true;
      sumSales = null;
      sumProfit = null;
    } else {
      if (sumSales !== null) sumSales += Number(r.sales);
      if (sumProfit !== null) sumProfit += Number(r.profit);
    }
  }

  return {
    msReading: ms,
    hsdReading: hsd,
    totalLitres: sumLitres,
    totalSales: sumSales,
    totalROProfit: sumProfit,
    hasRateMissing: hasMissing,
    hasReadings: readings.length > 0,
  };
}
