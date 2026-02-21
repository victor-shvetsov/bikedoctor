import { Heart, Users, Wrench } from "lucide-react"

export function AboutSection() {
  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-primary/[0.04]">
              <div className="flex size-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Wrench className="size-8 text-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {"Foto af vores team"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story block */}
          <div>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {"Vores historie"}
            </span>

            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {"Fra \u00e9n cykelsmed til dit personlige v\u00e6rksted p\u00e5 hjul"}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {"BikeDoctor startede med en simpel id\u00e9: Hvad nu hvis cykelsmed-en kom til dig, i stedet for omvendt? Det der begyndte som \u00e9n mand med en kassevogn fuld af v\u00e6rkt\u00f8j, er vokset til et team af professionelle cykelsmede der d\u00e6kker hele Sj\u00e6lland."}
            </p>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {"Vi tror p\u00e5 personlig service. Derfor f\u00e5r du din egen faste cykelsmed, som kender dine cykler og deres historik. Det handler ikke bare om at fikse cykler \u2014 det handler om at du altid f\u00f8ler dig tryg."}
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                  <Heart className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{"2.500+"}</p>
                  <p className="text-xs text-muted-foreground">{"Glade kunder"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                  <Users className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{"5+"}</p>
                  <p className="text-xs text-muted-foreground">{"Cykelsmede"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
                  <Wrench className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{"5.000+"}</p>
                  <p className="text-xs text-muted-foreground">{"Reparationer"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
