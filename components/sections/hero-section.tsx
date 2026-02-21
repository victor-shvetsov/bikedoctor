import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronDown, Shield, Zap, Truck } from "lucide-react"
import { getSiteConfig } from "@/lib/site-config"

// ---------------------------------------------------------------------------
// Hero Section -- centered layout
// Content driven by: h1/subheadline/ctaText from page_content (props),
// USP labels + secondary CTA text from site_config (DB).
// ---------------------------------------------------------------------------

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
}

const ICON_MAP: Record<string, typeof Truck> = {
  truck: Truck,
  zap: Zap,
  shield: Shield,
}

export async function HeroSection({ h1, subheadline, ctaText }: HeroSectionProps) {
  const [usps, secondaryCta] = await Promise.all([
    getSiteConfig("hero_usps"),
    getSiteConfig("hero_secondary_cta"),
  ])

  return (
    <section className="relative min-h-[600px] overflow-hidden bg-primary lg:min-h-[680px]">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/90"
        aria-hidden="true"
      />

      {/* Content -- centered */}
      <div className="bd-container relative flex min-h-[600px] flex-col items-center justify-center text-center lg:min-h-[680px]">
        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-primary-foreground sm:text-5xl lg:text-[3.5rem]">
          {h1}
        </h1>

        {subheadline && (
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {subheadline}
          </p>
        )}

        {/* Two CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/#book" className="bd-cta text-lg">
            {ctaText}
            <Clock className="size-5" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
          >
            {secondaryCta}
            <ChevronDown className="size-4" />
          </a>
        </div>

        {/* USP labels */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {usps.map((usp) => {
            const Icon = ICON_MAP[usp.icon] || Shield
            return (
              <div
                key={usp.text}
                className="flex items-center gap-2 text-sm text-primary-foreground/70"
              >
                <Icon className="size-4 text-accent" strokeWidth={2} />
                <span>{usp.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
