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
    <section className="bg-background py-14">
      <div className="bd-container">
        <h2 className="text-lg font-semibold text-foreground">Se ogsa</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {links.map((link) => (
            <Link
              key={link.slug}
              href={link.slug === "/" ? "/" : `/${link.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md"
            >
              {TYPE_LABELS[link.template_type] && (
                <span className="text-xs text-muted-foreground">
                  {TYPE_LABELS[link.template_type]}
                </span>
              )}
              {link.h1.replace(/\s*[-\u2013\u2014].*$/, "").trim()}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
