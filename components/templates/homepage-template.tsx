// =============================================================================
// Homepage Template -- Section Order from BRAND.md "Homepage Layout"
// =============================================================================
// Sections compose from standalone components in components/sections/.
// Each section uses bd-* utility classes from globals.css for consistent
// spacing, cards, headings, and CTA styling derived from the Figma design.
// =============================================================================

import type { TemplateProps } from "@/lib/templates/template-registry"
import { getSiteConfig } from "@/lib/site-config"
import { HeroSection } from "@/components/sections/hero-section"
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel"
import { VideoSection } from "@/components/sections/video-section"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PricingSection } from "@/components/sections/pricing-section"
import { BikeTypesGrid } from "@/components/sections/bike-types-grid"
import { AboutSection } from "@/components/sections/about-section"
import { AppPreviewSection } from "@/components/sections/app-preview-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CoverageMapSection } from "@/components/sections/coverage-map-section"
import { CtaBanner } from "@/components/sections/cta-banner"

export async function HomepageTemplate({ page, locale }: TemplateProps) {
  const ctaBanner = await getSiteConfig("cta_banner", locale)

  return (
    <>
      {/* 1. Hero -- full-bleed photo, centered text, coral CTA, USP labels */}
      <HeroSection
        h1={page.h1}
        subheadline={page.subheadline}
        ctaText={page.cta_text}
        locale={locale}
      />

      {/* 2. Testimonials -- floating reviews right after hero */}
      <TestimonialsCarousel />

      {/* 3. Bike Types -- two-tone heading, wrench link list, photo */}
      <BikeTypesGrid locale={locale} />

      {/* 4. How It Works (Video) */}
      <VideoSection locale={locale} />

      {/* 5. How It Works (Steps) -- 4-step grid */}
      <HowItWorks locale={locale} />

      {/* 6. Pricing -- subscription card + service grid */}
      <PricingSection locale={locale} />

      {/* 7. About -- founder story */}
      <AboutSection locale={locale} />

      {/* 8. App Preview -- dashboard mockup */}
      <AppPreviewSection />

      {/* 9. FAQ */}
      <FaqSection faqs={page.faqs} />

      {/* 10. Coverage Map */}
      <CoverageMapSection />

      {/* 11. Final CTA */}
      <CtaBanner
        heading={ctaBanner.heading}
        ctaText={ctaBanner.ctaText}
        subtext={ctaBanner.subtext}
      />
    </>
  )
}
