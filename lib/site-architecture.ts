// =============================================================================
// BikeDoctor -- Complete Website Architecture & SEO Map
// =============================================================================
// PERMANENT REFERENCE: Every page we will ever build, its URL, target keywords,
// booking behavior, schema markup type, and internal linking rules.
//
// AI INSTRUCTION: Read this file before building ANY public-facing page.
// It defines the URL, heading, metadata, booking preset, and cross-links.
//
// URL STRATEGY: Flat silo (domain.dk/slug) for all main pages.
// Exception: blog articles sit at /[service-slug]/[article-slug] for topical depth.
//
// LANGUAGE: All pages are Danish primary (target market) with EN as secondary.
// URL slugs are in Danish (matches search queries).
// =============================================================================

import type { BookingPreset, PageTemplateType } from "@/lib/types"

// ─────────────────────────────────────────────────────────────────────────────
// Types -- PageType and BookingPreset come from lib/types.ts (single source of truth)
// ─────────────────────────────────────────────────────────────────────────────

// Re-export as PageType for architecture readability (identical to PageTemplateType)
export type PageType = PageTemplateType

export type SchemaMarkup =
  | "LocalBusiness"
  | "Service"
  | "Product"
  | "Article"
  | "FAQPage"
  | "BreadcrumbList"
  | "ItemList"

