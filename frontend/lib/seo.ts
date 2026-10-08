/**
 * SEO helpers: per-page metadata plus JSON-LD builders.
 * Strictly no invented data — no ratings, no review counts, no prices, no awards.
 */
import type { Metadata } from "next";
import { BRAND, PRODUCT_CATEGORY_SLUGS } from "@srm/config";
import { SITE } from "./constants";
import { CONTACT_PLACEHOLDERS, ORGANISATION_PROFILE } from "@/data/company";

export interface PageSeoInput {
  title: string;
  description: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalised === "/" ? "" : normalised}`;
}

export function buildMetadata(input: PageSeoInput): Metadata {
  const { title, description, path, keywords, noIndex = false } = input;
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title,
      description,
    },
    twitter: {
      card: SITE.twitterCard,
      title,
      description,
    },
  };
}

/** Organization structured data — placeholders for contact details only. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANISATION_PROFILE.legalName,
    url: SITE.url,
    description: ORGANISATION_PROFILE.description,
    email: withPlaceholderNote(CONTACT_PLACEHOLDERS.email),
    telephone: withPlaceholderNote(ORGANISATION_PROFILE.contactPhone),
    areaServed: BRAND.locations.map((location) => ({
      "@type": "AdministrativeArea",
      name: location,
    })),
    knowsAbout: [
      "Corrugated Packaging",
      "EPE Foam Packaging",
      "LDPE Bubble & Protective Packaging",
      "Poly Bags and Films",
      "Packaging Accessories",
      "Custom Packaging",
    ],
    slogan: BRAND.heroHeadline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: withPlaceholderNote(CONTACT_PLACEHOLDERS.email),
        telephone: withPlaceholderNote(ORGANISATION_PROFILE.contactPhone),
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  };
}

/**
 * Structured data must not publish obvious placeholder strings as if they were real
 * contact details, so placeholder values are omitted from JSON-LD until they are replaced.
 */
function withPlaceholderNote(value: string): string | undefined {
  const looksLikePlaceholder = /XXXXX|your-domain/i.test(value);
  return looksLikePlaceholder ? undefined : value;
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(entries: BreadcrumbEntry[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export interface ItemListEntry {
  name: string;
  path: string;
  description?: string;
}

/** ItemList for category pages — names and URLs only, no price or rating data. */
export function itemListJsonLd(entries: ItemListEntry[], name: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(entry.path),
      ...(entry.description ? { description: entry.description } : {}),
    })),
  };
}

/** ProductGroup-style description of a packaging category (no offers, no prices). */
export function productCategoryJsonLd(input: {
  name: string;
  description: string;
  path: string;
  category: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    category: input.category,
    url: absoluteUrl(input.path),
    brand: { "@type": "Brand", name: "SRM Enterprises" },
    manufacturer: { "@type": "Organization", name: "SRM Enterprises", url: SITE.url },
    // Offers are intentionally omitted: pricing is quoted per requirement.
  };
}

export const SITEMAP_STATIC_PATHS = [
  "/",
  "/about",
  "/products",
  "/industries",
  "/custom-packaging",
  "/why-us",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const SITEMAP_CATEGORY_PATHS = PRODUCT_CATEGORY_SLUGS.map((slug) => `/products/${slug}`);
