// app/robots.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://personal-website-three-theta-48.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}