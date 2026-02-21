import { Heart, Users, Wrench } from "lucide-react"
import { getSiteConfig } from "@/lib/site-config"

const ICON_MAP: Record<string, typeof Heart> = {
  heart: Heart,
  users: Users,
  wrench: Wrench,
}

export async function AboutSection() {
  const about = await getSiteConfig("about")

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
              {about.badge}
            </span>

            <h2 className="bd-heading mt-4">
              {about.heading}{" "}
              <span className="bd-heading-accent">{about.headingAccent}</span>
            </h2>

            {about.body.map((paragraph, i) => (
              <p key={i} className={`bd-body ${i === 0 ? "mt-5" : "mt-4"}`}>
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-wrap gap-6">
              {about.stats.map((stat) => {
                const Icon = ICON_MAP[stat.icon] || Heart
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="bd-icon !size-10">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
