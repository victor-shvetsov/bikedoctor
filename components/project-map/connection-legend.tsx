"use client"

import { useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { MODULE_CONNECTIONS, PROJECT_MODULES } from "@/lib/project-map-data"

export function ConnectionLegend() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Data Flow Connections
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {MODULE_CONNECTIONS.length} connections between modules (visible as lines on desktop)
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MODULE_CONNECTIONS.map((conn) => {
            const source = PROJECT_MODULES.find((m) => m.id === conn.sourceId)
            const target = PROJECT_MODULES.find((m) => m.id === conn.targetId)
            if (!source || !target) return null

            return (
              <div
                key={`${conn.sourceId}-${conn.targetId}`}
                className="group flex flex-col rounded-md border border-border/50 bg-secondary/30 p-2.5 transition-colors hover:bg-secondary/60"
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <span className={`font-medium ${source.color}`}>
                    {source.shortName}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
                  <span className={`font-medium ${target.color}`}>
                    {target.shortName}
                  </span>
                </div>
                <p className="mt-1 text-[11px] font-medium text-foreground/70">
                  {conn.label}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {conn.description}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
