import Link from "next/link"
import { MapPin, Clock, Wrench, ShieldCheck } from "lucide-react"

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
  /** Optional badge text above the heading (e.g. "Mobil cykelsmed" or "Specialist") */
  badge?: string
  /** Show secondary "Se priser" CTA. Defaults to true. */
  showPricingLink?: boolean
}

export function HeroSection({
  h1,
  subheadline,
  ctaText,
  badge,
  showPricingLink = true,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Subtle radial glow top-right */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        {badge && (
          <span className="mb-5 inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            {badge}
          </span>
        )}

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          {h1}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/75 sm:text-xl">
            {subheadline}
          </p>
        )}

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#book"
            className="inline-flex items-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
          >
            {ctaText}
          </Link>
          {showPricingLink && (
            <Link
              href="/cykelsmed-priser"
              className="inline-flex items-center rounded-xl border border-primary-foreground/20 px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {"Se ydelser & priser"}
            </Link>
          )}
        </div>

        {/* Trust pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: MapPin, text: "Hele Sj\u00e6lland" },
            { icon: Clock, text: "Fleksible tider" },
            { icon: Wrench, text: "Professionelt v\u00e6rkt\u00f8j" },
            { icon: ShieldCheck, text: "Garanti p\u00e5 alt arbejde" },
          ].map((pill) => (
            <span
              key={pill.text}
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/[0.08] px-4 py-2 text-sm text-primary-foreground/70"
            >
              <pill.icon className="size-4" />
              {pill.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
