import { getAuthUser } from "@/lib/supabase/auth";
import { DailySalesRecord, FuelType, ReadingWithContinuity } from "@/lib/types";

const DAILY_SALES_SELECT =
  "reading_id, business_id, fuel_type, reading_date, opening_reading, closing_reading, created_at, updated_at, litres, rate, margin, rate_missing, sales, profit";

/**
 * Shared helper: takes a chronologically-sorted (ascending) list of readings
 * for a single fuel type and enriches each with continuity mismatch data.
 */
function computeContinuityForList(
  list: DailySalesRecord[]
): ReadingWithContinuity[] {
  return list.map((record, index) => {
    const opening = Number(record.opening_reading);
    const closing = Number(record.closing_reading);
    const litres = Number(record.litres);
    const rate = record.rate !== null ? Number(record.rate) : null;
    const margin = record.margin !== null ? Number(record.margin) : null;
    const sales = record.sales !== null ? Number(record.sales) : null;
    const profit = record.profit !== null ? Number(record.profit) : null;

    if (index === 0) {
      return {
        ...record,
        opening_reading: opening,
        closing_reading: closing,
        litres,
        rate,
        margin,
        sales,
        profit,
        previous_recorded_closing: null,
        previous_reading_date: null,
        has_opening_mismatch: false,
        expected_opening: null,
        is_first_reading: true,
      };
    }

    const prev = list[index - 1];
    const prevClosing = Number(prev.closing_reading);
    const hasMismatch = opening !== prevClosing;

    return {
      ...record,
      opening_reading: opening,
      closing_reading: closing,
      litres,
      rate,
      margin,
      sales,
      profit,
      previous_recorded_closing: prevClosing,
      previous_reading_date: prev.reading_date,
      has_opening_mismatch: hasMismatch,
      expected_opening: prevClosing,
      is_first_reading: false,
    };
  });
}

/**
 * Combines and sorts enriched readings in reverse chronological order.
 */
function combineAndSortDesc(
  msRecords: ReadingWithContinuity[],
  hsdRecords: ReadingWithContinuity[]
): ReadingWithContinuity[] {
  const combined = [...msRecords, ...hsdRecords];
  combined.sort((a, b) => {
    if (a.reading_date !== b.reading_date) {
      return b.reading_date.localeCompare(a.reading_date);
    }
    return a.fuel_type.localeCompare(b.fuel_type);
  });
  return combined;
}

/**
 * Fetches daily sales records from daily_sales_view for a business
 * and enriches each record with continuity mismatch detection based on
 * the immediate previous recorded reading for that fuel type.
 *
 * Supports an optional month filter (e.g. '2026-10') which fetches only
 * that month's readings while preserving accurate continuity across month boundaries.
 */
export async function getReadingsWithContinuity(
  businessId: string,
  options?: { month?: string }
): Promise<ReadingWithContinuity[]> {
  const { supabase, user } = await getAuthUser();

  if (!user) {
    return [];
  }

  let query = supabase
    .from("daily_sales_view")
    .select(DAILY_SALES_SELECT)
    .eq("business_id", businessId);

  if (options?.month) {
    const start = `${options.month.slice(0, 7)}-01`;
    const nextMonth = new Date(`${start}T00:00:00Z`);
    nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
    const end = nextMonth.toISOString().slice(0, 10);

    query = query.gte("reading_date", start).lt("reading_date", end);
  }

  const { data, error } = await query.order("reading_date", { ascending: true });

  if (error || !data) {
    console.error("Error fetching daily sales view:", error?.message);
    return [];
  }

  const rawRecords = data as DailySalesRecord[];

  // If filtered by month, fetch the immediate preceding reading per fuel type before the month
  // to ensure opening continuity is accurate for the first days of the month
  let msPrior: DailySalesRecord | null = null;
  let hsdPrior: DailySalesRecord | null = null;

  if (options?.month) {
    const start = `${options.month.slice(0, 7)}-01`;
    const { data: priorData } = await supabase
      .from("daily_sales_view")
      .select(DAILY_SALES_SELECT)
      .eq("business_id", businessId)
      .lt("reading_date", start)
      .order("reading_date", { ascending: false });

    if (priorData) {
      msPrior = priorData.find((r) => r.fuel_type === "MS") || null;
      hsdPrior = priorData.find((r) => r.fuel_type === "HSD") || null;
    }
  }

  const msRecords = msPrior
    ? [msPrior, ...rawRecords.filter((r) => r.fuel_type === "MS")]
    : rawRecords.filter((r) => r.fuel_type === "MS");
  const hsdRecords = hsdPrior
    ? [hsdPrior, ...rawRecords.filter((r) => r.fuel_type === "HSD")]
    : rawRecords.filter((r) => r.fuel_type === "HSD");

  const enrichedMS = computeContinuityForList(msRecords);
  const enrichedHSD = computeContinuityForList(hsdRecords);

  const finalMS = msPrior ? enrichedMS.slice(1) : enrichedMS;
  const finalHSD = hsdPrior ? enrichedHSD.slice(1) : enrichedHSD;

  return combineAndSortDesc(finalMS, finalHSD);
}

