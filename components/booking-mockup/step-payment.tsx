"use client"

import { useState } from "react"
import { CreditCard, Banknote, Check, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PaymentMethod = "card" | "at-arrival" | null

interface StepPaymentProps {
  totalPrice: number
  onComplete: (method: "card" | "at-arrival") => void
  onBack: () => void
}

export function StepPayment({ totalPrice, onComplete, onBack }: StepPaymentProps) {
  const [method, setMethod] = useState<PaymentMethod>(null)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">{"Betaling"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {"V\u00e6lg hvordan du vil betale"}
        </p>
      </div>

      {/* Total */}
      <div className="rounded-xl border border-border bg-secondary/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">{"Total"}</p>
        <p className="text-3xl font-bold text-foreground">
          {totalPrice.toLocaleString("da-DK")}
          <span className="text-base font-normal text-muted-foreground">{" kr"}</span>
        </p>
      </div>

      {/* Payment method cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Pay now */}
        <button
          onClick={() => setMethod("card")}
          className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
            method === "card"
              ? "border-accent bg-accent/5 shadow-sm"
              : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              method === "card" ? "bg-accent/15 text-accent" : "bg-secondary text-foreground"
            }`}
          >
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">{"Betal nu"}</p>
            <p className="text-xs text-muted-foreground">{"Sikker betaling med kort"}</p>
          </div>
          {method === "card" && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
              <Check className="h-3 w-3 text-accent-foreground" />
            </div>
          )}
        </button>

        {/* Pay at arrival */}
        <button
          onClick={() => setMethod("at-arrival")}
          className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
            method === "at-arrival"
              ? "border-accent bg-accent/5 shadow-sm"
              : "border-border bg-card hover:border-accent/50 hover:shadow-sm"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
              method === "at-arrival"
                ? "bg-accent/15 text-accent"
                : "bg-secondary text-foreground"
            }`}
          >
            <Banknote className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">{"Betal til mekaniker"}</p>
            <p className="text-xs text-muted-foreground">{"Betal ved ankomst"}</p>
          </div>
          {method === "at-arrival" && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent">
              <Check className="h-3 w-3 text-accent-foreground" />
            </div>
          )}
        </button>
      </div>

      {/* Stripe-like card form (mockup only) */}
      {method === "card" && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {"Sikker forbindelse via Stripe"}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-foreground">{"Kortnummer"}</Label>
              <Input
                placeholder="4242 4242 4242 4242"
                className="border-border bg-background font-mono tracking-wider"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-foreground">{"Udl\u00f8b"}</Label>
                <Input
                  placeholder="MM / \u00c5\u00c5"
                  className="border-border bg-background"
                  maxLength={7}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-foreground">{"CVC"}</Label>
                <Input
                  placeholder="123"
                  className="border-border bg-background"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation for pay-at-arrival */}
      {method === "at-arrival" && (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {"Du betaler direkte til mekanikeren n\u00e5r han ankommer. Vi sender en bekr\u00e6ftelse p\u00e5 SMS og email med alle detaljer."}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
          {"Tilbage"}
        </Button>
        <Button
          onClick={() => method && onComplete(method)}
          disabled={!method}
          className="bg-accent px-8 font-semibold text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
        >
          {method === "card" ? `Betal ${totalPrice.toLocaleString("da-DK")} kr` : "Bekr\u00e6ft booking"}
        </Button>
      </div>
    </div>
  )
}
