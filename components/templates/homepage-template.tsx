// =============================================================================
// Homepage Template -- Updated Layout (see BRAND.md "Homepage Layout")
// =============================================================================
// 11-section conversion landing page:
// 1. Hero  2. Testimonials  3. Video  4. How It Works (Steps)  5. Pricing
// 6. About  7. App Preview  8. FAQ  9. Coverage Map  10. Final CTA  11. Footer (in layout)
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { HeroSection } from "@/components/sections/hero-section"
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel"
import { VideoSection } from "@/components/sections/video-section"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PricingSection } from "@/components/sections/pricing-section"
import { AboutSection } from "@/components/sections/about-section"
import { AppPreviewSection } from "@/components/sections/app-preview-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CoverageMapSection } from "@/components/sections/coverage-map-section"
import { CtaBanner } from "@/components/sections/cta-banner"

export function HomepageTemplate({ page }: TemplateProps) {
  return (
    <>
      {/* 1. Hero -- headline, paragraph, 3 USP highlights, primary + secondary CTA */}
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
      />

      {/* 2. Testimonials -- auto-scrolling carousel with Trustpilot stars */}
      <TestimonialsCarousel />

      {/* 3. How It Works (Video) -- video placeholder with intro text */}
      <VideoSection />

      {/* 4. How It Works (Steps) -- 4-step grid */}
      <HowItWorks />

      {/* 5. Pricing -- highlighted subscription card + service grid from DB */}
      <PricingSection />

      {/* 6. About -- founder story + trust stats */}
      <AboutSection />

      {/* 7. App Preview -- dashboard mockup showing subscription value */}
      <AppPreviewSection />

      {/* 8. FAQ -- accordion from page_content.faqs */}
      <FaqSection faqs={page.faqs} />

      {/* 9. Coverage Map -- map placeholder + location links */}
      <CoverageMapSection />

      {/* 10. Large Final CTA -- emotional headline + strong CTA */}
      <CtaBanner
        heading="Klar til at f\u00e5 din cykel fikset?"
        ctaText={page.cta_text}
        subtext="Book p\u00e5 2 minutter \u2014 vi kommer til dig."
      />

      {/* 11. Footer is rendered in layout.tsx */}
    </>
  )
}
