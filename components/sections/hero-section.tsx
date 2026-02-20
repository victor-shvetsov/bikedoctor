import Link from "next/link"
import { MapPin, Clock, Wrench } from "lucide-react"

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
}

export function HeroSection({ h1, subheadline, ctaText }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-20 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          {h1}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            {subheadline}
          </p>
        )}

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#book"
            className="inline-flex items-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {ctaText}
          </Link>
          <Link
            href="/cykelsmed-priser"
            className="inline-flex items-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-7 py-3.5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            Se ydelser & priser
          </Link>
        </div>

        {/* Trust pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <MapPin className="size-4" />
            Hele Sj&aelig;lland
          </span>
          <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <Clock className="size-4" />
            Fleksible tider
          </span>
          <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <Wrench className="size-4" />
            Professionelt v&aelig;rkt&oslash;j
          </span>
        </div>
      </div>
    </section>
  )
}
