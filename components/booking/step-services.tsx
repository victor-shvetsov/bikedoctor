"use client"

import { Check } from "lucide-react"
import type { BookingService } from "@/lib/booking/types"

// Friendly Danish category labels
const CATEGORY_LABELS: Record<string, string> = {
  repair: "Reparationer",
  safety: "Sikkerhed",
  service: "Serviceaftaler",
}

const CATEGORY_ORDER = ["repair", "safety", "service"]

interface StepServicesProps {
  services: BookingService[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function StepServices({ services, selectedIds, onToggle, onNext, onBack }: StepServicesProps) {
  const totalDkk = services
    .filter((s) => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.price_dkk, 0)

  // Group services by category
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    items: services.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-primary">Vælg ydelser</h2>
        <p className="text-sm text-muted-foreground">Hvad skal laves? Vælg en eller flere</p>
      </div>

      {/* Service groups */}
      <div className="flex flex-col gap-5">
        {grouped.map((group) => (
          <div key={group.category} className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {group.label}
            </h3>
            <div className="flex flex-col gap-1.5">
              {group.items.map((service) => {
                const isSelected = selectedIds.includes(service.id)
                return (
                  <button
                    key={service.id}
                    onClick={() => onToggle(service.id)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-all ${
                      isSelected
                        ? "border-accent bg-accent/5"
                        : "border-border bg-card hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Checkbox indicator */}
                      <div
                        className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          isSelected
                            ? "border-accent bg-accent text-white"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="size-3" strokeWidth={3} />}
                      </div>
                      <div>
                        <span className={`text-sm ${isSelected ? "font-bold text-primary" : "text-primary"}`}>
                          {service.name_da}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {service.duration_minutes} min
                        </span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${isSelected ? "text-accent" : "text-primary"}`}>
                      {service.price_dkk} kr
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky footer: total + navigation */}
      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-background pt-3">
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {selectedIds.length} {selectedIds.length === 1 ? "ydelse" : "ydelser"} valgt
            </span>
            <span className="font-bold text-primary">Total: {totalDkk} kr</span>
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="text-sm font-bold text-primary underline underline-offset-2"
          >
            Tilbage
          </button>
          <button
            onClick={onNext}
            disabled={selectedIds.length === 0}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-40"
          >
            Videre
          </button>
        </div>
      </div>
    </div>
  )
}
