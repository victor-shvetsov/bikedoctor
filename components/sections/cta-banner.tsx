import Link from "next/link"

interface CtaBannerProps {
  heading: string
  ctaText: string
  subtext?: string
}

export function CtaBanner({ heading, ctaText, subtext }: CtaBannerProps) {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-3 text-pretty text-base leading-relaxed text-primary-foreground/80">
            {subtext}
          </p>
        )}
        <Link
          href="/#book"
          className="mt-8 inline-flex items-center rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
