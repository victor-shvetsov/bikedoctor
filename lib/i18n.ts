import type { Locale } from "./types"

// Language strategy:
// da = Danish  -- PRIMARY for customer-facing pages (SEO target market is Denmark)
// en = English -- PRIMARY for admin, mechanic-facing pages; secondary for customer pages
// ro = Romanian -- SECONDARY for admin, mechanic-facing pages (team language)
//
// All 3 languages are available everywhere. The default depends on context:
//   Customer site: da (with toggle to en)
//   Admin / internal: en (with toggle to ro)
//   Booking flow: da (with toggle to en)
export const defaultLocale: Locale = "da"
export const adminDefaultLocale: Locale = "en"
export const locales: Locale[] = ["da", "en", "ro"]

const translations = {
  da: {
    // Navigation
    "nav.booking": "Book tid",
    "nav.services": "Ydelser",
    "nav.about": "Om os",
    "nav.contact": "Kontakt",

    // Hero
    "hero.title": "Din mobile cykelsmed",
    "hero.titleAccent": "i hele Sjaelland",
    "hero.subtitle":
      "Vi kommer til dig -- hjemme, pa arbejdet eller hvor din cykel er. Professionel reparation uden besvaer.",
    "hero.cta": "Book din tid",
    "hero.secondaryCta": "Se ydelser & priser",

    // Booking
    "booking.title": "Book",
    "booking.titleAccent": "din tid",
    "booking.bikeTypeStep": "Vaelg den type cykel skal repareres:",
    "booking.servicesStep": "Vaelg ydelser:",
    "booking.infoStep": "Dine oplysninger:",
    "booking.checkoutStep": "Betaling",
    "booking.next": "Naeste",
    "booking.back": "Tilbage",
    "booking.total": "I alt",
    "booking.addService": "Tilfoej",
    "booking.removeService": "Fjern",
    "booking.minutes": "min",
    "booking.creating": "Opretter booking...",

    // Customer info form
    "form.name": "Fulde navn",
    "form.phone": "Telefon",
    "form.email": "Email",
    "form.address": "Adresse",
    "form.zip": "Postnummer",
    "form.city": "By",
    "form.preferredDate": "Foretrukket dato",
    "form.timeSlot": "Tidsrum",
    "form.notes": "Bemaerkninger (valgfrit)",
    "form.morning": "Morgen (8-12)",
    "form.afternoon": "Eftermiddag (12-16)",
    "form.evening": "Aften (16-19)",

    // Services section
    "services.title": "Vores",
    "services.titleAccent": "ydelser",
    "services.subtitle": "Professionel service til alle typer cykler",
    "services.from": "Fra",

    // Trust section
    "trust.title": "Fordele ved at vaelge en",
    "trust.titleAccent": "mobil cykelsmed",
    "trust.subtitle":
      "Vi vil med glaede tilbyde et rentabelt samarbejde til din virksomhed. Kontakt os gerne for at modtage et kommercielt tilbud.",
    "trust.efficiency": "Effektivitet",
    "trust.efficiencyDesc":
      "Vi kommer ud til dig, hvor som helst pa Sjaelland, sa du slipper for at transportere din cykel til et vaerksted.",
    "trust.flexibility": "Fleksibilitet",
    "trust.flexibilityDesc":
      "Vores abningstider er fleksible, sa du kan fa repareret din cykel, nar det passer dig bedst.",
    "trust.competence": "Kompetence",
    "trust.competenceDesc":
      "Vores erfarne og kompetente cykelsmede soerger for, at din cykel er i topform.",
    "trust.quality": "Kvalitetsdele",
    "trust.qualityDesc": "Vi bruger kun originale reservedele af hoej kvalitet.",
    "trust.tools": "Professionelt vaerktoej",
    "trust.toolsDesc":
      "Vores cykelsmede koerer ud med alt det professionelle vaerktoej der skal bruges.",
    "trust.guarantee": "Garanti",
    "trust.guaranteeDesc": "Vi giver garanti pa alt vores arbejde.",

    // Trust pills (hero)
    "trustPill.coverage": "Hele Sjaelland",
    "trustPill.hours": "Fleksible tider",
    "trustPill.tools": "Professionelt vaerktoej",

    // Footer
    "footer.tagline": "Din mobile cykelsmed i hele Sjaelland",
    "footer.rights": "Alle rettigheder forbeholdes.",

    // Confirmation
    "confirmation.title": "Tak for din booking!",
    "confirmation.subtitle": "Vi har modtaget din bestilling og kontakter dig snarest.",

    // Admin
    "admin.title": "BikeDoctor Admin",
    "admin.orders": "Ordrer",
    "admin.noOrders": "Ingen ordrer endnu",
    "admin.status": "Status",
    "admin.customer": "Kunde",
    "admin.total": "Total",
    "admin.date": "Dato",
  },
  en: {
    "nav.booking": "Book now",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.title": "Your mobile bike mechanic",
    "hero.titleAccent": "across Zealand",
    "hero.subtitle":
      "We come to you -- at home, work, or wherever your bike is. Professional repair without the hassle.",
    "hero.cta": "Book your appointment",
    "hero.secondaryCta": "See services & prices",

    "booking.title": "Book",
    "booking.titleAccent": "your appointment",
    "booking.bikeTypeStep": "Select the type of bike to be repaired:",
    "booking.servicesStep": "Select services:",
    "booking.infoStep": "Your details:",
    "booking.checkoutStep": "Payment",
    "booking.next": "Next",
    "booking.back": "Back",
    "booking.total": "Total",
    "booking.addService": "Add",
    "booking.removeService": "Remove",
    "booking.minutes": "min",
    "booking.creating": "Creating booking...",

    "form.name": "Full name",
    "form.phone": "Phone",
    "form.email": "Email",
    "form.address": "Address",
    "form.zip": "Zip code",
    "form.city": "City",
    "form.preferredDate": "Preferred date",
    "form.timeSlot": "Time slot",
    "form.notes": "Notes (optional)",
    "form.morning": "Morning (8-12)",
    "form.afternoon": "Afternoon (12-16)",
    "form.evening": "Evening (16-19)",

    "services.title": "Our",
    "services.titleAccent": "services",
    "services.subtitle": "Professional service for all types of bikes",
    "services.from": "From",

    "trust.title": "Benefits of choosing a",
    "trust.titleAccent": "mobile bike mechanic",
    "trust.subtitle":
      "We would be happy to offer a cost-effective partnership for your business. Contact us for a commercial offer.",
    "trust.efficiency": "Efficiency",
    "trust.efficiencyDesc":
      "We come to you, anywhere in Zealand, so you do not have to transport your bike to a workshop.",
    "trust.flexibility": "Flexibility",
    "trust.flexibilityDesc":
      "Our opening hours are flexible, so you can get your bike repaired when it suits you best.",
    "trust.competence": "Competence",
    "trust.competenceDesc":
      "Our experienced and competent bike mechanics ensure your bike is in top shape.",
    "trust.quality": "Quality parts",
    "trust.qualityDesc": "We only use high-quality original spare parts.",
    "trust.tools": "Professional tools",
    "trust.toolsDesc":
      "Our mechanics bring all the professional tools needed.",
    "trust.guarantee": "Guarantee",
    "trust.guaranteeDesc": "We guarantee all our work.",

    "trustPill.coverage": "All of Zealand",
    "trustPill.hours": "Flexible hours",
    "trustPill.tools": "Professional tools",

    "footer.tagline": "Your mobile bike mechanic across Zealand",
    "footer.rights": "All rights reserved.",

    "confirmation.title": "Thank you for your booking!",
    "confirmation.subtitle": "We have received your order and will contact you shortly.",

    "admin.title": "BikeDoctor Admin",
    "admin.orders": "Orders",
    "admin.noOrders": "No orders yet",
    "admin.status": "Status",
    "admin.customer": "Customer",
    "admin.total": "Total",
    "admin.date": "Date",
  },
  ro: {
    "nav.booking": "Rezerva acum",
    "nav.services": "Servicii",
    "nav.about": "Despre noi",
    "nav.contact": "Contact",

    "hero.title": "Mecanicul tau mobil de biciclete",
    "hero.titleAccent": "in toata Zeelandia",
    "hero.subtitle":
      "Venim la tine -- acasa, la birou sau oriunde se afla bicicleta ta. Reparatii profesionale fara bataie de cap.",
    "hero.cta": "Rezerva o programare",
    "hero.secondaryCta": "Vezi servicii si preturi",

    "booking.title": "Rezerva",
    "booking.titleAccent": "o programare",
    "booking.bikeTypeStep": "Selecteaza tipul de bicicleta:",
    "booking.servicesStep": "Selecteaza serviciile:",
    "booking.infoStep": "Datele tale:",
    "booking.checkoutStep": "Plata",
    "booking.next": "Urmatorul",
    "booking.back": "Inapoi",
    "booking.total": "Total",
    "booking.addService": "Adauga",
    "booking.removeService": "Elimina",
    "booking.minutes": "min",
    "booking.creating": "Se creeaza rezervarea...",

    "form.name": "Nume complet",
    "form.phone": "Telefon",
    "form.email": "Email",
    "form.address": "Adresa",
    "form.zip": "Cod postal",
    "form.city": "Oras",
    "form.preferredDate": "Data preferata",
    "form.timeSlot": "Interval orar",
    "form.notes": "Observatii (optional)",
    "form.morning": "Dimineata (8-12)",
    "form.afternoon": "Dupa-amiaza (12-16)",
    "form.evening": "Seara (16-19)",

    "services.title": "Serviciile",
    "services.titleAccent": "noastre",
    "services.subtitle": "Service profesional pentru toate tipurile de biciclete",
    "services.from": "De la",

    "trust.title": "Avantajele alegerii unui",
    "trust.titleAccent": "mecanic mobil de biciclete",
    "trust.subtitle":
      "Va oferim cu placere un parteneriat rentabil pentru afacerea dumneavoastra. Contactati-ne pentru o oferta comerciala.",
    "trust.efficiency": "Eficienta",
    "trust.efficiencyDesc":
      "Venim la tine, oriunde in Zeelandia, astfel incat nu trebuie sa transporti bicicleta la un atelier.",
    "trust.flexibility": "Flexibilitate",
    "trust.flexibilityDesc":
      "Programul nostru este flexibil, asa ca iti poti repara bicicleta cand ti se potriveste cel mai bine.",
    "trust.competence": "Competenta",
    "trust.competenceDesc":
      "Mecanicii nostri experimentati si competenti se asigura ca bicicleta ta este in forma maxima.",
    "trust.quality": "Piese de calitate",
    "trust.qualityDesc": "Folosim doar piese de schimb originale de inalta calitate.",
    "trust.tools": "Scule profesionale",
    "trust.toolsDesc":
      "Mecanicii nostri vin cu toate sculele profesionale necesare.",
    "trust.guarantee": "Garantie",
    "trust.guaranteeDesc": "Oferim garantie pentru toata munca noastra.",

    "trustPill.coverage": "Toata Zeelandia",
    "trustPill.hours": "Program flexibil",
    "trustPill.tools": "Scule profesionale",

    "footer.tagline": "Mecanicul tau mobil de biciclete in toata Zeelandia",
    "footer.rights": "Toate drepturile rezervate.",

    "confirmation.title": "Multumim pentru rezervare!",
    "confirmation.subtitle": "Am primit comanda ta si te vom contacta in curand.",

    "admin.title": "BikeDoctor Admin",
    "admin.orders": "Comenzi",
    "admin.noOrders": "Nicio comanda inca",
    "admin.status": "Status",
    "admin.customer": "Client",
    "admin.total": "Total",
    "admin.date": "Data",
  },
} as const

