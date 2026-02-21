import type { Metadata } from "next"
import { buildPageMetadata, renderPage } from "@/lib/page-renderer"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/", "en")
}

export default async function HomePageEn() {
  return renderPage("/", "en")
}
