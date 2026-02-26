"use client"

import {
  Bike,
  Zap,
  Truck,
  Mountain,
  Baby,
  Accessibility,
  Gauge,
  HelpCircle,
} from "lucide-react"
import type { BikeTypeOption } from "./mock-data"

const iconMap: Record<string, React.ElementType> = {
  bike: Bike,
  zap: Zap,
  truck: Truck,
  mountain: Mountain,
  baby: Baby,
  accessibility: Accessibility,
  gauge: Gauge,
  "help-circle": HelpCircle,
}

interface StepBikeTypeProps {
  bikeTypes: BikeTypeOption[]
  onSelect: (bt: BikeTypeOption) => void
}

export function StepBikeType({ bikeTypes, onSelect }: StepBikeTypeProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {"V\u00e6lg din cykeltype"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Priserne afh\u00e6nger af din cykeltype"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {bikeTypes.map((bt) => {
          const Icon = iconMap[bt.icon] ?? HelpCircle
          return (
            <button
              key={bt.slug}
              onClick={() => onSelect(bt)}
              className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-accent hover:shadow-md active:scale-[0.97]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-accent/10">
                <Icon className="h-6 w-6 text-foreground transition-colors group-hover:text-accent" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {bt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
