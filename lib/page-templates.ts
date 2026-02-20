// =============================================================================
// BikeDoctor -- Page Templates (Section Blueprints)
// =============================================================================
// PERMANENT REFERENCE: Every page TYPE has a template defining its sections,
// their order, purpose, content structure, and conversion elements.
//
// AI INSTRUCTION: Read this file + site-architecture.ts before building ANY
// public page. The template tells you WHAT sections to build. The architecture
// file tells you WHAT CONTENT to put in them (keywords, headings, schema, etc.)
//
// PRINCIPLE: Serve search intent first, convert second.
// Every section exists for a reason -- either to satisfy what the user searched
// for, or to move them toward booking/buying.
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// Section type definitions
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType =
  | "hero"
  | "trust-bar"
  | "services-grid"
  | "service-detail"
  | "price-table"
  | "how-it-works"
  | "coverage-map"
  | "bike-types-grid"
  | "brand-info"
  | "faq"
  | "reviews"
  | "nearby-locations"
  | "cross-links"
  | "ecommerce-featured"
  | "ecommerce-grid"
  | "product-detail"
  | "blog-content"
  | "blog-related"
  | "cta-banner"
  | "about-team"
  | "contact-info"
  | "breadcrumbs"
  | "schema-json-ld"

export interface TemplateSection {
  /** Section identifier */
  type: SectionType
  /** Why this section exists -- what intent does it serve? */
  purpose: string
  /** What content goes here (plain language for AI to follow) */
  content: string
  /** Conversion element embedded in this section (if any) */
  conversionElement?: string
  /** Is this section required or optional for this template? */
  required: boolean
  /** Responsive notes */
  mobileNotes?: string
  /**
   * Which build phase introduces this section.
   * - "mvp"   = Build now (Phase 1). Core sections needed to convert.
   * - "v2"    = Build in Phase 2-3. Enhances trust/SEO but not launch-blocking.
   * - "v3"    = Build in Phase 3-4. E-commerce, blog, advanced features.
   *
   * AI INSTRUCTION: When building a page, ONLY render sections whose
   * buildPhase <= the current sprint phase. Skip higher-phase sections
   * but leave the template entry so they can be added later.
   */
  buildPhase: "mvp" | "v2" | "v3"
}

