"use client"

import { useState } from "react"
import {
  CircleDot,
  Wrench,
  Settings,
  FileText,
  Check,
  ChevronLeft,
  Plus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MAIN_SERVICES,
  MAINTENANCE_OPTIONS,
  getTubeOptions,
  getServiceaftalePriceYearly,
  type BikeTypeOption,
  type ServiceCardType,
  type TubeOption,
  type MaintenanceOption,
} from "./mock-data"

const serviceIcons: Record<ServiceCardType, React.ElementType> = {
  "flat-tyre": CircleDot,
  troubleshoot: Wrench,
  maintenance: Settings,
  serviceaftale: FileText,
}

const serviceLabels: Record<ServiceCardType, string> = {
  "flat-tyre": "Punkteret d\u00e6k",
  troubleshoot: "Fejlfinding",
  maintenance: "Service eftersyn",
  serviceaftale: "Serviceaftale",
}

export interface SingleServiceSelection {
  service: ServiceCardType
  subOption?: string
  subLabel?: string
  price: number
  billingCycle?: "yearly" | "monthly"
}

interface StepServicesProps {
  bikeType: BikeTypeOption
  onNext: (selections: SingleServiceSelection[]) => void
  onBack: () => void
}

type View = "grid" | "sub-options" | "confirm"

