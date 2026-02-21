import { Star, Bike, Clock, ShieldCheck } from "lucide-react"
import { getSiteConfig } from "@/lib/site-config"
import type { CustomerLocale } from "@/lib/types"

const ICON_MAP: Record<string, typeof Star> = {
  star: Star,
  bike: Bike,
  clock: Clock,
  "shield-check": ShieldCheck,
}

export async function TrustBar({ locale = "da" }: { locale?: CustomerLocale } = {}) {
  const stats = await getSiteConfig("trust_stats", locale)

  return (
    <section className="bg-card py-5 shadow-sm">
      <div className="bd-container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((item) => {
            const Icon = ICON_MAP[item.icon] || Star
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="bd-icon !size-10">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
