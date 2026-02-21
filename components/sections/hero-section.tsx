import Link from "next/link"
import { MapPin, Clock, ShieldCheck, ChevronDown } from "lucide-react"

interface HeroSectionProps {
  h1: string
  subheadline?: string | null
  ctaText: string
  /** Optional badge text above the heading */
  badge?: string
}

const USP_HIGHLIGHTS = [
  { icon: MapPin, text: "Vi kommer til dig" },
  { icon: Clock, text: "Fleksible tider" },
  { icon: ShieldCheck, text: "Garanti p\u00e5 alt arbejde" },
]

export function HeroSection({
  h1,
  subheadline,
  ctaText,
  badge,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image placeholder -- sits behind content with overlay */}
      <div className="absolute inset-0 bg-primary/90" aria-hidden="true">
        {/* Replace this div with <Image> when real hero photo is available:
            className="absolute inset-0 object-cover opacity-20" */}
      </div>

      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-accent/[0.06] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pb-28 sm:pt-36 lg:pb-32 lg:pt-40">
        {badge && (
          <span className="mb-5 inline-flex items-center rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
            {badge}
          </span>
        )}

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          {h1}
        </h1>

        {subheadline && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/75 sm:text-xl">
            {subheadline}
          </p>
        )}

        {/* 3 USP highlights */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          {USP_HIGHLIGHTS.map((usp) => (
            <div key={usp.text} className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent/20">
                <usp.icon className="size-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-primary-foreground/80">
                {usp.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/#book"
            className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 sm:w-auto"
          >
            {ctaText}
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 sm:w-auto"
          >
            {"Se hvordan det virker"}
            <ChevronDown className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