export function StepServices({ bikeType, onNext, onBack }: StepServicesProps) {
  // Accumulated completed selections
  const [completed, setCompleted] = useState<SingleServiceSelection[]>([])

  // Current in-progress selection
  const [activeService, setActiveService] = useState<ServiceCardType | null>(null)
  const [selectedTube, setSelectedTube] = useState<TubeOption | null>(null)
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceOption | null>(null)
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly")

  const [view, setView] = useState<View>("grid")

  const tubeOptions = getTubeOptions(bikeType.slug)
  const yearlyPrice = getServiceaftalePriceYearly(bikeType.slug)
  const monthlyPrice = Math.round((yearlyPrice / 12) * 1.15)

  // Services that have already been completed
  const completedServiceIds = completed.map((c) => c.service)

  // Check if current sub-option selection is valid
  const canConfirmCurrent = (): boolean => {
    if (!activeService) return false
    if (activeService === "flat-tyre") return !!selectedTube
    if (activeService === "troubleshoot") return true
    if (activeService === "maintenance") return !!selectedMaintenance
    if (activeService === "serviceaftale") return true
    return false
  }

  const getCurrentPrice = (): number => {
    if (activeService === "flat-tyre" && selectedTube) return selectedTube.price
    if (activeService === "troubleshoot") return 499
    if (activeService === "maintenance" && selectedMaintenance) return selectedMaintenance.price
    if (activeService === "serviceaftale") {
      return billingCycle === "yearly" ? yearlyPrice : monthlyPrice * 12
    }
    return 0
  }

  const getCurrentSubLabel = (): string => {
    if (activeService === "flat-tyre" && selectedTube) return selectedTube.label
    if (activeService === "troubleshoot") return "Fejlfinding"
    if (activeService === "maintenance" && selectedMaintenance) return selectedMaintenance.title
    if (activeService === "serviceaftale") return billingCycle === "yearly" ? "\u00c5rligt" : "M\u00e5nedligt"
    return ""
  }

  // When user picks a service card from the grid
  const handleServiceCardClick = (serviceId: ServiceCardType) => {
    setActiveService(serviceId)
    setSelectedTube(null)
    setSelectedMaintenance(null)
    setBillingCycle("yearly")

    // Troubleshoot has no sub-options -- go straight to confirm
    if (serviceId === "troubleshoot") {
      setView("confirm")
    } else {
      setView("sub-options")
    }
  }

  // Confirm the current selection and show "finish" vs "add more"
  const handleConfirmCurrent = () => {
    if (!activeService || !canConfirmCurrent()) return
    setView("confirm")
  }

  // Finalize current + finish
  const handleFinish = () => {
    const current: SingleServiceSelection = {
      service: activeService!,
      subOption: selectedTube?.id ?? selectedMaintenance?.id ?? (activeService === "serviceaftale" ? billingCycle : undefined),
      subLabel: getCurrentSubLabel(),
      price: getCurrentPrice(),
      billingCycle: activeService === "serviceaftale" ? billingCycle : undefined,
    }
    const allSelections = [...completed, current]
    onNext(allSelections)
  }

  // Add current and go back to grid for more
  const handleAddMore = () => {
    const current: SingleServiceSelection = {
      service: activeService!,
      subOption: selectedTube?.id ?? selectedMaintenance?.id ?? (activeService === "serviceaftale" ? billingCycle : undefined),
      subLabel: getCurrentSubLabel(),
      price: getCurrentPrice(),
      billingCycle: activeService === "serviceaftale" ? billingCycle : undefined,
    }
    setCompleted((prev) => [...prev, current])
    setActiveService(null)
    setSelectedTube(null)
    setSelectedMaintenance(null)
    setView("grid")
  }

  // Remove a completed selection
  const handleRemoveCompleted = (index: number) => {
    setCompleted((prev) => prev.filter((_, i) => i !== index))
  }

  // Total price of completed selections
  const completedTotal = completed.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          {"Hvad skal vi hj\u00e6lpe med?"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {"V\u00e6lg den service der passer til din "}
          <span className="font-medium text-foreground">{bikeType.label.toLowerCase()}</span>
        </p>
      </div>

      {/* Completed selections chips */}
      {completed.length > 0 && view === "grid" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {"Valgte services"}
          </p>
          <div className="flex flex-wrap gap-2">
            {completed.map((sel, i) => {
              const Icon = serviceIcons[sel.service]
              return (
                <div
                  key={`${sel.service}-${i}`}
                  className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 py-1.5 pl-3 pr-2"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {serviceLabels[sel.service]}
                  </span>
                  {sel.subLabel && (
                    <span className="text-xs text-muted-foreground">
                      {"("}{sel.subLabel}{")"}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-accent">
                    {sel.price.toLocaleString("da-DK")},-
                  </span>
                  <button
                    onClick={() => handleRemoveCompleted(i)}
                    className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {"Subtotal: "}<span className="font-semibold text-foreground">{completedTotal.toLocaleString("da-DK")} kr</span>
          </p>
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {view === "grid" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {MAIN_SERVICES.map((svc) => {
              const Icon = serviceIcons[svc.id]
              const isAlreadySelected = completedServiceIds.includes(svc.id)
              return (
                <button
                  key={svc.id}
                  onClick={() => !isAlreadySelected && handleServiceCardClick(svc.id)}
                  disabled={isAlreadySelected}
                  className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all ${
                    isAlreadySelected
                      ? "cursor-not-allowed border-accent/30 bg-accent/5 opacity-60"
                      : "border-border/60 bg-card hover:border-accent/40 hover:shadow-md active:scale-[0.97]"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      isAlreadySelected
                        ? "bg-accent/10"
                        : "bg-muted/50 group-hover:bg-accent/10"
                    }`}
                  >
                    {isAlreadySelected ? (
                      <Check className="h-6 w-6 text-accent" />
                    ) : (
                      <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-foreground">{svc.title}</span>
                    <p className="mt-0.5 text-xs text-muted-foreground">{svc.subtitle}</p>
                  </div>
                  {svc.price !== null && !isAlreadySelected && (
                    <span className="rounded-full bg-muted/50 px-3 py-0.5 text-xs font-semibold text-foreground">
                      {"fra "}{svc.price}{",-"}
                    </span>
                  )}
                  {isAlreadySelected && (
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                      {"Valgt"}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* If user already has selections and comes back to grid, show a "Videre" button */}
          {completed.length > 0 && (
            <div className="flex justify-end">
              <Button
                onClick={() => onNext(completed)}
                className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90"
              >
                {"Videre med "}{completed.length}{" service"}{completed.length > 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </>
      )}

      {/* ── SUB-OPTIONS VIEW ── */}
      {view === "sub-options" && activeService && (
        <div>
          <button
            onClick={() => {
              setActiveService(null)
              setView("grid")
            }}
            className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {"Alle services"}
          </button>

          {/* Active service badge */}
          {(() => {
            const svc = MAIN_SERVICES.find((s) => s.id === activeService)
            const Icon = serviceIcons[activeService]
            if (!svc) return null
            return (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-4.5 w-4.5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{svc.title}</p>
                  <p className="text-xs text-muted-foreground">{svc.subtitle}</p>
                </div>
              </div>
            )
          })()}

          {/* Sub-options for flat tyre */}
          {activeService === "flat-tyre" && (
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-sm font-medium text-foreground">{"Hvad skal skiftes?"}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {tubeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedTube(opt)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-4 text-center transition-all ${
                      selectedTube?.id === opt.id
                        ? "border-accent/40 bg-accent/5 shadow-sm"
                        : "border-border/60 bg-card hover:border-accent/30"
                    }`}
                  >
                    <span className="text-xs font-medium text-foreground">{opt.label}</span>
                    <span className="text-lg font-bold text-accent">{opt.price},-</span>
                    {selectedTube?.id === opt.id && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedTube && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleConfirmCurrent}
                    className="bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                  >
                    {"Bekr\u00e6ft valg"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Sub-options for maintenance */}
          {activeService === "maintenance" && (
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-sm font-medium text-foreground">{"V\u00e6lg serviceniveau"}</p>
              <div className="flex flex-col gap-2">
                {MAINTENANCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedMaintenance(opt)}
                    className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                      selectedMaintenance?.id === opt.id
                        ? "border-accent/40 bg-accent/5 shadow-sm"
                        : "border-border/60 bg-card hover:border-accent/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{opt.title}</span>
                      <span className="text-lg font-bold text-accent">{opt.price},-</span>
                    </div>
                    {selectedMaintenance?.id === opt.id && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {opt.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {selectedMaintenance && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={handleConfirmCurrent}
                    className="bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                  >
                    {"Bekr\u00e6ft valg"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Sub-options for serviceaftale */}
          {activeService === "serviceaftale" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-1 rounded-xl bg-muted/40 p-1">
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    billingCycle === "yearly"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {"\u00c5rligt"}
                  <span className="ml-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    {"Spar 15%"}
                  </span>
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {"M\u00e5nedligt"}
                </button>
              </div>
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {billingCycle === "yearly" ? (
                    <>
                      {yearlyPrice}
                      <span className="text-base font-normal text-muted-foreground">
                        {" kr/\u00e5r"}
                      </span>
                    </>
                  ) : (
                    <>
                      {monthlyPrice}
                      <span className="text-base font-normal text-muted-foreground">
                        {" kr/md"}
                      </span>
                    </>
                  )}
                </p>
                {billingCycle === "monthly" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {"Binding i 12 m\u00e5neder"}
                  </p>
                )}
              </div>
              <a
                href="#"
                className="text-center text-sm text-accent underline underline-offset-2 hover:text-accent/80"
              >
                {"L\u00e6s vilk\u00e5r og betingelser for serviceaftale"}
              </a>
              <div className="flex justify-end">
                <Button
                  onClick={handleConfirmCurrent}
                  className="bg-accent px-6 font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  {"Bekr\u00e6ft valg"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONFIRM VIEW -- "Finish" vs "I need more" ── */}
      {view === "confirm" && activeService && (
        <div className="flex flex-col items-center gap-6 py-4">
          {/* Show what was just selected */}
          <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
            {(() => {
              const Icon = serviceIcons[activeService]
              return (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
              )
            })()}
            <div>
              <p className="text-sm font-semibold text-foreground">{serviceLabels[activeService]}</p>
              {getCurrentSubLabel() && (
                <p className="text-xs text-muted-foreground">{getCurrentSubLabel()}</p>
              )}
            </div>
            <span className="ml-auto text-lg font-bold text-accent">
              {getCurrentPrice().toLocaleString("da-DK")},-
            </span>
          </div>

          {/* Previous selections summary */}
          {completed.length > 0 && (
            <div className="w-full rounded-xl border border-border/40 bg-muted/20 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {"Tidligere valgt"}
              </p>
              <div className="flex flex-col gap-1.5">
                {completed.map((sel, i) => (
                  <div key={`${sel.service}-${i}`} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {serviceLabels[sel.service]}
                      {sel.subLabel && <span className="ml-1 text-xs">({sel.subLabel})</span>}
                    </span>
                    <span className="font-medium text-foreground">{sel.price.toLocaleString("da-DK")},-</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between border-t border-border/40 pt-2 text-sm">
                <span className="font-semibold text-foreground">{"Ny total"}</span>
                <span className="font-bold text-accent">
                  {(completedTotal + getCurrentPrice()).toLocaleString("da-DK")} kr
                </span>
              </div>
            </div>
          )}

          {/* Two buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              onClick={handleAddMore}
              variant="outline"
              className="flex-1 gap-2 border-border/60 font-medium text-foreground hover:border-accent/40 hover:bg-accent/5"
            >
              <Plus className="h-4 w-4" />
              {"Jeg har brug for mere"}
            </Button>
            <Button
              onClick={handleFinish}
              className="flex-1 gap-2 bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Check className="h-4 w-4" />
              {"Videre"}
            </Button>
          </div>
        </div>
      )}

      {/* Back button -- only on grid view */}
      {view === "grid" && completed.length === 0 && (
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
            {"Tilbage"}
          </Button>
        </div>
      )}
    </div>
  )
}
