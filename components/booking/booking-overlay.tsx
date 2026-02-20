"use client"

import { useState, useTransition } from "react"
import { X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BikeTypeStep } from "./bike-type-step"
import { ServiceSelectStep } from "./service-select-step"
import { CustomerInfoStep, type CustomerInfo } from "./customer-info-step"
import { CheckoutStep } from "./checkout-step"
import { createBookingAndCheckout } from "@/app/actions/booking"
import { t, formatDKK } from "@/lib/i18n"
import type { Locale, BikeType, ServiceCatalogItem } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

type Step = "bike-type" | "services" | "info" | "checkout"

interface BookingOverlayProps {
  locale: Locale
  bikeTypes: BikeType[]
  services: ServiceCatalogItem[]
  isOpen: boolean
  onClose: () => void
}

export function BookingOverlay({
  locale,
  bikeTypes,
  services,
  isOpen,
  onClose,
}: BookingOverlayProps) {
  const [step, setStep] = useState<Step>("bike-type")
  const [selectedBikeType, setSelectedBikeType] = useState<BikeType | null>(null)
  const [selectedServices, setSelectedServices] = useState<
    Array<{ service: ServiceCatalogItem; quantity: number }>
  >([])
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleBikeTypeSelect = (bt: BikeType) => {
    setSelectedBikeType(bt)
    setStep("services")
  }

  const handleServiceToggle = (service: ServiceCatalogItem) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.service.id === service.id)
      if (exists) return prev.filter((s) => s.service.id !== service.id)
      return [...prev, { service, quantity: 1 }]
    })
  }

  const handleCustomerSubmit = (info: CustomerInfo) => {
    if (!selectedBikeType) return
    setError(null)

    const nameKey = locale === "da" ? "name_da" : "name_en"
    const totalDkk = selectedServices.reduce(
      (sum, s) => sum + s.service.price_dkk * s.quantity,
      0
    )

    startTransition(async () => {
      const result = await createBookingAndCheckout({
        bikeTypeId: selectedBikeType.id,
        services: selectedServices.map((s) => ({
          serviceId: s.service.id,
          quantity: s.quantity,
          unitPriceDkk: s.service.price_dkk,
          name: s.service[nameKey],
        })),
        customer: info,
        totalDkk,
      })

      if (result.error) {
        setError(result.error)
        return
      }
      if (result.clientSecret) {
        setClientSecret(result.clientSecret)
        setStep("checkout")
      }
    })
  }

  const handleClose = () => {
    setStep("bike-type")
    setSelectedBikeType(null)
    setSelectedServices([])
    setClientSecret(null)
    setError(null)
    onClose()
  }

  const stepTitle = () => {
    switch (step) {
      case "bike-type":
        return `${t(locale, "booking.title")} ${t(locale, "booking.titleAccent")}`
      case "services":
        return `${t(locale, "booking.title")} ${t(locale, "booking.titleAccent")}`
      case "info":
        return `${t(locale, "booking.title")} ${t(locale, "booking.titleAccent")}`
      case "checkout":
        return t(locale, "booking.checkoutStep")
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative my-4 w-full max-w-2xl rounded-xl bg-card shadow-2xl sm:my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl font-bold text-foreground">
            {step === "bike-type" ? (
              <>
                {t(locale, "booking.title")}{" "}
                <span className="text-accent">{t(locale, "booking.titleAccent")}</span>
              </>
            ) : (
              stepTitle()
            )}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex border-b border-border">
          {(["bike-type", "services", "info", "checkout"] as Step[]).map(
            (s, i) => (
              <div
                key={s}
                className={`flex-1 py-1.5 text-center text-xs font-medium transition-colors ${
                  s === step
                    ? "bg-accent/10 text-accent"
                    : i < ["bike-type", "services", "info", "checkout"].indexOf(step)
                    ? "bg-[#2a7d6d]/10 text-[#2a7d6d]"
                    : "text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
            )
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {isPending ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <Spinner className="h-8 w-8 text-accent" />
              <p className="text-sm text-muted-foreground">{t(locale, "booking.creating")}</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              {step === "bike-type" && (
                <BikeTypeStep
                  locale={locale}
                  bikeTypes={bikeTypes}
                  onSelect={handleBikeTypeSelect}
                />
              )}
              {step === "services" && (
                <ServiceSelectStep
                  locale={locale}
                  services={services}
                  selected={selectedServices}
                  onToggle={handleServiceToggle}
                  onNext={() => setStep("info")}
                  onBack={() => setStep("bike-type")}
                />
              )}
              {step === "info" && (
                <CustomerInfoStep
                  locale={locale}
                  selected={selectedServices}
                  onSubmit={handleCustomerSubmit}
                  onBack={() => setStep("services")}
                />
              )}
              {step === "checkout" && clientSecret && (
                <CheckoutStep clientSecret={clientSecret} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
