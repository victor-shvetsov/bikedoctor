"use client"

import { X, Database, FolderOpen, Link2, ArrowUpRight, GitBranch, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FeatureStatusDot, STATUS_CONFIG, PRIORITY_CONFIG } from "./feature-item"
import {
  getFeatureDependencies,
  getFeatureDependents,
  type Feature,
  type Module,
} from "@/lib/project-map-data"

interface DetailPanelProps {
  feature: Feature | null
  module: Module | null
  onClose: () => void
}

export function DetailPanel({ feature, module, onClose }: DetailPanelProps) {
  if (!feature || !module) return null

  const status = STATUS_CONFIG[feature.status]
  const priority = PRIORITY_CONFIG[feature.priority]
  const dependencies = getFeatureDependencies(feature.id)
  const dependents = getFeatureDependents(feature.id)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`border px-1.5 text-[10px] ${status.className}`}
              >
                {status.label}
              </Badge>
              <Badge
                variant="outline"
                className={`border-transparent px-1.5 text-[10px] ${priority.className}`}
              >
                {priority.label} Priority
              </Badge>
            </div>
            <h2 className="mt-2 text-base font-semibold text-foreground">
              {feature.name}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className={module.color}>{module.shortName}</span>
              {" / "}
              <span className="font-mono">{feature.id}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Description */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
              {feature.description}
            </p>
          </div>

          <Separator className="my-4" />

          {/* Dependencies */}
          {dependencies.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Link2 className="h-3 w-3" />
                Depends On ({dependencies.length})
              </h4>
              <div className="mt-2 space-y-1.5">
                {dependencies.map(({ module: depMod, feature: depFeat }) => (
                  <div
                    key={depFeat.id}
                    className="flex items-center gap-2 rounded-md bg-secondary/50 px-2.5 py-1.5"
                  >
                    <FeatureStatusDot status={depFeat.status} />
                    <span className="flex-1 text-xs text-foreground/80">
                      {depFeat.name}
                    </span>
                    <span className={`text-[10px] ${depMod.color} font-mono`}>
                      {depMod.shortName}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* Dependents (what depends on this) */}
          {dependents.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <GitBranch className="h-3 w-3" />
                Required By ({dependents.length})
              </h4>
              <div className="mt-2 space-y-1.5">
                {dependents.map(({ module: depMod, feature: depFeat }) => (
                  <div
                    key={depFeat.id}
                    className="flex items-center gap-2 rounded-md bg-secondary/50 px-2.5 py-1.5"
                  >
                    <FeatureStatusDot status={depFeat.status} />
                    <span className="flex-1 text-xs text-foreground/80">
                      {depFeat.name}
                    </span>
                    <span className={`text-[10px] ${depMod.color} font-mono`}>
                      {depMod.shortName}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* Database tables */}
          {feature.relatedTables && feature.relatedTables.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Database className="h-3 w-3" />
                Database Tables
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {feature.relatedTables.map((table) => (
                  <Badge
                    key={table}
                    variant="outline"
                    className="border-border font-mono text-[11px] text-muted-foreground"
                  >
                    {table}
                  </Badge>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* API routes */}
          {feature.apiRoutes && feature.apiRoutes.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <ArrowUpRight className="h-3 w-3" />
                API Routes
              </h4>
              <div className="mt-2 space-y-1">
                {feature.apiRoutes.map((route) => (
                  <div
                    key={route}
                    className="rounded-md bg-secondary/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {route}
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* Folder paths */}
          {feature.folderPaths && feature.folderPaths.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <FolderOpen className="h-3 w-3" />
                File Paths
              </h4>
              <div className="mt-2 space-y-1">
                {feature.folderPaths.map((path) => (
                  <div
                    key={path}
                    className="rounded-md bg-secondary/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {path}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blocking notice if dependencies are not done */}
          {dependencies.some((d) => d.feature.status !== "done") && (
            <>
              <Separator className="my-4" />
              <div className="flex items-start gap-2 rounded-md border border-[#F15C45]/20 bg-[#F15C45]/5 p-3">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F15C45]" />
                <div>
                  <p className="text-xs font-medium text-[#F15C45]">
                    Blocked by dependencies
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#F15C45]/70">
                    {dependencies.filter((d) => d.feature.status !== "done").length} of{" "}
                    {dependencies.length} dependencies are not yet complete.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
