// =============================================================================
// Bike Type Template (Block 0.3 shell, upgraded Block 1.1 design)
// =============================================================================
// Renders bike-type pages (e.g. /elcykel-reparation).
// Uses HeroSection with "Specialist" badge, TrustBar, HowItWorks.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { CrossLinks } from "@/components/templates/cross-links"

export function BikeTypeTemplate({ page, crossLinks, locale }: TemplateProps) {
  return (
    <>
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
        badge="Specialist"
        locale={locale}
      />

      <TrustBar locale={locale} />

      <HowItWorks locale={locale} />

      {/* Placeholder sections -- detailed in Block 1.2 */}
      {/* service-detail */}
      {/* price-table */}

      <FaqSection faqs={page.faqs} />

      <CtaBanner
        heading="Problemer med din cykel?"
        ctaText={page.cta_text}
        subtext="Vi er specialister \u2014 book nu."
      />

      <CrossLinks links={crossLinks} />
    </>
  )
}
