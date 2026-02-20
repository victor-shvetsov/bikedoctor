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
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            S&aring;dan fungerer det
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            F&aring; din cykel repareret i 3 enkle trin
          </p>
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-6 sm:flex-row sm:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-1 flex-col items-center rounded-xl border border-border bg-card p-6 text-center sm:p-8"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-primary">
                <step.icon className="size-6 text-primary-foreground" />
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Trin {step.number}
              </span>
              <h3 className="mt-2 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/#book"
            className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Book nu -- det tager kun 2 minutter
          </Link>
        </div>
      </div>
    </section>
  )
}
