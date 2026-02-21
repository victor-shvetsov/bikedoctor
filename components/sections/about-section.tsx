import { Heart, Users, Wrench } from "lucide-react"

export function AboutSection() {
  return (
    <section className="bd-section bg-card">
      <div className="bd-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-primary/[0.04]">
              <div className="flex size-full items-center justify-center">
                <div className="text-center">
                  <div className="bd-icon mx-auto">
                    <Wrench className="size-6" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Foto af vores team
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story block */}
          <div>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Vores historie
            </span>

            <h2 className="bd-heading mt-4">
              Fra en cykelsmed til dit{" "}
              <span className="bd-heading-accent">personlige vaerksted pa hjul</span>
            </h2>

            <p className="bd-body mt-5">
              BikeDoctor startede med en simpel ide: Hvad nu hvis cykelsmeden
              kom til dig, i stedet for omvendt? Det der begyndte som en mand
              med en kassevogn fuld af vaerktoj, er vokset til et team af
              professionelle cykelsmede der daekker hele Sjaelland.
            </p>

            <p className="bd-body mt-4">
              Vi tror pa personlig service. Derfor far du din egen faste
              cykelsmed, som kender dine cykler og deres historik. Det handler
              ikke bare om at fikse cykler -- det handler om at du altid foler
              dig tryg.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { icon: Heart, value: "2.500+", label: "Glade kunder" },
                { icon: Users, value: "5+", label: "Cykelsmede" },
                { icon: Wrench, value: "5.000+", label: "Reparationer" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="bd-icon !size-10">
                    <stat.icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
