"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult, FuelType } from "@/lib/types";
import { formatDateIST, isFutureDateIST } from "@/lib/date";
import { getPreviousClosingForDate } from "@/lib/queries/readings";

const createReadingSchema = z.object({
  business_id: z.string().uuid("Invalid business identifier"),
  fuel_type: z.enum(["MS", "HSD"], {
    message: "Fuel type must be either MS (Petrol) or HSD (Diesel)",
  }),
  reading_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Reading date must be in YYYY-MM-DD format"),
  opening_reading: z
    .number({ message: "Opening reading must be a valid number" })
    .nonnegative("Opening reading cannot be negative"),
  closing_reading: z
    .number({ message: "Closing reading must be a valid number" })
    .nonnegative("Closing reading cannot be negative"),
});

const updateReadingSchema = z.object({
  reading_id: z.string().uuid("Invalid reading identifier"),
  business_id: z.string().uuid("Invalid business identifier"),
  opening_reading: z
    .number({ message: "Opening reading must be a valid number" })
    .nonnegative("Opening reading cannot be negative"),
  closing_reading: z
    .number({ message: "Closing reading must be a valid number" })
    .nonnegative("Closing reading cannot be negative"),
});

export async function createReadingAction(
  _prevState: ActionResult<{ id: string }> | null,
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to record meter readings.",
      };
    }

    const rawData = {
      business_id: formData.get("business_id"),
      fuel_type: formData.get("fuel_type"),
      reading_date: formData.get("reading_date"),
      opening_reading: Number(formData.get("opening_reading")),
      closing_reading: Number(formData.get("closing_reading")),
    };

    const parsed = createReadingSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.opening_reading?.[0] ||
        fieldErrors.closing_reading?.[0] ||
        fieldErrors.reading_date?.[0] ||
        fieldErrors.fuel_type?.[0] ||
        "Invalid meter reading input.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { business_id, fuel_type, reading_date, opening_reading, closing_reading } =
      parsed.data;

    // Reject future dates based on Asia/Kolkata
    if (isFutureDateIST(reading_date)) {
      return {
        success: false,
        fieldErrors: {
          reading_date: ["Reading date cannot be in the future."],
        },
        error: "Reading date cannot be in the future.",
      };
    }

    // Invariant: closing_reading >= opening_reading
    if (closing_reading < opening_reading) {
      return {
        success: false,
        fieldErrors: {
          closing_reading: ["Closing reading cannot be less than opening reading."],
        },
        error: "Closing reading cannot be less than opening reading.",
      };
    }

    const { data, error } = await supabase
      .from("daily_meter_readings")
      .insert({
        business_id,
        fuel_type,
        reading_date,
        opening_reading,
        closing_reading,
      })
      .select("id")
      .single();

    if (error) {
      // Catch unique constraint violation (business_id, fuel_type, reading_date)
      if (error.code === "23505") {
        const formattedDate = formatDateIST(reading_date);
        return {
          success: false,
          error: `A reading for ${fuel_type} already exists for ${formattedDate}. Edit the existing reading instead.`,
        };
      }

      // Catch check constraint violation
      if (error.code === "23514") {
        return {
          success: false,
          error: "Invalid reading values: Closing reading cannot be less than opening reading.",
        };
      }

      console.error("Failed to create daily meter reading:", error.message);
      return {
        success: false,
        error: "Failed to save daily meter reading. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/readings`);

    return {
      success: true,
      data: { id: data.id },
    };
  } catch (err) {
    console.error("Unexpected error in createReadingAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving the meter reading.",
    };
  }
}

export async function updateReadingAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to update meter readings.",
      };
    }

    const rawData = {
      reading_id: formData.get("reading_id"),
      business_id: formData.get("business_id"),
      opening_reading: Number(formData.get("opening_reading")),
      closing_reading: Number(formData.get("closing_reading")),
    };

    const parsed = updateReadingSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.opening_reading?.[0] ||
        fieldErrors.closing_reading?.[0] ||
        "Invalid meter reading values.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { reading_id, business_id, opening_reading, closing_reading } = parsed.data;

    // Invariant: closing_reading >= opening_reading
    if (closing_reading < opening_reading) {
      return {
        success: false,
        fieldErrors: {
          closing_reading: ["Closing reading cannot be less than opening reading."],
        },
        error: "Closing reading cannot be less than opening reading.",
      };
    }

    const { error } = await supabase
      .from("daily_meter_readings")
      .update({
        opening_reading,
        closing_reading,
      })
      .eq("id", reading_id)
      .eq("business_id", business_id);

    if (error) {
      if (error.code === "23514") {
        return {
          success: false,
          error: "Invalid reading values: Closing reading cannot be less than opening reading.",
        };
      }

      console.error("Failed to update daily meter reading:", error.message);
      return {
        success: false,
        error: "Failed to update meter reading. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/readings`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error in updateReadingAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while updating the meter reading.",
    };
  }
}

/**
 * Server action helper callable from client when date/fuel changes in form
 * to lookup previous closing reading for auto-prefilling.
 */
export async function fetchPreviousClosingAction(
  businessId: string,
  fuelType: FuelType,
  readingDate: string
) {
  return await getPreviousClosingForDate(businessId, fuelType, readingDate);
}
