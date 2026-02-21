import type { Metadata } from "next"
import {
  buildPageMetadata,
  renderPage,
  getAllPublishedSlugs,
} from "@/lib/page-renderer"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildPageMetadata(slug, "en")
}

export async function generateStaticParams() {
  return getAllPublishedSlugs()
}

export default async function SlugPageEn({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return renderPage(slug, "en")
}
