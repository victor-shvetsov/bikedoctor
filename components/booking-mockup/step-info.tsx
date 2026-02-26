"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface CustomerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  preferredDate: string
  preferredTime: string
}

interface StepInfoProps {
  onNext: (data: CustomerFormData) => void
  onBack: () => void
}

const TIME_SLOTS = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
]

export function StepInfo({ onNext, onBack }: StepInfoProps) {
  const [form, setForm] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
  })

  const update = (field: keyof CustomerFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isValid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.address.trim() !== "" &&
    form.preferredDate !== "" &&
    form.preferredTime !== ""

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          {"Dine oplysninger"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {"Vi bruger dine oplysninger til at booke din mekaniker"}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
              {"Fornavn"}
            </Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Anders"
              className="border-border/60 bg-card"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
              {"Efternavn"}
            </Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Jensen"
              className="border-border/60 bg-card"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            {"Email"}
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="anders@eksempel.dk"
            className="border-border/60 bg-card"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            {"Telefon"}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+45 12 34 56 78"
            className="border-border/60 bg-card"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground">
            {"Adresse (hvor vi skal komme)"}
          </Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Vesterbrogade 42, 1620 K\u00f8benhavn V"
            className="border-border/60 bg-card"
          />
        </div>

        {/* Date and time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="date" className="text-sm font-medium text-foreground">
              {"Dato"}
            </Label>
            <Input
              id="date"
              type="date"
              min={minDate}
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              className="border-border/60 bg-card"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="time" className="text-sm font-medium text-foreground">
              {"Tidsinterval"}
            </Label>
            <select
              id="time"
              value={form.preferredTime}
              onChange={(e) => update("preferredTime", e.target.value)}
              className="flex h-9 w-full rounded-md border border-border/60 bg-card px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">{"V\u00e6lg tid"}</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          {"Tilbage"}
        </Button>
        <Button
          onClick={() => onNext(form)}
          disabled={!isValid}
          className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
        >
          {"N\u00e6ste"}
        </Button>
      </div>
    </div>
  )
}
