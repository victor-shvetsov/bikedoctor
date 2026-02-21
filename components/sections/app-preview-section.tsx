import { Bike, MessageCircle, CalendarCheck, User, ChevronRight } from "lucide-react"

export function AppPreviewSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {"Din BikeDoctor app"}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Alt om dine cykler \u2014 samlet \u00e9t sted"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"Med en Serviceaftale f\u00e5r du adgang til din personlige dashboard. Se dine cykler, book direkte, og chat med din cykelsmed."}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          {/* Dashboard mockup */}
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-primary px-6 py-4">
              <p className="text-sm font-semibold text-primary-foreground">
                {"BikeDoctor Dashboard"}
              </p>
              <div className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10">
                <User className="size-4 text-primary-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {/* Left: Mechanic card */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {"Din cykelsmed"}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {"M"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">
                      {"Mikkel S."}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"Specialist i el-cykler"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  <MessageCircle className="size-4" />
                  {"Skriv en besked"}
                </button>
              </div>

              {/* Right: Bike list */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {"Dine cykler"}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { name: "Ladcykel", detail: "Sidste service: 14. jan", active: true },
                    { name: "El-cykel", detail: "Ingen aktive sager", active: false },
                  ].map((bike) => (
                    <div
                      key={bike.name}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-background p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/[0.06]">
                          <Bike className="size-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{bike.name}</p>
                          <p className="text-xs text-muted-foreground">{bike.detail}</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <CalendarCheck className="size-4 text-accent" />
                  {"Book ny tid"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
