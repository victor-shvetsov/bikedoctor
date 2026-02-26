"use client"

import { useState, useRef } from "react"
import {
  CircleDot,
  Wrench,
  Settings,
  FileText,
  Upload,
  Check,
  ImageIcon,
  X,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  MAIN_SERVICES,
  MAINTENANCE_OPTIONS,
  getTubeOptions,
  getTroubleshootPlaceholder,
  getMessagePlaceholder,
  getMaintenancePlaceholder,
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

interface StepServicesProps {
  bikeType: BikeTypeOption
  onNext: (selection: {
    service: ServiceCardType
    subOption?: string
    message: string
    imageFile?: File | null
    price: number
    billingCycle?: "yearly" | "monthly"
  }) => void
  onBack: () => void
}

export function StepServices({ bikeType, onNext, onBack }: StepServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceCardType | null>(null)
  const [selectedTube, setSelectedTube] = useState<TubeOption | null>(null)
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceOption | null>(null)
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly")
  const [message, setMessage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tubeOptions = getTubeOptions(bikeType.slug)
  const yearlyPrice = getServiceaftalePriceYearly(bikeType.slug)
  const monthlyPrice = Math.round((yearlyPrice / 12) * 1.15)

  const canProceed = () => {
    if (!selectedService) return false
    if (selectedService === "flat-tyre" && !selectedTube) return false
    if (selectedService === "maintenance" && !selectedMaintenance) return false
    return true
  }

  const getCurrentPrice = (): number => {
    if (selectedService === "flat-tyre" && selectedTube) return selectedTube.price
    if (selectedService === "troubleshoot") return 499
    if (selectedService === "maintenance" && selectedMaintenance) return selectedMaintenance.price
    if (selectedService === "serviceaftale") {
      return billingCycle === "yearly" ? yearlyPrice : monthlyPrice * 12
    }
    return 0
  }

  const handleNext = () => {
    if (!selectedService || !canProceed()) return
    onNext({
      service: selectedService,
      subOption:
        selectedTube?.id ?? selectedMaintenance?.id ?? (selectedService === "serviceaftale" ? billingCycle : undefined),
      message,
      imageFile,
      price: getCurrentPrice(),
      billingCycle: selectedService === "serviceaftale" ? billingCycle : undefined,
    })
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const getPlaceholder = (): string => {
    if (selectedService === "troubleshoot") return getTroubleshootPlaceholder(bikeType.slug)
    if (selectedService === "maintenance") return getMaintenancePlaceholder(bikeType.slug)
    return getMessagePlaceholder(bikeType.slug)
  }

  const showMessageArea =
    (selectedService === "flat-tyre" && selectedTube) ||
    selectedService === "troubleshoot" ||
    (selectedService === "maintenance" && selectedMaintenance) ||
    selectedService === "serviceaftale"

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

      {/* Service cards -- 2x2 grid like bike type step */}
      {!selectedService && (
        <div className="grid grid-cols-2 gap-3">
          {MAIN_SERVICES.map((svc) => {
            const Icon = serviceIcons[svc.id]
            return (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc.id)}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md active:scale-[0.97]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-accent/10">
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-foreground">{svc.title}</span>
                  <p className="mt-0.5 text-xs text-muted-foreground">{svc.subtitle}</p>
                </div>
                {svc.price !== null && (
                  <span className="rounded-full bg-muted/50 px-3 py-0.5 text-xs font-semibold text-foreground">
                    {"fra "}{svc.price}{",-"}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Selected service header with back */}
      {selectedService && (
        <div>
          <button
            onClick={() => {
              setSelectedService(null)
              setSelectedTube(null)
              setSelectedMaintenance(null)
            }}
            className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {"Alle services"}
          </button>

          {/* Active service badge */}
          {(() => {
            const svc = MAIN_SERVICES.find((s) => s.id === selectedService)
            const Icon = serviceIcons[selectedService]
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
          {selectedService === "flat-tyre" && (
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
            </div>
          )}

          {/* Sub-options for maintenance */}
          {selectedService === "maintenance" && (
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
            </div>
          )}

          {/* Sub-options for serviceaftale */}
          {selectedService === "serviceaftale" && (
            <div className="flex flex-col gap-4">
              {/* Yearly/monthly toggle */}
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
            </div>
          )}
        </div>
      )}

      {/* Message + image upload area */}
      {showMessageArea && (
        <div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/20 p-5">
          <label className="text-sm font-medium text-foreground">
            {"Besked til mekaniker"}
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={getPlaceholder()}
            rows={3}
            className="resize-none border-border/60 bg-card text-sm"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleImageUpload}
              className="flex items-center gap-2 rounded-lg border border-dashed border-border/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {imageFile ? (
                <>
                  <ImageIcon className="h-4 w-4" />
                  <span className="max-w-[150px] truncate">{imageFile.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImageFile(null)
                    }}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>{"Upload billede"}</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          {"Tilbage"}
        </Button>
        {selectedService && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
          >
            {"N\u00e6ste"}
          </Button>
        )}
      </div>
    </div>
  )
}
