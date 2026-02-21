"use client"

import { useState } from "react"
import type { FaqItem } from "@/lib/types"
import { ChevronDown } from "lucide-react"

interface FaqSectionProps {
  faqs: FaqItem[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="bg-card py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {"Ofte stillede sp\u00f8rgsm\u00e5l"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {"Find svar p\u00e5 de mest almindelige sp\u00f8rgsm\u00e5l"}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-accent/20 bg-background"
                    : "border-border/60 bg-background"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">
                    {faq.question}
                  </span>
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-accent/10"
                        : "bg-secondary"
                    }`}
                  >
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
