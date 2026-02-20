import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bikedoctor.dk"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/booking/confirmation",
          "/overview",
          "/sprint",
          "/project-map",
          "/seo-map",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
