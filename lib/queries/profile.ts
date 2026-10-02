import { cache } from "react";
import { getAuthUser } from "@/lib/supabase/auth";

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  avatar_path: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export const getCurrentUserProfile = cache(async (): Promise<UserProfile | null> => {
  const { supabase, user } = await getAuthUser();
  if (!user) return null;
  const { data, error } = await supabase.from("profiles").select("id, full_name, avatar_url, avatar_path, phone, created_at, updated_at").eq("id", user.id).maybeSingle();
  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }
  return data as UserProfile | null;
});