export interface SitePage {
  slug: string // URL path after domain. Homepage = "/", all others no leading slash.
  type: PageType
  cluster: string // Which cluster this belongs to
  primaryKeyword: string // Main keyword this page targets
  secondaryKeywords: string[] // Supporting keywords
  h1Template: string // H1 heading template (use {location}, {brand}, {bikeType} as variables)
  titleTemplate: string // <title> tag template
  descriptionTemplate: string // meta description template
  schemaTypes: SchemaMarkup[] // JSON-LD schema types for this page
  bookingPreset: BookingPreset // How "Book nu" behaves on this page
  crossLinks: string[] // Slugs of pages to link TO from this page
  ecommerceSection?: string // Which product category to show (if any)
  blogParent?: string // If this is a blog article, which service page is the parent
  status: "planned" | "built" | "live"
  buildBlock?: string // Which sprint block builds this page
  notes?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Clusters
// ─────────────────────────────────────────────────────────────────────────────

export const PAGE_CLUSTERS = {
  homepage: "Homepage",
  locations: "Location Pages (cykelsmed + bydel)",
  bikeTypes: "Bike Type Service Pages",
  brands: "Brand-Specific Pages",
  services: "Service & Pricing Pages",
  blog: "Blog Articles (lvl 2 under service pages)",
  shopBikes: "E-commerce: Bike Sales",
  shopParts: "E-commerce: Spare Parts",
  info: "Info & Trust Pages",
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 1: Homepage
// ─────────────────────────────────────────────────────────────────────────────

const HOMEPAGE: SitePage[] = [
  {
    slug: "/",
    type: "homepage",
    cluster: "homepage",
    primaryKeyword: "mobil cykelsmed",
    secondaryKeywords: ["udkørende cykelsmed", "kørende cykelsmed", "cykelsmed københavn", "cykelreparation"],
    h1Template: "Din mobile cykelsmed -- vi kommer til dig",
    titleTemplate: "BikeDoctor | Mobil Cykelsmed -- Vi kommer til dig i København & Sjælland",
    descriptionTemplate: "Professionel cykelreparation der kommer til din dør. Book online, vælg din cykeltype, og vi ordner resten. Alle typer cykler: el-cykler, ladcykler, og mere.",
    schemaTypes: ["LocalBusiness", "Service", "FAQPage"],
    bookingPreset: { startStep: 1 },
    crossLinks: ["cykelsmed-priser", "ladcykel-reparation", "elcykel-reparation", "cykler-til-salg"],
    ecommerceSection: "featured-bikes",
    status: "planned",
    buildBlock: "1.1",
    notes: "All bike types shown when 'Book nu' is pressed. Hero with strong local trust signals.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 2: Location Pages (cykelsmed + area)
// Flat URLs: /cykelsmed-{location}
// All use same template, just different location data.
// Booking starts at step 1 (pick bike type).
// ─────────────────────────────────────────────────────────────────────────────

const LOCATION_AREAS = [
  { slug: "cykelsmed-koebenhavn", location: "København", keyword: "cykelsmed københavn" },
  { slug: "cykelsmed-frederiksberg", location: "Frederiksberg", keyword: "cykelsmed frederiksberg" },
  { slug: "cykelsmed-valby", location: "Valby", keyword: "cykelsmed valby" },
  { slug: "cykelsmed-amager", location: "Amager", keyword: "cykelsmed amager" },
  { slug: "cykelsmed-herlev", location: "Herlev", keyword: "cykelsmed herlev" },
  { slug: "cykelsmed-glostrup", location: "Glostrup", keyword: "cykelsmed glostrup" },
  { slug: "cykelsmed-hvidovre", location: "Hvidovre", keyword: "cykelsmed hvidovre" },
  { slug: "cykelsmed-christianshavn", location: "Christianshavn", keyword: "cykelsmed christianshavn" },
  { slug: "cykelsmed-koege", location: "Køge", keyword: "cykelsmed køge" },
  { slug: "cykelsmed-bagsvard", location: "Bagsværd", keyword: "cykelsmed bagsværd" },
  { slug: "cykelsmed-islands-brygge", location: "Islands Brygge", keyword: "cykelsmed islands brygge" },
  { slug: "cykelsmed-lyngby", location: "Lyngby", keyword: "cykelsmed lyngby" },
  { slug: "cykelsmed-ballerup", location: "Ballerup", keyword: "cykelsmed ballerup" },
  { slug: "cykelsmed-roedovre", location: "Rødovre", keyword: "cykelsmed rødovre" },
  { slug: "cykelsmed-greve", location: "Greve", keyword: "cykelsmed greve" },
  { slug: "cykelsmed-virum", location: "Virum", keyword: "cykelsmed virum" },
  { slug: "cykelsmed-ishoej", location: "Ishøj", keyword: "cykelsmed ishøj" },
  { slug: "cykelsmed-gentofte", location: "Gentofte", keyword: "cykelsmed gentofte" },
  { slug: "cykelsmed-hellerup", location: "Hellerup", keyword: "cykelsmed hellerup" },
  { slug: "cykelsmed-albertslund", location: "Albertslund", keyword: "cykelsmed albertslund" },
  { slug: "cykelsmed-broendby", location: "Brøndby", keyword: "cykelsmed brøndby" },
  { slug: "cykelsmed-oesterbro", location: "Østerbro", keyword: "cykelsmed østerbro" },
  { slug: "cykelsmed-dragoer", location: "Dragør", keyword: "cykelsmed dragør" },
  { slug: "cykelsmed-sydhavn", location: "Sydhavn", keyword: "cykelsmed sydhavn" },
  { slug: "cykelsmed-vanloese", location: "Vanløse", keyword: "cykelsmed vanløse" },
  { slug: "cykelsmed-noerrebro", location: "Nørrebro", keyword: "cykelsmed nørrebro" },
  { slug: "cykelsmed-vesterbro", location: "Vesterbro", keyword: "cykelsmed vesterbro" },
  { slug: "cykelsmed-sjaelor", location: "Sjælør", keyword: "cykelsmed sjælør" },
  { slug: "cykelsmed-solroed", location: "Solrød", keyword: "cykelsmed solrød" },
  { slug: "cykelsmed-soeborg", location: "Søborg", keyword: "cykelsmed søborg" },
  { slug: "cykelsmed-taastrup", location: "Taastrup", keyword: "cykelsmed taastrup" },
  { slug: "cykelsmed-hedehusene", location: "Hedehusene", keyword: "cykelsmed hedehusene" },
  { slug: "cykelsmed-vaerloese", location: "Værløse", keyword: "cykelsmed værløse" },
  { slug: "cykelsmed-nordvest", location: "Nordvest", keyword: "cykelsmed nordvest" },
  { slug: "cykelsmed-naerum", location: "Nærum", keyword: "cykelsmed nærum" },
  { slug: "cykelsmed-nordhavn", location: "Nordhavn", keyword: "cykelsmed nordhavn" },
  { slug: "cykelsmed-broenshoej", location: "Brønshøj", keyword: "cykelsmed brønshøj" },
  // Additional high-opportunity locations (no duplicates)
  { slug: "cykelsmed-kongens-lyngby", location: "Kongens Lyngby", keyword: "cykelsmed kongens lyngby" },
  { slug: "cykelsmed-charlottenlund", location: "Charlottenlund", keyword: "cykelsmed charlottenlund" },
] as const

const LOCATION_PAGES: SitePage[] = LOCATION_AREAS.map((area) => ({
  slug: area.slug,
  type: "location" as PageType,
  cluster: "locations",
  primaryKeyword: area.keyword,
  secondaryKeywords: [
    `cykelreparation ${area.location.toLowerCase()}`,
    `cykel reparation ${area.location.toLowerCase()}`,
    `mobile cykelsmed ${area.location.toLowerCase()}`,
  ],
  h1Template: `Cykelsmed i ${area.location} -- Vi kommer til dig`,
  titleTemplate: `Cykelsmed ${area.location} | BikeDoctor -- Mobil Cykelreparation`,
  descriptionTemplate: `Brug for en cykelsmed i ${area.location}? BikeDoctor kommer til din dør. Book online -- vi reparerer alle typer cykler direkte hos dig.`,
  schemaTypes: ["LocalBusiness", "Service"] as SchemaMarkup[],
  bookingPreset: { startStep: 1 as const },
  crossLinks: ["/", "cykelsmed-priser", "elcykel-reparation", "ladcykel-reparation"],
  ecommerceSection: undefined,
  status: "planned" as const,
  buildBlock: "4.1",
  notes: `Location page for ${area.location}. Same template as all location pages, unique content per area.`,
}))

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 3: Bike Type Service Pages
// Booking pre-selects the bike type (starts at step 2).
// ─────────────────────────────────────────────────────────────────────────────

const BIKE_TYPE_PAGES: SitePage[] = [
  {
    slug: "elcykel-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "reparation af elcykel",
    secondaryKeywords: ["elcykel reparation", "el cykel reparation", "elcykel service", "elcykel mekaniker"],
    h1Template: "El-cykel reparation -- specialist i alle mærker",
    titleTemplate: "El-cykel Reparation | BikeDoctor -- Vi kommer til dig",
    descriptionTemplate: "Professionel el-cykel reparation der kommer til dig. Motor, batteri, gear, bremser. Alle mærker. Book online.",
    schemaTypes: ["Service", "FAQPage"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel" },
    crossLinks: ["/", "cykelsmed-priser", "elcykel-motor-reparation", "mustang-elcykel-reparation", "elcykler-til-salg"],
    ecommerceSection: "ebikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "elcykel-motor-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "elcykel motor reparation",
    secondaryKeywords: ["el cykel motor reparation", "elcykel motor fejl", "elcykel motor service"],
    h1Template: "El-cykel motor reparation -- diagnose & reparation",
    titleTemplate: "El-cykel Motor Reparation | BikeDoctor -- Specialist",
    descriptionTemplate: "Problem med din el-cykel motor? Vi diagnosticerer og reparerer alle typer motorer. Bosch, Shimano, Bafang og flere.",
    schemaTypes: ["Service", "FAQPage"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel" },
    crossLinks: ["elcykel-reparation", "cykelsmed-priser", "elcykel-batterier"],
    ecommerceSection: "ebike-parts",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "ladcykel-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "ladcykel reparation",
    secondaryKeywords: ["el ladcykel reparation", "ladcykel service", "cargo bike reparation", "christiania cykel reparation"],
    h1Template: "Ladcykel reparation -- alle mærker, vi kommer til dig",
    titleTemplate: "Ladcykel Reparation | BikeDoctor -- Mobil Service",
    descriptionTemplate: "Ladcykel reparation der kommer til dig. Babboe, Christiania, Urban Arrow og alle andre mærker. Book online.",
    schemaTypes: ["Service", "FAQPage"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel" },
    crossLinks: ["/", "babboe-service", "cykelsmed-priser", "ladcykler-til-salg"],
    ecommerceSection: "cargo-bikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "fatbike-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "fatbike reparation",
    secondaryKeywords: ["fat bike reparation", "fatbike service", "fatbike mekaniker"],
    h1Template: "Fatbike reparation -- specialist i tykke dæk",
    titleTemplate: "Fatbike Reparation | BikeDoctor -- Vi kommer til dig",
    descriptionTemplate: "Fatbike reparation der kommer til dig. Dæk, gear, bremser og motor. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "fatbike" },
    crossLinks: ["/", "cykelsmed-priser", "cykel-daek"],
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "boernecykel-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "børnecykel reparation",
    secondaryKeywords: ["cykel reparation børn", "børnecykel service"],
    h1Template: "Børnecykel reparation -- hurtigt og billigt",
    titleTemplate: "Børnecykel Reparation | BikeDoctor -- Mobil Cykelsmed",
    descriptionTemplate: "Børnecykel reparation der kommer til dig. Punktering, bremser, gear -- hurtigt fikset. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "bornecykel" },
    crossLinks: ["/", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "korestol-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "kørestol reparation",
    secondaryKeywords: ["el kørestol reparation", "kørestol service", "kørestol dæk"],
    h1Template: "Kørestol reparation -- vi kommer til dig",
    titleTemplate: "Kørestol Reparation | BikeDoctor -- Mobil Service",
    descriptionTemplate: "Kørestol reparation og service der kommer til dig. Dæk, bremser, el-systemer. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "korestol" },
    crossLinks: ["/", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "el-scooter-reparation",
    type: "bike-type",
    cluster: "bikeTypes",
    primaryKeyword: "el-scooter reparation",
    secondaryKeywords: ["el scooter reparation", "el løbehjul reparation", "el scooter service"],
    h1Template: "El-scooter reparation -- vi fikser dit løbehjul",
    titleTemplate: "El-scooter Reparation | BikeDoctor -- Mobil Service",
    descriptionTemplate: "El-scooter reparation der kommer til dig. Batteri, motor, bremser, dæk. Alle mærker. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-scooter" },
    crossLinks: ["/", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "4.1",
  },
]

// ───────────────��─────────────────────────────────────────────────────────────
// CLUSTER 4: Brand-Specific Pages
// Booking pre-selects bike type AND sets brand in heading.
// ─────────────────────────────────────────────────────────────────────────────

const BRAND_PAGES: SitePage[] = [
  {
    slug: "babboe-service",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "babboe service",
    secondaryKeywords: ["babboe reparation", "babboe cykel reparation", "babboe ladcykel service"],
    h1Template: "Babboe service & reparation -- certificeret specialist",
    titleTemplate: "Babboe Service & Reparation | BikeDoctor -- Mobil Cykelsmed",
    descriptionTemplate: "Babboe ladcykel service og reparation. Vi kommer til dig. Serviceeftersyn, gear, bremser, el-system. Book online.",
    schemaTypes: ["Service", "FAQPage"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel", preSelectedServices: ["komplet-service"], bookingHeading: "Book Babboe service" },
    crossLinks: ["ladcykel-reparation", "cykelsmed-priser", "ladcykler-til-salg"],
    ecommerceSection: "cargo-bikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "mustang-elcykel-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "reparation af mustang elcykel",
    secondaryKeywords: ["mustang elcykel reparation", "mustang cykel reparation", "mustang el cykel service"],
    h1Template: "Mustang el-cykel reparation -- vi kender dit mærke",
    titleTemplate: "Mustang El-cykel Reparation | BikeDoctor -- Specialist",
    descriptionTemplate: "Mustang el-cykel reparation og service. Motor, batteri, gear, bremser. Vi kommer til dig. Book online.",
    schemaTypes: ["Service", "FAQPage"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel", bookingHeading: "Book Mustang el-cykel reparation" },
    crossLinks: ["elcykel-reparation", "cykelsmed-priser", "elcykler-til-salg"],
    ecommerceSection: "ebikes",
    status: "planned",
    buildBlock: "4.1",
  },
  // Additional brand pages (high search volume brands in DK)
  {
    slug: "christiania-cykel-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "christiania cykel reparation",
    secondaryKeywords: ["christiania ladcykel reparation", "christiania cykel service"],
    h1Template: "Christiania cykel reparation -- specialist i ladcykler",
    titleTemplate: "Christiania Cykel Reparation | BikeDoctor",
    descriptionTemplate: "Christiania cykel reparation og service. Vi kommer til dig med alt værktøj. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel", bookingHeading: "Book Christiania cykel reparation" },
    crossLinks: ["ladcykel-reparation", "babboe-service", "ladcykler-til-salg"],
    ecommerceSection: "cargo-bikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "urban-arrow-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "urban arrow reparation",
    secondaryKeywords: ["urban arrow service", "urban arrow ladcykel reparation"],
    h1Template: "Urban Arrow reparation -- specialist i premium ladcykler",
    titleTemplate: "Urban Arrow Reparation | BikeDoctor -- Mobil Service",
    descriptionTemplate: "Urban Arrow reparation og service der kommer til dig. Komplet service, motor, batteri, bremser. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel", bookingHeading: "Book Urban Arrow service" },
    crossLinks: ["ladcykel-reparation", "babboe-service", "ladcykler-til-salg"],
    ecommerceSection: "cargo-bikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "gazelle-elcykel-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "gazelle elcykel reparation",
    secondaryKeywords: ["gazelle cykel reparation", "gazelle service"],
    h1Template: "Gazelle el-cykel reparation -- vi kender dit mærke",
    titleTemplate: "Gazelle El-cykel Reparation | BikeDoctor",
    descriptionTemplate: "Gazelle el-cykel reparation og service. Motor, batteri, gear. Vi kommer til dig. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel", bookingHeading: "Book Gazelle el-cykel reparation" },
    crossLinks: ["elcykel-reparation", "cykelsmed-priser", "elcykler-til-salg"],
    ecommerceSection: "ebikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "nihola-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "nihola reparation",
    secondaryKeywords: ["nihola ladcykel reparation", "nihola service"],
    h1Template: "Nihola reparation -- specialist i trehjulede ladcykler",
    titleTemplate: "Nihola Reparation | BikeDoctor -- Mobil Cykelsmed",
    descriptionTemplate: "Nihola ladcykel reparation og service. Vi kommer til dig. Bremser, gear, hjul, el-system. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel", bookingHeading: "Book Nihola reparation" },
    crossLinks: ["ladcykel-reparation", "christiania-cykel-reparation", "ladcykler-til-salg"],
    ecommerceSection: "cargo-bikes",
    status: "planned",
    buildBlock: "4.1",
  },
  {
    slug: "riese-mueller-reparation",
    type: "brand",
    cluster: "brands",
    primaryKeyword: "riese müller reparation",
    secondaryKeywords: ["riese og müller reparation", "riese müller service", "riese müller elcykel"],
    h1Template: "Riese & Müller reparation -- premium el-cykel specialist",
    titleTemplate: "Riese & Müller Reparation | BikeDoctor",
    descriptionTemplate: "Riese & Müller el-cykel reparation og service. Bosch motor specialist. Vi kommer til dig. Book online.",
    schemaTypes: ["Service"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel", bookingHeading: "Book Riese & Müller service" },
    crossLinks: ["elcykel-reparation", "elcykel-motor-reparation", "elcykler-til-salg"],
    ecommerceSection: "ebikes",
    status: "planned",
    buildBlock: "4.1",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 5: Service & Pricing Pages
// ─────────────────────────────────────────────────────────────────────────────

const SERVICE_PAGES: SitePage[] = [
  {
    slug: "cykelsmed-priser",
    type: "pricing",
    cluster: "services",
    primaryKeyword: "cykelsmed priser",
    secondaryKeywords: ["cykelreparation priser", "cykel reparation pris", "hvad koster cykelsmed"],
    h1Template: "Cykelsmed priser -- gennemsigtigt og fair",
    titleTemplate: "Cykelsmed Priser | BikeDoctor -- Alle priser inkl. kørsel",
    descriptionTemplate: "Se alle vores priser for cykelreparation. Fair og gennemsigtige. Inkl. kørsel til din dør. Book online.",
    schemaTypes: ["Service", "FAQPage", "ItemList"],
    bookingPreset: { startStep: 1 },
    crossLinks: ["/", "elcykel-reparation", "ladcykel-reparation"],
    status: "planned",
    buildBlock: "4.1",
    notes: "Shows full price table from service_catalog. Grouped by category. FAQ section about pricing.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 6: Blog Articles (lvl 2 under service pages for topical depth)
// URL structure: /{parent-service-slug}/{article-slug}
// These will be AI-generated from order data in Phase 4.
// ─────────────────────────────────────────────────────────────────────────────

const BLOG_PAGES: SitePage[] = [
  // --- Under /ladcykel-reparation ---
  {
    slug: "ladcykel-reparation/guide-til-ladcykel-vedligeholdelse",
    type: "blog",
    cluster: "blog",
    primaryKeyword: "ladcykel vedligeholdelse",
    secondaryKeywords: ["ladcykel service selv", "ladcykel pleje"],
    h1Template: "Guide til ladcykel vedligeholdelse -- hold din cykel i topform",
    titleTemplate: "Ladcykel Vedligeholdelse Guide | BikeDoctor Blog",
    descriptionTemplate: "Lær hvordan du vedligeholder din ladcykel. Tips fra vores mekanikere om kæde, bremser, dæk og el-system.",
    schemaTypes: ["Article", "BreadcrumbList"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel" },
    crossLinks: ["ladcykel-reparation", "babboe-service", "cykelsmed-priser"],
    blogParent: "ladcykel-reparation",
    status: "planned",
    buildBlock: "4.2",
  },
  {
    slug: "ladcykel-reparation/babboe-vs-christiania-sammenligning",
    type: "blog",
    cluster: "blog",
    primaryKeyword: "babboe vs christiania",
    secondaryKeywords: ["bedste ladcykel", "ladcykel sammenligning"],
    h1Template: "Babboe vs Christiania -- hvilken ladcykel passer til dig?",
    titleTemplate: "Babboe vs Christiania Sammenligning | BikeDoctor Blog",
    descriptionTemplate: "Vi sammenligner Babboe og Christiania ladcykler baseret på vores erfaring med hundredvis af reparationer.",
    schemaTypes: ["Article", "BreadcrumbList"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel" },
    crossLinks: ["babboe-service", "christiania-cykel-reparation", "ladcykler-til-salg"],
    blogParent: "ladcykel-reparation",
    status: "planned",
    buildBlock: "4.2",
  },
  // --- Under /elcykel-reparation ---
  {
    slug: "elcykel-reparation/elcykel-batteri-levetid",
    type: "blog",
    cluster: "blog",
    primaryKeyword: "elcykel batteri levetid",
    secondaryKeywords: ["elcykel batteri holder", "el cykel batteri tips"],
    h1Template: "El-cykel batteri levetid -- sådan holder det længst",
    titleTemplate: "El-cykel Batteri Levetid Guide | BikeDoctor Blog",
    descriptionTemplate: "Lær hvordan du forlænger dit el-cykel batteris levetid. Praktiske tips fra vores mekanikere.",
    schemaTypes: ["Article", "BreadcrumbList"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel" },
    crossLinks: ["elcykel-reparation", "elcykel-motor-reparation", "elcykel-batterier"],
    blogParent: "elcykel-reparation",
    status: "planned",
    buildBlock: "4.2",
  },
  // More blog articles will be auto-generated from order data in Phase 4
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 7: E-commerce -- Bike Sales
// Shown as sections on relevant pages AND as standalone shop pages.
// ─────────────────────────────────────────────────────────────────────────────

const SHOP_BIKE_PAGES: SitePage[] = [
  {
    slug: "cykler-til-salg",
    type: "shop-bikes",
    cluster: "shopBikes",
    primaryKeyword: "cykler til salg",
    secondaryKeywords: ["køb cykel", "brugte cykler", "nye cykler"],
    h1Template: "Cykler til salg -- nye og brugte cykler",
    titleTemplate: "Cykler til Salg | BikeDoctor -- Nye & Brugte",
    descriptionTemplate: "Køb cykler direkte fra BikeDoctor. Nye og brugte. El-cykler, ladcykler, bycykler. Leveret til din dør.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 1 },
    crossLinks: ["elcykler-til-salg", "ladcykler-til-salg", "/"],
    status: "planned",
    buildBlock: "3.1",
    notes: "Main shop landing. Shows all categories. Links to category pages.",
  },
  {
    slug: "elcykler-til-salg",
    type: "shop-bikes",
    cluster: "shopBikes",
    primaryKeyword: "elcykler til salg",
    secondaryKeywords: ["køb elcykel", "el cykel tilbud", "brugt elcykel"],
    h1Template: "El-cykler til salg -- nye og brugte el-cykler",
    titleTemplate: "El-cykler til Salg | BikeDoctor",
    descriptionTemplate: "Køb el-cykler fra BikeDoctor. Nye og brugte. Alle mærker. Leveret og samlet.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel" },
    crossLinks: ["cykler-til-salg", "elcykel-reparation", "elcykel-batterier"],
    status: "planned",
    buildBlock: "3.1",
  },
  {
    slug: "ladcykler-til-salg",
    type: "shop-bikes",
    cluster: "shopBikes",
    primaryKeyword: "ladcykler til salg",
    secondaryKeywords: ["køb ladcykel", "ladcykel tilbud", "brugt ladcykel"],
    h1Template: "Ladcykler til salg -- nye og brugte ladcykler",
    titleTemplate: "Ladcykler til Salg | BikeDoctor",
    descriptionTemplate: "Køb ladcykler fra BikeDoctor. Babboe, Christiania, Urban Arrow og flere. Leveret til din dør.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "ladcykel" },
    crossLinks: ["cykler-til-salg", "ladcykel-reparation", "babboe-service"],
    status: "planned",
    buildBlock: "3.1",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 8: E-commerce -- Spare Parts
// Interconnected with service pages (show relevant parts on repair pages).
// ─────────────────────────────────────────────��───────────────────────────────

const SHOP_PARTS_PAGES: SitePage[] = [
  {
    slug: "cykel-reservedele",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel reservedele",
    secondaryKeywords: ["cykel dele", "cykeldele online", "cykel tilbehør"],
    h1Template: "Cykel reservedele -- dæk, slanger, kæder og mere",
    titleTemplate: "Cykel Reservedele | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel reservedele online. Dæk, slanger, kæder, batterier, bremseklodser og mere. Levering til hele Danmark.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 1 },
    crossLinks: ["cykel-daek", "cykel-slanger", "cykel-kaeder", "elcykel-batterier"],
    status: "planned",
    buildBlock: "3.2",
    notes: "Main spare parts landing. Links to all part categories.",
  },
  {
    slug: "cykel-daek",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel dæk",
    secondaryKeywords: ["cykeldæk", "cykel dæk køb", "dæk til cykel", "cykel dæk pris"],
    h1Template: "Cykel dæk -- alle størrelser til alle cykler",
    titleTemplate: "Cykel Dæk | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel dæk online. Alle størrelser. Bycykel, el-cykel, ladcykel, fatbike. Hurtig levering.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "alm-cykel", preSelectedServices: ["daekskift"] },
    crossLinks: ["cykel-reservedele", "cykel-slanger", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "3.2",
    notes: "Cross-linked from service pages about flat tires/tire replacement. Shows 'Vil du have os til at montere?' CTA.",
  },
  {
    slug: "cykel-slanger",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel slanger",
    secondaryKeywords: ["cykelslange", "cykel slange køb", "slange til cykel"],
    h1Template: "Cykel slanger -- alle størrelser på lager",
    titleTemplate: "Cykel Slanger | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel slanger online. Alle størrelser. Hurtig levering. Eller book os til at montere.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "alm-cykel", preSelectedServices: ["punktering"] },
    crossLinks: ["cykel-reservedele", "cykel-daek", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "3.2",
  },
  {
    slug: "cykel-kaeder",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel kæde",
    secondaryKeywords: ["cykelkæde", "cykel kæde køb", "kæde til cykel"],
    h1Template: "Cykel kæder -- til alle cykler",
    titleTemplate: "Cykel Kæder | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel kæder online. Shimano, SRAM, KMC. Eller book os til at montere.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "alm-cykel", preSelectedServices: ["kaedeskift"] },
    crossLinks: ["cykel-reservedele", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "3.2",
  },
  {
    slug: "elcykel-batterier",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "elcykel batteri",
    secondaryKeywords: ["el cykel batteri", "elcykel batteri køb", "batteri til elcykel", "elcykel batteri pris"],
    h1Template: "El-cykel batterier -- originale og kompatible",
    titleTemplate: "El-cykel Batterier | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb el-cykel batterier online. Bosch, Shimano, Bafang og flere. Montering muligt. Levering til hele DK.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "el-cykel" },
    crossLinks: ["cykel-reservedele", "elcykel-reparation", "elcykel-motor-reparation"],
    ecommerceSection: "ebike-parts",
    status: "planned",
    buildBlock: "3.2",
    notes: "Cross-linked heavily from el-cykel service pages. High-value products.",
  },
  {
    slug: "cykel-bremser",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel bremser",
    secondaryKeywords: ["cykel bremseklodser", "cykel bremse køb", "skivebremser cykel"],
    h1Template: "Cykel bremser & bremseklodser",
    titleTemplate: "Cykel Bremser | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel bremser og bremseklodser online. Alle typer. Eller book os til at montere.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "alm-cykel", preSelectedServices: ["bremsejustering"] },
    crossLinks: ["cykel-reservedele", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "3.2",
  },
  {
    slug: "cykel-lygter",
    type: "shop-parts",
    cluster: "shopParts",
    primaryKeyword: "cykel lygter",
    secondaryKeywords: ["cykellygte", "cykel forlygte", "cykel baglygte"],
    h1Template: "Cykel lygter -- for- og baglygter",
    titleTemplate: "Cykel Lygter | BikeDoctor -- Køb Online",
    descriptionTemplate: "Køb cykel lygter online. For- og baglygter. LED, USB-opladning. Montering muligt.",
    schemaTypes: ["ItemList", "Product"],
    bookingPreset: { startStep: 2, bikeTypeSlug: "alm-cykel", preSelectedServices: ["lygte-check"] },
    crossLinks: ["cykel-reservedele", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "3.2",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 9: Info & Trust Pages
// ─────────────────────────────────────────────────────────────────────────────

const INFO_PAGES: SitePage[] = [
  {
    slug: "om-os",
    type: "info",
    cluster: "info",
    primaryKeyword: "bikedoctor om os",
    secondaryKeywords: ["bikedoctor cykelsmed", "hvem er bikedoctor"],
    h1Template: "Om BikeDoctor -- din mobile cykelsmed",
    titleTemplate: "Om Os | BikeDoctor -- Mobil Cykelsmed",
    descriptionTemplate: "Lær BikeDoctor at kende. Vi er mobile cykelsmede der kommer til dig i hele København og Sjælland.",
    schemaTypes: ["LocalBusiness"],
    bookingPreset: { startStep: 1 },
    crossLinks: ["/", "cykelsmed-priser"],
    status: "planned",
    buildBlock: "4.1",
    notes: "About BikeDoctor, team, contact. Builds trust for Google E-E-A-T.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL LINKING RULES
// ─────────────────────────────────────────────────────────────────────────────

export const LINKING_RULES = {
  // Every page links back to homepage
  globalLinks: ["/"],
  // Location pages link to nearby locations (auto-determined by proximity)
  locationToLocation: true,
  // Brand pages link to their bike type parent + other brands of same type
  brandToBikeType: true,
  brandToSiblingBrands: true,
  // Service pages link to relevant spare parts
  serviceToSpares: true,
  // Spare parts pages show "Book installation" CTA linking to booking
  sparesToService: true,
  // Blog articles link to parent service + related products
  blogToParentService: true,
  blogToProducts: true,
  // All repair/service pages show relevant bikes for sale section
  serviceToShop: true,
} as const

// ──────���──────────────────────────────────────────────────────────────────────
// COMBINED EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_PAGES: SitePage[] = [
  ...HOMEPAGE,
  ...LOCATION_PAGES,
  ...BIKE_TYPE_PAGES,
  ...BRAND_PAGES,
  ...SERVICE_PAGES,
  ...BLOG_PAGES,
  ...SHOP_BIKE_PAGES,
  ...SHOP_PARTS_PAGES,
  ...INFO_PAGES,
]

// ─────────────────────────────────────────────────────────────────────────────
// STATS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export function getPagesByCluster(cluster: string): SitePage[] {
  return ALL_PAGES.filter((p) => p.cluster === cluster)
}

export function getPageBySlug(slug: string): SitePage | undefined {
  return ALL_PAGES.find((p) => p.slug === slug)
}

export function getPagesByType(type: PageType): SitePage[] {
  return ALL_PAGES.filter((p) => p.type === type)
}

export function getSiteStats() {
  return {
    totalPages: ALL_PAGES.length,
    byCluster: Object.entries(PAGE_CLUSTERS).map(([key, label]) => ({
      key,
      label,
      count: ALL_PAGES.filter((p) => p.cluster === key).length,
    })),
    byStatus: {
      planned: ALL_PAGES.filter((p) => p.status === "planned").length,
      built: ALL_PAGES.filter((p) => p.status === "built").length,
      live: ALL_PAGES.filter((p) => p.status === "live").length,
    },
    totalKeywords: ALL_PAGES.reduce((acc, p) => acc + 1 + p.secondaryKeywords.length, 0),
  }
}
