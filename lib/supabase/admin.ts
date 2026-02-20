import "server-only"

import { createClient } from "@supabase/supabase-js"

/**
 * Supabase admin client using the service_role key.
 * Bypasses RLS -- use only in server-side code (webhooks, admin actions, cron).
 * NEVER expose this client or the service_role key to the browser.
 *
 * Unlike the per-request createClient() in server.ts, this does NOT
 * use cookies and is safe to call from webhooks and background jobs.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
