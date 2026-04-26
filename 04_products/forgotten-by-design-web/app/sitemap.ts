import type { MetadataRoute } from "next";
import { projectId } from "@/sanity/env";
import { getClient } from "@/sanity/lib/client";
import { INVESTIGATION_SLUGS_QUERY, DOC_SLUGS_QUERY } from "@/sanity/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forgottenbydesign.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/investigations`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/documentation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/archive`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/subscribe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  if (!projectId) return staticPages;

  try {
    const client = getClient();
    const [investigationSlugs, docSlugs] = await Promise.all([
      client.fetch<Array<{ slug: string }>>(INVESTIGATION_SLUGS_QUERY),
      client.fetch<Array<{ slug: string }>>(DOC_SLUGS_QUERY),
    ]);

    const investigationPages: MetadataRoute.Sitemap = (investigationSlugs ?? []).map(({ slug }) => ({
      url: `${BASE_URL}/investigations/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const docPages: MetadataRoute.Sitemap = (docSlugs ?? []).map(({ slug }) => ({
      url: `${BASE_URL}/documentation/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...investigationPages, ...docPages];
  } catch {
    return staticPages;
  }
}
