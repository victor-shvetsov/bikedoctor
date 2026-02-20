"use client"

import { useState } from "react"
import { InternalNav } from "@/components/internal-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ALL_PAGES,
  PAGE_CLUSTERS,
  getSiteStats,
  LINKING_RULES,
  type SitePage,
  type PageType,
} from "@/lib/site-architecture"
import {
  Globe,
  MapPin,
  Bike,
  Tag,
  Wrench,
  FileText,
  ShoppingBag,
  Settings,
  Info,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Search,
  ExternalLink,
  ShoppingCart,
} from "lucide-react"

const TYPE_META: Record<PageType, { icon: typeof Globe; color: string; label: string }> = {
  homepage: { icon: Globe, color: "#F15C45", label: "Homepage" },
  location: { icon: MapPin, color: "#2563eb", label: "Location" },
  "bike-type": { icon: Bike, color: "#16a34a", label: "Bike Type" },
  brand: { icon: Tag, color: "#9333ea", label: "Brand" },
  service: { icon: Wrench, color: "#082852", label: "Service" },
  pricing: { icon: Wrench, color: "#082852", label: "Pricing" },
  blog: { icon: FileText, color: "#ea580c", label: "Blog" },
  "shop-bikes": { icon: ShoppingBag, color: "#0891b2", label: "Shop: Bikes" },
  "shop-parts": { icon: Settings, color: "#64748b", label: "Shop: Parts" },
  info: { icon: Info, color: "#6b7280", label: "Info" },
}

