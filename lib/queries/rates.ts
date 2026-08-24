import { createClient } from "@/lib/supabase/server";
import { FuelRate, FuelType } from "@/lib/types";
import { getTodayIST } from "@/lib/date";

export interface EnrichedFuelRate extends FuelRate {
  status: "active" | "upcoming" | "historical";
}

/**
 * Fetches all fuel rates for a business ordered by effective_date DESC.
 * Enriches each rate with its status (active, upcoming, historical).
 */
export async function getFuelRatesForBusiness(
  businessId: string
): Promise<EnrichedFuelRate[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("fuel_rates")
    .select("id, business_id, fuel_type, effective_date, rate, margin, created_at")
    .eq("business_id", businessId)
    .order("effective_date", { ascending: false })
    .order("fuel_type", { ascending: true });

  if (error || !data) {
    console.error("Error fetching fuel rates:", error?.message);
    return [];
  }

  const rates = data as FuelRate[];
  const todayIST = getTodayIST();

  // Track the most recent active rate seen for each fuel type
  const activeSeen: Record<FuelType, boolean> = {
    MS: false,
    HSD: false,
  };

  return rates.map((rate) => {
    let status: "active" | "upcoming" | "historical";

    if (rate.effective_date > todayIST) {
      status = "upcoming";
    } else if (!activeSeen[rate.fuel_type]) {
      status = "active";
      activeSeen[rate.fuel_type] = true;
    } else {
      status = "historical";
    }

    return {
      ...rate,
      rate: Number(rate.rate),
      margin: Number(rate.margin),
      status,
    };
  });
}
