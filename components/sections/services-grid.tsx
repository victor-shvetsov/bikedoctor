import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { formatDKK } from "@/lib/i18n"
import type { ServiceCatalogItem } from "@/lib/types"
import { Wrench, Settings, Shield, ArrowRight } from "lucide-react"

const CATEGORY_META: Record<string, { label: string; icon: typeof Wrench }> = {
  repair: { label: "Reparation", icon: Wrench },
  service: { label: "Service", icon: Settings },
  safety: { label: "Sikkerhed", icon: Shield },
}

async function getServices(): Promise<ServiceCatalogItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("service_catalog")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (data as ServiceCatalogItem[]) ?? []
}

export async function ServicesGrid() {
  const services = await getServices()

  const grouped = services.reduce(
    (acc, s) => {
      const cat = s.category || "repair"
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(s)
      return acc
    },
    {} as Record<string, ServiceCatalogItem[]>
  )

  const categoryOrder = ["repair", "service", "safety"]

  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vores ydelser
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Professionel service til alle typer cykler
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {categoryOrder.map((cat) => {
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            const meta = CATEGORY_META[cat] ?? { label: cat, icon: Wrench }
            const Icon = meta.icon

            return (
              <div key={cat}>
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="size-4 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {meta.label}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <Link
                      key={service.id}
                      href="/#book"
                      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background p-4 transition-all hover:border-accent/30 hover:shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {service.name_da}
                        </p>
                        {service.description_da && (
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {service.description_da}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex shrink-0 items-center gap-2">
                        <span className="text-sm font-bold text-accent">
                          {"fra "}
                          {formatDKK(service.price_dkk)}
                        </span>
                        <ArrowRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/cykelsmed-priser"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
          >
            Se alle priser
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
