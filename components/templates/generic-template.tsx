// =============================================================================
// Generic Template (fallback for template types without a dedicated shell)
// =============================================================================
// Used for pricing, info, service, shop-bikes, shop-parts until their
// dedicated templates are built in later blocks.
// =============================================================================

import Link from "next/link"
import type { TemplateProps } from "@/lib/templates/template-registry"
import { FaqSection } from "@/components/templates/faq-section"
import { CrossLinks } from "@/components/templates/cross-links"
import { CtaBanner } from "@/components/templates/cta-banner"

export function GenericTemplate({ page, crossLinks }: TemplateProps) {
  return (
    <>
      <section className="flex flex-col items-center px-4 pb-16 pt-24 text-center">
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

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading="Book din cykelreparation" ctaText={page.cta_text} />

      <CrossLinks links={crossLinks} />
    </>
  )
}
