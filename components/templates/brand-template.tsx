// =============================================================================
// Brand Template (Block 0.3 shell, upgraded Block 1.1 design)
// =============================================================================
// Renders brand pages (e.g. /babboe-service).
// Uses HeroSection with "Autoriseret service" badge, TrustBar, HowItWorks.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { CrossLinks } from "@/components/templates/cross-links"

export function BrandTemplate({ page, crossLinks }: TemplateProps) {
  // Extract brand name from h1 (e.g. "Babboe Service & Reparation" -> "Babboe")
  const brandName =
    page.h1.split(/\s+(?:service|reparation|-)/i)[0]?.trim() ?? page.h1

  return (
    <>
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
        badge="Autoriseret service"
      />

      <TrustBar />

      <HowItWorks />

      {/* Placeholder sections -- detailed in Block 1.2 */}
      {/* service-detail (brand expertise) */}
      {/* price-table */}

      <FaqSection faqs={page.faqs} />

      <CtaBanner
        heading={`Expert ${brandName} service \u2014 book nu`}
        ctaText={page.cta_text}
      />

      <CrossLinks links={crossLinks} />
    </>
  )
}
