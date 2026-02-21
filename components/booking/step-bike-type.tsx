"use client"

import { Bike, Zap, Package, CircleDot, Baby, Accessibility, Disc3, HelpCircle } from "lucide-react"
import type { BookingBikeType } from "@/lib/booking/types"

// Map bike type slugs to Lucide icons
const ICON_MAP: Record<string, typeof Bike> = {
  "alm-cykel": Bike,
  "el-cykel": Zap,
  "ladcykel": Package,
  "fatbike": CircleDot,
  "bornecykel": Baby,
  "korestol": Accessibility,
  "el-scooter": Disc3,
  "andet": HelpCircle,
}

interface StepBikeTypeProps {
  bikeTypes: BookingBikeType[]
  selectedId: string | null
  onSelect: (id: string, name: string) => void
}

export function StepBikeType({ bikeTypes, selectedId, onSelect }: StepBikeTypeProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-primary">Hvilken type cykel?</h2>
        <p className="text-sm text-muted-foreground">Vælg den cykeltype der skal repareres</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {bikeTypes.map((bt) => {
          const Icon = ICON_MAP[bt.slug] ?? Bike
          const isSelected = bt.id === selectedId

          return (
            <button
              key={bt.id}
              onClick={() => onSelect(bt.id, bt.name_da)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "border-border bg-card hover:border-accent/40 hover:shadow-sm"
              }`}
            >
              <Icon
                className={`size-7 ${isSelected ? "text-accent" : "text-muted-foreground"}`}
                strokeWidth={1.5}
              />
              <span className={`text-sm font-bold ${isSelected ? "text-accent" : "text-primary"}`}>
                {bt.name_da}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
