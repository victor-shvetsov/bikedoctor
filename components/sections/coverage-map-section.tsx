import Link from "next/link"
import { MapPin } from "lucide-react"

const COVERAGE_AREAS = [
  { name: "Kobenhavn", slug: "cykelsmed-koebenhavn" },
  { name: "Frederiksberg", slug: "cykelsmed-frederiksberg" },
  { name: "Amager", slug: "cykelsmed-amager" },
  { name: "Norrebro", slug: "cykelsmed-noerrebro" },
  { name: "Vesterbro", slug: "cykelsmed-vesterbro" },
  { name: "Osterbro", slug: "cykelsmed-oesterbro" },
  { name: "Valby", slug: "cykelsmed-valby" },
  { name: "Hvidovre", slug: "cykelsmed-hvidovre" },
  { name: "Glostrup", slug: "cykelsmed-glostrup" },
  { name: "Rodovre", slug: "cykelsmed-roedovre" },
  { name: "Brondby", slug: "cykelsmed-broendby" },
  { name: "Taastrup", slug: "cykelsmed-taastrup" },
]

export function CoverageMapSection() {
  return (
    <section className="bd-section bg-secondary">
      <div className="bd-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Map placeholder */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-primary/[0.04]">
              <div className="flex size-full items-center justify-center">
                <div className="text-center">
                  <div className="bd-icon mx-auto">
                    <MapPin className="size-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Kort kommer snart
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location links */}
          <div>
            <h2 className="bd-heading">
              Vi daekker hele{" "}
              <span className="bd-heading-accent">Sjaelland</span>
            </h2>
            <p className="bd-body mt-3">
              Vores cykelsmede korer ud til dig, uanset om du bor i centrum
              eller i forstaden. Se om vi daekker dit omrade.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COVERAGE_AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/${area.slug}`}
                  className="flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <MapPin className="size-3.5 shrink-0 text-accent" />
                  {area.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/#book" className="bd-cta">
                Book nu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
