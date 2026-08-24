import { createClient } from "@/lib/supabase/server";
import { Business } from "@/lib/types";

/**
 * Fetches all businesses owned by the current authenticated user.
 */
export async function getBusinessesForUser(): Promise<Business[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("businesses")
    .select("id, owner_id, name, type, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching businesses:", error.message);
    return [];
  }

  return (data as Business[]) || [];
}

/**
 * Fetches a single business by ID for the current authenticated user.
 * Returns null if not found or if the user is not authorized.
 */
export async function getBusinessById(businessId: string): Promise<Business | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("businesses")
    .select("id, owner_id, name, type, created_at")
    .eq("id", businessId)
    .eq("owner_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Business;
}
