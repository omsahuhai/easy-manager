"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult } from "@/lib/types";
import { formatDateIST } from "@/lib/date";

const createRateSchema = z.object({
  business_id: z.string().uuid("Invalid business identifier"),
  fuel_type: z.enum(["MS", "HSD"], {
    message: "Fuel type must be either MS (Petrol) or HSD (Diesel)",
  }),
  effective_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Effective date must be in YYYY-MM-DD format"),
  rate: z
    .number({ message: "Selling rate must be a valid number" })
    .positive("Selling rate must be greater than 0"),
  margin: z
    .number({ message: "RO margin must be a valid number" })
    .nonnegative("RO margin cannot be negative"),
});

const updateRateSchema = z.object({
  rate_id: z.string().uuid("Invalid rate identifier"),
  business_id: z.string().uuid("Invalid business identifier"),
  rate: z
    .number({ message: "Selling rate must be a valid number" })
    .positive("Selling rate must be greater than 0"),
  margin: z
    .number({ message: "RO margin must be a valid number" })
    .nonnegative("RO margin cannot be negative"),
});

export async function createFuelRateAction(
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
        error: "You must be logged in to manage fuel rates.",
      };
    }

    const rawData = {
      business_id: formData.get("business_id"),
      fuel_type: formData.get("fuel_type"),
      effective_date: formData.get("effective_date"),
      rate: Number(formData.get("rate")),
      margin: Number(formData.get("margin")),
    };

    const parsed = createRateSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.rate?.[0] ||
        fieldErrors.margin?.[0] ||
        fieldErrors.effective_date?.[0] ||
        fieldErrors.fuel_type?.[0] ||
        "Invalid fuel rate input.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { business_id, fuel_type, effective_date, rate, margin } = parsed.data;

    const { data, error } = await supabase
      .from("fuel_rates")
      .insert({
        business_id,
        fuel_type,
        effective_date,
        rate,
        margin,
      })
      .select("id")
      .single();

    if (error) {
      // Catch unique constraint violation (business_id, fuel_type, effective_date)
      if (error.code === "23505") {
        const formattedDate = formatDateIST(effective_date);
        return {
          success: false,
          error: `A rate for ${fuel_type} already exists for ${formattedDate}. Edit the existing rate instead.`,
        };
      }

      console.error("Failed to create fuel rate:", error.message);
      return {
        success: false,
        error: "Failed to record fuel rate. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/rates`);

    return {
      success: true,
      data: { id: data.id },
    };
  } catch (err) {
    console.error("Unexpected error in createFuelRateAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving the fuel rate.",
    };
  }
}

export async function updateFuelRateAction(
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
        error: "You must be logged in to update fuel rates.",
      };
    }

    const rawData = {
      rate_id: formData.get("rate_id"),
      business_id: formData.get("business_id"),
      rate: Number(formData.get("rate")),
      margin: Number(formData.get("margin")),
    };

    const parsed = updateRateSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.rate?.[0] ||
        fieldErrors.margin?.[0] ||
        "Invalid fuel rate input.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { rate_id, business_id, rate, margin } = parsed.data;

    const { error } = await supabase
      .from("fuel_rates")
      .update({
        rate,
        margin,
      })
      .eq("id", rate_id)
      .eq("business_id", business_id);

    if (error) {
      console.error("Failed to update fuel rate:", error.message);
      return {
        success: false,
        error: "Failed to update fuel rate. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/rates`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error in updateFuelRateAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while updating the fuel rate.",
    };
  }
}

export async function deleteFuelRateAction(
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
        error: "You must be logged in to delete fuel rates.",
      };
    }

    const rateId = formData.get("rate_id") as string;
    const businessId = formData.get("business_id") as string;

    if (!rateId || !businessId) {
      return {
        success: false,
        error: "Invalid request data.",
      };
    }

    const { error } = await supabase
      .from("fuel_rates")
      .delete()
      .eq("id", rateId)
      .eq("business_id", businessId);

    if (error) {
      console.error("Failed to delete fuel rate:", error.message);
      return {
        success: false,
        error: "Failed to delete fuel rate. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${businessId}`);
    revalidatePath(`/protected/dashboard/${businessId}/rates`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error in deleteFuelRateAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while deleting the fuel rate.",
    };
  }
}
