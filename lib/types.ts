// BikeDoctor Phase 1 types -- derived from Supabase schema

export interface BikeType {
  id: string
  slug: string
  name_da: string
  name_en: string
  name_ro: string | null
  sort_order: number
  is_active: boolean
}

export interface ServiceCatalogItem {
  id: string
  slug: string
  name_da: string
  name_en: string
  name_ro: string | null
  description_da: string | null
  description_en: string | null
  description_ro: string | null
  price_dkk: number
  duration_minutes: number
  category: "repair" | "service" | "safety"
  is_active: boolean
  sort_order: number
}

export interface Customer {
  id: string
  full_name: string
  email: string | null
  phone: string
  address: string | null
  zip_code: string | null
  city: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type BookingStatus = "pending" | "confirmed" | "paid" | "cancelled" | "expired"

export interface Booking {
  id: string
  customer_id: string | null
  bike_type_id: string | null
  status: BookingStatus
  preferred_date: string | null
  preferred_time_slot: string | null
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_address: string | null
  customer_zip: string | null
  customer_city: string | null
  total_dkk: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface BookingLineItem {
  id: string
  booking_id: string
  service_id: string
  quantity: number
  unit_price_dkk: number
}

export type OrderStatus =
  | "received"
  | "diagnosed"
  | "quote_sent"
  | "approved"
  | "in_progress"
  | "quality_check"
  | "invoiced"
  | "paid"
  | "cancelled"

export interface Order {
  id: string
  booking_id: string | null
  customer_id: string | null
  status: OrderStatus
  total_dkk: number
  assigned_mechanic_id: string | null
  scheduled_date: string | null
  completed_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  customer?: Customer | null
  booking?: Booking | null
  line_items?: OrderLineItem[]
}

export interface OrderLineItem {
  id: string
  order_id: string
  service_id: string | null
  description: string
  quantity: number
  unit_price_dkk: number
}

export interface Payment {
  id: string
  booking_id: string | null
  order_id: string | null
  stripe_payment_intent_id: string | null
  stripe_session_id: string | null
  amount_dkk: number
  currency: string
  status: string
  created_at: string
}

// Booking flow state
export interface BookingFlowState {
  step: "bike-type" | "services" | "info" | "checkout" | "confirmation"
  selectedBikeType: BikeType | null
  selectedServices: Array<{ service: ServiceCatalogItem; quantity: number }>
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
    zip: string
    city: string
    preferredDate: string
    preferredTimeSlot: string
    notes: string
  } | null
}

// i18n locale type -- ALL 3 available everywhere
// da = Danish  (PRIMARY customer-facing, SEO target market)
// en = English (PRIMARY admin/mechanic; secondary customer-facing)
// ro = Romanian (SECONDARY admin/mechanic; team language)
// Fallback: requested -> en -> da
export type Locale = "da" | "en" | "ro"

// ============================================================================
// Page Content (CMS layer)
// ============================================================================

// Canonical list of page template types.
// Used by: page_content.template_type (DB), site-architecture.ts PageType, page-templates.ts
// AI INSTRUCTION: If you add a new type here, also add a template in page-templates.ts.
export type PageTemplateType =
  | "homepage"
  | "location"
  | "bike-type"
  | "brand"
  | "service"   // Individual service detail pages (e.g. /gear-justering)
  | "pricing"
  | "blog"
  | "shop-bikes"
  | "shop-parts"
  | "info"

export type PageStatus = "draft" | "published"

export interface BookingPreset {
  /** Which booking step to open on (1 = bike type, 2 = services) */
  startStep: 1 | 2
  /** Pre-select this bike type slug (used when starting at step 2) */
  bikeTypeSlug?: string
  /** Pre-select these service slugs in the services step */
  preSelectedServices?: string[]
  /** Custom heading shown in the booking overlay for this page */
  bookingHeading?: string
}

export interface FaqItem {
  question: string      // Danish (primary, used for SEO)
  answer: string        // Danish
  questionEn?: string
  answerEn?: string
  questionRo?: string
  answerRo?: string
}

export interface PageContent {
  id: string
  slug: string
  template_type: PageTemplateType
  status: PageStatus
  // Danish (primary -- used for SEO, default render)
  meta_title: string
  meta_description: string
  // English
  meta_title_en: string | null
  meta_description_en: string | null
  og_image_url: string | null
  canonical_url: string | null
  // Headings: da (primary), en, ro
  h1: string              // Danish
  h1_en: string | null
  h1_ro: string | null
  subheadline: string | null    // Danish
  subheadline_en: string | null
  subheadline_ro: string | null
  sections_config: Record<string, { visible: boolean; copy?: Record<string, string> }>
  booking_preset: BookingPreset
  faqs: FaqItem[]
  schema_types: string[]
  cross_link_slugs: string[]
  parent_slug: string | null
  cta_text: string          // Danish
  cta_text_en: string | null
  cta_text_ro: string | null
  sort_order: number
  created_at: string
  updated_at: string
}
