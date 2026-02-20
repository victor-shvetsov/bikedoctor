// =============================================================================
// BikeDoctor Sprint Board -- Structured Block Data
// =============================================================================
// This is the source of truth for all build blocks.
// Each block is ONE prompt's worth of focused AI work (3-8 files).
// The Sprint Board UI at /sprint reads this file.
//
// WORKFLOW:
// 1. Owner reviews blocks, adds notes/requirements in chat
// 2. AI updates this file with owner's requirements
// 3. Owner says "Build Block X.Y"
// 4. AI reads this file, builds ONLY that block, updates status
// =============================================================================

export type BlockStatus = "done" | "in-progress" | "next" | "queued" | "blocked"

export interface AcceptanceCriterion {
  id: string
  description: string
  met: boolean
}

export interface BlockFile {
  path: string
  status: "new" | "modify" | "done" | "scaffolded"
  notes?: string
}

export interface Block {
  id: string
  name: string
  phase: number
  phaseLabel: string
  status: BlockStatus
  description: string
  ownerNotes?: string // Owner's specific requirements -- the "how I want it" field
  files: BlockFile[]
  acceptanceCriteria: AcceptanceCriterion[]
  dependsOn?: string[] // block IDs
  relatedFeatureIds?: string[] // links to project-map-data.ts feature IDs
}

export interface Phase {
  number: number
  label: string
  goal: string
  status: "active" | "upcoming" | "done"
}

// =============================================================================
// PHASES
// =============================================================================

export const PHASES: Phase[] = [
  {
    number: 0,
    label: "SEO Architecture & Content Layer",
    goal: "URL structure, keyword map, page templates, Supabase content layer (page_content table), dynamic [slug] routing. Foundation for ALL public pages.",
    status: "active",
  },
  {
    number: 1,
    label: "Take Money",
    goal: "Customer can find website, book a repair, pay, owner sees the order.",
    status: "active",
  },
  {
    number: 2,
    label: "Operate Efficiently",
    goal: "Full order lifecycle, customer portal, mechanic dashboard, quote/invoice flow.",
    status: "upcoming",
  },
  {
    number: 3,
    label: "Scale Without Hiring",
    goal: "Automation, inventory, geo-routing, full notifications, RBAC.",
    status: "upcoming",
  },
  {
    number: 4,
    label: "Dominate Search + AI Flywheel",
    goal: "AI content generation, blog engine, business intelligence.",
    status: "upcoming",
  },
]

// =============================================================================
// DEPRECATED SCAFFOLD NOTE
// =============================================================================
// The components/public/ folder contains EARLY scaffolds (hero-section.tsx,
// services-section.tsx, trust-section.tsx, home-page.tsx, navbar.tsx, footer.tsx).
// These are REPLACED by:
//   - components/templates/*  (Block 0.3 -- page-level template shells)
//   - components/sections/*   (Block 1.1 -- production section components)
//   - components/public/navbar.tsx + footer.tsx are REBUILT in Block 1.4
//
// AI INSTRUCTION: When building Blocks 0.3, 1.1, or 1.4, create the NEW files
// listed in each block. Do NOT import from or extend the old scaffolds.
// The old components/public/ files will be deleted after Block 1.4 is complete.
// =============================================================================

// =============================================================================
// BLOCKS
// =============================================================================

