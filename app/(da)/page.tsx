import type { Metadata } from "next"
import { buildPageMetadata, renderPage } from "@/lib/page-renderer"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/", "da")
}

export default async function HomePage() {
  return renderPage("/", "da")
}
