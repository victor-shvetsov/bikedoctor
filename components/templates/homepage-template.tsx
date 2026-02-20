// =============================================================================
// Homepage Template Shell (Block 0.3)
// =============================================================================
// Renders the structural layout for the homepage.
// Individual sections (hero, trust-bar, services-grid, etc.) are built in
// Block 1.1 and plugged in here. For now, this renders the core content
// from page_content: h1, subheadline, CTA, FAQs, cross-links.
// =============================================================================

import Link from "next/link"
import type { TemplateProps } from "@/lib/templates/template-registry"
import { FaqSection } from "@/components/templates/faq-section"
import { CrossLinks } from "@/components/templates/cross-links"
import { CtaBanner } from "@/components/templates/cta-banner"

export function HomepageTemplate({ page, crossLinks }: TemplateProps) {
  return (
    <>
      {/* Hero section shell -- replaced with full hero in Block 1.1 */}
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
            Se ydelser & priser
          </Link>
        </div>
      </section>

      {/* Placeholder sections -- built in Block 1.1 */}
      {/* trust-bar */}
      {/* how-it-works */}
      {/* services-grid */}
      {/* bike-types-grid */}

      {/* FAQ section (renders from page_content.faqs) */}
      <FaqSection faqs={page.faqs} />

      {/* CTA Banner */}
      <CtaBanner
        heading="Klar til at fa din cykel repareret?"
        ctaText={page.cta_text}
        subtext="Book pa 2 minutter -- vi kommer til dig."
      />

      {/* Cross-links */}
      <CrossLinks links={crossLinks} />
    </>
  )
}
