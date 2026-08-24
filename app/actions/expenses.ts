"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ActionResult } from "@/lib/types";

const createExpenseSchema = z.object({
  business_id: z.string().uuid("Invalid business identifier"),
  expense_month: z
    .string()
    .regex(/^\d{4}-\d{2}-01$/, "Expense month must be normalized to YYYY-MM-01"),
  category: z.string().trim().min(1, "Please select an expense category"),
  amount: z
    .number({ message: "Amount must be a valid number" })
    .positive("Expense amount must be greater than 0"),
  note: z.string().trim().max(500, "Note cannot exceed 500 characters").optional().nullable(),
});

const updateExpenseSchema = z.object({
  expense_id: z.string().uuid("Invalid expense identifier"),
  business_id: z.string().uuid("Invalid business identifier"),
  expense_month: z
    .string()
    .regex(/^\d{4}-\d{2}-01$/, "Expense month must be normalized to YYYY-MM-01"),
  category: z.string().trim().min(1, "Please select an expense category"),
  amount: z
    .number({ message: "Amount must be a valid number" })
    .positive("Expense amount must be greater than 0"),
  note: z.string().trim().max(500, "Note cannot exceed 500 characters").optional().nullable(),
});

/**
 * Normalizes any month input (YYYY-MM or YYYY-MM-DD) to canonical YYYY-MM-01.
 */
function normalizeExpenseMonth(rawMonth: unknown): string {
  if (typeof rawMonth !== "string") return "";
  const parts = rawMonth.trim().split("-");
  if (parts.length >= 2) {
    const year = parts[0];
    const month = parts[1].padStart(2, "0");
    return `${year}-${month}-01`;
  }
  return rawMonth;
}

export async function createExpenseAction(
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
        error: "You must be logged in to record expenses.",
      };
    }

    const rawData = {
      business_id: formData.get("business_id"),
      expense_month: normalizeExpenseMonth(formData.get("expense_month")),
      category: formData.get("category"),
      amount: Number(formData.get("amount")),
      note: formData.get("note") ? String(formData.get("note")).trim() : null,
    };

    const parsed = createExpenseSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.amount?.[0] ||
        fieldErrors.category?.[0] ||
        fieldErrors.expense_month?.[0] ||
        fieldErrors.note?.[0] ||
        "Invalid expense details.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { business_id, expense_month, category, amount, note } = parsed.data;

    const { data, error } = await supabase
      .from("expenses")
      .insert({
        business_id,
        expense_month,
        category,
        amount,
        note,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23514") {
        return {
          success: false,
          error: "Invalid expense: Amount must be greater than 0 and month must be first day of month.",
        };
      }

      console.error("Failed to create expense:", error.message);
      return {
        success: false,
        error: "Failed to save expense. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/expenses`);

    return {
      success: true,
      data: { id: data.id },
    };
  } catch (err) {
    console.error("Unexpected error in createExpenseAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving the expense.",
    };
  }
}

export async function updateExpenseAction(
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
        error: "You must be logged in to update expenses.",
      };
    }

    const rawData = {
      expense_id: formData.get("expense_id"),
      business_id: formData.get("business_id"),
      expense_month: normalizeExpenseMonth(formData.get("expense_month")),
      category: formData.get("category"),
      amount: Number(formData.get("amount")),
      note: formData.get("note") ? String(formData.get("note")).trim() : null,
    };

    const parsed = updateExpenseSchema.safeParse(rawData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage =
        fieldErrors.amount?.[0] ||
        fieldErrors.category?.[0] ||
        fieldErrors.expense_month?.[0] ||
        "Invalid expense details.";

      return {
        success: false,
        fieldErrors,
        error: firstErrorMessage,
      };
    }

    const { expense_id, business_id, expense_month, category, amount, note } =
      parsed.data;

    const { error } = await supabase
      .from("expenses")
      .update({
        expense_month,
        category,
        amount,
        note,
      })
      .eq("id", expense_id)
      .eq("business_id", business_id);

    if (error) {
      if (error.code === "23514") {
        return {
          success: false,
          error: "Invalid expense: Amount must be greater than 0.",
        };
      }

      console.error("Failed to update expense:", error.message);
      return {
        success: false,
        error: "Failed to update expense. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${business_id}`);
    revalidatePath(`/protected/dashboard/${business_id}/expenses`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error in updateExpenseAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while updating the expense.",
    };
  }
}

export async function deleteExpenseAction(
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
        error: "You must be logged in to delete expenses.",
      };
    }

    const expenseId = formData.get("expense_id") as string;
    const businessId = formData.get("business_id") as string;

    if (!expenseId || !businessId) {
      return {
        success: false,
        error: "Invalid request data.",
      };
    }

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId)
      .eq("business_id", businessId);

    if (error) {
      console.error("Failed to delete expense:", error.message);
      return {
        success: false,
        error: "Failed to delete expense. Please try again.",
      };
    }

    revalidatePath(`/protected/dashboard/${businessId}`);
    revalidatePath(`/protected/dashboard/${businessId}/expenses`);

    return {
      success: true,
    };
  } catch (err) {
    console.error("Unexpected error in deleteExpenseAction:", err);
    return {
      success: false,
      error: "An unexpected error occurred while deleting the expense.",
    };
  }
}
