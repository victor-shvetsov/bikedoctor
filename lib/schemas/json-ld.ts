// =============================================================================
// BikeDoctor -- JSON-LD Schema Generators
// =============================================================================
// Generates structured data for Google rich results.
// Each function produces a JSON-LD object for one schema type.
// The page renderer calls these based on page_content.schema_types[].
//
// AI INSTRUCTION: When adding a new schema type, add a generator here AND
// register it in the SCHEMA_GENERATORS map at the bottom.
// =============================================================================

import type { PageContent, FaqItem } from "@/lib/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

// ---------------------------------------------------------------------------
// Business constants (single source of truth for all schemas)
// ---------------------------------------------------------------------------
const BUSINESS = {
  name: "BikeDoctor",
  legalName: "BikeDoctor ApS",
  url: SITE_URL,
  phone: "+45 50 15 50 15",
  email: "info@bikedoctor.dk",
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: "199-1499 DKK",
  currency: "DKK",
  areaServed: "Sjælland, Danmark",
  address: {
    streetAddress: "Mobil service -- vi kommer til dig",
    addressLocality: "København",
    addressRegion: "Sjælland",
    postalCode: "2100",
    addressCountry: "DK",
  },
  geo: {
    latitude: 55.6761,
    longitude: 12.5683,
  },
  openingHours: ["Mo-Fr 08:00-19:00", "Sa 09:00-16:00"],
} as const

// ---------------------------------------------------------------------------
// Schema: LocalBusiness
// ---------------------------------------------------------------------------
function generateLocalBusiness(page: PageContent) {
  // Extract location from slug for areaServed if it's a location page
  const isLocation = page.template_type === "location"
  const locationName = isLocation
    ? page.h1.replace(/^Cykelsmed i\s+/i, "").replace(/\s*[-–—].*$/, "").trim()
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currency,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...BUSINESS.geo,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    ...(isLocation && locationName
      ? {
          areaServed: {
            "@type": "City",
            name: locationName,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Sjælland",
            },
          },
        }
      : {
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Sjælland, Danmark",
          },
        }),
  }
}

// ---------------------------------------------------------------------------
// Schema: Service
// ---------------------------------------------------------------------------
function generateService(page: PageContent) {
  const pageUrl =
    page.slug === "/" ? SITE_URL : `${SITE_URL}/${page.slug}`

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.meta_description,
    url: pageUrl,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Sjælland, Danmark",
    },
    serviceType: "Bicycle Repair",
    offers: {
      "@type": "Offer",
      priceCurrency: BUSINESS.currency,
      priceRange: BUSINESS.priceRange,
    },
  }
}

// ---------------------------------------------------------------------------
// Schema: FAQPage
// ---------------------------------------------------------------------------
function generateFAQPage(page: PageContent) {
  if (!page.faqs || page.faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq: FaqItem) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// Schema: BreadcrumbList
// ---------------------------------------------------------------------------
function generateBreadcrumbList(page: PageContent) {
  const items: Array<{ name: string; url: string }> = [
    { name: "Forside", url: SITE_URL },
  ]

  // Add parent if exists
  if (page.parent_slug) {
    // We use the slug as a readable name fallback
    const parentName = page.parent_slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    items.push({
      name: parentName,
      url: `${SITE_URL}/${page.parent_slug}`,
    })
  }

  // Current page
  items.push({
    name: page.h1,
    url: page.slug === "/" ? SITE_URL : `${SITE_URL}/${page.slug}`,
  })

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ---------------------------------------------------------------------------
// Schema: ItemList (for pricing pages with service listings)
// ---------------------------------------------------------------------------
function generateItemList(page: PageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    description: page.meta_description,
    url: page.slug === "/" ? SITE_URL : `${SITE_URL}/${page.slug}`,
    numberOfItems: 0, // Will be enriched when service_catalog data is available
  }
}

// ---------------------------------------------------------------------------
// Registry: maps schema_type string -> generator function
// ---------------------------------------------------------------------------
type SchemaGenerator = (page: PageContent) => Record<string, unknown> | null

const SCHEMA_GENERATORS: Record<string, SchemaGenerator> = {
  LocalBusiness: generateLocalBusiness,
  Service: generateService,
  FAQPage: generateFAQPage,
  BreadcrumbList: generateBreadcrumbList,
  ItemList: generateItemList,
}

/**
 * Generate all JSON-LD schemas for a page based on its schema_types array.
 * Returns an array of JSON-LD objects (nulls filtered out).
 */
export function generateJsonLd(page: PageContent): Record<string, unknown>[] {
  if (!page.schema_types || page.schema_types.length === 0) return []

  return page.schema_types
    .map((type) => {
      const generator = SCHEMA_GENERATORS[type]
      if (!generator) {
        console.warn(`[BikeDoctor] No JSON-LD generator for schema type: ${type}`)
        return null
      }
      return generator(page)
    })
    .filter((schema): schema is Record<string, unknown> => schema !== null)
}
