"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  MODULE_CONNECTIONS,
  PROJECT_MODULES,
} from "@/lib/project-map-data"

interface Point {
  x: number
  y: number
}

interface ConnectionPath {
  sourceId: string
  targetId: string
  label: string
  sourceColor: string
  sourcePt: Point
  targetPt: Point
}

export function ConnectionLines({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [paths, setPaths] = useState<ConnectionPath[]>([])
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const computePaths = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const scrollLeft = container.scrollLeft
    const scrollTop = container.scrollTop

    const newPaths: ConnectionPath[] = []

    for (const conn of MODULE_CONNECTIONS) {
      const sourceEl = container.querySelector(`[data-module-id="${conn.sourceId}"]`)
      const targetEl = container.querySelector(`[data-module-id="${conn.targetId}"]`)

      if (!sourceEl || !targetEl) continue

      const sourceRect = sourceEl.getBoundingClientRect()
      const targetRect = targetEl.getBoundingClientRect()

      const sourceModule = PROJECT_MODULES.find((m) => m.id === conn.sourceId)

      // Calculate center points relative to the container
      const sourcePt: Point = {
        x: sourceRect.left - containerRect.left + scrollLeft + sourceRect.width / 2,
        y: sourceRect.top - containerRect.top + scrollTop + sourceRect.height / 2,
      }
      const targetPt: Point = {
        x: targetRect.left - containerRect.left + scrollLeft + targetRect.width / 2,
        y: targetRect.top - containerRect.top + scrollTop + targetRect.height / 2,
      }

      // Connect from edge of source to edge of target
      const angle = Math.atan2(targetPt.y - sourcePt.y, targetPt.x - sourcePt.x)
      const sourceEdge: Point = {
        x: sourcePt.x + Math.cos(angle) * (sourceRect.width / 2),
        y: sourcePt.y + Math.sin(angle) * (sourceRect.height / 2),
      }
      const targetEdge: Point = {
        x: targetPt.x - Math.cos(angle) * (targetRect.width / 2),
        y: targetPt.y - Math.sin(angle) * (targetRect.height / 2),
      }

      newPaths.push({
        sourceId: conn.sourceId,
        targetId: conn.targetId,
        label: conn.label,
        sourceColor: sourceModule?.colorHex || "#082852",
        sourcePt: sourceEdge,
        targetPt: targetEdge,
      })
    }

    setPaths(newPaths)
  }, [containerRef])

  useEffect(() => {
    computePaths()

    const observer = new ResizeObserver(() => {
      computePaths()
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener("resize", computePaths)
    window.addEventListener("scroll", computePaths, true)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", computePaths)
      window.removeEventListener("scroll", computePaths, true)
    }
  }, [computePaths, containerRef])

  if (paths.length === 0) return null

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      style={{
        width: containerRef.current?.scrollWidth || "100%",
        height: containerRef.current?.scrollHeight || "100%",
      }}
    >
      <defs>
        {paths.map((path) => {
          const id = `${path.sourceId}-${path.targetId}`
          return (
            <marker
              key={`arrow-${id}`}
              id={`arrow-${id}`}
              viewBox="0 0 10 7"
              refX="9"
              refY="3.5"
              markerWidth="6"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 3.5 L 0 7 z" fill={path.sourceColor} opacity="0.4" />
            </marker>
          )
        })}
      </defs>

      {paths.map((path) => {
        const id = `${path.sourceId}-${path.targetId}`
        const isHovered = hoveredConnection === id
        const dx = path.targetPt.x - path.sourcePt.x
        const dy = path.targetPt.y - path.sourcePt.y

        // Curved path
        const cx1 = path.sourcePt.x + dx * 0.4
        const cy1 = path.sourcePt.y
        const cx2 = path.targetPt.x - dx * 0.4
        const cy2 = path.targetPt.y

        const d = `M ${path.sourcePt.x} ${path.sourcePt.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${path.targetPt.x} ${path.targetPt.y}`

        return (
          <g key={id}>
            {/* Invisible wider path for hover detection */}
            <path
              d={d}
              fill="none"
              stroke="transparent"
              strokeWidth="16"
              className="pointer-events-auto cursor-pointer"
              onMouseEnter={() => setHoveredConnection(id)}
              onMouseLeave={() => setHoveredConnection(null)}
            />
            {/* Visible path */}
            <path
              d={d}
              fill="none"
              stroke={path.sourceColor}
              strokeWidth={isHovered ? 1.5 : 0.75}
              strokeDasharray={isHovered ? "none" : "4 4"}
              opacity={isHovered ? 0.7 : 0.15}
              markerEnd={`url(#arrow-${id})`}
              className="transition-all duration-200"
            />
            {/* Label on hover */}
            {isHovered && (
              <text
                x={(path.sourcePt.x + path.targetPt.x) / 2}
                y={(path.sourcePt.y + path.targetPt.y) / 2 - 8}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-mono"
              >
                {path.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
