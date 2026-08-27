// app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";

const BASE_URL = "https://personal-website-three-theta-48.vercel.app";

interface SlugDoc {
  slug: string;
  _updatedAt: string;
}

const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const WRITEUP_SLUGS_QUERY = `*[_type == "writeup" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, writeups] = await Promise.all([
    client.fetch<SlugDoc[]>(PROJECT_SLUGS_QUERY),
    client.fetch<SlugDoc[]>(WRITEUP_SLUGS_QUERY),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const writeupRoutes: MetadataRoute.Sitemap = writeups.map((w) => ({
    url: `${BASE_URL}/writeups/${w.slug}`,
    lastModified: new Date(w._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...writeupRoutes];
}