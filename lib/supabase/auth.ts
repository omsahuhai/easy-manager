import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

/**
 * Request-scoped cached auth helper.
 *
 * React's cache() deduplicates calls within a single server-side render.
 * This means multiple queries calling getAuthUser() in the same request
 * will only make ONE call to supabase.auth.getUser() instead of one per query.
 *
 * This eliminates the redundant auth round-trips where the dashboard page
 * calls 3+ queries in parallel, each independently calling getUser().
 */
export const getAuthUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
});
