import Link from "next/link"
import type { PageContent } from "@/lib/types"

interface CrossLinksProps {
  links: Pick<PageContent, "slug" | "h1" | "template_type">[]
}

const TYPE_LABELS: Record<string, string> = {
  location: "Omrade",
  "bike-type": "Cykeltype",
  brand: "Maerke",
  pricing: "Priser",
  info: "Info",
  homepage: "Forside",
}

export function CrossLinks({ links }: CrossLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <section className="border-t border-border py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-lg font-semibold text-foreground">
          Se ogsa
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.slug}
              href={link.slug === "/" ? "/" : `/${link.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              {TYPE_LABELS[link.template_type] && (
                <span className="text-xs text-muted-foreground">
                  {TYPE_LABELS[link.template_type]}
                </span>
              )}
              {link.h1.replace(/\s*[-–—].*$/, "").trim()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