/**
 * Dashboard-optimized query: fetches only the last 30 days of readings
 * with continuity data. Returns everything the dashboard overview needs:
 * - Latest date readings (for performance cards + fuel breakdown)
 * - Last N readings (for the recent activity table)
 * - Mismatch count (for the alert banner)
 *
 * Fetches 30 days instead of the entire history to keep it bounded.
 * We fetch 1 extra "anchor" reading per fuel type before the window
 * so that the first reading within the window still has continuity data.
 */
export async function getDashboardReadingSummary(
  businessId: string
): Promise<ReadingWithContinuity[]> {
  const { supabase, user } = await getAuthUser();

  if (!user) {
    return [];
  }

  // Fetch the most recent 60 rows (covers ~30 days × 2 fuel types)
  // This is a generous upper bound; most dashboards only display ~7 rows.
  const { data, error } = await supabase
    .from("daily_sales_view")
    .select(DAILY_SALES_SELECT)
    .eq("business_id", businessId)
    .order("reading_date", { ascending: false })
    .limit(62); // 31 days × 2 fuel types = 62 rows max

  if (error || !data) {
    console.error("Error fetching dashboard reading summary:", error?.message);
    return [];
  }

  // Reverse to ascending for continuity computation
  const rawRecords = (data as DailySalesRecord[]).reverse();
  const msRecords = rawRecords.filter((r) => r.fuel_type === "MS");
  const hsdRecords = rawRecords.filter((r) => r.fuel_type === "HSD");

  return combineAndSortDesc(
    computeContinuityForList(msRecords),
    computeContinuityForList(hsdRecords)
  );
}

/**
 * Finds the immediate previous recorded closing reading for a specific fuel type
 * strictly before a given target date.
 */
export async function getPreviousClosingForDate(
  businessId: string,
  fuelType: FuelType,
  beforeDate: string
): Promise<{
  previousClosing: number | null;
  previousDate: string | null;
  isFirstReading: boolean;
}> {
  const { supabase, user } = await getAuthUser();

  if (!user) {
    return { previousClosing: null, previousDate: null, isFirstReading: true };
  }

  const { data, error } = await supabase
    .from("daily_meter_readings")
    .select("closing_reading, reading_date")
    .eq("business_id", businessId)
    .eq("fuel_type", fuelType)
    .lt("reading_date", beforeDate)
    .order("reading_date", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    // Check if ANY reading exists for this fuel type at all using lightweight head count
    const { count } = await supabase
      .from("daily_meter_readings")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("fuel_type", fuelType);

    const isFirst = (count ?? 0) === 0;

    return {
      previousClosing: null,
      previousDate: null,
      isFirstReading: isFirst,
    };
  }

  const prev = data[0];
  return {
    previousClosing: Number(prev.closing_reading),
    previousDate: prev.reading_date,
    isFirstReading: false,
  };
}

/**
 * Returns initial previous closing state for both MS and HSD for a given reference date (e.g. today).
 * Fetches prior readings for both fuel types in a single query instead of 2-4 round-trips.
 */
export async function getLatestPreviousClosings(
  businessId: string,
  referenceDate: string
) {
  const { supabase, user } = await getAuthUser();

  if (!user) {
    return {
      MS: { previousClosing: null, previousDate: null, isFirstReading: true },
      HSD: { previousClosing: null, previousDate: null, isFirstReading: true },
    };
  }

  // Fetch prior readings for both fuel types in a single query
  const { data: priorData } = await supabase
    .from("daily_meter_readings")
    .select("fuel_type, closing_reading, reading_date")
    .eq("business_id", businessId)
    .lt("reading_date", referenceDate)
    .order("reading_date", { ascending: false });

  const msPrior = priorData?.find((r) => r.fuel_type === "MS");
  const hsdPrior = priorData?.find((r) => r.fuel_type === "HSD");

  let msAny = !!msPrior;
  let hsdAny = !!hsdPrior;

  // If either fuel type has no reading before referenceDate, check if any exists at all
  if (!msPrior || !hsdPrior) {
    const { data: anyData } = await supabase
      .from("daily_meter_readings")
      .select("fuel_type")
      .eq("business_id", businessId)
      .limit(10);

    if (anyData) {
      if (anyData.some((r) => r.fuel_type === "MS")) msAny = true;
      if (anyData.some((r) => r.fuel_type === "HSD")) hsdAny = true;
    }
  }

  return {
    MS: {
      previousClosing: msPrior ? Number(msPrior.closing_reading) : null,
      previousDate: msPrior ? msPrior.reading_date : null,
      isFirstReading: !msAny,
    },
    HSD: {
      previousClosing: hsdPrior ? Number(hsdPrior.closing_reading) : null,
      previousDate: hsdPrior ? hsdPrior.reading_date : null,
      isFirstReading: !hsdAny,
    },
  };
}
