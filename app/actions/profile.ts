"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getAuthUser } from "@/lib/supabase/auth";

const profileSchema = z.object({
  fullName: z.string().trim().max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  avatarUrl: z.union([z.string().url(), z.literal(""), z.null()]).optional(),
  avatarPath: z.union([z.string().max(300), z.literal(""), z.null()]).optional(),
});

export async function updateProfileAction(input: {
  fullName: string;
  phone: string;
  avatarUrl?: string | null;
  avatarPath?: string | null;
}) {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid profile details.",
    };
  }

  const { supabase, user } = await getAuthUser();
  if (!user) {
    return { success: false, error: "You must be signed in." };
  }

  const payload: {
    id: string;
    full_name: string | null;
    phone: string | null;
    avatar_url?: string | null;
    avatar_path?: string | null;
  } = {
    id: user.id,
    full_name: parsed.data.fullName.trim() || null,
    phone: parsed.data.phone?.trim() || null,
  };

  if (parsed.data.avatarUrl !== undefined) {
    payload.avatar_url = parsed.data.avatarUrl || null;
  }
  if (parsed.data.avatarPath !== undefined) {
    payload.avatar_path = parsed.data.avatarPath || null;
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) {
    console.error("Supabase profile save error:", error);
    return { success: false, error: "Unable to save your profile right now." };
  }

  revalidatePath("/protected/profile");
  revalidatePath("/protected", "layout");
  return { success: true };
}

function createAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) {
    throw new Error(
      "Account deletion is not configured. Add SUPABASE_SECRET_KEY to the server environment."
    );
  }
  return createSupabaseClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}

export async function deleteAccountAction() {
  const { user } = await getAuthUser();
  if (!user) return { success: false, error: "You must be signed in." };

  try {
    const admin = createAdminClient();
    const { data: objects, error: listError } = await admin.storage
      .from("avatars")
      .list(user.id, { limit: 1000 });
    if (listError) {
      console.error("Error listing avatars for deletion:", listError);
      return { success: false, error: "Unable to prepare your account for deletion." };
    }

    if (objects?.length) {
      const { error: removeError } = await admin.storage
        .from("avatars")
        .remove(objects.map((object) => user.id + "/" + object.name));
      if (removeError) {
        console.error("Error removing avatar files:", removeError);
        return { success: false, error: "Unable to remove your profile image." };
      }
    }

    const { error } = await admin.auth.admin.deleteUser(user.id);
    if (error) {
      console.error("Error deleting auth user:", error);
      return { success: false, error: "Unable to delete your account right now." };
    }
    return { success: true };
  } catch (error) {
    console.error("Account deletion failed:", error);
    return { success: false, error: "Unable to delete your account right now." };
  }
}
