import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Supabase client for build-time / static-generation contexts where
 * cookies() is NOT available (e.g. generateStaticParams, sitemap.ts).
 *
 * Uses the public anon key — only reads from tables with RLS SELECT enabled.
 * Do NOT use this for anything that requires user auth context.
 */
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // During static build env vars may not be available.
    // Return null -- callers must handle this gracefully.
    return null
  }

  return createSupabaseClient(url, key)
}
