import Link from "next/link"

interface CtaBannerProps {
  heading: string
  ctaText: string
  /** Optional subtext below heading */
  subtext?: string
}

export function CtaBanner({ heading, ctaText, subtext }: CtaBannerProps) {
  return (
    <section className="bg-primary py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 className="text-balance text-2xl font-bold text-primary-foreground sm:text-3xl">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-2 text-pretty text-sm text-primary-foreground/80">
            {subtext}
          </p>
        )}
        <Link
          href="/#book"
          className="mt-6 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