export type TranslationKey = keyof (typeof translations)["da"]

/**
 * Translate a key for the given locale.
 * Falls back: requested locale -> en -> da -> key itself.
 */
export function t(locale: Locale, key: TranslationKey): string {
  return (
    translations[locale]?.[key] ??
    translations.en?.[key] ??
    translations.da[key] ??
    key
  )
}

export function formatDKK(amountInDKK: number): string {
  return `${amountInDKK} kr.`
}

// ---------------------------------------------------------------------------
// DB field locale resolver
// ---------------------------------------------------------------------------
// Use this to pick the correct localized field from a DB row.
// Example: localized(locale, { da: row.name_da, en: row.name_en, ro: row.name_ro })
// Falls back: requested -> en -> da

interface LocalizedFields {
  da: string
  en: string | null | undefined
  ro: string | null | undefined
}

export function localized(locale: Locale, fields: LocalizedFields): string {
  if (locale === "da") return fields.da
  if (locale === "en") return fields.en || fields.da
  if (locale === "ro") return fields.ro || fields.en || fields.da
  return fields.da
}

// Helper to get the right page content field by locale
export function localizedPage(
  locale: Locale,
  page: {
    h1: string
    h1_en?: string | null
    h1_ro?: string | null
  },
  field: "h1"
): string
export function localizedPage(
  locale: Locale,
  page: {
    subheadline?: string | null
    subheadline_en?: string | null
    subheadline_ro?: string | null
  },
  field: "subheadline"
): string | null
export function localizedPage(
  locale: Locale,
  page: Record<string, unknown>,
  field: string
): string | null {
  const da = page[field] as string | null
  const en = page[`${field}_en`] as string | null
  const ro = page[`${field}_ro`] as string | null

  if (locale === "da") return da
  if (locale === "en") return en || da
  if (locale === "ro") return ro || en || da
  return da
}
