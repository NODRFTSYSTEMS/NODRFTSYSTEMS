import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/en/onboarding", "/es/onboarding"],
      },
    ],
    sitemap: "https://nodrftsystems.com/sitemap.xml",
  };
}
