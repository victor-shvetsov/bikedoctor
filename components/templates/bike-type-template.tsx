// =============================================================================
// Bike Type Template Shell (Block 0.3)
// =============================================================================
// Renders bike-type pages (e.g. /elcykel-reparation).
// Service-detail, brand-info, price-table sections built in Block 1.2.
// =============================================================================

import Link from "next/link"
import type { TemplateProps } from "@/lib/templates/template-registry"
import { FaqSection } from "@/components/sections/faq-section"
import { CrossLinks } from "@/components/templates/cross-links"
import { CtaBanner } from "@/components/sections/cta-banner"

export function BikeTypeTemplate({ page, crossLinks }: TemplateProps) {
  return (
    <>
      {/* Hero section shell */}
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Specialist
        </div>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {page.h1}
        </h1>
        {page.subheadline && (
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {page.subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#book"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {page.cta_text}
          </Link>
          <Link
            href="/cykelsmed-priser"
            className="inline-flex items-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Se priser
          </Link>
        </div>
      </section>

      {/* Placeholder sections -- built in Block 1.2 */}
      {/* trust-bar (bike-type specific) */}
      {/* service-detail */}
      {/* price-table */}

      {/* FAQ section */}
      <FaqSection faqs={page.faqs} />

      {/* CTA Banner */}
      <CtaBanner
        heading="Problemer med din cykel?"
        ctaText={page.cta_text}
        subtext="Vi er specialister -- book nu."
      />

      {/* Cross-links */}
      <CrossLinks links={crossLinks} />
    </>
  )
}
