import Link from "next/link"

interface CtaBannerProps {
  heading: string
  ctaText: string
  subtext?: string
}

export function CtaBanner({ heading, ctaText, subtext }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div className="bd-container relative flex flex-col items-center text-center">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-primary-foreground sm:text-4xl">
          {heading}
        </h2>
        {subtext && (
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-primary-foreground/75">
            {subtext}
          </p>
        )}
        <Link href="/#book" className="bd-cta mt-8 text-lg">
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
