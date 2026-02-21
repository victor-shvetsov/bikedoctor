import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

// ---------------------------------------------------------------------------
// Hero Section -- matches Figma: full-bleed photo, navy gradient overlay
// (heavier left), text LEFT-aligned, coral pill CTA, Trustpilot badge.
// USP cards overlap the bottom edge via negative margin on the next section.
// ---------------------------------------------------------------------------

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
}

export function HeroSection({ h1, subheadline, ctaText }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-primary lg:min-h-[680px]">
      {/* Background image -- replace src with real hero photo */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay: heavier on the left for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="bd-container relative flex min-h-[600px] flex-col justify-center pb-32 pt-32 lg:min-h-[680px] lg:pb-40 lg:pt-40">
        <div className="max-w-xl">
          <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
            {h1}
          </h1>

          {subheadline && (
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              {subheadline}
            </p>
          )}

          {/* CTA */}
          <div className="mt-8">
            <Link href="/#book" className="bd-cta text-lg">
              {ctaText}
              <Clock className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trustpilot badge -- bottom right */}
      <div className="absolute bottom-8 right-6 z-10 flex flex-col items-center rounded-xl bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:right-10 lg:bottom-12 lg:right-16">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-foreground">4.3</span>
          <svg viewBox="0 0 24 24" className="size-5 fill-trustpilot" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span className="mt-0.5 text-xs font-semibold tracking-wide text-foreground">
          Trustpilot
        </span>
      </div>
    </section>
  )
}
