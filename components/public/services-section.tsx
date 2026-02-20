import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Shield, Settings } from "lucide-react"
import { t, formatDKK } from "@/lib/i18n"
import type { Locale, ServiceCatalogItem } from "@/lib/types"

interface ServicesSectionProps {
  locale: Locale
  services: ServiceCatalogItem[]
}

const CATEGORY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  repair: Wrench,
  service: Settings,
  safety: Shield,
}

const CATEGORY_COLOR: Record<string, string> = {
  repair: "bg-accent/10 text-accent",
  service: "bg-primary/10 text-primary",
  safety: "bg-[#2a7d6d]/10 text-[#2a7d6d]",
}

export function ServicesSection({ locale, services }: ServicesSectionProps) {
  const localeKey = locale === "da" ? "name_da" : "name_en"
  const descKey = locale === "da" ? "description_da" : "description_en"

  return (
    <section id="services" className="px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t(locale, "services.title")}{" "}
            <span className="text-accent">{t(locale, "services.titleAccent")}</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t(locale, "services.subtitle")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = CATEGORY_ICON[service.category] || Wrench
            const colorClass = CATEGORY_COLOR[service.category] || CATEGORY_COLOR.repair

            return (
              <Card
                key={service.id}
                className="group border-border transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {formatDKK(service.price_dkk)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {service[localeKey]}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {service[descKey]}
                    </p>
                  </div>
                  <div className="mt-auto pt-2 text-xs text-muted-foreground">
                    ~{service.duration_minutes} {t(locale, "booking.minutes")}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
