import Link from "next/link"
import { MapPin } from "lucide-react"

// Major areas we cover -- link to their location pages
const COVERAGE_AREAS = [
  { name: "K\u00f8benhavn", slug: "cykelsmed-koebenhavn" },
  { name: "Frederiksberg", slug: "cykelsmed-frederiksberg" },
  { name: "Amager", slug: "cykelsmed-amager" },
  { name: "N\u00f8rrebro", slug: "cykelsmed-noerrebro" },
  { name: "Vesterbro", slug: "cykelsmed-vesterbro" },
  { name: "\u00d8sterbro", slug: "cykelsmed-oesterbro" },
  { name: "Valby", slug: "cykelsmed-valby" },
  { name: "Hvidovre", slug: "cykelsmed-hvidovre" },
  { name: "Glostrup", slug: "cykelsmed-glostrup" },
  { name: "R\u00f8dovre", slug: "cykelsmed-roedovre" },
  { name: "Br\u00f8ndby", slug: "cykelsmed-broendby" },
  { name: "Taastrup", slug: "cykelsmed-taastrup" },
]

export function CoverageMapSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Map placeholder */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-primary/[0.04]">
              <div className="flex size-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <MapPin className="size-8 text-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {"Kort kommer snart"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location links */}
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {"Vi d\u00e6kker hele Sj\u00e6lland"}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {"Vores cykelsmede k\u00f8rer ud til dig, uanset om du bor i centrum eller i forstaden. Se om vi d\u00e6kker dit omr\u00e5de."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COVERAGE_AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${area.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <MapPin className="size-3.5 shrink-0 text-accent" />
                  {area.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/#book"
                className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90"
              >
                {"Book nu"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
