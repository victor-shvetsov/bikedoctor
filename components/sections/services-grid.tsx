import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { formatDKK } from "@/lib/i18n"
import type { ServiceCatalogItem } from "@/lib/types"
import { Wrench, Settings, Shield } from "lucide-react"

const CATEGORY_META: Record<
  string,
  { label: string; icon: typeof Wrench }
> = {
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

  // Group by category
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
    <section className="bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vores ydelser
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Professionel service til alle typer cykler
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {categoryOrder.map((cat) => {
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            const meta = CATEGORY_META[cat] ?? {
              label: cat,
              icon: Wrench,
            }
            const Icon = meta.icon

            return (
              <div key={cat}>
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="size-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {meta.label}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service) => (
                    <Link
                      key={service.id}
                      href={`/#book`}
                      className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40 hover:bg-card"
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
                      <span className="ml-3 shrink-0 text-sm font-bold text-accent">
                        {formatDKK(service.price_dkk)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/cykelsmed-priser"
            className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            Se alle priser
          </Link>
        </div>
      </div>
    </section>
  )
}
