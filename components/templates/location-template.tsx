// =============================================================================
// Location Template Shell (Block 0.3)
// =============================================================================
// Renders location pages (e.g. /cykelsmed-koebenhavn).
// Sections like services-grid, how-it-works, coverage-map are built in
// Block 1.2. For now: h1, subheadline, CTA, FAQs, cross-links.
// =============================================================================

import Link from "next/link"
import type { TemplateProps } from "@/lib/templates/template-registry"
import { FaqSection } from "@/components/templates/faq-section"
import { CrossLinks } from "@/components/templates/cross-links"
import { CtaBanner } from "@/components/templates/cta-banner"

export function LocationTemplate({ page, crossLinks }: TemplateProps) {
  // Extract location name from h1 (e.g. "Cykelsmed i København -- Vi kommer til dig" -> "København")
  const locationMatch = page.h1.match(/i\s+(.+?)(?:\s*[-–—]|$)/)
  const locationName = locationMatch?.[1]?.trim() ?? ""

  return (
    <>
      {/* Hero section shell */}
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Mobil cykelsmed
        </div>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {page.h1}
        </h1>
        {page.subheadline && (
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {page.subheadline}
          </p>
        )}
        <Link
          href="/#book"
          className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {page.cta_text}
        </Link>
      </section>

      {/* Placeholder sections -- built in Block 1.2 */}
      {/* trust-bar (localized) */}
      {/* services-grid (compact) */}
      {/* how-it-works (localized) */}
      {/* nearby-locations */}

      {/* FAQ section */}
      <FaqSection faqs={page.faqs} />

      {/* CTA Banner */}
      <CtaBanner
        heading={
          locationName
            ? `Brug for en cykelsmed i ${locationName}?`
            : "Brug for en cykelsmed?"
        }
        ctaText={page.cta_text}
        subtext="Book nu -- vi kan komme i dag."
      />

      {/* Cross-links */}
      <CrossLinks links={crossLinks} />
    </>
  )
}
