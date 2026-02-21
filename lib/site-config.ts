import { createClient } from "@/lib/supabase/server"
import type { SiteConfig, CustomerLocale } from "@/lib/types"
import { cache } from "react"

// ---------------------------------------------------------------------------
// getSiteConfig() -- locale-aware
//
// Fetches site_config from Supabase. Supports da + en locales.
// DB schema:
//   key = "nav_links"       -> Danish (default)
//   key = "nav_links_en"    -> English override
//
// Resolution: getSiteConfig("nav_links", "en")
//   1. Try "nav_links_en" in DB
//   2. Fallback to "nav_links" in DB (Danish)
//   3. Fallback to hardcoded DEFAULTS
//
// For "da" or when locale is omitted, we just fetch the base key.
// Wrapped in React.cache() for request-level dedup.
// ---------------------------------------------------------------------------

// Keys that have English variants in site_config
const TRANSLATABLE_KEYS: Set<keyof SiteConfig> = new Set([
  "nav_links",
  "hero_usps",
  "trust_stats",
  "how_it_works_steps",
  "how_it_works",
  "about",
  "cta_banner",
  "hero_secondary_cta",
  "footer",
])

// Hardcoded defaults -- Danish. Used when DB is empty or during development.
const DEFAULTS: SiteConfig = {
  phone: { number: "+45 52 52 34 97", href: "tel:+4552523497" },
  nav_links: [
    { label: "Mobil cykelsmed", href: "/" },
    { label: "Priser", href: "/priser" },
    { label: "Til erhvervskunder", href: "/erhverv" },
    { label: "Blog", href: "/blog" },
    { label: "Om os", href: "/om-os" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  hero_usps: [
    { icon: "truck", text: "Vi kommer til dig" },
    { icon: "zap", text: "Reparation samme dag" },
    { icon: "shield", text: "Garanti på alt arbejde" },
  ],
  trust_stats: [
    { icon: "star", value: "4.3/5", label: "Trustpilot" },
    { icon: "bike", value: "2.500+", label: "Cykler repareret" },
    { icon: "clock", value: "Samme dag", label: "Hurtig responstid" },
    { icon: "shield-check", value: "Garanti", label: "På alt arbejde" },
  ],
  how_it_works_steps: [
    { icon: "bike", number: "1", title: "Vælg cykel", description: "Fortæl os hvilken type cykel der skal repareres." },
    { icon: "settings", number: "2", title: "Vælg serviceplan", description: "Vælg de ydelser du har brug for, eller vælg en Serviceaftale." },
    { icon: "calendar-check", number: "3", title: "Vælg tid", description: "Book et tidspunkt der passer dig – vi er fleksible." },
    { icon: "wrench", number: "4", title: "Vi kommer og fikser", description: "Vores cykelsmed kommer til dig med alt professionelt værktøj." },
  ],
  how_it_works: {
    heading: "Sådan",
    headingAccent: "fungerer det",
    body: "Få din cykel repareret i 4 enkle trin",
    ctaText: "Book nu – det tager kun 2 minutter",
  },
  about: {
    badge: "Vores historie",
    heading: "Fra én cykelsmed til dit",
    headingAccent: "personlige værksted på hjul",
    body: [
      "BikeDoctor startede med en simpel idé: Hvad nu hvis cykelsmeden kom til dig, i stedet for omvendt? Det der begyndte som én mand med en kassevogn fuld af værktøj, er vokset til et team af professionelle cykelsmede der dækker hele Sjælland.",
      "Vi tror på personlig service. Derfor får du din egen faste cykelsmed, som kender dine cykler og deres historik. Det handler ikke bare om at fikse cykler – det handler om at du altid føler dig tryg.",
    ],
    stats: [
      { icon: "heart", value: "2.500+", label: "Glade kunder" },
      { icon: "users", value: "5+", label: "Cykelsmede" },
      { icon: "wrench", value: "5.000+", label: "Reparationer" },
    ],
  },
  cta_banner: {
    heading: "Klar til at få din cykel fixet?",
    subtext: "Book en tid i dag og få din cykel repareret derhjemme.",
    ctaText: "Book din tid nu",
  },
  hero_secondary_cta: "Se hvordan det virker",
  footer: {
    companyName: "BikeDoctor ApS",
    cvr: "12345678",
    address: "København, Danmark",
    email: "hej@bikedoctor.dk",
    copyright: "BikeDoctor. Alle rettigheder forbeholdes.",
  },
}

/**
 * Fetch a single config key with optional locale.
 * For locale="en", tries "key_en" first, then falls back to "key" (Danish).
 * Falls back to hardcoded DEFAULTS if both are missing.
 */
export const getSiteConfig = cache(async <K extends keyof SiteConfig>(
  key: K,
  locale: CustomerLocale = "da"
): Promise<SiteConfig[K]> => {
  try {
    const supabase = await createClient()

    // If English and this key is translatable, try _en variant first
    if (locale === "en" && TRANSLATABLE_KEYS.has(key)) {
      const enKey = `${key}_en`
      const { data: enData } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", enKey)
        .single()

      if (enData?.value != null) {
        return enData.value as SiteConfig[K]
      }
    }

    // Base key (Danish) or non-translatable key
    const { data } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", key)
      .single()

    if (data?.value != null) {
      return data.value as SiteConfig[K]
    }
  } catch {
    // Fall through to default
  }
  return DEFAULTS[key]
})

/**
 * Fetch ALL config in one query, locale-aware.
 * Returns a full SiteConfig object with defaults for any missing keys.
 * For English, _en keys override base keys.
 */
export const getAllSiteConfig = cache(async (
  locale: CustomerLocale = "da"
): Promise<SiteConfig> => {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("site_config")
      .select("key, value")

    if (data && data.length > 0) {
      const allRows = Object.fromEntries(
        data.map((row: { key: string; value: unknown }) => [row.key, row.value])
      )

      // Start from defaults + base (Danish) values
      const config = { ...DEFAULTS }
      for (const k of Object.keys(DEFAULTS) as (keyof SiteConfig)[]) {
        if (allRows[k] != null) {
          ;(config as Record<string, unknown>)[k] = allRows[k]
        }
      }

      // If English, overlay _en values for translatable keys
      if (locale === "en") {
        for (const k of TRANSLATABLE_KEYS) {
          const enKey = `${k}_en`
          if (allRows[enKey] != null) {
            ;(config as Record<string, unknown>)[k] = allRows[enKey]
          }
        }
      }

      return config as SiteConfig
    }
  } catch {
    // Fall through to defaults
  }
  return DEFAULTS
})
