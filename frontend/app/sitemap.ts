import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap generated from the data files, so adding a category or industry automatically
 * adds its URL here. No lastModified guessing per page — the build date is honest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", priority: 1 },
      { path: "/about", priority: 0.8 },
      { path: "/products", priority: 0.9 },
      { path: "/industries", priority: 0.8 },
      { path: "/custom-packaging", priority: 0.85 },
      { path: "/why-us", priority: 0.7 },
      { path: "/contact", priority: 0.9 },
      { path: "/privacy", priority: 0.3 },
      { path: "/terms", priority: 0.3 },
    ] as const
  ).map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: entry.priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: absoluteUrl(`/industries/${industry.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // SITE, so the canonical host is used consistently everywhere.
  void SITE;

  return [...staticRoutes, ...productRoutes, ...industryRoutes];
}
