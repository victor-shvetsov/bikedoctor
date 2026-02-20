"use client"

import { useState } from "react"
import {
  Globe,
  Users,
  Package,
  Bell,
  Wrench,
  User,
  Shield,
  Search,
  Sparkles,
  ChevronDown,
  Database,
  FolderOpen,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FeatureItem } from "./feature-item"
import {
  getModuleProgress,
  type Module,
  type Feature,
  type FeatureStatus,
} from "@/lib/project-map-data"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Users,
  Package,
  Bell,
  Wrench,
  User,
  Shield,
  Search,
  Sparkles,
}

interface ModuleCardProps {
  module: Module
  statusFilter: FeatureStatus | "all"
  searchQuery: string
  onFeatureSelect: (feature: Feature, module: Module) => void
  isHighlighted?: boolean
}

export function ModuleCard({
  module,
  statusFilter,
  searchQuery,
  onFeatureSelect,
  isHighlighted = false,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = getModuleProgress(module.id)
  const Icon = ICON_MAP[module.icon] || Globe

  // Filter features based on status and search
  const filteredFeatures = module.features.filter((feature) => {
    const matchesStatus =
      statusFilter === "all" || feature.status === statusFilter
    const matchesSearch =
      searchQuery === "" ||
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.relatedTables?.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesStatus && matchesSearch
  })

  // Check if module matches search (module-level match)
  const moduleMatchesSearch =
    searchQuery === "" ||
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.relatedTables.some((t) =>
      t.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    filteredFeatures.length > 0

  if (!moduleMatchesSearch && searchQuery !== "") return null

  const hasFilteredFeatures = filteredFeatures.length > 0
  const shouldAutoExpand = searchQuery !== "" && hasFilteredFeatures

  return (
    <Card
      className={`group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-border/80 ${
        isHighlighted ? "ring-1 ring-primary/30" : ""
      } ${shouldAutoExpand || isExpanded ? "" : "hover:translate-y-[-1px]"}`}
    >
      {/* Color accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-0.5 ${module.color.replace("text-", "bg-")}`}
      />

      {/* Module header */}
      <button
        onClick={() => setIsExpanded(!isExpanded && !shouldAutoExpand)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        {/* Icon */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary ${module.color}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-foreground">
              {module.name}
            </h3>
            <Badge
              variant="outline"
              className="shrink-0 border-border text-[10px] text-muted-foreground"
            >
              {filteredFeatures.length}/{module.features.length}
            </Badge>
          </div>

          {/* Description */}
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {module.description}
          </p>

          {/* Progress bar */}
          <div className="mt-2.5 flex items-center gap-2">
            <Progress value={progress.percentage} className="h-1 flex-1" />
            <span className="text-[10px] font-medium text-muted-foreground font-mono">
              {progress.percentage}%
            </span>
          </div>
        </div>

        {/* Expand chevron */}
        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            shouldAutoExpand || isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded features list */}
      {(shouldAutoExpand || isExpanded) && (
        <div className="border-t border-border px-4 pb-3 pt-2">
          {/* Features */}
          {hasFilteredFeatures ? (
            <div className="space-y-0.5">
              {filteredFeatures.map((feature) => (
                <FeatureItem
                  key={feature.id}
                  feature={feature}
                  onSelect={(f) => onFeatureSelect(f, module)}
                  isHighlighted={
                    searchQuery !== "" &&
                    (feature.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                      feature.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
                  }
                />
              ))}
            </div>
          ) : (
            <p className="py-2 text-center text-xs text-muted-foreground">
              No features match the current filter
            </p>
          )}

          {/* Module metadata */}
          <div className="mt-3 flex flex-wrap gap-3 border-t border-border/50 pt-3">
            {module.relatedTables.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Database className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground font-mono">
                  {module.relatedTables.join(", ")}
                </span>
              </div>
            )}
            {module.folderPaths.length > 0 && (
              <div className="flex items-center gap-1.5">
                <FolderOpen className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground font-mono">
                  {module.folderPaths.join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
