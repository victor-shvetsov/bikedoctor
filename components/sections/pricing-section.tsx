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
  badge: "Mest populaer",
  price: "149",
  period: "/md",
  description: "En fast pris -- ubegraenset service og reparationer hele aret.",
  features: [
    "Ubegraenset reparationer",
    "Personlig cykelsmed",
    "Arligt sikkerhedstjek",
    "Prioriteret booking",
    "Ingen ekstra gebyrer",
    "Adgang til BikeDoctor app",
  ],
}

export async function PricingSection() {
  const services = await getServices()

  return (
    <section className="bd-section bg-card">
      <div className="bd-container">
        <div className="text-center">
          <h2 className="bd-heading">
            Priser &{" "}
            <span className="bd-heading-accent">serviceaftaler</span>
          </h2>
          <p className="bd-body mx-auto mt-3 max-w-xl">
            Vaelg en Serviceaftale for den bedste pris, eller book
            enkeltreparationer.
          </p>
        </div>

        {/* Highlighted subscription card */}
        <div className="mx-auto mt-14 max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border-2 border-accent bg-background p-8 shadow-lg shadow-accent/10">
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
              <span className="text-base text-muted-foreground">kr.</span>
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

            <Link href="/#book" className="bd-cta mt-8 w-full justify-center">
              Start din Serviceaftale
            </Link>
          </div>
        </div>

        {/* Individual services grid */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold text-foreground">
            Eller book enkeltreparationer
          </h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href="/#book"
                className="group flex items-center justify-between rounded-2xl bg-background p-4 shadow-sm transition-all hover:shadow-md"
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
                <span className="ml-4 shrink-0 text-sm font-bold text-accent">
                  fra {formatDKK(service.price_dkk)}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/cykelsmed-priser"
              className="text-sm font-semibold text-accent underline-offset-4 transition-colors hover:underline"
            >
              Se alle priser
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
