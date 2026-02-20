"use client"

import { useState, useRef } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { InternalNav } from "@/components/internal-nav"
import { ProgressHeader } from "@/components/project-map/progress-header"
import { ModuleCard } from "@/components/project-map/module-card"
import { ConnectionLines } from "@/components/project-map/connection-lines"
import { DetailPanel } from "@/components/project-map/detail-panel"
import { ConnectionLegend } from "@/components/project-map/connection-legend"
import {
  PROJECT_MODULES,
  type Feature,
  type Module,
  type FeatureStatus,
} from "@/lib/project-map-data"

export default function ProjectMapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<FeatureStatus | "all">("all")
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleFeatureSelect = (feature: Feature, module: Module) => {
    setSelectedFeature(feature)
    setSelectedModule(module)
  }

  const handleCloseDetail = () => {
    setSelectedFeature(null)
    setSelectedModule(null)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen flex-col bg-background">
        <InternalNav />

        {/* Background grid pattern */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(8, 40, 82, 0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <ProgressHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <main className="relative z-10 mx-auto w-full max-w-[1800px] flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
          {/* Connection lines SVG layer */}
          <div ref={gridRef} className="relative">
            <ConnectionLines containerRef={gridRef} />

            {/* Module cards grid */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PROJECT_MODULES.map((module) => (
                <div key={module.id} data-module-id={module.id}>
                  <ModuleCard
                    module={module}
                    statusFilter={statusFilter}
                    searchQuery={searchQuery}
                    onFeatureSelect={handleFeatureSelect}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Connection legend */}
          <ConnectionLegend />
        </main>

        {/* Feature detail panel */}
        <DetailPanel
          feature={selectedFeature}
          module={selectedModule}
          onClose={handleCloseDetail}
        />
      </div>
    </TooltipProvider>
  )
}
