"use client"

import { useEffect, useState } from "react"
import { Sun, Moon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { getAvailableSlots, type DaySlots } from "@/lib/booking/get-available-slots"

// ---------------------------------------------------------------------------
// Step 3: Date/time picker with real availability
// Shows next 14 days in a scrollable list. Each day shows morning/afternoon
// availability as clickable half-day blocks.
// ---------------------------------------------------------------------------

const DAY_NAMES = ["Man", "Tir", "Ons", "Tor", "Fre", "Lor", "Son"]
const MONTH_NAMES = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
]

interface StepDateTimeProps {
  selectedDate: string | null
  selectedSlot: "morning" | "afternoon" | null
  onSelect: (date: string, slot: "morning" | "afternoon") => void
  onBack: () => void
}

export function StepDateTime({ selectedDate, selectedSlot, onSelect, onBack }: StepDateTimeProps) {
  const [slots, setSlots] = useState<DaySlots[]>([])
  const [loading, setLoading] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)

  // Fetch availability for the next 28 days on mount
  useEffect(() => {
    async function load() {
      setLoading(true)
      const today = new Date()
      const from = today.toISOString().slice(0, 10)
      const to = new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      const result = await getAvailableSlots(from, to)
      setSlots(result)
      setLoading(false)
    }
    load()
  }, [])

  // Current week slice (7 days per page)
  const startIdx = weekOffset * 7
  const visibleSlots = slots.slice(startIdx, startIdx + 7)
  const canGoBack = weekOffset > 0
  const canGoForward = startIdx + 7 < slots.length

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <Loader2 className="size-6 animate-spin text-accent" />
        <p className="text-sm text-muted-foreground">Henter ledige tider...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-primary">Vælg dato og tid</h2>
        <p className="text-sm text-muted-foreground">Morgen (08-12) eller eftermiddag (12-17)</p>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset((w) => w - 1)}
          disabled={!canGoBack}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="Forrige uge"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm font-bold text-primary">
          {visibleSlots.length > 0 && formatDateRange(visibleSlots[0].date, visibleSlots[visibleSlots.length - 1].date)}
        </span>
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          disabled={!canGoForward}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="Næste uge"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Day columns */}
      <div className="grid grid-cols-7 gap-1.5">
        {visibleSlots.map((day) => {
          const d = new Date(day.date + "T00:00:00")
          const jsDay = d.getDay()
          const dow = jsDay === 0 ? 6 : jsDay - 1
          const dayName = DAY_NAMES[dow]
          const dayNum = d.getDate()
          const isToday = day.date === new Date().toISOString().slice(0, 10)

          return (
            <div key={day.date} className="flex flex-col items-center gap-1">
              {/* Day header */}
              <div className={`text-center ${isToday ? "text-accent" : "text-muted-foreground"}`}>
                <div className="text-[10px] font-bold uppercase">{dayName}</div>
                <div className={`text-sm font-bold ${isToday ? "text-accent" : "text-primary"}`}>{dayNum}</div>
              </div>

              {/* Morning slot */}
              <SlotButton
                available={day.morning}
                selected={selectedDate === day.date && selectedSlot === "morning"}
                onClick={() => onSelect(day.date, "morning")}
                label="AM"
                icon={<Sun className="size-3" />}
              />

              {/* Afternoon slot */}
              <SlotButton
                available={day.afternoon}
                selected={selectedDate === day.date && selectedSlot === "afternoon"}
                onClick={() => onSelect(day.date, "afternoon")}
                label="PM"
                icon={<Moon className="size-3" />}
              />
            </div>
          )
        })}
      </div>

      {/* Back button */}
      <div className="flex justify-start pt-2">
        <button
          onClick={onBack}
          className="text-sm font-bold text-primary underline underline-offset-2"
        >
          Tilbage
        </button>
      </div>
    </div>
  )
}

// -- Slot button sub-component --
function SlotButton({
  available,
  selected,
  onClick,
  label,
  icon,
}: {
  available: boolean
  selected: boolean
  onClick: () => void
  label: string
  icon: React.ReactNode
}) {
  if (!available) {
    return (
      <div className="flex w-full flex-col items-center gap-0.5 rounded-md bg-muted/50 px-1 py-1.5 opacity-40">
        <span className="text-[9px] text-muted-foreground">{label}</span>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`flex w-full flex-col items-center gap-0.5 rounded-md border px-1 py-1.5 transition-all ${
        selected
          ? "border-accent bg-accent/10 text-accent"
          : "border-border bg-card text-muted-foreground hover:border-accent/40"
      }`}
    >
      {icon}
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  )
}

// -- Helper --
function formatDateRange(from: string, to: string): string {
  const f = new Date(from + "T00:00:00")
  const t = new Date(to + "T00:00:00")
  const fDay = f.getDate()
  const tDay = t.getDate()
  const fMonth = MONTH_NAMES[f.getMonth()]
  const tMonth = MONTH_NAMES[t.getMonth()]

  if (fMonth === tMonth) {
    return `${fDay}. - ${tDay}. ${fMonth}`
  }
  return `${fDay}. ${fMonth} - ${tDay}. ${tMonth}`
}
