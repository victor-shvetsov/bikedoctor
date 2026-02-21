"use client"

import { useState, useCallback } from "react"
import type { BookingBikeType, BookingService, BookingState, BookingCustomerInfo } from "@/lib/booking/types"
import { INITIAL_STATE, STEP_LABELS } from "@/lib/booking/types"
import { StepIndicator } from "./step-indicator"

// Step components (created in blocks D-H)
import { StepBikeType } from "./step-bike-type"
import { StepServices } from "./step-services"
import { StepDateTime } from "./step-date-time"
import { StepCustomerInfo } from "./step-customer-info"
import { StepSummary } from "./step-summary"

// ---------------------------------------------------------------------------
// BookingWidget -- multi-step booking form (Block C)
// Manages the state machine, renders step indicator + current step.
// ---------------------------------------------------------------------------

interface BookingWidgetProps {
  bikeTypes: BookingBikeType[]
  services: BookingService[]
}

export function BookingWidget({ bikeTypes, services }: BookingWidgetProps) {
  const [state, setState] = useState<BookingState>(INITIAL_STATE)

  // -- Step navigation --
  const goTo = useCallback((step: BookingState["step"]) => {
    setState((s) => ({ ...s, step }))
  }, [])

  const goBack = useCallback(() => {
    setState((s) => ({ ...s, step: Math.max(1, s.step - 1) as BookingState["step"] }))
  }, [])

  // -- Step 1: Bike type --
  const selectBikeType = useCallback((id: string, name: string) => {
    setState((s) => ({ ...s, bikeTypeId: id, bikeTypeName: name, step: 2 }))
  }, [])

  // -- Step 2: Services --
  const toggleService = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      serviceIds: s.serviceIds.includes(id)
        ? s.serviceIds.filter((sid) => sid !== id)
        : [...s.serviceIds, id],
    }))
  }, [])

  // -- Step 3: Date/time --
  const selectSlot = useCallback((date: string, timeSlot: "morning" | "afternoon") => {
    setState((s) => ({ ...s, date, timeSlot, step: 4 }))
  }, [])

  // -- Step 4: Customer info --
  const updateCustomer = useCallback((customer: BookingCustomerInfo) => {
    setState((s) => ({ ...s, customer }))
  }, [])

  // -- Selected services for display --
  const selectedServices = services.filter((s) => state.serviceIds.includes(s.id))
  const totalDkk = selectedServices.reduce((sum, s) => sum + s.price_dkk, 0)

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      {/* Progress indicator */}
      <StepIndicator currentStep={state.step} />

      {/* Step content */}
      <div className="min-h-[400px]">
        {state.step === 1 && (
          <StepBikeType
            bikeTypes={bikeTypes}
            selectedId={state.bikeTypeId}
            onSelect={selectBikeType}
          />
        )}

        {state.step === 2 && (
          <StepServices
            services={services}
            selectedIds={state.serviceIds}
            onToggle={toggleService}
            onNext={() => goTo(3)}
            onBack={goBack}
          />
        )}

        {state.step === 3 && (
          <StepDateTime
            selectedDate={state.date}
            selectedSlot={state.timeSlot}
            onSelect={selectSlot}
            onBack={goBack}
          />
        )}

        {state.step === 4 && (
          <StepCustomerInfo
            customer={state.customer}
            onChange={updateCustomer}
            onNext={() => goTo(5)}
            onBack={goBack}
          />
        )}

        {state.step === 5 && state.bikeTypeId && state.bikeTypeName && state.date && state.timeSlot && (
          <StepSummary
            bikeTypeId={state.bikeTypeId}
            bikeTypeName={state.bikeTypeName}
            selectedServices={selectedServices}
            date={state.date}
            timeSlot={state.timeSlot}
            customer={state.customer}
            totalDkk={totalDkk}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  )
}
