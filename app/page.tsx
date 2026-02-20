import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

// ---------------------------------------------------------------------------
// Homepage (slug: "/")
// Fetches CMS content from page_content. Block 0.3 will expand this with
// full MVP sections (hero, trust-bar, how-it-works, services-grid, faq, cta).
// ---------------------------------------------------------------------------

async function getHomepageContent() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("page_content")
    .select("h1, subheadline, cta_text, meta_title, meta_description")
    .eq("slug", "/")
    .eq("status", "published")
    .single()
  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomepageContent()
  return {
    title: content?.meta_title ?? "BikeDoctor | Mobil Cykelsmed",
    description: content?.meta_description ?? undefined,
  }
}

export default async function HomePage() {
  const content = await getHomepageContent()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {content?.h1 ?? "Din mobile cykelsmed"}
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
        {content?.subheadline ?? "Vi kommer til dig"}
      </p>
      <p className="mt-8 text-sm text-muted-foreground">
        {"Block 0.3 will replace this stub with full MVP sections."}
      </p>
    </main>
  )
}
