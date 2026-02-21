"use client"

import { useState, useCallback } from "react"
import { Loader2, UserCheck } from "lucide-react"
import { lookupCustomerByPhone } from "@/lib/booking/lookup-customer"
import type { BookingCustomerInfo } from "@/lib/booking/types"

interface StepCustomerInfoProps {
  customer: BookingCustomerInfo
  onChange: (customer: BookingCustomerInfo) => void
  onNext: () => void
  onBack: () => void
}

export function StepCustomerInfo({ customer, onChange, onNext, onBack }: StepCustomerInfoProps) {
  const [lookingUp, setLookingUp] = useState(false)
  const [foundExisting, setFoundExisting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingCustomerInfo, string>>>({})

  // Update a single field
  const setField = useCallback(
    (key: keyof BookingCustomerInfo, value: string) => {
      onChange({ ...customer, [key]: value })
      // Clear error on change
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    },
    [customer, onChange, errors]
  )

  // Phone lookup on blur
  const handlePhoneLookup = useCallback(async () => {
    const clean = customer.phone.replace(/\s/g, "")
    if (clean.length !== 8) return

    setLookingUp(true)
    setFoundExisting(false)
    try {
      const result = await lookupCustomerByPhone(clean)
      if (result) {
        onChange({
          ...customer,
          name: result.name || customer.name,
          email: result.email || customer.email,
          address: result.address || customer.address,
          zip: result.zip || customer.zip,
          city: result.city || customer.city,
        })
        setFoundExisting(true)
      }
    } finally {
      setLookingUp(false)
    }
  }, [customer, onChange])

  // Validate all fields
  const validate = useCallback((): boolean => {
    const errs: typeof errors = {}
    const clean = customer.phone.replace(/\s/g, "")

    if (!customer.name.trim()) errs.name = "Navn er påkrævet"
    if (!/^\d{8}$/.test(clean)) errs.phone = "Telefonnummer skal være 8 cifre"
    if (!customer.email.trim() || !customer.email.includes("@")) errs.email = "Gyldig email er påkrævet"
    if (!customer.address.trim()) errs.address = "Adresse er påkrævet"
    if (!customer.zip.trim() || !/^\d{4}$/.test(customer.zip.trim())) errs.zip = "Gyldigt postnummer (4 cifre)"
    if (!customer.city.trim()) errs.city = "By er påkrævet"

    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [customer])

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-bold text-primary">Dine oplysninger</h2>
        <p className="text-sm text-muted-foreground">Vi bruger dem til at kontakte dig og finde vej</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Phone -- with auto-lookup */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs font-bold text-muted-foreground">
            Telefon *
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={8}
              placeholder="12345678"
              value={customer.phone}
              onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
              onBlur={handlePhoneLookup}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm ${
                errors.phone ? "border-red-400" : "border-border"
              } bg-card text-primary placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none`}
            />
            {lookingUp && (
              <Loader2 className="absolute right-3 top-3 size-4 animate-spin text-accent" />
            )}
            {foundExisting && !lookingUp && (
              <UserCheck className="absolute right-3 top-3 size-4 text-green-500" />
            )}
          </div>
          {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
          {foundExisting && (
            <span className="text-xs text-green-600">Vi fandt dine oplysninger -- tjek de er korrekte</span>
          )}
        </div>

        {/* Name */}
        <Field
          id="name"
          label="Fulde navn *"
          value={customer.name}
          onChange={(v) => setField("name", v)}
          error={errors.name}
          placeholder="Anders Andersen"
        />

        {/* Email */}
        <Field
          id="email"
          label="Email *"
          type="email"
          value={customer.email}
          onChange={(v) => setField("email", v)}
          error={errors.email}
          placeholder="anders@email.dk"
        />

        {/* Address */}
        <Field
          id="address"
          label="Adresse *"
          value={customer.address}
          onChange={(v) => setField("address", v)}
          error={errors.address}
          placeholder="Norgesmindegade 12, 3. tv"
        />

        {/* Zip + City in one row */}
        <div className="grid grid-cols-[100px_1fr] gap-2">
          <Field
            id="zip"
            label="Postnr *"
            inputMode="numeric"
            maxLength={4}
            value={customer.zip}
            onChange={(v) => setField("zip", v.replace(/\D/g, ""))}
            error={errors.zip}
            placeholder="2100"
          />
          <Field
            id="city"
            label="By *"
            value={customer.city}
            onChange={(v) => setField("city", v)}
            error={errors.city}
            placeholder="Kobenhavn"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="text-sm font-bold text-primary underline underline-offset-2"
        >
          Tilbage
        </button>
        <button
          onClick={handleNext}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition-opacity"
        >
          Videre
        </button>
      </div>
    </div>
  )
}

// -- Reusable field component --
function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  type?: string
  inputMode?: "text" | "numeric" | "email" | "tel"
  maxLength?: number
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-bold text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm ${
          error ? "border-red-400" : "border-border"
        } bg-card text-primary placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
