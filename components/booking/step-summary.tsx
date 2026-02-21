"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle, Calendar, MapPin, Wrench, Bike } from "lucide-react"
import type { BookingService, BookingCustomerInfo } from "@/lib/booking/types"
import { createBooking } from "@/lib/booking/create-booking"

const MONTH_NAMES = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
]

const SLOT_LABELS = {
  morning: "Morgen (08:00-12:00)",
  afternoon: "Eftermiddag (12:00-17:00)",
}

interface StepSummaryProps {
  bikeTypeId: string
  bikeTypeName: string
  selectedServices: BookingService[]
  date: string
  timeSlot: "morning" | "afternoon"
  customer: BookingCustomerInfo
  totalDkk: number
  onBack: () => void
}

export function StepSummary({
  bikeTypeId,
  bikeTypeName,
  selectedServices,
  date,
  timeSlot,
  customer,
  totalDkk,
  onBack,
}: StepSummaryProps) {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; bookingId?: string; error?: string } | null>(null)

  const d = new Date(date + "T00:00:00")
  const dateStr = `${d.getDate()}. ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`

  const handleSubmit = async () => {
    setSubmitting(true)
    setResult(null)
    try {
      const res = await createBooking({
        bikeTypeId,
        bikeTypeName,
        serviceIds: selectedServices.map((s) => s.id),
        date,
        timeSlot,
        customer,
      })
      setResult(res)
    } catch {
      setResult({ success: false, error: "Der opstod en fejl. Prøv igen." })
    } finally {
      setSubmitting(false)
    }
  }

  // -- Success screen --
  if (result?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="size-12 text-green-500" />
        <div>
          <h2 className="text-lg font-bold text-primary">Booking bekræftet!</h2>
          <p className="text-sm text-muted-foreground">
            Vi har modtaget din booking og kontakter dig snart.
          </p>
        </div>
        <div className="rounded-lg bg-muted px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-accent" />
            <span className="text-primary">{dateStr}, {SLOT_LABELS[timeSlot]}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <MapPin className="size-4 text-accent" />
            <span className="text-primary">{customer.address}, {customer.zip} {customer.city}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Booking-id: {result.bookingId?.slice(0, 8)}
        </p>
      </div>
    )
  }

  // -- Error screen --
  if (result && !result.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <AlertCircle className="size-12 text-red-400" />
        <div>
          <h2 className="text-lg font-bold text-primary">Noget gik galt</h2>
          <p className="text-sm text-muted-foreground">{result.error}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="text-sm font-bold text-primary underline underline-offset-2"
          >
            Tilbage
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white"
          >
            Prøv igen
          </button>
        </div>
      </div>
    )
  }

  // -- Summary view --
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-primary">Bekræft din booking</h2>
        <p className="text-sm text-muted-foreground">Tjek at alt er korrekt</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        {/* Bike type */}
        <div className="flex items-center gap-2">
          <Bike className="size-4 text-accent" />
          <span className="text-sm font-bold text-primary">{bikeTypeName}</span>
        </div>

        {/* Date + time */}
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-accent" />
          <span className="text-sm text-primary">{dateStr}, {SLOT_LABELS[timeSlot]}</span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-accent" />
          <span className="text-sm text-primary">{customer.address}, {customer.zip} {customer.city}</span>
        </div>

        {/* Services */}
        <div className="border-t border-border pt-3">
          <div className="mb-2 flex items-center gap-2">
            <Wrench className="size-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Ydelser</span>
          </div>
          {selectedServices.map((s) => (
            <div key={s.id} className="flex justify-between py-0.5">
              <span className="text-sm text-primary">{s.name_da}</span>
              <span className="text-sm text-muted-foreground">{s.price_dkk} kr</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between border-t border-border pt-3">
          <span className="text-sm font-bold text-primary">Total</span>
          <span className="text-sm font-bold text-accent">{totalDkk} kr</span>
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        {customer.name} &middot; {customer.phone} &middot; {customer.email}
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          disabled={submitting}
          className="text-sm font-bold text-primary underline underline-offset-2 disabled:opacity-40"
        >
          Tilbage
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition-opacity disabled:opacity-70"
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {submitting ? "Opretter..." : "Bekræft booking"}
        </button>
      </div>
    </div>
  )
}
