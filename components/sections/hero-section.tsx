import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronDown, Shield, Zap, Truck } from "lucide-react"

// ---------------------------------------------------------------------------
// Hero Section -- centered layout
// H1, paragraph, 2 CTAs (primary Book + secondary scroll), USP labels below.
// Full-bleed photo bg with navy gradient overlay.
// ---------------------------------------------------------------------------

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
}

const USP_LABELS = [
  { icon: Truck, text: "Vi kommer til dig" },
  { icon: Zap, text: "Reparation samme dag" },
  { icon: Shield, text: "Garanti pa alt arbejde" },
]

export function HeroSection({ h1, subheadline, ctaText }: HeroSectionProps) {
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
            Se hvordan det virker
            <ChevronDown className="size-4" />
          </a>
        </div>

        {/* USP labels */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {USP_LABELS.map((usp) => (
            <div
              key={usp.text}
              className="flex items-center gap-2 text-sm text-primary-foreground/70"
            >
              <usp.icon className="size-4 text-accent" strokeWidth={2} />
              <span>{usp.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