function PageRow({ page }: { page: SitePage }) {
  const [expanded, setExpanded] = useState(false)
  const meta = TYPE_META[page.type]
  const Icon = meta.icon

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-left hover:bg-secondary/30 transition-colors"
      >
        <Icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: meta.color }} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-sm font-medium text-foreground truncate">
              /{page.slug || "(homepage)"}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 shrink-0"
              style={{ borderColor: meta.color, color: meta.color }}
            >
              {meta.label}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground truncate">
            {page.primaryKeyword}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {page.ecommerceSection && (
            <ShoppingCart className="h-3 w-3 text-muted-foreground" />
          )}
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t bg-secondary/20 px-3 py-3 sm:px-4 sm:py-4 space-y-3">
          {/* H1 + Title */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">H1</p>
            <p className="text-sm text-foreground">{page.h1Template}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">{"<title>"}</p>
            <p className="text-xs text-foreground font-mono">{page.titleTemplate}</p>
          </div>

          {/* Keywords */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Keywords</p>
            <div className="flex flex-wrap gap-1">
              <Badge className="text-[10px] bg-[#F15C45]/10 text-[#F15C45] border-[#F15C45]/20">
                {page.primaryKeyword}
              </Badge>
              {page.secondaryKeywords.map((kw) => (
                <Badge key={kw} variant="outline" className="text-[10px]">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          {/* Booking preset */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Booking behavior</p>
            <p className="text-xs text-foreground">
              Start step: {page.bookingPreset.startStep}
              {page.bookingPreset.bikeTypeSlug && ` | Bike: ${page.bookingPreset.bikeTypeSlug}`}
              {page.bookingPreset.preSelectedServices?.length
                ? ` | Services: ${page.bookingPreset.preSelectedServices.join(", ")}`
                : ""}
              {page.bookingPreset.bookingHeading && ` | Heading: "${page.bookingPreset.bookingHeading}"`}
            </p>
          </div>

          {/* Schema */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Schema markup</p>
            <div className="flex flex-wrap gap-1">
              {page.schemaTypes.map((s) => (
                <Badge key={s} variant="outline" className="text-[10px] font-mono">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cross-links */}
          {page.crossLinks.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Links to</p>
              <div className="flex flex-wrap gap-1">
                {page.crossLinks.map((link) => (
                  <span
                    key={link}
                    className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground bg-background rounded px-1.5 py-0.5 border"
                  >
                    <ArrowRight className="h-2.5 w-2.5" />
                    /{link || "(home)"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* E-commerce section */}
          {page.ecommerceSection && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">E-commerce section</p>
              <Badge variant="outline" className="text-[10px]">
                <ShoppingCart className="h-2.5 w-2.5 mr-1" />
                {page.ecommerceSection}
              </Badge>
            </div>
          )}

          {/* Build block */}
          {page.buildBlock && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Build block</p>
              <Badge variant="outline" className="text-[10px] font-mono">
                Block {page.buildBlock}
              </Badge>
            </div>
          )}

          {/* Notes */}
          {page.notes && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
              <p className="text-xs text-muted-foreground italic">{page.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SeoMapPage() {
  const stats = getSiteStats()
  const [activeCluster, setActiveCluster] = useState<string | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPages = ALL_PAGES.filter((page) => {
    const matchesCluster = activeCluster === "all" || page.cluster === activeCluster
    const matchesSearch =
      !searchQuery ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.secondaryKeywords.some((kw) =>
        kw.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCluster && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <InternalNav />

      <main className="mx-auto max-w-5xl px-3 py-4 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            SEO Architecture
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {stats.totalPages} pages targeting {stats.totalKeywords} keywords across {stats.byCluster.length} clusters
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {stats.byCluster
            .filter((c) => c.count > 0)
            .map((cluster) => (
              <button
                key={cluster.key}
                onClick={() => setActiveCluster(activeCluster === cluster.key ? "all" : cluster.key)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  activeCluster === cluster.key
                    ? "border-[#F15C45] bg-[#F15C45]/5"
                    : "border-border bg-card hover:border-[#082852]/30"
                }`}
              >
                <p className="text-xl sm:text-2xl font-bold text-foreground">{cluster.count}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{cluster.label}</p>
              </button>
            ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pages or keywords..."
            className="w-full rounded-lg border border-border bg-card pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#F15C45]/30 focus:border-[#F15C45]"
          />
        </div>

        {/* Active filter */}
        {activeCluster !== "all" && (
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Showing: {PAGE_CLUSTERS[activeCluster as keyof typeof PAGE_CLUSTERS]}
            </Badge>
            <button
              onClick={() => setActiveCluster("all")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Page list */}
        <Card>
          <CardContent className="p-0">
            {filteredPages.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No pages match your search.
              </div>
            ) : (
              filteredPages.map((page) => (
                <PageRow key={page.slug || "homepage"} page={page} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Linking rules */}
        <Card className="mt-6 border-dashed">
          <CardHeader className="px-4 py-3 sm:px-6">
            <CardTitle className="text-sm font-semibold">Internal Linking Rules</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p>Every page links to homepage</p>
              <p>Location pages link to nearby locations</p>
              <p>Brand pages link to their bike type parent + sibling brands</p>
              <p>Service/repair pages show relevant spare parts for sale</p>
              <p>Spare parts pages show "Book installation" CTA</p>
              <p>Blog articles link to parent service page + related products</p>
              <p>All repair pages show relevant bikes for sale section</p>
            </div>
          </CardContent>
        </Card>

        {/* URL structure explanation */}
        <Card className="mt-4 border-dashed">
          <CardHeader className="px-4 py-3 sm:px-6">
            <CardTitle className="text-sm font-semibold">URL Strategy</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="space-y-2 text-xs text-muted-foreground">
              <p><strong className="text-foreground">Flat silo</strong> -- all main pages at domain.dk/slug (no nesting)</p>
              <p><strong className="text-foreground">Exception: Blog</strong> -- articles sit at /parent-service/article-slug for topical depth</p>
              <p><strong className="text-foreground">Slugs in Danish</strong> -- matches search queries exactly</p>
              <p><strong className="text-foreground">Why flat?</strong> -- shorter URLs rank better, keyword closer to domain, cleaner for Google</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