export interface PageTemplate {
  /** Which page type this template is for */
  pageType: string
  /** Search intent this template serves */
  searchIntent: string
  /** User mindset when they land here */
  userMindset: string
  /** Primary conversion goal */
  conversionGoal: string
  /** Ordered list of sections (top to bottom) */
  sections: TemplateSection[]
  /** SEO notes specific to this template */
  seoNotes: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1: Homepage
// Intent: "I need a bike mechanic" (broadest)
// ─────────────────────────────────────────────────────────────────────────────

export const HOMEPAGE_TEMPLATE: PageTemplate = {
  pageType: "homepage",
  searchIntent: "Find a mobile bike mechanic -- broad, discovery-stage",
  userMindset: "I have a bike problem, I want someone to come fix it. Or I'm browsing.",
  conversionGoal: "Click 'Book nu' and enter booking flow",
  sections: [
    {
      type: "hero",
      purpose: "Immediately answer: what is BikeDoctor, what do you do, why should I care?",
      content: "H1 with primary keyword. Subheading with value prop (we come to you). Prominent 'Book nu' CTA button. Trust signals below (5-star rating, number of repairs done, response time). Background: real photo or illustration of mechanic at someone's door.",
      conversionElement: "Primary 'Book nu' button -- opens booking overlay at step 1 (choose bike type).",
      required: true,
      mobileNotes: "CTA must be above fold. Trust signals stack vertically. Full-width button.",
      buildPhase: "mvp",
    },
    {
      type: "trust-bar",
      purpose: "Instant credibility -- reduce friction before they scroll further.",
      content: "Horizontal strip with 3-4 trust badges: number of happy customers, average rating, 'same day service', 'no fix no fee' or similar guarantee. Use real numbers when available.",
      required: true,
      mobileNotes: "Scrollable horizontally or 2x2 grid on mobile.",
      buildPhase: "mvp",
    },
    {
      type: "how-it-works",
      purpose: "Remove confusion about how mobile repair works. Key question: 'How does this actually work?'",
      content: "3-step visual: 1) Book online -- pick bike type, services, time. 2) We come to you -- mechanic arrives at your address. 3) Fixed and ready -- pay when done. Each step has icon + short text.",
      conversionElement: "Small 'Book nu' link after step 3.",
      required: true,
      mobileNotes: "Steps stack vertically. Icons 48px.",
      buildPhase: "mvp",
    },
    {
      type: "services-grid",
      purpose: "Show what you fix -- answer 'Can they fix MY problem?'",
      content: "Grid of service categories with icons and starting price. Categories: Repairs (gear, brakes, flat tire, chain), Service (complete service, e-bike service), Safety (light check, safety check). Each links to booking with that service pre-selected. Prices shown from the DB (service_catalog table).",
      conversionElement: "Each service card is clickable -- opens booking with that service pre-selected.",
      required: true,
      mobileNotes: "2-column grid. Cards must be tap-friendly (min 48px touch target).",
      buildPhase: "mvp",
    },
    {
      type: "bike-types-grid",
      purpose: "Show you handle ALL bike types -- especially e-bikes and cargo bikes (high value).",
      content: "Visual grid of bike types: Regular, E-bike, Cargo bike, Fat bike, Kids bike, Wheelchair, E-scooter, Other. Each with small illustration/icon. Links to the bike-type specific page. From bike_types table.",
      conversionElement: "Each card links to /[bike-type]-reparation page.",
      required: true,
      mobileNotes: "Horizontal scroll or 2-column grid.",
      buildPhase: "mvp",
    },
    {
      type: "coverage-map",
      purpose: "Answer 'Do you come to MY area?' -- critical for local service.",
      content: "Map or visual showing coverage area (Copenhagen + Sjælland). List of popular areas as links (each links to the location page). Emphasize 'we cover all of Copenhagen and surrounding areas'.",
      conversionElement: "Area links go to location pages. 'Book nu' button below map.",
      required: true,
      mobileNotes: "List of locations works better than map on mobile. Collapsible by region.",
      buildPhase: "v2",
    },
    {
      type: "reviews",
      purpose: "Social proof -- real customer voices close the trust gap.",
      content: "3-5 customer reviews with name, location, rating, and short quote. Ideally pulled from Google Reviews or Trustpilot. If not available yet, use placeholder structure ready for real data.",
      required: true,
      mobileNotes: "Horizontal scroll carousel. One review visible at a time.",
      buildPhase: "v2",
    },
    {
      type: "ecommerce-featured",
      purpose: "Upsell -- some visitors might want to buy a bike, not just repair one.",
      content: "Small section: 'Bikes for sale' with 3-4 featured bikes (if shop is live). Links to /cykler-til-salg. Only shown when e-commerce module is active.",
      conversionElement: "Links to shop pages.",
      required: false,
      mobileNotes: "Horizontal scroll cards.",
      buildPhase: "v3",
    },
    {
      type: "faq",
      purpose: "Answer remaining objections + capture long-tail keywords.",
      content: "6-8 FAQs: How does it work? What areas do you cover? How much does it cost? Do you fix e-bikes? How fast can you come? What if you can't fix it? What payment methods? Uses schema FAQ markup.",
      required: true,
      mobileNotes: "Accordion pattern. One open at a time.",
      buildPhase: "mvp",
    },
    {
      type: "cta-banner",
      purpose: "Final push -- catch anyone who scrolled all the way down.",
      content: "Full-width banner: 'Ready to get your bike fixed? Book in 2 minutes.' with prominent CTA button.",
      conversionElement: "Final 'Book nu' CTA button.",
      required: true,
      mobileNotes: "Sticky bottom bar alternative on mobile.",
      buildPhase: "mvp",
    },
    {
      type: "schema-json-ld",
      purpose: "Structured data for Google rich results.",
      content: "LocalBusiness + Service + FAQPage schema. Includes name, address, phone, rating, services offered, area served, opening hours.",
      required: true,
      buildPhase: "mvp",
    },
  ],
  seoNotes: [
    "H1 must contain 'mobil cykelsmed' or close variant.",
    "Internal links to all major cluster pages (locations, bike types, pricing).",
    "Image alt texts include keyword variants.",
    "FAQ section uses schema markup for rich snippets.",
    "Page load under 2.5s (Core Web Vital target).",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2: Location Page (cykelsmed + {area})
// Intent: "I need a bike mechanic in MY area" (high purchase intent)
// ─────────────────────────────────────────────────────────────────────────────

export const LOCATION_TEMPLATE: PageTemplate = {
  pageType: "location",
  searchIntent: "Find a bike mechanic specifically in my neighborhood/city",
  userMindset: "I want someone nearby. Proximity matters. I want to book now.",
  conversionGoal: "Book a repair immediately -- these users are ready to buy",
  sections: [
    {
      type: "hero",
      purpose: "Confirm: YES we come to {location}. Immediate relevance.",
      content: "H1: 'Cykelsmed i {location} -- vi kommer til dig'. Subheading mentions specific area landmarks or characteristics. 'Book nu' CTA. Show estimated arrival time for this area if possible.",
      conversionElement: "'Book nu' opens booking at step 1.",
      required: true,
      mobileNotes: "Location name prominent. CTA above fold.",
      buildPhase: "mvp",
    },
    {
      type: "trust-bar",
      purpose: "Local social proof.",
      content: "Same trust badges as homepage BUT localized: '{X} reparationer i {location}', rating, response time for this area.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "services-grid",
      purpose: "Quick scan of what you can fix at their location.",
      content: "Compact grid of services with prices. Same as homepage but more compact. Each links to booking.",
      conversionElement: "Each service is bookable.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "how-it-works",
      purpose: "Same 3-step process but localized text: 'We come to {location}'.",
      content: "3 steps with location name woven in.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "coverage-map",
      purpose: "Show exactly where in {location} you go. Specificity builds trust.",
      content: "Mention specific streets, neighborhoods within the area. 'We cover all of {location} including {sub-areas}'. Mention nearby areas too.",
      required: true,
      mobileNotes: "Text list works better than map.",
      buildPhase: "v2",
    },
    {
      type: "reviews",
      purpose: "Reviews from this specific area if available.",
      content: "Filtered reviews from {location}. If not enough, show general reviews with location noted.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "nearby-locations",
      purpose: "Internal linking to adjacent area pages. Boosts all location pages.",
      content: "Links to 5-8 nearby location pages: 'We also serve: {nearby areas}'. Helps users who searched wrong area AND creates strong internal link mesh.",
      required: true,
      mobileNotes: "Pill/chip layout, wrapping.",
      buildPhase: "mvp",
    },
    {
      type: "faq",
      purpose: "Location-specific FAQs for long-tail capture.",
      content: "4-6 FAQs localized: 'How fast can you come to {location}?', 'What does bike repair cost in {location}?', etc.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "cta-banner",
      purpose: "Final conversion push.",
      content: "'Brug for en cykelsmed i {location}? Book nu -- vi kan komme i dag.'",
      conversionElement: "'Book nu' CTA.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "schema-json-ld",
      purpose: "LocalBusiness schema with areaServed set to {location}.",
      content: "LocalBusiness + Service. areaServed: {location}. Same phone/business info.",
      required: true,
      buildPhase: "mvp",
    },
  ],
  seoNotes: [
    "H1 MUST contain 'cykelsmed {location}'.",
    "Title tag: 'Cykelsmed {location} | BikeDoctor'.",
    "Unique content per location -- not just find-and-replace. Mention local landmarks, bike culture, common issues.",
    "Link to 5-8 nearby location pages (internal link mesh).",
    "Link back to homepage and pricing page.",
    "Location-specific FAQ for rich snippet potential.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3: Bike Type Page (e.g., elcykel-reparation)
// Intent: "I need repair for THIS specific type of bike"
// ─────────────────────────────────────────────────────────────────────────────

export const BIKE_TYPE_TEMPLATE: PageTemplate = {
  pageType: "bike-type",
  searchIntent: "Fix my specific bike type -- user knows what they have",
  userMindset: "I have an e-bike/cargo bike/etc and need a specialist who knows this type.",
  conversionGoal: "Book with bike type pre-selected (skip step 1)",
  sections: [
    {
      type: "hero",
      purpose: "Confirm expertise in THIS bike type.",
      content: "H1 with bike type keyword. Emphasize specialist knowledge. Photo of mechanic working on this type of bike. 'Book nu' opens booking at step 2 with bike type pre-selected.",
      conversionElement: "'Book nu' skips to step 2 with bike type pre-filled.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "trust-bar",
      purpose: "Bike-type-specific credibility.",
      content: "'{X} {bike type} repaired', specialist certification if any, brands handled.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "service-detail",
      purpose: "Deep dive into what you can fix on THIS type. This is the core content.",
      content: "Detailed sections for each relevant service: What we do, common problems, what to watch for. For e-bikes: motor, battery, display, wiring, plus standard repairs. For cargo bikes: box/frame, heavy-duty brakes, steering. Expert-level content that shows you KNOW this type.",
      conversionElement: "Each service description has inline 'Book this service' button.",
      required: true,
      mobileNotes: "Collapsible sections. One expanded by default.",
      buildPhase: "mvp",
    },
    {
      type: "brand-info",
      purpose: "Show which brands you handle. Links to brand-specific pages.",
      content: "Grid of brand logos/names you service for this type. Each links to brand page if it exists (e.g., Babboe, Christiania for cargo bikes).",
      conversionElement: "Brand links to dedicated brand pages.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "price-table",
      purpose: "Transparency. Answer: 'How much will it cost for MY bike type?'",
      content: "Service prices relevant to this bike type. Note any surcharges (e-bike premium, cargo bike complexity). Links to full pricing page.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "ecommerce-featured",
      purpose: "Cross-sell: show bikes or parts relevant to this type.",
      content: "If shop module active: show 2-4 bikes of this type for sale + relevant spare parts (e.g., e-bike batteries on e-bike page). 'Also need a new one?' angle.",
      conversionElement: "Links to shop pages.",
      required: false,
      buildPhase: "v3",
    },
    {
      type: "faq",
      purpose: "Bike-type-specific questions. Long-tail keyword capture.",
      content: "6-8 FAQs specific to this bike type. 'How much does e-bike repair cost?', 'Can you fix Bosch motors?', 'How long does cargo bike service take?'",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "blog-related",
      purpose: "Link to related blog articles (topical depth cluster).",
      content: "2-3 blog articles that sit under this page in the URL hierarchy. E.g., on /elcykel-reparation: link to /elcykel-reparation/elcykel-batteri-levetid.",
      required: false,
      buildPhase: "v3",
    },
    {
      type: "cta-banner",
      purpose: "Final push with bike-type-specific message.",
      content: "'Problems with your {bike type}? Book now -- we specialize in this.'",
      conversionElement: "'Book nu' with bike type pre-selected.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "schema-json-ld",
      purpose: "Service schema with specific service type.",
      content: "Service + FAQPage schema. serviceType specific to bike category.",
      required: true,
      buildPhase: "mvp",
    },
  ],
  seoNotes: [
    "H1 must contain '{bike type} reparation'.",
    "Deep, expert content -- 800+ words minimum. Google rewards topical authority.",
    "Internal links to brand pages, spare parts, pricing, and blog articles.",
    "FAQ schema for rich snippets.",
    "Blog articles nested under this URL create topical cluster.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 4: Brand Page (e.g., babboe-service)
// Intent: "I need repair for my specific BRAND of bike"
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND_TEMPLATE: PageTemplate = {
  pageType: "brand",
  searchIntent: "My specific brand needs service -- highest specificity, high intent",
  userMindset: "I know exactly what I have. I want someone who knows THIS brand.",
  conversionGoal: "Book with bike type + service pre-selected",
  sections: [
    {
      type: "hero",
      purpose: "Confirm: we are specialists in {brand}.",
      content: "H1 with brand name + service/reparation. Brand logo if licensable. 'Book nu' opens booking with type + service preset. Mention certification or experience with this brand.",
      conversionElement: "'Book nu' with bike type + brand heading + service pre-selected.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "trust-bar",
      purpose: "Brand-specific credibility.",
      content: "'{X} {brand} repaired', years of experience with brand, any certifications.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "service-detail",
      purpose: "Brand-specific expertise. What makes {brand} different to repair?",
      content: "Brand-specific details: common issues with {brand}, model-specific quirks, what we check during service. Show deep knowledge that generic competitors lack. This is the differentiator.",
      conversionElement: "Inline booking buttons per service.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "price-table",
      purpose: "Transparent pricing for this brand.",
      content: "Prices relevant to this brand's bike type. Note any brand-specific details.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "ecommerce-featured",
      purpose: "Cross-sell bikes and parts of this brand.",
      content: "If available: show {brand} bikes for sale and {brand}-compatible spare parts.",
      required: false,
      buildPhase: "v3",
    },
    {
      type: "faq",
      purpose: "Brand-specific FAQs.",
      content: "4-6 FAQs about this specific brand. Model-specific questions.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "cross-links",
      purpose: "Link to parent bike type page and sibling brands.",
      content: "Link to parent (e.g., /ladcykel-reparation for Babboe). Link to sibling brands (Christiania, Urban Arrow). This strengthens the topical cluster.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "cta-banner",
      purpose: "Final push.",
      content: "'Expert {brand} service -- book now.'",
      conversionElement: "'Book nu' with full preset.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "schema-json-ld",
      purpose: "Service schema with brand specified.",
      content: "Service + FAQPage. Include brand in service description.",
      required: true,
      buildPhase: "mvp",
    },
  ],
  seoNotes: [
    "H1 MUST contain brand name + 'service' or 'reparation'.",
    "Content must demonstrate genuine brand expertise -- not generic copy.",
    "Link to parent bike-type page (topical hierarchy).",
    "Link to sibling brand pages (internal link mesh).",
    "500+ words of brand-specific content minimum.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 5: Pricing Page
// Intent: "How much does bike repair cost?"
// ─────────────────────────────────────────────────────────────────────────────

export const PRICING_TEMPLATE: PageTemplate = {
  pageType: "pricing",
  searchIntent: "Price comparison / cost research before booking",
  userMindset: "I want to know prices before I commit. Transparency matters.",
  conversionGoal: "See prices then book -- remove price uncertainty",
  sections: [
    {
      type: "hero",
      purpose: "Confirm: transparent pricing, no hidden fees.",
      content: "H1: 'Cykelsmed priser'. Value prop: all prices include travel to your door. No surprise costs.",
      conversionElement: "'Book nu' button.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "price-table",
      purpose: "THE reason they're here. Full, detailed price table.",
      content: "All services from service_catalog grouped by category (Repair, Service, Safety). Each row: service name, description, price in DKK, estimated time. Sortable/filterable. Mention that e-bike and cargo bike services may vary.",
      conversionElement: "Each row has 'Book this' button.",
      required: true,
      mobileNotes: "Card layout instead of table on mobile. One card per service.",
      buildPhase: "mvp",
    },
    {
      type: "how-it-works",
      purpose: "Explain what's included in the price.",
      content: "What's included: travel, labor, basic consumables. What's extra: replacement parts. How payment works: pay after repair, card or MobilePay.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "faq",
      purpose: "Price-related questions. Huge long-tail potential.",
      content: "8-10 FAQs: 'What does bike repair cost?', 'Is travel included?', 'Do I pay if you can't fix it?', 'Extra cost for e-bikes?', 'How do I pay?', 'Can I get a quote first?'",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "cta-banner",
      purpose: "They've seen prices, now book.",
      content: "'Fair prices, no surprises. Book your repair now.'",
      conversionElement: "'Book nu' button.",
      required: true,
      buildPhase: "mvp",
    },
    {
      type: "schema-json-ld",
      purpose: "Service + FAQ + ItemList schema for rich results.",
      content: "Service schema with priceRange. FAQPage. ItemList of services.",
      required: true,
      buildPhase: "mvp",
    },
  ],
  seoNotes: [
    "H1 must contain 'cykelsmed priser'.",
    "Real prices from DB -- never hardcoded.",
    "FAQ schema critical here -- these queries often trigger rich snippets.",
    "Internal links to all service/bike-type pages.",
    "ItemList schema for potential price display in search results.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 6: Blog Article
// Intent: Informational -- user researching, not ready to buy yet
// ─────────────────────────────────────────────────────────────────────────────

export const BLOG_TEMPLATE: PageTemplate = {
  pageType: "blog",
  searchIntent: "Informational -- learning, researching, comparing",
  userMindset: "I'm not ready to buy yet. I want information. Maybe I'll fix it myself.",
  conversionGoal: "Soft conversion: build trust, capture for later booking",
  sections: [
    {
      type: "breadcrumbs",
      purpose: "Show hierarchy: Home > {parent service} > This article. Good for SEO.",
      content: "Breadcrumb trail linking to parent service page and homepage.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "hero",
      purpose: "Article title + meta info.",
      content: "H1: article title. Author, date, estimated read time. Category tag linking to parent service page.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "blog-content",
      purpose: "THE content. Must be genuinely useful -- this builds authority.",
      content: "Well-structured article with H2/H3 subheadings, images, practical tips. Must deliver real value -- not just a keyword-stuffed sales pitch. When relevant, mention that BikeDoctor can do this service (subtle, not pushy).",
      conversionElement: "Inline CTA halfway through: 'Rather have a pro do it? Book a mechanic.'",
      required: true,
      mobileNotes: "Readable body text (16px+), comfortable line height, max 680px content width.",
      buildPhase: "v3",
    },
    {
      type: "cta-banner",
      purpose: "Soft conversion after they got value.",
      content: "'Need help with your {topic}? Our mechanics are experts.' with 'Book nu' button.",
      conversionElement: "'Book nu' with relevant preset.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "blog-related",
      purpose: "Keep them on site. Link to sibling articles and parent service page.",
      content: "2-3 related articles from same parent cluster. Link to parent service page.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "ecommerce-featured",
      purpose: "Relevant products mentioned in the article.",
      content: "If article mentions parts (tires, chains, batteries), show those products for sale.",
      required: false,
      buildPhase: "v3",
    },
    {
      type: "schema-json-ld",
      purpose: "Article + BreadcrumbList schema.",
      content: "Article schema with author, datePublished, dateModified. BreadcrumbList showing hierarchy.",
      required: true,
      buildPhase: "v3",
    },
  ],
  seoNotes: [
    "URL nested under parent service page for topical clustering.",
    "1000+ words of genuinely useful content.",
    "Internal links to parent service page, related brand pages, and product pages.",
    "Article schema for potential rich snippet (date, author).",
    "Breadcrumb schema for search display.",
    "These articles will eventually be auto-generated from real order data (Phase 4).",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 7: Shop -- Bike Sales Page
// Intent: "I want to buy a bike"
// ─────────────────────────────────────────────────────────────────────────────

export const SHOP_BIKES_TEMPLATE: PageTemplate = {
  pageType: "shop-bikes",
  searchIntent: "Buy a bike -- transactional, ready to purchase",
  userMindset: "I want to buy a bike. Show me what's available. Price matters.",
  conversionGoal: "Add to cart / inquire about a bike",
  sections: [
    {
      type: "hero",
      purpose: "Confirm: yes we sell bikes. What makes buying from a mechanic special.",
      content: "H1 with keyword. Value prop: buy from experts who know bikes inside out. Every bike inspected and tuned before sale. Warranty included.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "ecommerce-grid",
      purpose: "THE product listing. This is why they're here.",
      content: "Grid of bikes for sale. Each card: photo, name, brand, type, price, condition (new/used). Filter by type (e-bike, cargo, city), brand, price range, condition. Sort by price, newest.",
      conversionElement: "Each card links to product detail or has 'Inquire' button.",
      required: true,
      mobileNotes: "Single column cards. Sticky filter bar at top.",
      buildPhase: "v3",
    },
    {
      type: "trust-bar",
      purpose: "Why buy from BikeDoctor instead of a regular shop?",
      content: "'Every bike serviced before sale', 'X months warranty', 'Home delivery and setup', 'Trade in your old bike'.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "cross-links",
      purpose: "Link to repair services and spare parts.",
      content: "'Already have a bike? We fix all types.' Links to service pages. 'Need accessories?' Links to parts shop.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "faq",
      purpose: "Buying-related FAQs.",
      content: "'Do you deliver?', 'Can I test ride?', 'Warranty?', 'Trade-in?', 'Financing?'",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "schema-json-ld",
      purpose: "Product + ItemList schema for rich results.",
      content: "ItemList of Products with price, availability, condition, brand.",
      required: true,
      buildPhase: "v3",
    },
  ],
  seoNotes: [
    "Product schema critical for Google Shopping and rich results.",
    "Filter-friendly URL structure if paginated (use canonical tags).",
    "Cross-link to repair services (users who buy also need maintenance).",
    "Unique product descriptions -- not copy-pasted from manufacturer.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 8: Shop -- Spare Parts Page
// Intent: "I need a specific part for my bike"
// ─────────────────────────────────────────────────────────────────────────────

export const SHOP_PARTS_TEMPLATE: PageTemplate = {
  pageType: "shop-parts",
  searchIntent: "Buy a specific spare part -- high intent, specific need",
  userMindset: "I know what I need. Just show me the part, price, and let me buy it.",
  conversionGoal: "Buy the part OR book installation service",
  sections: [
    {
      type: "hero",
      purpose: "Confirm: we sell this type of part.",
      content: "H1 with part keyword. Mention: we also install for you if you don't want to DIY.",
      conversionElement: "Two CTAs: 'Buy part' and 'Book installation'.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "ecommerce-grid",
      purpose: "Product listing for this part category.",
      content: "Grid of parts. Filter by bike type compatibility, brand, price. Each card: photo, name, compatibility notes, price.",
      conversionElement: "'Add to cart' + 'Book installation' per product.",
      required: true,
      mobileNotes: "Single column. Large tap targets on buttons.",
      buildPhase: "v3",
    },
    {
      type: "service-detail",
      purpose: "Explain when you need this part and what to look for. Content for SEO.",
      content: "Educational section: 'When to replace your {part}', 'Signs of wear', 'How to choose the right one'. Shows expertise and captures informational queries.",
      conversionElement: "'Not sure? Book a check-up and we'll tell you what you need.'",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "cross-links",
      purpose: "Link to related services and other parts.",
      content: "Related services: 'We install {part} -- book a mechanic.' Related parts: if buying tires, show tubes too. Link to full parts catalog.",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "faq",
      purpose: "Part-specific questions.",
      content: "'How do I know which size?', 'Do you install?', 'Delivery time?', 'Compatible with my bike?'",
      required: true,
      buildPhase: "v3",
    },
    {
      type: "schema-json-ld",
      purpose: "Product + ItemList schema.",
      content: "Products with price, availability, compatibility. ItemList for the category.",
      required: true,
      buildPhase: "v3",
    },
  ],
  seoNotes: [
    "Product schema essential -- drives Google Shopping visibility.",
    "Cross-link to installation service page (unique angle: buy part + book install).",
    "Compatibility info is KEY content -- helps both users and search engines.",
    "Link to related blog articles about maintenance.",
    "These pages interconnect with service pages (service pages show 'Buy parts' sections).",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 9: Info Page (About Us)
// Intent: Trust / brand research
// ─────────────────────────────────────────────────────────────────────────────

export const INFO_TEMPLATE: PageTemplate = {
  pageType: "info",
  searchIntent: "Learn about the company -- trust building",
  userMindset: "Can I trust these people? Who are they?",
  conversionGoal: "Build confidence to book later",
  sections: [
    {
      type: "hero",
      purpose: "Who we are -- human story.",
      content: "H1: about BikeDoctor. Team photo or founder story. Origin story -- why we started this.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "about-team",
      purpose: "Put faces to the brand. Trust through transparency.",
      content: "Team members with photos, names, roles, short bio. Emphasize mechanic expertise.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "trust-bar",
      purpose: "Company stats.",
      content: "Number of repairs, years in business, areas covered, team size.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "contact-info",
      purpose: "Full contact details.",
      content: "Phone, email, address (if applicable), business hours, social media links.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "cta-banner",
      purpose: "After trust is built, nudge toward booking.",
      content: "'Meet us at your door. Book a repair today.'",
      conversionElement: "'Book nu' CTA.",
      required: true,
      buildPhase: "v2",
    },
    {
      type: "schema-json-ld",
      purpose: "LocalBusiness schema with all details.",
      content: "Full LocalBusiness schema: name, address, phone, email, hours, social, founder.",
      required: true,
      buildPhase: "v2",
    },
  ],
  seoNotes: [
    "Not a high-traffic page, but crucial for E-E-A-T (Experience, Expertise, Authority, Trust).",
    "Real photos -- not stock. Google and users can tell.",
    "Link to homepage and key service pages.",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// ALL TEMPLATES -- Combined export for reference
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_TEMPLATES: Record<string, PageTemplate> = {
  homepage: HOMEPAGE_TEMPLATE,
  location: LOCATION_TEMPLATE,
  "bike-type": BIKE_TYPE_TEMPLATE,
  brand: BRAND_TEMPLATE,
  pricing: PRICING_TEMPLATE,
  blog: BLOG_TEMPLATE,
  "shop-bikes": SHOP_BIKES_TEMPLATE,
  "shop-parts": SHOP_PARTS_TEMPLATE,
  info: INFO_TEMPLATE,
}

// ─────────────────────────────────────────────────────────────────────────────
// CROSS-PAGE PATTERNS
// Recurring elements shared across multiple templates
// ─────────────────────────────────────────────────────────────────────────────

export const SHARED_PATTERNS = {
  /** Sticky mobile booking bar -- shown on all service/location/brand/pricing pages */
  stickyMobileBookingBar: {
    description: "Fixed bottom bar on mobile with 'Book nu' button + total price if applicable. Shown when main CTA scrolls out of view. Does NOT show on blog/shop pages.",
    appliesTo: ["homepage", "location", "bike-type", "brand", "pricing"],
  },
  /** Breadcrumbs -- shown on all pages except homepage */
  breadcrumbs: {
    description: "Home > {parent} > {current page}. Uses BreadcrumbList schema. Visible on page and in search results.",
    appliesTo: ["location", "bike-type", "brand", "pricing", "blog", "shop-bikes", "shop-parts", "info"],
  },
  /** E-commerce cross-sell section -- shown on service pages when relevant products exist */
  ecommerceCrossSell: {
    description: "3-4 product cards relevant to the current page context. E.g., cargo bikes on /ladcykel-reparation, e-bike batteries on /elcykel-reparation.",
    appliesTo: ["homepage", "bike-type", "brand", "blog"],
  },
  /** Language switcher -- all pages */
  languageSwitcher: {
    description: "Toggle between Danish and English. Persisted in cookie. URL stays the same (content swaps). Later: Romanian as internal admin language.",
    appliesTo: ["all"],
  },
} as const
