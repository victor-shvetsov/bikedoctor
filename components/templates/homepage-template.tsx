// =============================================================================
// Homepage Template (Block 1.1)
// =============================================================================
// Full conversion landing page. Renders all MVP sections using page_content
// data from Supabase + live DB queries for services and bike types.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustBar } from "@/components/sections/trust-bar"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ServicesGrid } from "@/components/sections/services-grid"
import { BikeTypesGrid } from "@/components/sections/bike-types-grid"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { CrossLinks } from "@/components/templates/cross-links"

export function HomepageTemplate({ page, crossLinks }: TemplateProps) {
  return (
    <>
      {/* 1. Hero -- h1, subheadline, CTA, trust pills */}
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
      />

      {/* 2. Trust bar -- instant credibility */}
      <TrustBar />

      {/* 3. How it works -- 3-step visual */}
      <HowItWorks />

      {/* 4. Services grid -- prices from DB */}
      <ServicesGrid />

      {/* 5. Bike types grid -- from DB */}
      <BikeTypesGrid />

      {/* 6. FAQ accordion -- from page_content.faqs */}
      <FaqSection faqs={page.faqs} />

      {/* 7. CTA banner -- final conversion push */}
      <CtaBanner
        heading="Klar til at f\u00e5 din cykel repareret?"
        ctaText={page.cta_text}
        subtext="Book p\u00e5 2 minutter -- vi kommer til dig."
      />

      {/* 8. Cross-links */}
      <CrossLinks links={crossLinks} />
    </>
  )
}
