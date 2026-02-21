// =============================================================================
// Generic Template (fallback for types without a dedicated template)
// =============================================================================
// Used for pricing, info, service, shop-bikes, shop-parts until their
// dedicated templates are built in later blocks.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { CrossLinks } from "@/components/templates/cross-links"

export function GenericTemplate({ page, crossLinks, locale }: TemplateProps) {
  return (
    <>
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
        showPricingLink={false}
        locale={locale}
      />

      <TrustBar locale={locale} />

      <FaqSection faqs={page.faqs} />

      <CtaBanner heading="Book din cykelreparation" ctaText={page.cta_text} />

      <CrossLinks links={crossLinks} />
    </>
  )
}
