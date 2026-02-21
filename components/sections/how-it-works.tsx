import { CalendarCheck, MapPin, ThumbsUp } from "lucide-react"
import Link from "next/link"

const STEPS = [
  {
    icon: CalendarCheck,
    number: "1",
    title: "Book online",
    description:
      "V\u00e6lg cykeltype, ydelser og et tidspunkt der passer dig. Det tager kun 2 minutter.",
  },
  {
    icon: MapPin,
    number: "2",
    title: "Vi kommer til dig",
    description:
      "Vores cykelsmed ankommer til din adresse med alt professionelt v\u00e6rkt\u00f8j.",
  },
  {
    icon: ThumbsUp,
    number: "3",
    title: "Fikset og k\u00f8reklar",
    description:
      "Din cykel er repareret p\u00e5 stedet. Betal f\u00f8rst n\u00e5r du er tilfreds.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"S\u00e5dan fungerer det"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"F\u00e5 din cykel repareret i 3 enkle trin"}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Step number badge */}
              <div className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
                <span className="text-xl font-bold text-accent">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
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
