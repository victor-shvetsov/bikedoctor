import Link from "next/link"
import { Bike, Settings, CalendarCheck, Wrench } from "lucide-react"

const STEPS = [
  {
    icon: Bike,
    number: "1",
    title: "V\u00e6lg cykel",
    description: "Fort\u00e6l os hvilken type cykel der skal repareres.",
  },
  {
    icon: Settings,
    number: "2",
    title: "V\u00e6lg serviceplan",
    description: "V\u00e6lg de ydelser du har brug for, eller v\u00e6lg en Serviceaftale.",
  },
  {
    icon: CalendarCheck,
    number: "3",
    title: "V\u00e6lg tid",
    description: "Book et tidspunkt der passer dig \u2014 vi er fleksible.",
  },
  {
    icon: Wrench,
    number: "4",
    title: "Vi kommer og fikser",
    description: "Vores cykelsmed kommer til dig med alt professionelt v\u00e6rkt\u00f8j.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"S\u00e5dan fungerer det"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"F\u00e5 din cykel repareret i 4 enkle trin"}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              {/* Step number badge */}
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
                <span className="text-xl font-bold text-accent">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/#book"
            className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
          >
            {"Book nu \u2014 det tager kun 2 minutter"}
          </Link>
        </div>
      </div>
    </section>
  )
}
