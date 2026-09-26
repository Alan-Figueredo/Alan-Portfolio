import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return ["es", "en"].map((locale) => ({ url: `${siteUrl}/${locale}`, lastModified: new Date(), changeFrequency: "monthly", priority: locale === "es" ? 1 : .9 }));
}
