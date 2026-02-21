"use client"

import { STEP_LABELS } from "@/lib/booking/types"

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking fremskridt" className="flex items-center justify-between gap-1">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep

        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
            {/* Dot / number */}
            <div
              className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                isDone
                  ? "bg-accent text-white"
                  : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {isDone ? (
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
            {/* Label (hidden on mobile for space) */}
            <span
              className={`hidden text-center text-[10px] leading-tight sm:block ${
                isActive ? "font-bold text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
