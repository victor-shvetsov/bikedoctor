// =============================================================================
// BikeDoctor -- Template Registry
// =============================================================================
// Maps template_type (from page_content DB) to the correct React component.
// The dynamic [slug] route uses this to resolve which template to render.
//
// AI INSTRUCTION: When adding a new template_type, add it here AND create the
// corresponding component in components/templates/.
// =============================================================================

import type { ComponentType } from "react"
import type { PageContent, CustomerLocale } from "@/lib/types"

import { HomepageTemplate } from "@/components/templates/homepage-template"
import { LocationTemplate } from "@/components/templates/location-template"
import { BikeTypeTemplate } from "@/components/templates/bike-type-template"
import { BrandTemplate } from "@/components/templates/brand-template"
import { GenericTemplate } from "@/components/templates/generic-template"

// Props that every template receives
export interface TemplateProps {
  page: PageContent
  crossLinks: Pick<PageContent, "slug" | "h1" | "template_type">[]
  locale: CustomerLocale
}

// Registry: template_type -> React component
const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  homepage: HomepageTemplate,
  location: LocationTemplate,
  "bike-type": BikeTypeTemplate,
  brand: BrandTemplate,
  // These use GenericTemplate until their dedicated templates are built:
  pricing: GenericTemplate,
  service: GenericTemplate,
  blog: GenericTemplate,
  "shop-bikes": GenericTemplate,
  "shop-parts": GenericTemplate,
  info: GenericTemplate,
}

/**
 * Resolve a template_type string to the matching React component.
 * Falls back to GenericTemplate for unknown types.
 */
export function resolveTemplate(
  templateType: string
): ComponentType<TemplateProps> {
  return TEMPLATE_MAP[templateType] ?? GenericTemplate
}
