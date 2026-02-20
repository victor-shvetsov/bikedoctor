"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowRight, Database, Link2 } from "lucide-react"
import type { Feature, FeaturePriority, FeatureStatus } from "@/lib/project-map-data"

const STATUS_CONFIG: Record<
  FeatureStatus,
  { label: string; className: string; dotClassName: string }
> = {
  planned: {
    label: "Planned",
    className: "bg-[#4a6a8a]/10 text-[#4a6a8a] border-[#4a6a8a]/20",
    dotClassName: "bg-[#4a6a8a]",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-[#F15C45]/10 text-[#F15C45] border-[#F15C45]/20",
    dotClassName: "bg-[#F15C45]",
  },
  done: {
    label: "Done",
    className: "bg-[#2a7d6d]/10 text-[#2a7d6d] border-[#2a7d6d]/20",
    dotClassName: "bg-[#2a7d6d]",
  },
}

const PRIORITY_CONFIG: Record<FeaturePriority, { label: string; className: string }> = {
  critical: { label: "Critical", className: "text-[#d94535]" },
  high: { label: "High", className: "text-[#F15C45]" },
  medium: { label: "Medium", className: "text-[#0c3a6e]" },
  low: { label: "Low", className: "text-[#4a6a8a]" },
}

interface FeatureItemProps {
  feature: Feature
  onSelect: (feature: Feature) => void
  isHighlighted?: boolean
}

export function FeatureItem({ feature, onSelect, isHighlighted = false }: FeatureItemProps) {
  const status = STATUS_CONFIG[feature.status]
  const priority = PRIORITY_CONFIG[feature.priority]

  return (
    <button
      onClick={() => onSelect(feature)}
      className={`group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-all hover:bg-secondary/80 ${
        isHighlighted ? "bg-primary/5 ring-1 ring-primary/20" : ""
      }`}
    >
      {/* Status dot */}
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${status.dotClassName}`} />

      {/* Feature name */}
      <span className="flex-1 truncate text-xs text-foreground/80 group-hover:text-foreground transition-colors">
        {feature.name}
      </span>

      {/* Indicators */}
      <div className="flex shrink-0 items-center gap-1">
        {feature.dependencies && feature.dependencies.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground/40">
                <Link2 className="h-2.5 w-2.5" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[11px]">
              {feature.dependencies.length} {feature.dependencies.length === 1 ? "dependency" : "dependencies"}
            </TooltipContent>
          </Tooltip>
        )}
        {feature.relatedTables && feature.relatedTables.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground/40">
                <Database className="h-2.5 w-2.5" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[11px]">
              {feature.relatedTables.join(", ")}
            </TooltipContent>
          </Tooltip>
        )}
        <Badge
          variant="outline"
          className={`h-4 border px-1 text-[9px] leading-none ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      {/* Hover arrow */}
      <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/0 transition-all group-hover:text-muted-foreground/60 group-hover:translate-x-0.5" />
    </button>
  )
}

export function FeatureStatusDot({ status }: { status: FeatureStatus }) {
  const config = STATUS_CONFIG[status]
  return <span className={`inline-block h-2 w-2 rounded-full ${config.dotClassName}`} />
}

export { STATUS_CONFIG, PRIORITY_CONFIG }
