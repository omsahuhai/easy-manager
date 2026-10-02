"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getAuthUser } from "@/lib/supabase/auth";

const profileSchema = z.object({
  fullName: z.string().trim().max(100),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  avatarUrl: z.string().url().nullable().optional(),
  avatarPath: z.string().max(300).nullable().optional(),
});

export async function updateProfileAction(input: {
  fullName: string; phone: string;
  avatarUrl?: string | null; avatarPath?: string | null;
}) {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid profile details." };

  const { supabase, user } = await getAuthUser();
  if (!user) return { success: false, error: "You must be signed in." };

  const { error } = await supabase.from("profiles").update({
    full_name: parsed.data.fullName || null,
    phone: parsed.data.phone || null,
    ...(parsed.data.avatarUrl !== undefined ? { avatar_url: parsed.data.avatarUrl } : {}),
    ...(parsed.data.avatarPath !== undefined ? { avatar_path: parsed.data.avatarPath } : {}),
  }).eq("id", user.id);

  if (error) return { success: false, error: "Unable to save your profile right now." };
  revalidatePath("/protected/profile");
  revalidatePath("/protected", "layout");
  return { success: true };
}

function createAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) throw new Error("Account deletion is not configured. Add SUPABASE_SECRET_KEY to the server environment.");
  return createSupabaseClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
}

export async function deleteAccountAction() {
  const { user } = await getAuthUser();
  if (!user) return { success: false, error: "You must be signed in." };

  try {
    const admin = createAdminClient();
    const { data: objects, error: listError } = await admin.storage.from("avatars").list(user.id, { limit: 1000 });
    if (listError) return { success: false, error: "Unable to prepare your account for deletion." };

    if (objects?.length) {
      const { error } = await admin.storage.from("avatars").remove(objects.map((object) => user.id + "/" + object.name));
      if (error) return { success: false, error: "Unable to remove your profile image." };
    }

    const { error } = await admin.auth.admin.deleteUser(user.id);
    if (error) return { success: false, error: "Unable to delete your account right now." };
    return { success: true };
  } catch (error) {
    console.error("Account deletion failed:", error);
    return { success: false, error: "Unable to delete your account right now." };
  }
}
