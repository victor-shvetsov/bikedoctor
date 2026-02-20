import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { resolveTemplate } from "@/lib/templates/template-registry"
import { generateJsonLd } from "@/lib/schemas/json-ld"
import type { PageContent } from "@/lib/types"

// ---------------------------------------------------------------------------
// Homepage (slug: "/")
// Uses the same template system as [slug] pages.
// Fetches page_content for slug="/", resolves HomepageTemplate, renders
// with generateMetadata + JSON-LD.
// ---------------------------------------------------------------------------

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

async function getHomepageContent(): Promise<PageContent | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("slug", "/")
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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepageContent()

  return {
    title: page?.meta_title ?? "BikeDoctor | Mobil Cykelsmed",
    description: page?.meta_description ?? undefined,
    alternates: {
      canonical: page?.canonical_url ?? SITE_URL,
    },
    openGraph: {
      title: page?.meta_title ?? "BikeDoctor | Mobil Cykelsmed",
      description: page?.meta_description ?? undefined,
      url: SITE_URL,
      siteName: "BikeDoctor",
      locale: "da_DK",
      type: "website",
      ...(page?.og_image_url ? { images: [{ url: page.og_image_url }] } : {}),
    },
  }
}

export default async function HomePage() {
  const page = await getHomepageContent()

  if (!page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Din mobile cykelsmed
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
          Vi kommer til dig
        </p>
      </main>
    )
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
        <Template page={page} crossLinks={crossLinks} />
      </main>
    </>
  )
}
