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
    <section className="bd-section bg-secondary">
      <div className="bd-container max-w-3xl">
        <div className="text-center">
          <h2 className="bd-heading">
            Ofte stillede <span className="bd-heading-accent">sporgsmal</span>
          </h2>
          <p className="bd-body mx-auto mt-3 max-w-xl">
            Find svar pa de mest almindelige sporgsmal
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="bd-card">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {faq.question}
                  </span>
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-accent/10" : "bg-secondary"
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
                    <div className="pt-4 text-sm leading-relaxed text-muted-foreground">
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
