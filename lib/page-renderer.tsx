// =============================================================================
// Shared Page Renderer (used by both (da) and (en) route groups)
// =============================================================================
// DRY helper that handles:
// 1. Fetching page_content from Supabase
// 2. Generating metadata with hreflang alternates
// 3. Rendering the correct template with locale
// 4. JSON-LD structured data
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { createStaticClient } from "@/lib/supabase/static"
import { resolveTemplate } from "@/lib/templates/template-registry"
import { generateJsonLd } from "@/lib/schemas/json-ld"
import type { PageContent, CustomerLocale } from "@/lib/types"
import { customerLocales, defaultLocale } from "@/lib/i18n"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

export async function getPageContent(
  slug: string
): Promise<PageContent | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error || !data) return null
  return data as PageContent
}

export async function getCrossLinks(
  slugs: string[]
): Promise<Pick<PageContent, "slug" | "h1" | "template_type">[]> {
  if (!slugs || slugs.length === 0) return []

  const supabase = await createClient()
  const { data } = await supabase
    .from("page_content")
    .select("slug, h1, template_type")
    .in("slug", slugs)
    .eq("status", "published")

  return (data as Pick<PageContent, "slug" | "h1" | "template_type">[]) ?? []
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

/** Build the full URL for a page in a given locale */
export function buildPageUrl(slug: string, locale: CustomerLocale): string {
  const base = SITE_URL
  if (slug === "/") {
    return locale === "da" ? base : `${base}/en`
  }
  return locale === "da" ? `${base}/${slug}` : `${base}/en/${slug}`
}

/** Build hreflang alternates for a given slug */
export function buildHreflangAlternates(slug: string) {
  const alternates: Record<string, string> = {}
  for (const locale of customerLocales) {
    alternates[locale] = buildPageUrl(slug, locale)
  }
  // x-default points to Danish (primary market)
  alternates["x-default"] = buildPageUrl(slug, defaultLocale)
  return alternates
}

// ---------------------------------------------------------------------------
// Metadata generator
// ---------------------------------------------------------------------------

export async function buildPageMetadata(
  slug: string,
  locale: CustomerLocale
): Promise<Metadata> {
  const page = await getPageContent(slug)

  if (!page) {
    const notFoundTitle =
      locale === "da"
        ? "Side ikke fundet | BikeDoctor"
        : "Page not found | BikeDoctor"
    return { title: notFoundTitle }
  }

  const pageUrl = buildPageUrl(slug, locale)
  const canonicalUrl = page.canonical_url ?? pageUrl
  const ogLocale = locale === "da" ? "da_DK" : "en_GB"

  return {
    title: page.meta_title,
    description: page.meta_description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangAlternates(slug),
    },
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url: pageUrl,
      siteName: "BikeDoctor",
      locale: ogLocale,
      type: "website",
      ...(page.og_image_url ? { images: [{ url: page.og_image_url }] } : {}),
    },
  }
}

// ---------------------------------------------------------------------------
// Page renderer component
// ---------------------------------------------------------------------------

export async function renderPage(slug: string, locale: CustomerLocale) {
  const page = await getPageContent(slug)

  if (!page) {
    notFound()
  }

  const Template = resolveTemplate(page.template_type)
  const crossLinks = await getCrossLinks(page.cross_link_slugs)
  const schemas = generateJsonLd(page)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main>
        <Template page={page} crossLinks={crossLinks} locale={locale} />
      </main>
    </>
  )
}

// ---------------------------------------------------------------------------
// Static params (shared by both route groups)
// ---------------------------------------------------------------------------

export async function getAllPublishedSlugs() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("page_content")
    .select("slug")
    .eq("status", "published")
    .neq("slug", "/")

  if (!data) return []
  return data.map((row) => ({ slug: row.slug }))
}
