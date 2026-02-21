import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { formatDKK } from "@/lib/i18n"
import type { ServiceCatalogItem } from "@/lib/types"
import { Check, Star } from "lucide-react"

async function getServices(): Promise<ServiceCatalogItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("service_catalog")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (data as ServiceCatalogItem[]) ?? []
}

const SUBSCRIPTION_CARD = {
  name: "Serviceaftale",
  badge: "Mest popul\u00e6r",
  price: "149",
  period: "/md",
  description: "\u00c9n fast pris \u2014 ubegr\u00e6nset service og reparationer hele \u00e5ret.",
  features: [
    "Ubegr\u00e6nset reparationer",
    "Personlig cykelsmed",
    "\u00c5rligt sikkerhedstjek",
    "Prioriteret booking",
    "Ingen ekstra gebyrer",
    "Adgang til BikeDoctor app",
  ],
}

export async function PricingSection() {
  const services = await getServices()

  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Priser & serviceaftaler"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"V\u00e6lg en Serviceaftale for den bedste pris, eller book enkeltreparationer."}
          </p>
        </div>

        {/* Highlighted subscription card */}
        <div className="mx-auto mt-14 max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border-2 border-accent bg-background p-8 shadow-lg shadow-accent/10">
            {/* Badge */}
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <Star className="size-3 fill-accent-foreground" />
              {SUBSCRIPTION_CARD.badge}
            </span>

            <h3 className="text-xl font-bold text-foreground">
              {SUBSCRIPTION_CARD.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {SUBSCRIPTION_CARD.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {SUBSCRIPTION_CARD.price}
              </span>
              <span className="text-base text-muted-foreground">
                {"kr."}
              </span>
              <span className="text-base text-muted-foreground">
                {SUBSCRIPTION_CARD.period}
              </span>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {SUBSCRIPTION_CARD.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="size-3 text-accent" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/#book"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
            >
              {"Start din Serviceaftale"}
            </Link>
          </div>
        </div>

        {/* Individual services grid */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold text-foreground">
            {"Eller book enkeltreparationer"}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
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
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/cykelsmed-priser"
              className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
            >
              {"Se alle priser"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
