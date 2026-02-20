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
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-bold text-foreground">
          Ofte stillede sporgsmal
        </h2>
        <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