export const BLOCKS: Block[] = [
  // ---------------------------------------------------------------------------
  // PHASE 0 -- "SEO Architecture & Content Layer"
  // ---------------------------------------------------------------------------
  {
    id: "0.1",
    name: "SEO Architecture & Keyword Map",
    phase: 0,
    phaseLabel: "SEO Architecture & Content Layer",
    status: "done",
    description:
      "Define ALL target URLs, keyword clusters, page templates, schema markup, and booking presets. Permanent reference files that AI reads before building any public page.",
    files: [
      { path: "lib/site-architecture.ts", status: "done", notes: "58+ pages: URLs, keywords, headings, schema, booking presets, cross-links" },
      { path: "lib/page-templates.ts", status: "done", notes: "9 page type templates: sections, content specs, conversion elements" },
      { path: "app/seo-map/page.tsx", status: "done", notes: "Visual SEO map browser for reviewing all pages" },
    ],
    acceptanceCriteria: [
      { id: "0.1-a", description: "All 58+ target URLs defined with keywords and headings", met: true },
      { id: "0.1-b", description: "9 page type templates with section blueprints", met: true },
      { id: "0.1-c", description: "Booking presets per page (which step, which bike type preselected)", met: true },
      { id: "0.1-d", description: "Cross-linking strategy defined per page", met: true },
      { id: "0.1-e", description: "Visual SEO map at /seo-map for review", met: true },
    ],
  },

  {
    id: "0.2",
    name: "Supabase Content Layer + Dynamic Routing",
    phase: 0,
    phaseLabel: "SEO Architecture & Content Layer",
    status: "done",
    description:
      "page_content table in Supabase with all 58 pages seeded. This is the lightweight CMS -- editable copy, section toggles, booking presets, FAQs, schema types per page.",
    files: [
      { path: "scripts/002_page_content.sql", status: "done", notes: "Migration: page_content table + RLS" },
    ],
    acceptanceCriteria: [
      { id: "0.2-a", description: "page_content table live in Supabase with RLS", met: true },
      { id: "0.2-b", description: "58 pages seeded: 1 homepage, 37 locations, 5 bike types, 7 brands, 1 pricing, 1 info, 6 shop", met: true },
      { id: "0.2-c", description: "Each page has: slug, template_type, h1, meta, booking_preset, cross_link_slugs", met: true },
      { id: "0.2-d", description: "Romanian translations (h1_ro, subheadline_ro) on all pages", met: true },
    ],
    dependsOn: ["0.1"],
  },

  {
    id: "0.3",
    name: "Dynamic [slug] Route + Template Renderer",
    phase: 0,
    phaseLabel: "SEO Architecture & Content Layer",
    status: "done",
    description:
      "Single dynamic catch-all route that resolves any slug to a template. Fetches page_content from Supabase, picks the right template, renders with proper generateMetadata + JSON-LD. This is the ENGINE that powers all 58+ pages.",
    ownerNotes: "",
    files: [
      { path: "app/[slug]/page.tsx", status: "done", notes: "Dynamic route: fetch page_content by slug, resolve template, render" },
      { path: "app/[slug]/layout.tsx", status: "done", notes: "Shared public layout shell (navbar + footer in Block 1.4)" },
      { path: "lib/templates/template-registry.ts", status: "done", notes: "Maps template_type to React component" },
      { path: "lib/schemas/json-ld.ts", status: "done", notes: "JSON-LD generators: LocalBusiness, Service, FAQPage, BreadcrumbList, ItemList" },
      { path: "components/templates/homepage-template.tsx", status: "done", notes: "Homepage template shell (sections filled in Block 1.1)" },
      { path: "components/templates/location-template.tsx", status: "done", notes: "Location page template shell" },
      { path: "components/templates/bike-type-template.tsx", status: "done", notes: "Bike type page template shell" },
      { path: "components/templates/brand-template.tsx", status: "done", notes: "Brand page template shell" },
    ],
    acceptanceCriteria: [
      { id: "0.3-a", description: "Any slug from page_content resolves to the correct template", met: true },
      { id: "0.3-b", description: "generateMetadata returns correct title, description, og tags from DB", met: true },
      { id: "0.3-c", description: "JSON-LD schema rendered in <head> per page's schema_types", met: true },
      { id: "0.3-d", description: "404 for unknown slugs", met: true },
      { id: "0.3-e", description: "Template shells render h1, subheadline, CTA from page_content", met: true },
      { id: "0.3-f", description: "Cross-links section renders links from cross_link_slugs", met: true },
      { id: "0.3-g", description: "generateStaticParams pre-generates all published slugs at build time", met: true },
    ],
    dependsOn: ["0.2"],
  },

  // ---------------------------------------------------------------------------
  // PHASE 0.5 -- Audit Fixes (post-audit hardening)
  // ---------------------------------------------------------------------------
  {
    id: "0.4",
    name: "Audit Fix: RLS Policies + Price Validation + i18n Cleanup",
    phase: 0,
    phaseLabel: "SEO Architecture & Content Layer",
    status: "done",
    description:
      "Senior engineer audit fixes. RLS policies for all booking flow tables (were missing = broken). Server-side price validation in booking action (was trusting client prices). i18n system cleaned up: da=public, en=secondary, ro=team. PageContent TypeScript type added.",
    files: [
      { path: "scripts/003_rls_policies.sql", status: "done", notes: "RLS policies for customers, bookings, line items, orders, payments" },
      { path: "app/actions/booking.ts", status: "done", notes: "Server-side price validation from DB, never trust client prices" },
      { path: "lib/i18n.ts", status: "done", notes: "Fixed: da=public default, en=secondary, ro=team-internal" },
      { path: "lib/types.ts", status: "done", notes: "Added PageContent, BookingPreset, FaqItem, PageTemplateType types" },
    ],
    acceptanceCriteria: [
      { id: "0.4-a", description: "RLS policies on all 6 booking flow tables", met: true },
      { id: "0.4-b", description: "Booking action recalculates prices from DB, ignores client-sent prices", met: true },
      { id: "0.4-c", description: "i18n Locale type = da | en | ro with proper fallbacks", met: true },
      { id: "0.4-d", description: "PageContent TypeScript interface matches page_content table", met: true },
    ],
    dependsOn: ["0.2"],
  },

  {
    id: "0.5",
    name: "Audit Fix: Stripe Webhook + Sitemap + Error Pages",
    phase: 0,
    phaseLabel: "SEO Architecture & Content Layer",
    status: "done",
    description:
      "Stripe webhook for reliable payment confirmation (handles checkout.session.completed + expired). Dynamic sitemap.xml from page_content. robots.txt blocking internal pages. Branded 404 and error pages.",
    files: [
      { path: "app/api/webhooks/stripe/route.ts", status: "done", notes: "Handles checkout.session.completed -> booking confirmed + payment record" },
      { path: "app/sitemap.ts", status: "done", notes: "Dynamic sitemap from page_content with priorities per template type" },
      { path: "app/robots.ts", status: "done", notes: "Blocks /admin, /api, /overview, /sprint from crawlers" },
      { path: "app/not-found.tsx", status: "done", notes: "Branded 404 with links to homepage and pricing" },
      { path: "app/error.tsx", status: "done", notes: "Branded error page with retry button" },
    ],
    acceptanceCriteria: [
      { id: "0.5-a", description: "Stripe webhook verifies signature, updates booking to confirmed, creates payment record", met: true },
      { id: "0.5-b", description: "Webhook handles checkout.session.expired -> marks booking expired", met: true },
      { id: "0.5-c", description: "sitemap.xml auto-generated from all published pages with correct priorities", met: true },
      { id: "0.5-d", description: "robots.txt blocks internal pages, includes sitemap URL", met: true },
      { id: "0.5-e", description: "Custom 404 and error pages in Danish with brand styling", met: true },
    ],
    dependsOn: ["0.4"],
  },

  // ---------------------------------------------------------------------------
  // PHASE 1 -- "Take Money"
  // ---------------------------------------------------------------------------
  {
    id: "1.0",
    name: "Foundation: DB + Supabase + Stripe + Types + i18n",
    phase: 1,
    phaseLabel: "Take Money",
    status: "done",
    description:
      "Database schema, Supabase client setup, Stripe integration, TypeScript types, i18n translation dictionary, middleware. All infrastructure for Phase 1.",
    files: [
      { path: "scripts/001_phase1_schema.sql", status: "done" },
      { path: "lib/supabase/client.ts", status: "done" },
      { path: "lib/supabase/server.ts", status: "done" },
      { path: "lib/supabase/middleware.ts", status: "done" },
      { path: "lib/stripe.ts", status: "done" },
      { path: "lib/types.ts", status: "done" },
      { path: "lib/i18n.ts", status: "done" },
      { path: "middleware.ts", status: "done" },
    ],
    acceptanceCriteria: [
      { id: "1.0-a", description: "8 tables live in Supabase with RLS + policies", met: true },
      { id: "1.0-b", description: "Seed data: 8 bike types, 10 services", met: true },
      { id: "1.0-c", description: "Supabase server/client utilities work", met: true },
      { id: "1.0-d", description: "Stripe server client configured", met: true },
      { id: "1.0-e", description: "TypeScript interfaces for all tables + PageContent", met: true },
      { id: "1.0-f", description: "DA/EN/RO i18n with proper fallbacks", met: true },
    ],
  },

  {
    id: "1.1",
    name: "Homepage -- Conversion-Optimized Landing Page",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Build the homepage template sections to production quality. Uses the homepage-template from Block 0.3 and fills in all section components. Content from page_content table. Must convert visitors to bookers.",
    ownerNotes: "",
    files: [
      { path: "components/sections/hero-section.tsx", status: "new", notes: "Shared hero section used by all templates" },
      { path: "components/sections/trust-bar.tsx", status: "new", notes: "Trust indicators: mobile service, certified, fast response" },
      { path: "components/sections/how-it-works.tsx", status: "new", notes: "3-step visual: Book -> We come -> Fixed" },
      { path: "components/sections/services-grid.tsx", status: "new", notes: "Service cards grouped by category, prices from DB" },
      { path: "components/sections/bike-types-grid.tsx", status: "new", notes: "Bike type cards from DB" },
      { path: "components/sections/reviews-section.tsx", status: "new", notes: "Testimonial cards" },
      { path: "components/sections/faq-section.tsx", status: "new", notes: "Accordion FAQ from page_content.faqs" },
      { path: "components/sections/cta-banner.tsx", status: "new", notes: "Bottom CTA banner" },
    ],
    acceptanceCriteria: [
      { id: "1.1-a", description: "Hero with h1 from DB, compelling subtext, prominent Book nu CTA", met: false },
      { id: "1.1-b", description: "Trust bar with 3+ trust signals (mobile, certified, same-day)", met: false },
      { id: "1.1-c", description: "How it works: 3-step visual flow", met: false },
      { id: "1.1-d", description: "Services grid: cards with prices from Supabase, grouped by category", met: false },
      { id: "1.1-e", description: "Bike types grid from DB", met: false },
      { id: "1.1-f", description: "FAQ section with accordion, content from page_content.faqs", met: false },
      { id: "1.1-g", description: "All sections responsive: 375px, 768px, 1280px", met: false },
      { id: "1.1-h", description: "CTA buttons trigger booking overlay with correct preset from page_content", met: false },
    ],
    dependsOn: ["0.3"],
    relatedFeatureIds: ["book-hero", "book-services", "seo-meta"],
  },

  {
    id: "1.2",
    name: "Location + Bike Type + Brand Templates",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Fill in the location, bike-type, and brand template shells with real section components. Reuses sections from 1.1 (hero, services, faq, cta) + adds template-specific sections (local trust, brand expertise, nearby locations).",
    ownerNotes: "",
    files: [
      { path: "components/templates/location-template.tsx", status: "scaffolded", notes: "Add: local trust, nearby locations, coverage detail" },
      { path: "components/templates/bike-type-template.tsx", status: "scaffolded", notes: "Add: specialist trust, deep service detail, brands grid" },
      { path: "components/templates/brand-template.tsx", status: "scaffolded", notes: "Add: brand expertise, model content, sibling brands" },
      { path: "components/sections/nearby-locations.tsx", status: "new", notes: "Grid of nearby location pages from cross_link_slugs" },
      { path: "components/sections/brand-grid.tsx", status: "new", notes: "Brand logos for bike-type pages" },
      { path: "components/sections/local-trust.tsx", status: "new", notes: "Location-specific trust signals" },
    ],
    acceptanceCriteria: [
      { id: "1.2-a", description: "Location pages render with localized h1, services, nearby locations", met: false },
      { id: "1.2-b", description: "Bike type pages render with type-specific services, brand grid", met: false },
      { id: "1.2-c", description: "Brand pages render with brand expertise, preset booking", met: false },
      { id: "1.2-d", description: "All 37 location URLs, 5 bike type URLs, 7 brand URLs resolve correctly", met: false },
      { id: "1.2-e", description: "CTA buttons use page-specific booking presets (correct bike type preselected)", met: false },
      { id: "1.2-f", description: "Nearby locations section shows clickable links to related pages", met: false },
    ],
    dependsOn: ["1.1"],
  },

  {
    id: "1.3",
    name: "Pricing + Info Pages",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Pricing page with full price table from DB (services + bike type surcharges). Info/about page with team, story, stats.",
    ownerNotes: "",
    files: [
      { path: "components/templates/pricing-template.tsx", status: "new", notes: "Full price table, FAQ, what's included" },
      { path: "components/templates/info-template.tsx", status: "new", notes: "About page: team, story, trust" },
      { path: "components/sections/price-table.tsx", status: "new", notes: "Renders all services with prices from Supabase" },
    ],
    acceptanceCriteria: [
      { id: "1.3-a", description: "Pricing page shows all services with prices from DB", met: false },
      { id: "1.3-b", description: "Each service row has a 'Book this' CTA", met: false },
      { id: "1.3-c", description: "10+ FAQs about pricing rendered from page_content", met: false },
      { id: "1.3-d", description: "About page has team, story, coverage area, trust stats", met: false },
    ],
    dependsOn: ["1.1"],
  },

  {
    id: "1.4",
    name: "Navbar + Footer + Public Layout",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Production-quality shared navbar and footer for all public pages. Navbar: logo, key links, Book nu CTA, mobile hamburger, scroll behavior. Footer: contact, links, locations grid, logo.",
    ownerNotes: "",
    files: [
      { path: "components/public/navbar.tsx", status: "scaffolded", notes: "REBUILD from scratch: scroll blur, mobile menu, links to key pages" },
      { path: "components/public/footer.tsx", status: "scaffolded", notes: "REBUILD from scratch: contact info, location links, service links" },
      { path: "app/[slug]/layout.tsx", status: "scaffolded", notes: "Wire navbar + footer into public layout" },
      { path: "components/public/home-page.tsx", status: "scaffolded", notes: "DELETE -- replaced by components/templates/homepage-template.tsx" },
      { path: "components/public/hero-section.tsx", status: "scaffolded", notes: "DELETE -- replaced by components/sections/hero-section.tsx" },
      { path: "components/public/services-section.tsx", status: "scaffolded", notes: "DELETE -- replaced by components/sections/services-grid.tsx" },
      { path: "components/public/trust-section.tsx", status: "scaffolded", notes: "DELETE -- replaced by components/sections/trust-bar.tsx" },
    ],
    acceptanceCriteria: [
      { id: "1.4-a", description: "Navbar: sticky, blur on scroll, logo, links, Book nu CTA", met: false },
      { id: "1.4-b", description: "Navbar: mobile hamburger with full menu", met: false },
      { id: "1.4-c", description: "Footer: contact info, service links, popular locations, logo", met: false },
      { id: "1.4-d", description: "Footer location links serve as internal link equity distribution", met: false },
      { id: "1.4-e", description: "Both fully responsive", met: false },
    ],
    dependsOn: ["0.3"],
  },

  {
    id: "1.5",
    name: "Booking Overlay -- Complete Flow",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Polish the booking overlay. Accepts booking presets from page_content (start step, preselected bike type/service). Bike type icons, step progress, service grouping, validation, animations.",
    ownerNotes: "",
    files: [
      { path: "components/booking/booking-overlay.tsx", status: "scaffolded", notes: "4-step flow. Must accept preset props from template" },
      { path: "components/booking/bike-type-step.tsx", status: "scaffolded", notes: "Bike type grid with icons" },
      { path: "components/booking/service-select-step.tsx", status: "scaffolded", notes: "Services grouped by category, running total" },
      { path: "components/booking/customer-info-step.tsx", status: "scaffolded", notes: "Contact form with validation" },
    ],
    acceptanceCriteria: [
      { id: "1.5-a", description: "Accepts BookingPreset prop: startStep (1|2), bikeTypeSlug, preSelectedServices[], bookingHeading", met: false },
      { id: "1.5-b", description: "Step 1: Bike type grid with icons (skipped if bikeTypeSlug preset)", met: false },
      { id: "1.5-c", description: "Step 2: Services grouped by category, running total + duration", met: false },
      { id: "1.5-d", description: "Step 3: Customer form with phone + address validation", met: false },
      { id: "1.5-e", description: "Step indicator, back button, smooth animations", met: false },
      { id: "1.5-f", description: "Mobile fullscreen, desktop centered modal", met: false },
    ],
    dependsOn: ["1.1"],
  },

  {
    id: "1.6",
    name: "Stripe Payment -- End-to-End",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Complete Stripe checkout. Server action validates, creates DB records, creates Stripe session. Confirmation page. Error handling.",
    ownerNotes: "",
    files: [
      { path: "app/actions/booking.ts", status: "scaffolded", notes: "Server action: validate, DB write, Stripe session" },
      { path: "components/booking/checkout-step.tsx", status: "scaffolded", notes: "Stripe Embedded Checkout" },
      { path: "app/booking/confirmation/page.tsx", status: "scaffolded", notes: "Post-payment confirmation" },
    ],
    acceptanceCriteria: [
      { id: "1.6-a", description: "Server action validates inputs server-side", met: false },
      { id: "1.6-b", description: "Stripe session uses DKK with correct line items", met: false },
      { id: "1.6-c", description: "Booking + customer + items written to Supabase before redirect", met: false },
      { id: "1.6-d", description: "Confirmation page shows full booking summary", met: false },
      { id: "1.6-e", description: "Error states: Stripe failure, DB failure, missing session", met: false },
    ],
    dependsOn: ["1.5"],
  },

  {
    id: "1.7",
    name: "Admin Authentication -- Password Gate",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Simple but secure admin authentication. Supabase Auth with email/password. Admin login page, protected layout, session management. No public signup -- admin accounts created manually.",
    ownerNotes: "",
    files: [
      { path: "app/admin/login/page.tsx", status: "new", notes: "Login form: email + password" },
      { path: "app/admin/layout.tsx", status: "scaffolded", notes: "Check auth, redirect to login if no session" },
      { path: "app/actions/auth.ts", status: "new", notes: "Login/logout server actions" },
      { path: "middleware.ts", status: "modify", notes: "Protect /admin routes, redirect unauthenticated users" },
    ],
    acceptanceCriteria: [
      { id: "1.7-a", description: "Admin login page with email + password", met: false },
      { id: "1.7-b", description: "/admin/* routes redirect to /admin/login if no session", met: false },
      { id: "1.7-c", description: "Login creates Supabase Auth session with HTTP-only cookies", met: false },
      { id: "1.7-d", description: "Logout clears session", met: false },
      { id: "1.7-e", description: "No public signup route -- accounts created in Supabase dashboard", met: false },
    ],
    dependsOn: ["1.6"],
  },

  {
    id: "1.8",
    name: "Admin Dashboard -- Order Management",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Functional admin: dashboard stats, booking list, order list, order detail, status changes, booking-to-order conversion.",
    ownerNotes: "",
    files: [
      { path: "app/admin/layout.tsx", status: "scaffolded" },
      { path: "app/admin/page.tsx", status: "scaffolded" },
      { path: "app/admin/bookings/page.tsx", status: "scaffolded" },
      { path: "app/admin/orders/page.tsx", status: "scaffolded" },
      { path: "app/admin/orders/[id]/page.tsx", status: "new" },
      { path: "app/actions/admin.ts", status: "new" },
    ],
    acceptanceCriteria: [
      { id: "1.8-a", description: "Dashboard: today's bookings, pending orders, revenue", met: false },
      { id: "1.8-b", description: "Bookings table: sortable, Convert to Order button", met: false },
      { id: "1.8-c", description: "Orders table: filter by status", met: false },
      { id: "1.8-d", description: "Order detail: customer info, line items, status, notes", met: false },
      { id: "1.8-e", description: "Booking-to-order conversion works", met: false },
    ],
    dependsOn: ["1.7"],
  },

  {
    id: "1.9",
    name: "Admin Page Editor -- Content Management",
    phase: 1,
    phaseLabel: "Take Money",
    status: "queued",
    description:
      "Simple admin page editor for page_content table. Pick a page, edit text fields, toggle sections, manage FAQs, save. No drag-drop, no visual builder -- just fields.",
    ownerNotes: "",
    files: [
      { path: "app/admin/pages/page.tsx", status: "new", notes: "List all pages with status, template type, slug" },
      { path: "app/admin/pages/[slug]/page.tsx", status: "new", notes: "Edit form: h1, subheadline, meta, FAQs, section toggles" },
      { path: "app/actions/pages.ts", status: "new", notes: "Server actions: update page_content" },
    ],
    acceptanceCriteria: [
      { id: "1.9-a", description: "Page list shows all pages with slug, template type, status", met: false },
      { id: "1.9-b", description: "Page editor: edit h1, subheadline, meta_title, meta_description", met: false },
      { id: "1.9-c", description: "Page editor: edit Romanian translations (h1_ro, subheadline_ro)", met: false },
      { id: "1.9-d", description: "Page editor: add/edit/remove FAQs", met: false },
      { id: "1.9-e", description: "Page editor: toggle section visibility", met: false },
      { id: "1.9-f", description: "Save updates page_content in Supabase", met: false },
    ],
    dependsOn: ["1.8"],
  },

  // ---------------------------------------------------------------------------
  // PHASE 2 -- "Operate Efficiently"
  // ---------------------------------------------------------------------------
  {
    id: "2.1",
    name: "Customer Portal -- Phone + PIN Login",
    phase: 2,
    phaseLabel: "Operate Efficiently",
    status: "queued",
    description:
      "Customer-facing portal: see order status, approve quotes, view invoices. Login via phone number + 4-digit PIN sent by SMS.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "2.1-a", description: "Phone + PIN login flow", met: false },
      { id: "2.1-b", description: "Customer sees their order list with statuses", met: false },
      { id: "2.1-c", description: "Customer can approve/reject quotes", met: false },
    ],
    dependsOn: ["1.9"],
  },
  {
    id: "2.2",
    name: "Order State Machine + Quote Flow",
    phase: 2,
    phaseLabel: "Operate Efficiently",
    status: "queued",
    description:
      "Full order lifecycle: received -> diagnosed -> quote_sent -> approved -> in_progress -> quality_check -> invoiced -> paid.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "2.2-a", description: "Status transitions enforced", met: false },
      { id: "2.2-b", description: "Quote creation with line items", met: false },
      { id: "2.2-c", description: "Customer approves/rejects in portal", met: false },
    ],
    dependsOn: ["2.1"],
  },
  {
    id: "2.3",
    name: "Mechanic Mobile Dashboard",
    phase: 2,
    phaseLabel: "Operate Efficiently",
    status: "queued",
    description:
      "Phone-optimized dashboard for mechanics: today's jobs, job detail, task checklist, notes, photo upload.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "2.3-a", description: "Today's assigned jobs on mobile", met: false },
      { id: "2.3-b", description: "Job detail with task list", met: false },
      { id: "2.3-c", description: "Photo upload from phone camera", met: false },
    ],
    dependsOn: ["2.2"],
  },
  {
    id: "2.4",
    name: "Invoice + Payment Capture",
    phase: 2,
    phaseLabel: "Operate Efficiently",
    status: "queued",
    description:
      "Invoice generation from order, send to customer, payment via portal (Stripe).",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "2.4-a", description: "Admin creates invoice from completed order", met: false },
      { id: "2.4-b", description: "Customer sees invoice in portal", met: false },
      { id: "2.4-c", description: "Customer pays via Stripe", met: false },
    ],
    dependsOn: ["2.3"],
  },

  // ---------------------------------------------------------------------------
  // PHASE 3 -- "Scale Without Hiring" (blocks detailed later)
  // ---------------------------------------------------------------------------
  {
    id: "3.1",
    name: "Inventory Management",
    phase: 3,
    phaseLabel: "Scale Without Hiring",
    status: "queued",
    description: "Parts catalog, stock levels, van inventory, low-stock alerts, mechanic logs used parts.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "3.1-a", description: "Parts catalog with prices and stock", met: false },
      { id: "3.1-b", description: "Low stock alerts", met: false },
    ],
    dependsOn: ["2.4"],
  },

  // ---------------------------------------------------------------------------
  // PHASE 4 -- "Dominate Search + AI Flywheel" (blocks detailed later)
  // ---------------------------------------------------------------------------
  {
    id: "4.1",
    name: "Blog Engine + Article Templates",
    phase: 4,
    phaseLabel: "Dominate Search + AI Flywheel",
    status: "queued",
    description: "Blog article template, blog listing, lvl-2 URLs under service pages, auto-generated from order data later.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "4.1-a", description: "Blog template renders articles", met: false },
      { id: "4.1-b", description: "Lvl-2 URL structure works (e.g. /ladcykel-reparation/guide)", met: false },
    ],
    dependsOn: ["1.2"],
  },
  {
    id: "4.2",
    name: "E-commerce: Bike Sales + Parts Shop",
    phase: 4,
    phaseLabel: "Dominate Search + AI Flywheel",
    status: "queued",
    description: "Shop templates for bikes and parts. Product pages, cart, Stripe checkout. Cross-sell sections on service pages.",
    ownerNotes: "",
    files: [],
    acceptanceCriteria: [
      { id: "4.2-a", description: "Shop-bikes template with product grid", met: false },
      { id: "4.2-b", description: "Shop-parts template with dual CTA (buy/install)", met: false },
      { id: "4.2-c", description: "Cross-sell sections on relevant service pages", met: false },
    ],
    dependsOn: ["1.3"],
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getBlockById(id: string): Block | undefined {
  return BLOCKS.find((b) => b.id === id)
}

export function getBlocksForPhase(phase: number): Block[] {
  return BLOCKS.filter((b) => b.phase === phase)
}

export function getCurrentBlock(): Block | undefined {
  return BLOCKS.find((b) => b.status === "in-progress") || BLOCKS.find((b) => b.status === "next")
}

export function getPhaseProgress(phase: number) {
  const blocks = getBlocksForPhase(phase)
  const done = blocks.filter((b) => b.status === "done").length
  const total = blocks.length
  const criteria = blocks.flatMap((b) => b.acceptanceCriteria)
  const criteriaMet = criteria.filter((c) => c.met).length
  return { done, total, percentage: total > 0 ? Math.round((done / total) * 100) : 0, criteriaMet, criteriaTotal: criteria.length }
}

export function getOverallStats() {
  const totalBlocks = BLOCKS.length
  const doneBlocks = BLOCKS.filter((b) => b.status === "done").length
  const totalCriteria = BLOCKS.flatMap((b) => b.acceptanceCriteria).length
  const metCriteria = BLOCKS.flatMap((b) => b.acceptanceCriteria).filter((c) => c.met).length
  const totalFiles = BLOCKS.flatMap((b) => b.files).length
  const doneFiles = BLOCKS.flatMap((b) => b.files).filter((f) => f.status === "done").length
  return { totalBlocks, doneBlocks, totalCriteria, metCriteria, totalFiles, doneFiles }
}
