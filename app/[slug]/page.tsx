// =============================================================================
// Dynamic [slug] Route (Block 0.3)
// =============================================================================
// The ENGINE that powers all 58+ public pages.
// 1. Fetches page_content from Supabase by slug
// 2. Resolves the correct template via template-registry
// 3. Generates metadata (title, description, OG) from DB
// 4. Renders JSON-LD structured data
// 5. Pre-generates all published slugs at build time
// =============================================================================

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { createStaticClient } from "@/lib/supabase/static"
import { resolveTemplate } from "@/lib/templates/template-registry"
import { generateJsonLd } from "@/lib/schemas/json-ld"
import type { PageContent } from "@/lib/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getPageContent(slug: string): Promise<PageContent | null> {
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

async function getCrossLinks(
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
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageContent(slug)

  if (!page) {
    return { title: "Side ikke fundet | BikeDoctor" }
  }

  const pageUrl = `${SITE_URL}/${page.slug}`

  return {
    title: page.meta_title,
    description: page.meta_description,
    alternates: {
      canonical: page.canonical_url ?? pageUrl,
    },
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url: pageUrl,
      siteName: "BikeDoctor",
      locale: "da_DK",
      type: "website",
      ...(page.og_image_url ? { images: [{ url: page.og_image_url }] } : {}),
    },
  }
}

// ---------------------------------------------------------------------------
// Static params (ISR: pre-generate all published slugs)
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("page_content")
    .select("slug")
    .eq("status", "published")
    .neq("slug", "/") // Homepage has its own route at app/page.tsx

  if (!data) return []

  return data.map((row) => ({
    slug: row.slug,
  }))
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageContent(slug)

  if (!page) {
    notFound()
  }

  // Resolve template and fetch cross-links in parallel
  const Template = resolveTemplate(page.template_type)
  const crossLinks = await getCrossLinks(page.cross_link_slugs)

  // Generate JSON-LD schemas
  const schemas = generateJsonLd(page)

  return (
    <>
      {/* JSON-LD structured data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Template renderer */}
      <main>
        <Template page={page} crossLinks={crossLinks} />
      </main>
    </>
  )
}
