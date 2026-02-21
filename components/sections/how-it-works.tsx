import Link from "next/link"
import { Bike, Settings, CalendarCheck, Wrench } from "lucide-react"
import { getSiteConfig } from "@/lib/site-config"

const ICON_MAP: Record<string, typeof Bike> = {
  bike: Bike,
  settings: Settings,
  "calendar-check": CalendarCheck,
  wrench: Wrench,
}

export async function HowItWorks() {
  const [steps, section] = await Promise.all([
    getSiteConfig("how_it_works_steps"),
    getSiteConfig("how_it_works"),
  ])

  return (
    <section id="how-it-works" className="bd-section bg-background">
      <div className="bd-container">
        <div className="text-center">
          <h2 className="bd-heading">
            {section.heading}{" "}
            <span className="bd-heading-accent">{section.headingAccent}</span>
          </h2>
          <p className="bd-body mx-auto mt-3 max-w-xl">
            {section.body}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = ICON_MAP[step.icon] || Wrench
            return (
              <div
                key={step.number}
                className="bd-card group flex flex-col items-center text-center transition-shadow hover:shadow-md"
              >
                <div className="bd-icon">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-foreground sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/#book"
            className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
          >
            {section.ctaText}
          </Link>
        </div>
      </div>
    </section>
  )
}
