"use client"

import { useState } from "react"
import { Check, Bike, Wrench, User, CreditCard } from "lucide-react"
import { BIKE_TYPES, type BikeTypeOption } from "./mock-data"
import { StepBikeType } from "./step-bike-type"
import { StepServices, type SingleServiceSelection } from "./step-services"
import { StepInfo, type CustomerFormData } from "./step-info"
import { StepPayment } from "./step-payment"

type Step = 1 | 2 | 3 | 4 | "done"

const STEP_LABELS = [
  { num: 1, label: "Cykeltype", icon: Bike },
  { num: 2, label: "Service", icon: Wrench },
  { num: 3, label: "Oplysninger", icon: User },
  { num: 4, label: "Betaling", icon: CreditCard },
]

const serviceLabels: Record<string, string> = {
  "flat-tyre": "Punkteret d\u00e6k",
  troubleshoot: "Fejlfinding",
  maintenance: "Service eftersyn",
  serviceaftale: "Serviceaftale",
}

export function BookingForm() {
  const [step, setStep] = useState<Step>(1)
  const [bikeType, setBikeType] = useState<BikeTypeOption | null>(null)
  const [serviceSelections, setServiceSelections] = useState<SingleServiceSelection[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerFormData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "at-arrival" | null>(null)

  const currentStepNum = typeof step === "number" ? step : 5
  const totalPrice = serviceSelections.reduce((sum, s) => sum + s.price, 0)

  const handleBikeSelect = (bt: BikeTypeOption) => {
    setBikeType(bt)
    setStep(2)
  }

  const handleServiceNext = (selections: SingleServiceSelection[]) => {
    setServiceSelections(selections)
    setStep(3)
  }

  const handleInfoNext = (data: CustomerFormData) => {
    setCustomerInfo(data)
    setStep(4)
  }

  const handlePaymentComplete = (method: "card" | "at-arrival") => {
    setPaymentMethod(method)
    setStep("done")
  }

  const handleReset = () => {
    setStep(1)
    setBikeType(null)
    setServiceSelections([])
    setCustomerInfo(null)
    setPaymentMethod(null)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Step indicator bar */}
      {step !== "done" && (
        <div className="mb-10 flex items-center justify-between">
          {STEP_LABELS.map((s, i) => {
            const isActive = s.num === currentStepNum
            const isDone = s.num < currentStepNum
            const Icon = s.icon
            return (
              <div key={s.num} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      isDone
                        ? "bg-accent text-accent-foreground"
                        : isActive
                        ? "border-2 border-accent bg-accent/5 text-accent"
                        : "border border-border/60 bg-card text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4.5 w-4.5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive || isDone ? "text-foreground" : "text-muted-foreground/70"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`mx-3 mb-6 h-px flex-1 transition-colors ${
                      s.num < currentStepNum ? "bg-accent" : "bg-border/40"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Step content */}
      <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <StepBikeType bikeTypes={BIKE_TYPES} onSelect={handleBikeSelect} />
        )}
        {step === 2 && bikeType && (
          <StepServices
            bikeType={bikeType}
            onNext={handleServiceNext}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepInfo
            onNext={handleInfoNext}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && serviceSelections.length > 0 && (
          <StepPayment
            totalPrice={totalPrice}
            onComplete={handlePaymentComplete}
            onBack={() => setStep(3)}
          />
        )}
        {step === "done" && (
          <div className="flex flex-col items-center gap-8 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {"Booking bekr\u00e6ftet!"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {"Vi har sendt en bekr\u00e6ftelse til din email og SMS."}
              </p>
            </div>

            {/* Summary */}
            <div className="w-full max-w-sm rounded-xl border border-border/40 bg-muted/20 p-5 text-left">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {"Oversigt"}
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{"Cykel"}</span>
                  <span className="font-medium text-foreground">{bikeType?.label}</span>
                </div>

                {/* List all selected services */}
                {serviceSelections.map((sel, i) => (
                  <div key={`${sel.service}-${i}`} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {serviceLabels[sel.service] ?? sel.service}
                      {sel.subLabel && <span className="ml-1 text-xs">({sel.subLabel})</span>}
                    </span>
                    <span className="font-medium text-foreground">
                      {sel.price.toLocaleString("da-DK")} kr
                    </span>
                  </div>
                ))}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">{"Dato"}</span>
                  <span className="font-medium text-foreground">
                    {customerInfo?.preferredDate} {customerInfo?.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{"Adresse"}</span>
                  <span className="max-w-[200px] text-right font-medium text-foreground">
                    {customerInfo?.address}
                  </span>
                </div>
                <div className="my-1 h-px bg-border/40" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">{"Total"}</span>
                  <span className="font-bold text-accent">
                    {totalPrice.toLocaleString("da-DK")} kr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{"Betaling"}</span>
                  <span className="font-medium text-foreground">
                    {paymentMethod === "card" ? "Betalt med kort" : "Betales ved ankomst"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-sm text-accent underline underline-offset-2 hover:text-accent/80"
            >
              {"Start en ny booking"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
