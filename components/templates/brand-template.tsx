// =============================================================================
// Brand Template Shell (Block 0.3)
// =============================================================================
// Renders brand pages (e.g. /babboe-service).
// Service-detail, price-table sections built in Block 1.2.
// =============================================================================

import Link from "next/link"
import type { TemplateProps } from "@/lib/templates/template-registry"
import { FaqSection } from "@/components/templates/faq-section"
import { CrossLinks } from "@/components/templates/cross-links"
import { CtaBanner } from "@/components/templates/cta-banner"

export function BrandTemplate({ page, crossLinks }: TemplateProps) {
  // Extract brand name from h1 (e.g. "Babboe Service & Reparation" -> "Babboe")
  const brandName =
    page.h1.split(/\s+(?:service|reparation|-)/i)[0]?.trim() ?? page.h1

  return (
    <>
      {/* Hero section shell */}
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Autoriseret service
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
      {/* trust-bar (brand-specific) */}
      {/* service-detail (brand expertise) */}
      {/* price-table */}

      {/* FAQ section */}
      <FaqSection faqs={page.faqs} />

      {/* CTA Banner */}
      <CtaBanner
        heading={`Expert ${brandName} service -- book nu`}
        ctaText={page.cta_text}
      />

      {/* Cross-links */}
      <CrossLinks links={crossLinks} />
    </>
  )
}
