"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult, Business } from "@/lib/types";

const createBusinessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Petrol pump / Business name must be at least 2 characters")
    .max(100, "Business name cannot exceed 100 characters"),
});

export async function createBusinessAction(
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
        error: "You must be logged in to create a business.",
      };
    }

    const rawName = formData.get("name");
    const parsed = createBusinessSchema.safeParse({ name: rawName });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      return {
        success: false,
        fieldErrors,
        error: fieldErrors.name?.[0] || "Invalid business details.",
      };
    }

    const { data, error } = await supabase
      .from("businesses")
      .insert({
        owner_id: user.id,
        name: parsed.data.name,
        type: "petrol_pump",
      })
      .select("id, name, owner_id, type, created_at")
      .single();

    if (error || !data) {
      console.error("Failed to insert business:", error?.message);
      return {
        success: false,
        error: "Failed to create business. Please try again.",
      };
    }

    const business = data as Business;

    // Revalidate dashboard listing
    revalidatePath("/protected/dashboard");
    revalidatePath(`/protected/dashboard/${business.id}`);

    return {
      success: true,
      data: { id: business.id },
    };
  } catch (err) {
    console.error("Unexpected error in createBusinessAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while creating the business.",
    };
  }
}
