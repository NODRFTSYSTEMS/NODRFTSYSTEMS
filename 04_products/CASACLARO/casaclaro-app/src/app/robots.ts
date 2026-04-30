import type { MetadataRoute } from "next";

/**
 * Pre-launch: blocks indexing of listing detail pages while data is synthetic.
 * Remove the /listings/ disallow rule when switching to live data.
 */
export default function robots(): MetadataRoute.Robots {
  const isLive = process.env.NEXT_PUBLIC_LISTINGS_MODE === "live";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(isLive ? {} : { disallow: "/listings/" }),
    },
    sitemap: "https://casaclaro.co/sitemap.xml",
  };
}
