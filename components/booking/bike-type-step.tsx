"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Bike,
  Zap,
  Truck,
  Mountain,
  Baby,
  Accessibility,
  CircuitBoard,
  HelpCircle,
} from "lucide-react"
import { t } from "@/lib/i18n"
import type { Locale, BikeType } from "@/lib/types"

interface BikeTypeStepProps {
  locale: Locale
  bikeTypes: BikeType[]
  onSelect: (bikeType: BikeType) => void
}

const SLUG_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "alm-cykel": Bike,
  "el-cykel": Zap,
  ladcykel: Truck,
  fatbike: Mountain,
  bornecykel: Baby,
  korestol: Accessibility,
  "el-scooter": CircuitBoard,
  andet: HelpCircle,
}

export function BikeTypeStep({ locale, bikeTypes, onSelect }: BikeTypeStepProps) {
  const nameKey = locale === "da" ? "name_da" : "name_en"

  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-foreground">
        {t(locale, "booking.bikeTypeStep")}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {bikeTypes.map((bt) => {
          const Icon = SLUG_ICON[bt.slug] || HelpCircle
          return (
            <Card
              key={bt.id}
              className="cursor-pointer border-border transition-all hover:border-accent hover:shadow-md"
              onClick={() => onSelect(bt)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <Icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {bt[nameKey]}
                </span>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
