"use client"

import { useState } from "react"
import {
  InternalNav,
} from "@/components/internal-nav"
import {
  PHASES,
  BLOCKS,
  getPhaseProgress,
  getOverallStats,
  getCurrentBlock,
  type Block,
  type BlockStatus,
} from "@/lib/sprint-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileCode,
  Target,
  Clock,
  Zap,
  Lock,
  MessageSquare,
} from "lucide-react"

const STATUS_CONFIG: Record<BlockStatus, { label: string; color: string; bg: string }> = {
  done: { label: "Done", color: "text-[#2a7d6d]", bg: "bg-[#2a7d6d]/10 border-[#2a7d6d]/20" },
  "in-progress": { label: "Building", color: "text-[#F15C45]", bg: "bg-[#F15C45]/10 border-[#F15C45]/20" },
  next: { label: "Next Up", color: "text-[#082852]", bg: "bg-[#082852]/10 border-[#082852]/20" },
  queued: { label: "Queued", color: "text-[#4a6a8a]", bg: "bg-[#4a6a8a]/10 border-[#4a6a8a]/20" },
  blocked: { label: "Blocked", color: "text-[#d94535]", bg: "bg-[#d94535]/10 border-[#d94535]/20" },
}

function BlockCard({ block, isExpanded, onToggle }: { block: Block; isExpanded: boolean; onToggle: () => void }) {
  const status = STATUS_CONFIG[block.status]
  const criteriaMet = block.acceptanceCriteria.filter((c) => c.met).length
  const criteriaTotal = block.acceptanceCriteria.length
  const criteriaPercent = criteriaTotal > 0 ? Math.round((criteriaMet / criteriaTotal) * 100) : 0

  return (
    <Card
      className={`overflow-hidden transition-all duration-200 ${
        block.status === "next" ? "ring-2 ring-[#F15C45]/40" : ""
      } ${block.status === "in-progress" ? "ring-2 ring-[#F15C45]" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
      >
        <CardHeader className="px-3 sm:px-6 pb-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
              <span className="mt-0.5 shrink-0 font-mono text-xs sm:text-sm font-bold text-[#082852]/40">
                {block.id}
              </span>
              <div className="min-w-0">
                <CardTitle className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                  {block.name}
                </CardTitle>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {block.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Badge variant="outline" className={`${status.bg} ${status.color} border text-[10px] sm:text-xs font-medium px-1.5 sm:px-2.5`}>
                {status.label}
              </Badge>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {criteriaTotal > 0 && (
            <div className="mt-3 flex items-center gap-3">
              <Progress value={criteriaPercent} className="h-1.5 flex-1" />
              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                {criteriaMet}/{criteriaTotal}
              </span>
            </div>
          )}
        </CardHeader>
      </button>

      {isExpanded && (
        <CardContent className="border-t pt-4 px-3 sm:px-6 space-y-4 sm:space-y-5">
          {/* Owner Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-[#F15C45]" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Requirements
              </h4>
            </div>
            {block.ownerNotes ? (
              <div className="rounded-md border border-[#F15C45]/20 bg-[#F15C45]/5 p-3">
                <p className="text-sm text-foreground whitespace-pre-wrap">{block.ownerNotes}</p>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border bg-muted/30 p-3">
                <p className="text-sm text-muted-foreground italic">
                  No requirements added yet. Tell me in chat how you want this block to work and I will update this field before building.
                </p>
              </div>
            )}
          </div>

          {/* Acceptance Criteria */}
          {block.acceptanceCriteria.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-3.5 w-3.5 text-[#082852]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Acceptance Criteria
                </h4>
              </div>
              <ul className="space-y-1.5">
                {block.acceptanceCriteria.map((criterion) => (
                  <li key={criterion.id} className="flex items-start gap-2">
                    {criterion.met ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2a7d6d]" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-border" />
                    )}
                    <span className={`text-sm ${criterion.met ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {criterion.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Files */}
          {block.files.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCode className="h-3.5 w-3.5 text-[#4a6a8a]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Files ({block.files.length})
                </h4>
              </div>
              <div className="space-y-1">
                {block.files.map((file) => (
                  <div
                    key={file.path}
                    className="flex items-center gap-2 rounded px-2 py-1 text-sm"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        file.status === "done"
                          ? "bg-[#2a7d6d]"
                          : file.status === "scaffolded"
                          ? "bg-[#F15C45]"
                          : "bg-border"
                      }`}
                    />
                    <code className="font-mono text-xs text-foreground truncate">{file.path}</code>
                    {file.notes && (
                      <span className="text-xs text-muted-foreground ml-auto hidden sm:inline truncate max-w-[200px]">
                        {file.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies */}
          {block.dependsOn && block.dependsOn.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>
                Depends on: {block.dependsOn.map((dep) => {
                  const depBlock = BLOCKS.find(b => b.id === dep)
                  return depBlock ? `${dep} ${depBlock.name}` : dep
                }).join(", ")}
              </span>
            </div>
          )}

          {/* Prompt hint */}
          {(block.status === "next" || block.status === "queued") && (
            <div className="rounded-md bg-muted/50 p-3 flex items-start gap-2">
              <Zap className="h-4 w-4 shrink-0 text-[#F15C45] mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">To build this block:</span>{" "}
                First add your requirements above by telling me in chat. Then say{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-[#F15C45]">
                  Build Block {block.id}
                </code>
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default function SprintBoardPage() {
  const stats = getOverallStats()
  const current = getCurrentBlock()
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(
    new Set(current ? [current.id] : [])
  )

  const toggleBlock = (id: string) => {
    setExpandedBlocks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <InternalNav />

        <main className="mx-auto max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
        {/* Stats Overview */}
        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Blocks</p>
              <p className="mt-1 text-2xl font-bold text-foreground font-mono">
                {stats.doneBlocks}<span className="text-muted-foreground text-base font-normal">/{stats.totalBlocks}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Criteria Met</p>
              <p className="mt-1 text-2xl font-bold text-foreground font-mono">
                {stats.metCriteria}<span className="text-muted-foreground text-base font-normal">/{stats.totalCriteria}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Files Done</p>
              <p className="mt-1 text-2xl font-bold text-foreground font-mono">
                {stats.doneFiles}<span className="text-muted-foreground text-base font-normal">/{stats.totalFiles}</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current</p>
              <p className="mt-1 text-lg font-bold text-[#F15C45] font-mono">
                {current ? `Block ${current.id}` : "---"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Phases + Blocks */}
        {PHASES.map((phase) => {
          const phaseBlocks = BLOCKS.filter((b) => b.phase === phase.number)
          const progress = getPhaseProgress(phase.number)

          return (
            <section key={phase.number} className="mb-10">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      phase.status === "active"
                        ? "bg-[#F15C45] text-white"
                        : phase.status === "done"
                        ? "bg-[#2a7d6d] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {phase.number}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      Phase {phase.number}: {phase.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">{phase.goal}</p>
                  </div>
                </div>
                <div className="ml-0 sm:ml-10 mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Progress value={progress.percentage} className="h-1.5 flex-1 max-w-xs" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {progress.done}/{progress.total} blocks | {progress.criteriaMet}/{progress.criteriaTotal} criteria
                  </span>
                </div>
              </div>

              <div className="ml-3 border-l-2 border-border pl-6 space-y-3">
                {phaseBlocks.map((block) => (
                  <BlockCard
                    key={block.id}
                    block={block}
                    isExpanded={expandedBlocks.has(block.id)}
                    onToggle={() => toggleBlock(block.id)}
                  />
                ))}
              </div>
            </section>
          )
        })}

        {/* Instructions */}
        <Card className="mt-6 sm:mt-8 border-dashed">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 shrink-0 text-[#F15C45] mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">How to use this board</h3>
                <ol className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>
                    <span className="font-mono text-[#F15C45] font-medium">1.</span>{" "}
                    Review a block and tell me in chat exactly how you want it to work
                  </li>
                  <li>
                    <span className="font-mono text-[#F15C45] font-medium">2.</span>{" "}
                    I will update the <span className="font-medium text-foreground">Your Requirements</span> field with your specs
                  </li>
                  <li>
                    <span className="font-mono text-[#F15C45] font-medium">3.</span>{" "}
                    Say <code className="rounded bg-muted px-1 py-0.5 font-mono">Build Block X.Y</code> and I will build exactly that, nothing more
                  </li>
                  <li>
                    <span className="font-mono text-[#F15C45] font-medium">4.</span>{" "}
                    After it ships, criteria get checked off and the board updates automatically
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
