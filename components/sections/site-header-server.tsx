import { getSiteConfig } from "@/lib/site-config"
import { SiteHeader } from "./site-header"

// Server wrapper that fetches nav_links + phone from site_config
// and passes them to the client-side SiteHeader.
export async function SiteHeaderServer() {
  const [navLinks, phone] = await Promise.all([
    getSiteConfig("nav_links"),
    getSiteConfig("phone"),
  ])

  return <SiteHeader navLinks={navLinks} phone={phone} />
}
