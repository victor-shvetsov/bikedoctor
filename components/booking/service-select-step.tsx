"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Plus, Minus } from "lucide-react"
import { t, formatDKK } from "@/lib/i18n"
import type { Locale, ServiceCatalogItem } from "@/lib/types"

interface ServiceSelectStepProps {
  locale: Locale
  services: ServiceCatalogItem[]
  selected: Array<{ service: ServiceCatalogItem; quantity: number }>
  onToggle: (service: ServiceCatalogItem) => void
  onNext: () => void
  onBack: () => void
}

export function ServiceSelectStep({
  locale,
  services,
  selected,
  onToggle,
  onNext,
  onBack,
}: ServiceSelectStepProps) {
  const nameKey = locale === "da" ? "name_da" : "name_en"
  const descKey = locale === "da" ? "description_da" : "description_en"

  const total = selected.reduce(
    (sum, s) => sum + s.service.price_dkk * s.quantity,
    0
  )

  const isSelected = (serviceId: string) =>
    selected.some((s) => s.service.id === serviceId)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">
        {t(locale, "booking.servicesStep")}
      </h3>

      <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto pr-1">
        {services.map((service) => {
          const active = isSelected(service.id)
          return (
            <Card
              key={service.id}
              className={`cursor-pointer border transition-all ${
                active
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              }`}
              onClick={() => onToggle(service)}
            >
              <CardContent className="flex items-center gap-3 p-3">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-card"
                  }`}
                >
                  {active ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {service[nameKey]}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-foreground">
                      {formatDKK(service.price_dkk)}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {service[descKey]} -- ~{service.duration_minutes}{" "}
                    {t(locale, "booking.minutes")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Sticky bottom bar */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <Button variant="outline" onClick={onBack}>
          {t(locale, "booking.back")}
        </Button>
        <div className="flex items-center gap-4">
          {selected.length > 0 && (
            <span className="text-sm font-semibold text-foreground">
              {t(locale, "booking.total")}: {formatDKK(total)}
            </span>
          )}
          <Button
            onClick={onNext}
            disabled={selected.length === 0}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t(locale, "booking.next")}
          </Button>
        </div>
      </div>
    </div>
  )
}
