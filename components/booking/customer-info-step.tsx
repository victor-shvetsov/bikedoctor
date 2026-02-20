"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { t, formatDKK } from "@/lib/i18n"
import type { Locale, ServiceCatalogItem } from "@/lib/types"

interface CustomerInfoStepProps {
  locale: Locale
  selected: Array<{ service: ServiceCatalogItem; quantity: number }>
  onSubmit: (info: CustomerInfo) => void
  onBack: () => void
}

export interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
  zip: string
  city: string
  preferredDate: string
  preferredTimeSlot: string
  notes: string
}

export function CustomerInfoStep({
  locale,
  selected,
  onSubmit,
  onBack,
}: CustomerInfoStepProps) {
  const [form, setForm] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    zip: "",
    city: "",
    preferredDate: "",
    preferredTimeSlot: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, boolean>>>({})

  const total = selected.reduce(
    (sum, s) => sum + s.service.price_dkk * s.quantity,
    0
  )

  const handleSubmit = () => {
    const newErrors: typeof errors = {}
    if (!form.name.trim()) newErrors.name = true
    if (!form.phone.trim()) newErrors.phone = true
    if (!form.address.trim()) newErrors.address = true
    if (!form.zip.trim()) newErrors.zip = true
    if (!form.city.trim()) newErrors.city = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onSubmit(form)
  }

  const update = (key: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }))
  }

  // Minimum date = tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">
        {t(locale, "booking.infoStep")}
      </h3>

      <div className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto pr-1">
        {/* Name + Phone */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-foreground">
              {t(locale, "form.name")} *
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Anders Jensen"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-foreground">
              {t(locale, "form.phone")} *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
              placeholder="+45 12 34 56 78"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-foreground">
            {t(locale, "form.email")}
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="anders@email.dk"
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" className="text-foreground">
            {t(locale, "form.address")} *
          </Label>
          <Input
            id="address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className={errors.address ? "border-destructive" : ""}
            placeholder="Nørrebrogade 42"
          />
        </div>

        {/* Zip + City */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="zip" className="text-foreground">
              {t(locale, "form.zip")} *
            </Label>
            <Input
              id="zip"
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
              className={errors.zip ? "border-destructive" : ""}
              placeholder="2200"
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-foreground">
              {t(locale, "form.city")} *
            </Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className={errors.city ? "border-destructive" : ""}
              placeholder="København N"
            />
          </div>
        </div>

        {/* Date + Time Slot */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="date" className="text-foreground">
              {t(locale, "form.preferredDate")}
            </Label>
            <Input
              id="date"
              type="date"
              min={minDate}
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
            />
          </div>
          <div>
            <Label className="text-foreground">{t(locale, "form.timeSlot")}</Label>
            <Select
              value={form.preferredTimeSlot}
              onValueChange={(v) => update("preferredTimeSlot", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">
                  {t(locale, "form.morning")}
                </SelectItem>
                <SelectItem value="afternoon">
                  {t(locale, "form.afternoon")}
                </SelectItem>
                <SelectItem value="evening">
                  {t(locale, "form.evening")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="text-foreground">
            {t(locale, "form.notes")}
          </Label>
          <Textarea
            id="notes"
            rows={2}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder={locale === "da" ? "Beskriv evt. problemet..." : "Describe the issue..."}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <Button variant="outline" onClick={onBack}>
          {t(locale, "booking.back")}
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground">
            {t(locale, "booking.total")}: {formatDKK(total)}
          </span>
          <Button
            onClick={handleSubmit}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {t(locale, "booking.checkoutStep")}
          </Button>
        </div>
      </div>
    </div>
  )
}
