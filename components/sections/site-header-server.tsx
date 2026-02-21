import { headers } from "next/headers"
import { getSiteConfig } from "@/lib/site-config"
import { parseCustomerLocale } from "@/lib/i18n"
import { SiteHeader } from "./site-header"
import type { CustomerLocale } from "@/lib/types"

// Server wrapper that detects locale from the URL path, fetches
// nav_links + phone from site_config, and passes to client SiteHeader.
export async function SiteHeaderServer() {
  // Detect locale from current URL path
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || ""
  const isEnglish = pathname.startsWith("/en/") || pathname === "/en"
  const locale: CustomerLocale = parseCustomerLocale(isEnglish ? "en" : "da")

  const [navLinks, phone] = await Promise.all([
    getSiteConfig("nav_links", locale),
    getSiteConfig("phone"),
  ])

  return <SiteHeader navLinks={navLinks} phone={phone} locale={locale} />
}
