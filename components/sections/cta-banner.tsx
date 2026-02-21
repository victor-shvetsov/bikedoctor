import Link from "next/link"

interface CtaBannerProps {
  heading: string
  ctaText: string
  subtext?: string
}

export function CtaBanner({ heading, ctaText, subtext }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-[500px] rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-primary-foreground/75">
            {subtext}
          </p>
        )}
        <Link
          href="/#book"
          className="mt-8 inline-flex items-center rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
