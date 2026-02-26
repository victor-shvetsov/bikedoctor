import { createClient } from "@supabase/supabase-js"
import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During static build, env vars may not be available -- return a minimal sitemap
  if (!supabaseUrl || !supabaseKey) {
    return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 }]
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: pages } = await supabase
    .from("page_content")
    .select("slug, updated_at, template_type")
    .eq("status", "published")
    .order("sort_order")

  if (!pages) return []

  return pages.map((page) => {
    const url = page.slug === "/"
      ? SITE_URL
      : `${SITE_URL}/${page.slug}`

    // Higher priority for homepage and pricing, medium for locations/services
    let priority = 0.7
    if (page.slug === "/") priority = 1.0
    else if (page.template_type === "pricing") priority = 0.9
    else if (["location", "bike-type", "brand"].includes(page.template_type)) priority = 0.8

    // Location/service pages change weekly (prices, content), blogs monthly
    let changeFrequency: "daily" | "weekly" | "monthly" = "weekly"
    if (page.slug === "/") changeFrequency = "daily"
    else if (page.template_type === "blog") changeFrequency = "monthly"
    else if (page.template_type === "info") changeFrequency = "monthly"

    return {
      url,
      lastModified: page.updated_at,
      changeFrequency,
      priority,
    }
  })
}
