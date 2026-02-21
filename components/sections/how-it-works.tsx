import Link from "next/link"
import { Bike, Settings, CalendarCheck, Wrench } from "lucide-react"

const STEPS = [
  {
    icon: Bike,
    number: "1",
    title: "Vaelg cykel",
    description: "Fortael os hvilken type cykel der skal repareres.",
  },
  {
    icon: Settings,
    number: "2",
    title: "Vaelg serviceplan",
    description: "Vaelg de ydelser du har brug for, eller vaelg en Serviceaftale.",
  },
  {
    icon: CalendarCheck,
    number: "3",
    title: "Vaelg tid",
    description: "Book et tidspunkt der passer dig -- vi er fleksible.",
  },
  {
    icon: Wrench,
    number: "4",
    title: "Vi kommer og fikser",
    description: "Vores cykelsmed kommer til dig med alt professionelt vaerktoj.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bd-section bg-background">
      <div className="bd-container">
        <div className="text-center">
          <h2 className="bd-heading">
            Sadan <span className="bd-heading-accent">fungerer det</span>
          </h2>
          <p className="bd-body mx-auto mt-3 max-w-xl">
            Fa din cykel repareret i 4 enkle trin
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bd-card group flex flex-col items-center text-center transition-shadow hover:shadow-md"
            >
              <div className="bd-icon">
                <span className="text-xl font-bold">
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
            Book nu -- det tager kun 2 minutter
          </Link>
        </div>
      </div>
    </section>
  )
}
