"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  getOverallProgress,
  PROJECT_MODULES,
  type FeatureStatus,
} from "@/lib/project-map-data"

const STATUS_FILTERS: { label: string; value: FeatureStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Planned", value: "planned" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
]

interface ProgressHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: FeatureStatus | "all"
  onStatusFilterChange: (status: FeatureStatus | "all") => void
}

export function ProgressHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ProgressHeaderProps) {
  const progress = getOverallProgress()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1800px] px-4 py-3 sm:px-6 lg:px-8">
        {/* Top row: Stats */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-mono">
              {progress.totalFeatures} features across {PROJECT_MODULES.length} modules
            </p>
          </div>

          {/* Progress stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#4a6a8a]" />
                <span className="text-muted-foreground font-mono">
                  {progress.planned} planned
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F15C45]" />
                <span className="text-muted-foreground font-mono">
                  {progress.inProgress} active
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#2a7d6d]" />
                <span className="text-muted-foreground font-mono">
                  {progress.done} done
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={progress.percentage} className="h-1.5 w-24" />
              <span className="text-xs font-semibold text-foreground font-mono">
                {progress.percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: Search + Filters */}
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search features, modules, tables..."
              className="h-8 pl-8 text-xs bg-secondary/50 border-border font-mono placeholder:text-muted-foreground/50"
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-3 text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <Filter className="h-3 w-3" />
            Filter
          </button>

          <div
            className={`${isFilterOpen ? "flex" : "hidden"} sm:flex items-center gap-1.5`}
          >
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onStatusFilterChange(filter.value)}
                className="relative"
              >
                <Badge
                  variant={statusFilter === filter.value ? "default" : "outline"}
                  className={`cursor-pointer text-[11px] transition-all ${
                    statusFilter === filter.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground border-border"
                  }`}
                >
                  {filter.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
