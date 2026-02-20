"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Unhandled error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Fejl
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
          Noget gik galt
        </h1>
        <p className="mt-3 text-base text-muted-foreground text-pretty">
          Der opstod en uventet fejl. Prøv venligst igen.
        </p>
        <div className="mt-8">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Prøv igen
          </button>
        </div>
      </div>
    </div>
  )
}
