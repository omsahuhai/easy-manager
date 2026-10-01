import { cache } from "react";
import { getAuthUser } from "@/lib/supabase/auth";
import { Business } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Fetches all businesses owned by the current authenticated user.
 * Wrapped in React.cache() to deduplicate calls within a single request.
 */
export const getBusinessesForUser = cache(async (): Promise<Business[]> => {
  const { supabase, user } = await getAuthUser();

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
});

/**
 * Fetches a single business by ID for the current authenticated user.
 * Returns null if not found or if the user is not authorized.
 * Wrapped in React.cache() to eliminate duplicate queries between layout and page.
 */
export const getBusinessById = cache(async (businessId: string): Promise<Business | null> => {
  const { supabase, user } = await getAuthUser();

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
});

/**
 * Lightweight ownership check for use in Server Actions.
 * Takes an existing Supabase client (to avoid creating a second one)
 * and verifies that the given business_id belongs to the given user.
 * Returns true if the user owns the business, false otherwise.
 */
export async function verifyBusinessOwnership(
  supabase: SupabaseClient,
  businessId: string,
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("businesses")
    .select("id")
    .eq("id", businessId)
    .eq("owner_id", userId)
    .maybeSingle();

  return !error && data !== null;
}
