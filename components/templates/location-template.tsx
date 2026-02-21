// =============================================================================
// Location Template (Block 0.3 shell, upgraded Block 1.1 design)
// =============================================================================
// Renders location pages (e.g. /cykelsmed-koebenhavn).
// Uses the shared HeroSection, TrustBar, HowItWorks for consistency.
// Location-specific CTA copy derived from the page's h1.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { CrossLinks } from "@/components/templates/cross-links"

export function LocationTemplate({ page, crossLinks, locale }: TemplateProps) {
  // Extract location name from h1 (e.g. "Cykelsmed i K\u00f8benhavn -- Vi kommer til dig" -> "K\u00f8benhavn")
  const locationMatch = page.h1.match(/i\s+(.+?)(?:\s*[-\u2013\u2014]|$)/)
  const locationName = locationMatch?.[1]?.trim() ?? ""

  return (
    <>
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
        badge="Mobil cykelsmed"
        locale={locale}
      />

      <TrustBar locale={locale} />

      <HowItWorks locale={locale} />

      {/* Placeholder sections -- detailed in Block 1.2 */}
      {/* services-grid (compact / location-relevant) */}
      {/* nearby-locations */}

      <FaqSection faqs={page.faqs} />

      <CtaBanner
        heading={
          locationName
            ? `Brug for en cykelsmed i ${locationName}?`
            : "Brug for en cykelsmed?"
        }
        ctaText={page.cta_text}
        subtext="Book nu \u2014 vi kan komme i dag."
      />

      <CrossLinks links={crossLinks} />
    </>
  )
}
