// =============================================================================
// BikeDoctor -- Project Architecture Data Model
// =============================================================================
// This is the SINGLE SOURCE OF TRUTH for the entire BikeDoctor platform.
// Every module, feature, sub-feature, data flow, and dependency is defined here.
// When a feature is built, update its status here. The project map reads this.
// =============================================================================

export type FeatureStatus = "planned" | "in-progress" | "done"
export type FeaturePriority = "critical" | "high" | "medium" | "low"

export interface Feature {
  id: string
  name: string
  description: string
  status: FeatureStatus
  priority: FeaturePriority
  dependencies?: string[] // feature IDs this depends on
  relatedTables?: string[]
  apiRoutes?: string[]
  folderPaths?: string[]
}

export interface Module {
  id: string
  name: string
  shortName: string
  description: string
  icon: string // Lucide icon name
  color: string // Tailwind color class for the module accent
  colorHex: string // Hex for SVG lines
  features: Feature[]
  relatedTables: string[]
  folderPaths: string[]
}

export interface ModuleConnection {
  sourceId: string
  targetId: string
  label: string
  description: string
}

// =============================================================================
// MODULE DEFINITIONS
// =============================================================================

export const PROJECT_MODULES: Module[] = [
  // -------------------------------------------------------------------------
  // 1. PUBLIC WEBSITE + BOOKING
  // -------------------------------------------------------------------------
  {
    id: "booking",
    name: "Public Website + Booking",
    shortName: "Booking",
    description:
      "CRO-optimized public website with bike type selection cards, full-screen booking overlay, service selection, Stripe authorization hold, and Trustpilot social proof.",
    icon: "Globe",
    color: "text-[#F15C45]",
    colorHex: "#F15C45",
    relatedTables: [
      "bookings",
      "booking_line_items",
      "service_catalog",
      "promo_codes",
      "bike_models",
    ],
    folderPaths: [
      "app/(public)/",
      "app/(public)/booking/",
      "components/booking/",
    ],
    features: [
      {
        id: "book-hero",
        name: "Hero Section + CTA",
        description:
          "Conversion-focused hero with headline, sub-text, and primary booking CTA button. Background image of bike repair. Mobile-first layout.",
        status: "planned",
        priority: "critical",
        folderPaths: ["components/public/hero.tsx"],
      },
      {
        id: "book-biketypes",
        name: "Bike Type Selection Cards",
        description:
          "Visual cards for each bike type (City, El-cykel, Racer, Cargo, Kids, etc.). Each card shows icon, name, and starting price. Tapping opens the booking overlay.",
        status: "planned",
        priority: "critical",
        relatedTables: ["bike_types"],
        folderPaths: ["components/booking/bike-type-cards.tsx"],
      },
      {
        id: "book-overlay",
        name: "Full-Screen Booking Overlay",
        description:
          "Multi-step booking overlay: Step 1 = bike type (pre-selected), Step 2 = services checklist, Step 3 = customer info (phone, name, address, zip), Step 4 = time slot. Animated transitions between steps.",
        status: "planned",
        priority: "critical",
        dependencies: ["book-biketypes", "book-services"],
        folderPaths: ["components/booking/booking-overlay.tsx"],
      },
      {
        id: "book-services",
        name: "Service Selection Checklist",
        description:
          "List of available services per bike type with descriptions, prices, and checkboxes. Running total at bottom. Services loaded from service_catalog table.",
        status: "planned",
        priority: "critical",
        relatedTables: ["service_catalog", "service_bike_type_prices"],
        folderPaths: ["components/booking/service-selector.tsx"],
      },
      {
        id: "book-customerinfo",
        name: "Customer Info Form",
        description:
          "Form collecting: phone number (primary ID), full name, email, pickup address, zip code. Phone normalized with libphonenumber. Existing customer detected by phone.",
        status: "planned",
        priority: "critical",
        relatedTables: ["customers"],
        folderPaths: ["components/booking/customer-form.tsx"],
      },
      {
        id: "book-stripe",
        name: "Stripe Authorization Hold",
        description:
          "After customer info, create a Stripe PaymentIntent with capture_method=manual for 499 DKK authorization hold. On success, booking is confirmed. On failure, show retry UI.",
        status: "planned",
        priority: "critical",
        dependencies: ["book-customerinfo"],
        apiRoutes: [
          "app/api/stripe/create-intent/route.ts",
          "app/api/stripe/webhooks/route.ts",
        ],
      },
      {
        id: "book-trustpilot",
        name: "Trustpilot Review Carousel",
        description:
          "Auto-scrolling carousel of Trustpilot reviews with star ratings, reviewer name, and text. Uses Trustpilot Business API or static data initially. Placed below hero for social proof.",
        status: "planned",
        priority: "medium",
        folderPaths: ["components/public/trustpilot-carousel.tsx"],
      },
      {
        id: "book-confirmation",
        name: "Booking Confirmation Screen",
        description:
          "Post-booking success screen: order summary, estimated pickup window, 'We will SMS you' message. Confetti animation optional. Links to customer portal.",
        status: "planned",
        priority: "high",
        dependencies: ["book-stripe"],
        folderPaths: ["components/booking/confirmation.tsx"],
      },
      {
        id: "book-symptom-input",
        name: "Symptom Description & Bike Details",
        description:
          "Additional booking step collecting: (1) Free-text symptom description ('What is the problem?'), (2) Bike brand/model/year via structured dropdowns + autocomplete. This data feeds into CRM order record and later into the AI Content Engine for bike-specific knowledge pages and repair pattern analysis.",
        status: "planned",
        priority: "high",
        relatedTables: ["bookings", "bike_models"],
        folderPaths: ["components/booking/symptom-form.tsx"],
        dependencies: ["book-biketypes"],
      },
      {
        id: "book-photo-consent",
        name: "Marketing Photo Consent Checkbox",
        description:
          "Checkbox in booking flow: 'May we use photos of your repair on our website?' Default unchecked. Stored on booking record and inherited by order. Respects GDPR -- customer can revoke any time via portal.",
        status: "planned",
        priority: "high",
        relatedTables: ["bookings"],
        folderPaths: ["components/booking/consent-checkbox.tsx"],
      },
      {
        id: "book-attribution",
        name: "How Did You Find Us Tracking",
        description:
          "Optional field at end of booking: 'How did you find BikeDoctor?' Options: Google search, Social media, Friend referral, Flyer, Repeat customer, Other. Stored for marketing attribution analysis in the AI Content Engine.",
        status: "planned",
        priority: "low",
        relatedTables: ["bookings"],
        folderPaths: ["components/booking/attribution-field.tsx"],
      },
      {
        id: "book-promo",
        name: "Promo Code System",
        description:
          "Input field in booking overlay for promo codes. Validates against promo_codes table (active, not expired, usage limit). Applies percentage or fixed discount to total.",
        status: "planned",
        priority: "low",
        relatedTables: ["promo_codes", "promo_code_usages"],
        folderPaths: ["components/booking/promo-code.tsx"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. CRM (CUSTOMER + ORDERS)
  // -------------------------------------------------------------------------
  {
    id: "crm",
    name: "CRM (Customers + Orders)",
    shortName: "CRM",
    description:
      "Customer management with phone-based identity. Full order lifecycle: Quote -> Work Order -> Invoice. Line items, photo attachments, internal notes, and complete audit trail.",
    icon: "Users",
    color: "text-[#082852]",
    colorHex: "#082852",
    relatedTables: [
      "customers",
      "orders",
      "order_line_items",
      "order_photos",
      "order_notes",
      "order_status_history",
      "order_mechanic_notes",
    ],
    folderPaths: ["app/(admin)/crm/", "components/crm/"],
    features: [
      {
        id: "crm-customer-create",
        name: "Customer Creation + Lookup",
        description:
          "Create customer by phone number (primary key). Normalize with libphonenumber. On booking, if phone exists, link to existing customer. Customer fields: phone, name, email, address, zip, language preference (DA/EN).",
        status: "planned",
        priority: "critical",
        relatedTables: ["customers"],
      },
      {
        id: "crm-phone-normalize",
        name: "Phone Number Normalization",
        description:
          "All phone numbers run through libphonenumber to E.164 format. Danish numbers get +45 prefix. Used everywhere: booking form, admin search, portal login.",
        status: "planned",
        priority: "critical",
      },
      {
        id: "crm-order-create",
        name: "Order Creation + State Machine",
        description:
          "Orders created from bookings or manually in admin. Status state machine: received -> diagnosed -> quote_sent -> approved -> in_progress -> quality_check -> ready_for_delivery -> delivered -> invoiced -> paid -> closed. Each transition logged to audit.",
        status: "planned",
        priority: "critical",
        relatedTables: ["orders", "order_status_history"],
      },
      {
        id: "crm-line-items",
        name: "Line Items CRUD",
        description:
          "Each order has line items: service lines (from catalog) and parts lines (from inventory). Fields: description, qty, unit_price, VAT rate, discount, total. Mechanic can add in the field; office can edit in admin.",
        status: "planned",
        priority: "critical",
        relatedTables: ["order_line_items"],
        dependencies: ["crm-order-create"],
      },
      {
        id: "crm-photos",
        name: "Photo Upload + Gallery",
        description:
          "Upload before/after photos per order. Stored in Supabase Storage. Displayed in order detail, customer portal, and mechanic app. Max 10 photos per order. Thumbnails generated server-side.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_photos"],
        dependencies: ["crm-order-create"],
      },
      {
        id: "crm-notes",
        name: "Internal Notes System",
        description:
          "Timestamped internal notes on each order. Visible to office + mechanic, hidden from customer. Supports @mentions for team notification. Markdown-like formatting.",
        status: "planned",
        priority: "medium",
        relatedTables: ["order_notes"],
      },
      {
        id: "crm-mechanic-notes",
        name: "Structured Mechanic Notes (Required)",
        description:
          "Mandatory structured notes every mechanic must fill per order. Three sections: (1) Diagnosis -- what was wrong, (2) Work Performed -- what was done, (3) Recommendations -- what the customer should watch for. Stored as JSON in order_mechanic_notes table. Feeds into the AI Content Engine for SEO article generation, bike model knowledge pages, and service insights.",
        status: "planned",
        priority: "critical",
        relatedTables: ["order_mechanic_notes"],
        dependencies: ["crm-order-create"],
      },
      {
        id: "crm-photo-consent",
        name: "Photo Marketing Consent Flag",
        description:
          "Boolean flag per order photo indicating customer consent for marketing use. Collected at booking ('May we use repair photos on our website?') and toggleable in admin. Only consented photos feed into the AI Content Engine for auto-generated articles, service pages, and before/after galleries.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_photos"],
        dependencies: ["crm-photos"],
      },
      {
        id: "crm-audit",
        name: "Audit Log / Status History",
        description:
          "Every status change, line item edit, note addition, and photo upload is logged with timestamp, user, old value, and new value. Immutable append-only table. Displayed as timeline in order detail.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_status_history"],
      },
      {
        id: "crm-stripe-refs",
        name: "Stripe Payment References",
        description:
          "Each order stores Stripe PaymentIntent ID, authorization status, capture status. Admin can view payment timeline. Link to Stripe Dashboard for each payment.",
        status: "planned",
        priority: "high",
        relatedTables: ["orders"],
        dependencies: ["book-stripe"],
      },
      {
        id: "crm-customer-merge",
        name: "Customer Merge / Dedup",
        description:
          "Admin tool to merge duplicate customers (e.g., same person with two phone numbers). Merges all orders, notes, and history to the primary record. Soft-deletes the duplicate.",
        status: "planned",
        priority: "low",
        relatedTables: ["customers", "orders"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. INVENTORY
  // -------------------------------------------------------------------------
  {
    id: "inventory",
    name: "Inventory Management",
    shortName: "Inventory",
    description:
      "Parts catalog with SKU, cost/sell price, VAT. Stock locations, movement ledger. Automatic reservation on order creation, consumption on invoice. Low-stock alerts and reorder suggestions.",
    icon: "Package",
    color: "text-[#f08a72]",
    colorHex: "#f08a72",
    relatedTables: [
      "parts",
      "stock_locations",
      "stock_movements",
      "part_categories",
    ],
    folderPaths: ["app/(admin)/inventory/", "components/inventory/"],
    features: [
      {
        id: "inv-catalog",
        name: "Parts Catalog",
        description:
          "Master list of all parts. Fields: SKU, name, description, category, cost_price, sell_price, VAT_rate (25%), supplier, barcode, image. Searchable, filterable, paginated.",
        status: "planned",
        priority: "critical",
        relatedTables: ["parts", "part_categories"],
      },
      {
        id: "inv-locations",
        name: "Stock Locations",
        description:
          "Define physical stock locations: Main Warehouse, Mechanic Van 1, Van 2, etc. Each location has a name and type (warehouse | van | shop). Parts have quantity per location.",
        status: "planned",
        priority: "high",
        relatedTables: ["stock_locations", "stock_movements"],
      },
      {
        id: "inv-ledger",
        name: "Stock Movement Ledger",
        description:
          "Immutable log of every stock change: type (purchase, sale, transfer, adjustment, reservation, consumption), part_id, location_id, qty_change, reference_order_id, performed_by, timestamp.",
        status: "planned",
        priority: "critical",
        relatedTables: ["stock_movements"],
      },
      {
        id: "inv-reservation",
        name: "Order Part Reservation",
        description:
          "When a mechanic adds a part line item to an order, stock is reserved (not consumed). Reservation = negative available, but stock_on_hand unchanged. Shown as 'Available: X (Y reserved)'.",
        status: "planned",
        priority: "high",
        relatedTables: ["stock_movements", "order_line_items"],
        dependencies: ["crm-line-items", "inv-ledger"],
      },
      {
        id: "inv-consumption",
        name: "Invoice Consumption",
        description:
          "When order is invoiced, reserved parts become consumed. stock_on_hand decreases. If not reserved, direct consumption. Movement type = 'consumption' with order reference.",
        status: "planned",
        priority: "high",
        relatedTables: ["stock_movements"],
        dependencies: ["inv-reservation", "crm-order-create"],
      },
      {
        id: "inv-alerts",
        name: "Low-Stock Alerts",
        description:
          "Each part has reorder_point and reorder_qty. When available stock falls below reorder_point, alert appears in admin dashboard. Daily digest email to inventory manager.",
        status: "planned",
        priority: "medium",
        relatedTables: ["parts"],
        dependencies: ["inv-catalog", "notif-triggers"],
      },
      {
        id: "inv-reorder",
        name: "Reorder Suggestions",
        description:
          "Auto-generated purchase order suggestions based on low stock, historical consumption rate, and lead time. Admin can approve and send to supplier (email or manual).",
        status: "planned",
        priority: "low",
        relatedTables: ["parts"],
        dependencies: ["inv-alerts"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. NOTIFICATIONS
  // -------------------------------------------------------------------------
  {
    id: "notifications",
    name: "Notification System",
    shortName: "Notifications",
    description:
      "Central template-based notification system. Supports SMS (Twilio), email (Resend), and in-app channels. Event-driven triggers on order status changes. All templates localized DA/EN.",
    icon: "Bell",
    color: "text-[#d94535]",
    colorHex: "#d94535",
    relatedTables: [
      "notification_templates",
      "notification_log",
      "notification_preferences",
    ],
    folderPaths: ["app/(admin)/notifications/", "lib/notifications/"],
    features: [
      {
        id: "notif-templates",
        name: "Template Management System",
        description:
          "Admin UI to create/edit notification templates. Each template has: trigger event, channel (SMS/email/in-app), subject, body with {{variables}}, DA and EN versions. Preview with sample data.",
        status: "planned",
        priority: "critical",
        relatedTables: ["notification_templates"],
      },
      {
        id: "notif-sms",
        name: "SMS Channel (Twilio)",
        description:
          "Send SMS via Twilio API. Format phone to E.164. Track delivery status via webhooks. Cost per message logged. Retry on failure (max 3).",
        status: "planned",
        priority: "critical",
        apiRoutes: ["lib/notifications/channels/sms.ts"],
      },
      {
        id: "notif-email",
        name: "Email Channel (Resend)",
        description:
          "Send transactional emails via Resend API. HTML templates with React Email. Track opens/clicks. Sender: noreply@bikedoctor.dk.",
        status: "planned",
        priority: "high",
        apiRoutes: ["lib/notifications/channels/email.ts"],
      },
      {
        id: "notif-inapp",
        name: "In-App Notifications",
        description:
          "Real-time in-app notifications for admin/mechanic dashboards. Stored in notification_log table. Bell icon with unread count. Mark as read. Supabase real-time subscription.",
        status: "planned",
        priority: "medium",
        relatedTables: ["notification_log"],
      },
      {
        id: "notif-triggers",
        name: "Event-Driven Triggers",
        description:
          "Automatic notification dispatch on events: booking_created, order_status_changed, quote_sent, quote_approved, invoice_sent, payment_received, mechanic_assigned. Configured per template.",
        status: "planned",
        priority: "critical",
        dependencies: ["notif-templates", "crm-order-create"],
      },
      {
        id: "notif-lang",
        name: "Customer Language Preference",
        description:
          "Each customer has language_preference (DA/EN). Notification system auto-selects the correct template version. Default = DA. Settable in booking form and customer portal.",
        status: "planned",
        priority: "high",
        relatedTables: ["customers"],
        dependencies: ["notif-templates", "crm-customer-create"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 5. MECHANIC DASHBOARD
  // -------------------------------------------------------------------------
  {
    id: "mechanic",
    name: "Mechanic Dashboard",
    shortName: "Mechanic",
    description:
      "Mobile-first dashboard for field mechanics. Geo-polygon zone assignment, today's job list, job detail with photo upload, task progress tracking, parts consumption, mark ready-to-invoice.",
    icon: "Wrench",
    color: "text-[#0c3a6e]",
    colorHex: "#0c3a6e",
    relatedTables: [
      "orders",
      "mechanic_zones",
      "mechanic_zone_assignments",
      "order_photos",
      "order_mechanic_notes",
    ],
    folderPaths: ["app/(mechanic)/", "components/mechanic/"],
    features: [
      {
        id: "mech-zones",
        name: "Geo-Polygon Zone Assignment",
        description:
          "Admin defines zones as GPS polygons on a map. Each mechanic is assigned to 1+ zones. New bookings auto-assign to the mechanic covering that zip/area. Mapbox or Leaflet for zone editor.",
        status: "planned",
        priority: "high",
        relatedTables: ["mechanic_zones", "mechanic_zone_assignments"],
      },
      {
        id: "mech-todayjobs",
        name: "Today's Jobs View",
        description:
          "Mechanic sees today's assigned jobs as cards. Each card: customer name, address, bike type, services, status. Sorted by optimal route order. Pull-to-refresh. Tap to open detail.",
        status: "planned",
        priority: "critical",
        relatedTables: ["orders"],
        dependencies: ["crm-order-create", "mech-zones"],
      },
      {
        id: "mech-jobdetail",
        name: "Job Detail View",
        description:
          "Full order detail for mechanic: customer info, bike details, services to perform (checklist), parts needed, photos, notes. Swipeable photo gallery. Edit line items.",
        status: "planned",
        priority: "critical",
        dependencies: ["mech-todayjobs", "crm-line-items"],
      },
      {
        id: "mech-photos",
        name: "Photo Upload from Field",
        description:
          "Camera capture or gallery upload. Auto-compress before upload. Tag as before/during/after. Upload to Supabase Storage with order reference. Offline queue for poor connectivity.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_photos"],
        dependencies: ["crm-photos"],
      },
      {
        id: "mech-progress",
        name: "Task Progress Tracking",
        description:
          "Each service on the order is a task. Mechanic marks tasks as: not started, in progress, completed, skipped (with reason). Progress bar on job card. Auto-status-update when all tasks done.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_line_items"],
        dependencies: ["mech-jobdetail"],
      },
      {
        id: "mech-parts",
        name: "Parts Used Tracking",
        description:
          "Mechanic scans or selects parts used from inventory. Auto-creates line items on order. Stock reserved immediately. Shows van stock availability. Warning if part not in van.",
        status: "planned",
        priority: "high",
        dependencies: ["inv-reservation", "mech-jobdetail"],
      },
      {
        id: "mech-structured-notes",
        name: "Required Structured Notes Form",
        description:
          "Before marking a job complete, mechanic MUST fill three structured note fields: (1) Diagnosis -- what was found wrong, (2) Work Performed -- exactly what was done and parts replaced, (3) Recommendations -- future maintenance advice. Validated before status transition. Rich text with quick-insert templates for common diagnoses. This is the primary data source for the AI Content Engine.",
        status: "planned",
        priority: "critical",
        relatedTables: ["order_mechanic_notes"],
        dependencies: ["mech-jobdetail", "crm-mechanic-notes"],
        folderPaths: ["components/mechanic/structured-notes-form.tsx"],
      },
      {
        id: "mech-before-after-photos",
        name: "Before/After Photo Workflow",
        description:
          "Enforced photo workflow: mechanic must take 'before' photo when arriving, and 'after' photo when repair is complete. Photos tagged with type (before/during/after) and auto-linked to order. Consent flag inherited from booking -- only consented photos eligible for AI Content Engine use.",
        status: "planned",
        priority: "high",
        relatedTables: ["order_photos"],
        dependencies: ["mech-photos", "crm-photo-consent"],
        folderPaths: ["components/mechanic/photo-workflow.tsx"],
      },
      {
        id: "mech-invoice-ready",
        name: "Mark Ready-to-Invoice",
        description:
          "When all tasks complete, parts logged, AND structured notes filled, mechanic taps 'Ready for Invoice'. Validates: all tasks done, parts recorded, diagnosis/work/recommendations notes present, before+after photos uploaded. Changes order status to quality_check. Triggers notification to office for review and invoicing.",
        status: "planned",
        priority: "critical",
        dependencies: ["mech-progress", "mech-parts", "mech-structured-notes", "mech-before-after-photos", "notif-triggers"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 6. CUSTOMER PORTAL
  // -------------------------------------------------------------------------
  {
    id: "portal",
    name: "Customer Portal",
    shortName: "Portal",
    description:
      "Self-service portal for customers. Phone + PIN login (SMS-based). View orders with thumbnails, approve quotes, pay invoices via Stripe, access repair history.",
    icon: "User",
    color: "text-[#4a6a8a]",
    colorHex: "#4a6a8a",
    relatedTables: ["customers", "orders", "order_photos"],
    folderPaths: ["app/(portal)/", "components/portal/"],
    features: [
      {
        id: "portal-login",
        name: "Phone + PIN Login",
        description:
          "Customer enters phone number, receives 6-digit PIN via SMS. PIN valid for 5 minutes. On verification, creates Supabase auth session. No password needed. Rate-limited to prevent abuse.",
        status: "planned",
        priority: "critical",
        relatedTables: ["customers"],
        dependencies: ["notif-sms", "crm-customer-create"],
        apiRoutes: ["app/api/auth/send-pin/route.ts", "app/api/auth/verify-pin/route.ts"],
      },
      {
        id: "portal-orderlist",
        name: "Order List with Thumbnails",
        description:
          "Dashboard showing all customer's orders. Each card: order #, bike type, status badge, primary photo thumbnail, date. Sorted newest first. Filter by status.",
        status: "planned",
        priority: "critical",
        dependencies: ["portal-login", "crm-order-create"],
      },
      {
        id: "portal-orderdetail",
        name: "Order Detail View",
        description:
          "Full order detail: status timeline, line items table, photo gallery (swipeable), mechanic notes (customer-visible only). PDF download for quote/invoice.",
        status: "planned",
        priority: "critical",
        dependencies: ["portal-orderlist"],
      },
      {
        id: "portal-quote-approve",
        name: "Quote Approval Flow",
        description:
          "When order status = quote_sent, customer sees 'Approve Quote' button. Tapping approves and moves order to approved status. Customer can also reject with optional reason.",
        status: "planned",
        priority: "critical",
        dependencies: ["portal-orderdetail", "crm-order-create"],
      },
      {
        id: "portal-pay",
        name: "Invoice Payment (Stripe)",
        description:
          "When order status = invoiced, customer sees 'Pay Now' button. Opens Stripe Checkout or embedded payment form. On success, order moves to paid. Captures the authorization hold or creates new charge.",
        status: "planned",
        priority: "critical",
        dependencies: ["portal-orderdetail", "crm-stripe-refs"],
      },
      {
        id: "portal-history",
        name: "Repair History",
        description:
          "Historical view of all past completed orders. Useful for warranty reference, recurring maintenance tracking. Export as PDF for insurance claims.",
        status: "planned",
        priority: "medium",
        dependencies: ["portal-orderlist"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. ADMIN BACKOFFICE
  // -------------------------------------------------------------------------
  {
    id: "admin",
    name: "Admin Backoffice",
    shortName: "Admin",
    description:
      "Role-based admin dashboard. RBAC with Owner, Office, Mechanic, Inventory Manager roles. Kanban + list views for orders. Service catalog editor, zone editor, language management, user management.",
    icon: "Shield",
    color: "text-[#153d6b]",
    colorHex: "#153d6b",
    relatedTables: [
      "users",
      "user_roles",
      "orders",
      "customers",
      "service_catalog",
      "mechanic_zones",
    ],
    folderPaths: ["app/(admin)/", "components/admin/"],
    features: [
      {
        id: "admin-rbac",
        name: "RBAC Role System",
        description:
          "Four roles: Owner (all access), Office (orders + customers + inventory), Mechanic (own jobs + limited edit), Inventory Manager (inventory + reports). Roles stored in user_roles table. Middleware checks on every admin route.",
        status: "planned",
        priority: "critical",
        relatedTables: ["users", "user_roles"],
      },
      {
        id: "admin-orders",
        name: "Order Management (Kanban + List)",
        description:
          "Two views: Kanban board (columns = statuses, drag to change) and sortable/filterable list table. Bulk actions: assign mechanic, change status, send notification. Quick search by order #, customer phone/name.",
        status: "planned",
        priority: "critical",
        relatedTables: ["orders"],
        dependencies: ["crm-order-create", "admin-rbac"],
      },
      {
        id: "admin-customers",
        name: "Customer Management",
        description:
          "Full customer list with search/filter. Customer detail: contact info, all orders, notes, total spend, first/last order date. Inline edit. Merge duplicates.",
        status: "planned",
        priority: "high",
        relatedTables: ["customers", "orders"],
        dependencies: ["crm-customer-create", "admin-rbac"],
      },
      {
        id: "admin-service-catalog",
        name: "Service Catalog Editor",
        description:
          "CRUD for services offered. Each service: name, description, default_price, bike_type_overrides, estimated_time, category. Prices per bike type. Sort order for booking overlay. Toggle active/inactive.",
        status: "planned",
        priority: "high",
        relatedTables: ["service_catalog", "service_bike_type_prices"],
      },
      {
        id: "admin-zones",
        name: "Zone Polygon Editor",
        description:
          "Map-based editor for mechanic zones. Draw/edit polygons on Mapbox map. Assign mechanics to zones. Test zip code: input a zip, see which zone it falls in. Coverage gaps highlighted.",
        status: "planned",
        priority: "high",
        relatedTables: ["mechanic_zones", "mechanic_zone_assignments"],
        dependencies: ["mech-zones"],
      },
      {
        id: "admin-inventory",
        name: "Inventory Dashboard",
        description:
          "Overview: total SKUs, stock value, low-stock items, recent movements. Quick link to parts catalog, stock transfers, purchase orders. Charts for consumption trends.",
        status: "planned",
        priority: "high",
        dependencies: ["inv-catalog", "admin-rbac"],
      },
      {
        id: "admin-notif-templates",
        name: "Notification Template Editor",
        description:
          "Visual editor for notification templates. Live preview with sample data. Test send to own phone/email. Version history. DA/EN side-by-side editing.",
        status: "planned",
        priority: "medium",
        dependencies: ["notif-templates"],
      },
      {
        id: "admin-users",
        name: "User Management",
        description:
          "Manage team members: invite by email, assign role, deactivate. Activity log per user. Password reset. Two-factor auth for Owner role.",
        status: "planned",
        priority: "high",
        relatedTables: ["users", "user_roles"],
        dependencies: ["admin-rbac"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 8. SEO & i18n
  // -------------------------------------------------------------------------
  {
    id: "seo",
    name: "SEO & Internationalization",
    shortName: "SEO & i18n",
    description:
      "next-intl setup for DA/EN. URL-based locale routing (/da, /en). Structured data (JSON-LD) for local business + services. City/area landing pages for local SEO. Blog-ready structure. Metadata control per page.",
    icon: "Search",
    color: "text-[#2a7d6d]",
    colorHex: "#2a7d6d",
    relatedTables: ["translations", "city_pages", "blog_posts"],
    folderPaths: ["app/[locale]/", "messages/", "lib/i18n/"],
    features: [
      {
        id: "seo-nextintl",
        name: "next-intl Setup (DA/EN)",
        description:
          "Install and configure next-intl. URL prefix routing: /da/..., /en/... Default locale = da. Translation files in messages/da.json and messages/en.json. Server + client component support.",
        status: "planned",
        priority: "critical",
        folderPaths: ["messages/da.json", "messages/en.json", "lib/i18n/"],
      },
      {
        id: "seo-translations",
        name: "Translation Management",
        description:
          "All UI strings in translation files. Admin can edit translations in-app (stored in DB, overrides file defaults). Namespace per module: booking, portal, admin, public.",
        status: "planned",
        priority: "high",
        relatedTables: ["translations"],
        dependencies: ["seo-nextintl"],
      },
      {
        id: "seo-jsonld",
        name: "Structured Data (JSON-LD)",
        description:
          "LocalBusiness schema on homepage. Service schema on each service page. BreadcrumbList on all pages. FAQ schema on FAQ page. AggregateRating from Trustpilot data.",
        status: "planned",
        priority: "high",
        dependencies: ["seo-nextintl"],
      },
      {
        id: "seo-citypages",
        name: "City/Area Landing Pages",
        description:
          "Dynamic pages for each service area: /da/cykelreparation-kobenhavn, /da/cykelreparation-frederiksberg, etc. Unique content per page. Local keywords. Map showing coverage area. Internal linking.",
        status: "planned",
        priority: "medium",
        relatedTables: ["city_pages"],
      },
      {
        id: "seo-metadata",
        name: "Metadata Control",
        description:
          "Per-page title, description, og:image, canonical URL. Admin can override defaults. Auto-generated og:image with bike type + service. Sitemap.xml auto-generated. Robots.txt configured.",
        status: "planned",
        priority: "high",
        dependencies: ["seo-nextintl"],
      },
      {
        id: "seo-blog",
        name: "Blog Structure",
        description:
          "MDX-based blog at /da/blog and /en/blog. Categories, tags, author. Used for SEO content: 'How to maintain your city bike', 'When to replace brake pads'. Admin editor in backoffice. Feeds from AI Content Engine auto-generated drafts.",
        status: "planned",
        priority: "low",
        relatedTables: ["blog_posts"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 9. AI CONTENT & SEO ENGINE
  // -------------------------------------------------------------------------
  {
    id: "ai-engine",
    name: "AI Content & SEO Engine",
    shortName: "AI Engine",
    description:
      "Data-driven content automation pipeline. Aggregates mechanic notes, repair data, photos, and customer inputs to auto-generate SEO content: neighborhood pages, bike model knowledge bases, seasonal articles, service pages with live stats. Triggers at configurable order thresholds (default: every 50-100 orders). All content is AI-drafted and human-reviewed before publishing.",
    icon: "Sparkles",
    color: "text-[#e04a33]",
    colorHex: "#e04a33",
    relatedTables: [
      "ai_content_queue",
      "ai_generated_content",
      "ai_content_publish_log",
      "neighborhood_pages",
      "bike_model_pages",
      "seasonal_reports",
      "service_page_stats",
    ],
    folderPaths: [
      "app/(admin)/ai-content/",
      "lib/ai-engine/",
      "app/(public)/[locale]/bikes/",
      "app/(public)/[locale]/areas/",
      "app/(public)/[locale]/blog/",
    ],
    features: [
      {
        id: "ai-data-aggregation",
        name: "Order Data Aggregation Pipeline",
        description:
          "Background job that runs after configurable thresholds (default: every 50 completed orders). Aggregates: repair counts by bike model, service type, neighborhood, season. Clusters mechanic notes by topic using embeddings. Computes average costs, completion times, common part failures. Stores aggregated stats in service_page_stats and bike_model_pages tables. This is the raw data layer that all other AI features consume.",
        status: "planned",
        priority: "critical",
        relatedTables: ["orders", "order_mechanic_notes", "order_line_items", "service_page_stats", "bike_model_pages"],
        dependencies: ["crm-mechanic-notes", "crm-order-create"],
        apiRoutes: ["lib/ai-engine/aggregation-pipeline.ts"],
        folderPaths: ["lib/ai-engine/aggregation-pipeline.ts"],
      },
      {
        id: "ai-neighborhood-pages",
        name: "Auto-Generated Neighborhood Pages",
        description:
          "For every zip code / neighborhood with 5+ completed orders, auto-generate a localized landing page: /da/cykelreparation/[neighborhood]. Content includes: 'We have completed X repairs in [area]', most common repairs in that area, average response time, service map with radius, local testimonials. Each page has unique LocalBusiness + Service schema markup. Regenerated when new threshold is hit. Targets 'bike repair near me' + '[area] cykelreparation' long-tail keywords.",
        status: "planned",
        priority: "critical",
        relatedTables: ["neighborhood_pages", "orders", "customers"],
        dependencies: ["ai-data-aggregation", "seo-nextintl", "seo-jsonld"],
        folderPaths: ["app/(public)/[locale]/areas/[neighborhood]/page.tsx"],
      },
      {
        id: "ai-bike-model-pages",
        name: "Bike Model Knowledge Pages",
        description:
          "After servicing 5+ of the same bike model, auto-generate /bikes/[brand]/[model] pages. Content from aggregated mechanic notes: 'Common issues with [Model]', parts that wear fastest, average repair costs, maintenance schedule recommendations, before/after photo gallery (consent-flagged only). Google targets: people searching their exact bike model + problem. Rich FAQ schema from real diagnostic data patterns.",
        status: "planned",
        priority: "critical",
        relatedTables: ["bike_model_pages", "order_mechanic_notes", "order_photos", "bike_models"],
        dependencies: ["ai-data-aggregation", "crm-photo-consent", "book-symptom-input"],
        folderPaths: ["app/(public)/[locale]/bikes/[brand]/[model]/page.tsx"],
      },
      {
        id: "ai-seasonal-content",
        name: "Seasonal Content Automation",
        description:
          "Quarterly auto-generated articles using real repair data: 'Spring Bike Prep: What We Fixed Most This March', 'Winter Cycling in Copenhagen: The 5 Repairs We See Every Week'. Includes real stats (repair counts, common issues), photo collages from consented repair photos, data visualizations (charts of repair trends). Published as blog posts with human review gate. Targets seasonal search intent.",
        status: "planned",
        priority: "high",
        relatedTables: ["ai_generated_content", "blog_posts", "seasonal_reports"],
        dependencies: ["ai-data-aggregation", "seo-blog", "crm-photo-consent"],
        folderPaths: ["lib/ai-engine/seasonal-generator.ts"],
      },
      {
        id: "ai-service-live-stats",
        name: "Service Pages with Live Stats",
        description:
          "Enhance each /services/[service-type] page with real data: 'We have completed 342 gear adjustments, average time 25min, average cost 299 DKK'. Real before/after photo pairs (consented). Auto-generated FAQ from mechanic note patterns ('Is my derailleur bent or just needs adjustment?'). Live stats update on each aggregation run. Massive conversion boost -- real numbers build trust.",
        status: "planned",
        priority: "critical",
        relatedTables: ["service_page_stats", "service_catalog", "order_photos"],
        dependencies: ["ai-data-aggregation", "crm-photo-consent"],
        folderPaths: ["app/(public)/[locale]/services/[slug]/page.tsx"],
      },
      {
        id: "ai-technical-articles",
        name: "AI-Generated Technical Articles",
        description:
          "Uses accumulated mechanic notes + AI to generate long-form repair guides: 'Why Your Shimano 105 Keeps Skipping Gears', 'Complete Guide to E-Bike Battery Maintenance'. Pipeline: (1) Cluster similar mechanic notes into topics, (2) AI generates draft with real stats/photos embedded, (3) Draft enters review queue, (4) Admin approves/edits, (5) Published to blog with auto-internal-linking to booking (pre-selected service). Target: 2-4 articles per month. Strong E-E-A-T signals -- content from real practitioners with real data.",
        status: "planned",
        priority: "high",
        relatedTables: ["ai_generated_content", "ai_content_queue", "blog_posts"],
        dependencies: ["ai-data-aggregation", "seo-blog"],
        apiRoutes: ["lib/ai-engine/article-generator.ts"],
        folderPaths: ["lib/ai-engine/article-generator.ts"],
      },
      {
        id: "ai-schema-markup",
        name: "Dynamic Schema Markup with Real Data",
        description:
          "Every public page gets structured data populated with real aggregated data: LocalBusiness with real review aggregates, Service schema with real pricing ranges (min/max/avg from actual orders), HowTo schema on repair guides, FAQPage schema from real customer questions, AggregateRating from Trustpilot + internal satisfaction scores. Rebuilds on each aggregation run.",
        status: "planned",
        priority: "high",
        dependencies: ["ai-data-aggregation", "seo-jsonld"],
        folderPaths: ["lib/ai-engine/schema-generator.ts"],
      },
      {
        id: "ai-content-queue",
        name: "Content Review & Publish Queue",
        description:
          "Admin dashboard for reviewing AI-generated content before publishing. Each draft shows: source data (which orders/notes it drew from), generated text, selected photos, target URL, estimated keyword targets. Admin can: approve as-is, edit and approve, reject with feedback (AI regenerates), schedule publish date. Publish log tracks all published content with performance metrics.",
        status: "planned",
        priority: "critical",
        relatedTables: ["ai_content_queue", "ai_generated_content", "ai_content_publish_log"],
        dependencies: ["ai-data-aggregation", "admin-rbac"],
        folderPaths: ["app/(admin)/ai-content/queue/page.tsx", "components/admin/ai-content-review.tsx"],
      },
      {
        id: "ai-demand-forecasting",
        name: "Demand Forecasting & Insights",
        description:
          "Business intelligence from order data: (1) Demand forecasting -- 'Based on last year, expect 40% more tire repairs in March', (2) Pricing insights -- 'Your gear adjustment is priced 15% below actual cost at current volume', (3) Upsell suggestions -- '78% of customers who book chain replacement also need cassette replacement within 2 months', (4) Inventory predictions -- 'You will need 12 brake pads next month based on trend'. Displayed in admin dashboard charts.",
        status: "planned",
        priority: "medium",
        relatedTables: ["orders", "order_line_items", "parts", "stock_movements"],
        dependencies: ["ai-data-aggregation", "inv-catalog"],
        folderPaths: ["app/(admin)/ai-content/insights/page.tsx", "lib/ai-engine/demand-forecasting.ts"],
      },
      {
        id: "ai-smart-booking",
        name: "Smart Booking Suggestions",
        description:
          "AI-enhanced booking flow: when customer describes symptoms in free text, AI suggests likely services based on historical mechanic notes for similar issues. 'Your description sounds like it could be: Gear adjustment (85% match), Cable replacement (60% match)'. Also provides accurate time estimates from real completion data and dynamic pricing hints based on demand curves.",
        status: "planned",
        priority: "medium",
        relatedTables: ["orders", "order_mechanic_notes", "service_catalog"],
        dependencies: ["ai-data-aggregation", "book-symptom-input"],
        folderPaths: ["lib/ai-engine/smart-suggestions.ts", "components/booking/ai-suggestions.tsx"],
      },
      {
        id: "ai-threshold-config",
        name: "Configurable Trigger Thresholds",
        description:
          "Admin settings panel to configure when the AI engine runs: orders threshold (default 50), time-based schedule (weekly/monthly), manual trigger button. Per-content-type thresholds: neighborhood pages at 5 orders/area, bike model pages at 5 orders/model, seasonal at quarterly, articles at 100 orders. Dashboard shows next trigger estimate and last run stats.",
        status: "planned",
        priority: "high",
        relatedTables: ["ai_engine_config"],
        dependencies: ["admin-rbac"],
        folderPaths: ["app/(admin)/ai-content/settings/page.tsx"],
      },
    ],
  },
]

// =============================================================================
// MODULE CONNECTIONS (data flow between modules)
// =============================================================================

export const MODULE_CONNECTIONS: ModuleConnection[] = [
  {
    sourceId: "booking",
    targetId: "crm",
    label: "Creates Customer + Order",
    description:
      "When a booking is completed, a customer record is created (or matched by phone) and a new order is created with status 'received' and the selected services as line items.",
  },
  {
    sourceId: "crm",
    targetId: "inventory",
    label: "Reserves & Consumes Parts",
    description:
      "When line items with parts are added to an order, stock is reserved. When the order is invoiced, reserved stock is consumed and stock_on_hand decreases.",
  },
  {
    sourceId: "crm",
    targetId: "notifications",
    label: "Triggers Notifications",
    description:
      "Every order status change fires an event that the notification system picks up. The correct template is selected based on event type and customer language.",
  },
  {
    sourceId: "crm",
    targetId: "mechanic",
    label: "Assigns Jobs",
    description:
      "Orders are assigned to mechanics based on the customer's zip code matching a mechanic's zone polygon. Assigned orders appear in the mechanic's daily job list.",
  },
  {
    sourceId: "crm",
    targetId: "portal",
    label: "Exposes Order Data",
    description:
      "The customer portal reads order data from the CRM, filtered by the logged-in customer's phone. Customers can view status, approve quotes, and pay invoices.",
  },
  {
    sourceId: "mechanic",
    targetId: "crm",
    label: "Updates Order Status",
    description:
      "Mechanics update order status (in_progress, quality_check), add line items for parts used, upload photos, and add notes -- all written back to the CRM tables.",
  },
  {
    sourceId: "mechanic",
    targetId: "inventory",
    label: "Marks Parts Used",
    description:
      "When a mechanic logs parts used on a job, stock movements are created (reservation or direct consumption) and the mechanic's van inventory is decremented.",
  },
  {
    sourceId: "portal",
    targetId: "crm",
    label: "Approves Quotes & Pays",
    description:
      "Customer actions in the portal (approve quote, pay invoice) update order status in the CRM and trigger corresponding notifications.",
  },
  {
    sourceId: "admin",
    targetId: "crm",
    label: "Manages Orders & Customers",
    description:
      "Admin backoffice provides full CRUD on orders and customers. Kanban drag-and-drop changes order status. Bulk operations for efficiency.",
  },
  {
    sourceId: "admin",
    targetId: "inventory",
    label: "Manages Catalog & Stock",
    description:
      "Admin manages the parts catalog, stock locations, manual adjustments, and purchase orders. Inventory dashboard shows stock health.",
  },
  {
    sourceId: "admin",
    targetId: "notifications",
    label: "Manages Templates",
    description:
      "Admin edits notification templates, configures triggers, and tests delivery. All template changes are versioned.",
  },
  {
    sourceId: "admin",
    targetId: "seo",
    label: "Manages Content & Translations",
    description:
      "Admin manages translation overrides, city page content, blog posts, and SEO metadata. Changes reflect on the public site.",
  },
  {
    sourceId: "booking",
    targetId: "seo",
    label: "Public Pages Use i18n",
    description:
      "All public-facing booking pages use next-intl for localization. URLs are prefixed with /da or /en. Structured data is locale-aware.",
  },
  // AI Content Engine connections
  {
    sourceId: "crm",
    targetId: "ai-engine",
    label: "Feeds Order + Notes Data",
    description:
      "The AI Engine consumes completed order data: structured mechanic notes (diagnosis, work performed, recommendations), line items, parts used, repair times, customer zip codes, bike models. This is the primary data pipeline that powers all auto-generated content.",
  },
  {
    sourceId: "booking",
    targetId: "ai-engine",
    label: "Feeds Symptom & Bike Data",
    description:
      "Customer-provided data from booking flows: symptom descriptions, bike brand/model/year, selected services, and attribution ('how did you find us'). Used for smart booking suggestions and understanding customer language patterns for SEO content.",
  },
  {
    sourceId: "mechanic",
    targetId: "ai-engine",
    label: "Feeds Photos & Diagnostics",
    description:
      "Before/after photos (with consent flag), structured diagnostic notes, and real-time repair observations from mechanics. The richest data source for visual content: photo galleries, before/after comparisons, and technical article illustrations.",
  },
  {
    sourceId: "ai-engine",
    targetId: "seo",
    label: "Publishes Generated Content",
    description:
      "AI Engine outputs feed directly into the public website: auto-generated neighborhood pages, bike model knowledge pages, blog articles, service page stats, and dynamic schema markup. All content goes through admin review queue before publishing.",
  },
  {
    sourceId: "ai-engine",
    targetId: "booking",
    label: "Enhances Booking with AI",
    description:
      "Smart booking suggestions: AI analyzes symptom text against historical mechanic notes to suggest likely services. Provides data-backed time estimates and contextual pricing. Increases booking conversion and upsell.",
  },
  {
    sourceId: "ai-engine",
    targetId: "admin",
    label: "BI Dashboards & Insights",
    description:
      "Business intelligence feeds into admin dashboard: demand forecasting charts, pricing optimization insights, upsell opportunity alerts, inventory predictions, content performance metrics, and SEO ranking progress.",
  },
  {
    sourceId: "inventory",
    targetId: "ai-engine",
    label: "Feeds Parts Usage Data",
    description:
      "Parts consumption patterns, failure rates by bike model, seasonal stock trends. Used for inventory predictions, 'parts that wear out fastest' content on bike model pages, and supply chain forecasting.",
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getModuleById(id: string): Module | undefined {
  return PROJECT_MODULES.find((m) => m.id === id)
}

export function getFeatureById(featureId: string): { module: Module; feature: Feature } | undefined {
  for (const mod of PROJECT_MODULES) {
    const feature = mod.features.find((f) => f.id === featureId)
    if (feature) return { module: mod, feature }
  }
  return undefined
}

export function getModuleProgress(moduleId: string): {
  total: number
  done: number
  inProgress: number
  planned: number
  percentage: number
} {
  const mod = getModuleById(moduleId)
  if (!mod) return { total: 0, done: 0, inProgress: 0, planned: 0, percentage: 0 }

  const total = mod.features.length
  const done = mod.features.filter((f) => f.status === "done").length
  const inProgress = mod.features.filter((f) => f.status === "in-progress").length
  const planned = mod.features.filter((f) => f.status === "planned").length
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0

  return { total, done, inProgress, planned, percentage }
}

export function getOverallProgress(): {
  totalFeatures: number
  done: number
  inProgress: number
  planned: number
  percentage: number
} {
  const allFeatures = PROJECT_MODULES.flatMap((m) => m.features)
  const total = allFeatures.length
  const done = allFeatures.filter((f) => f.status === "done").length
  const inProgress = allFeatures.filter((f) => f.status === "in-progress").length
  const planned = allFeatures.filter((f) => f.status === "planned").length
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0

  return { totalFeatures: total, done, inProgress, planned, percentage }
}

export function getFeaturesByStatus(status: FeatureStatus): { module: Module; feature: Feature }[] {
  const results: { module: Module; feature: Feature }[] = []
  for (const mod of PROJECT_MODULES) {
    for (const feature of mod.features) {
      if (feature.status === status) {
        results.push({ module: mod, feature })
      }
    }
  }
  return results
}

export function getFeatureDependencies(featureId: string): { module: Module; feature: Feature }[] {
  const result = getFeatureById(featureId)
  if (!result || !result.feature.dependencies) return []

  return result.feature.dependencies
    .map((depId) => getFeatureById(depId))
    .filter(Boolean) as { module: Module; feature: Feature }[]
}

export function getFeatureDependents(featureId: string): { module: Module; feature: Feature }[] {
  const results: { module: Module; feature: Feature }[] = []
  for (const mod of PROJECT_MODULES) {
    for (const feature of mod.features) {
      if (feature.dependencies?.includes(featureId)) {
        results.push({ module: mod, feature })
      }
    }
  }
  return results
}
