import { createClient } from "@/lib/supabase/server";
import { DailySalesRecord, FuelType, ReadingWithContinuity } from "@/lib/types";

/**
 * Fetches all daily sales records from daily_sales_view for a business
 * and enriches each record with continuity mismatch detection based on
 * the immediate previous recorded reading for that fuel type.
 */
export async function getReadingsWithContinuity(
  businessId: string
): Promise<ReadingWithContinuity[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("daily_sales_view")
    .select(
      "reading_id, business_id, fuel_type, reading_date, opening_reading, closing_reading, created_at, updated_at, litres, rate, margin, rate_missing, sales, profit"
    )
    .eq("business_id", businessId)
    .order("reading_date", { ascending: true }); // ascending for sequential continuity calculation

  if (error || !data) {
    console.error("Error fetching daily sales view:", error?.message);
    return [];
  }

  const rawRecords = data as DailySalesRecord[];

  // Group by fuel type and compute continuity chronologically
  const msRecords = rawRecords.filter((r) => r.fuel_type === "MS");
  const hsdRecords = rawRecords.filter((r) => r.fuel_type === "HSD");

  const computeContinuityForList = (
    list: DailySalesRecord[]
  ): ReadingWithContinuity[] => {
    return list.map((record, index) => {
      const opening = Number(record.opening_reading);
      const closing = Number(record.closing_reading);
      const litres = Number(record.litres);
      const rate = record.rate !== null ? Number(record.rate) : null;
      const margin = record.margin !== null ? Number(record.margin) : null;
      const sales = record.sales !== null ? Number(record.sales) : null;
      const profit = record.profit !== null ? Number(record.profit) : null;

      if (index === 0) {
        // First recorded reading in history for this fuel type
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
  };

  const enrichedMS = computeContinuityForList(msRecords);
  const enrichedHSD = computeContinuityForList(hsdRecords);

  // Combine and sort in reverse chronological order for UI display
  const combined = [...enrichedMS, ...enrichedHSD];
  combined.sort((a, b) => {
    if (a.reading_date !== b.reading_date) {
      return b.reading_date.localeCompare(a.reading_date); // newer dates first
    }
    return a.fuel_type.localeCompare(b.fuel_type); // MS before HSD
  });

  return combined;
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    // Check if ANY reading exists for this fuel type at all
    const { data: anyCount } = await supabase
      .from("daily_meter_readings")
      .select("id")
      .eq("business_id", businessId)
      .eq("fuel_type", fuelType)
      .limit(1);

    const isFirst = !anyCount || anyCount.length === 0;

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
 */
export async function getLatestPreviousClosings(
  businessId: string,
  referenceDate: string
) {
  const [msState, hsdState] = await Promise.all([
    getPreviousClosingForDate(businessId, "MS", referenceDate),
    getPreviousClosingForDate(businessId, "HSD", referenceDate),
  ]);

  return {
    MS: msState,
    HSD: hsdState,
  };
}
