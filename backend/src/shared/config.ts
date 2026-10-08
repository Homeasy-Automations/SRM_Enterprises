/**
 * Shared configuration constants: brand, routes, validation limits and limits for API.
 */
import type { ColorMoodId, IndustrySlug, ProductCategorySlug } from "./types";

export const BRAND = {
  name: "SRM ENTERPRISES",
  nameShort: "SRM",
  tagline: "Complete Packaging Solutions",
  heroHeadline: "Complete Packaging Solutions Under One Roof",
  footerLine: "Your Complete Packaging Material Partner",
  positioning:
    "Industrial packaging material supplier with reliable Pan India supply & dispatch.",
  bulkSupplyLine: "across Pan India with reliable dispatch logistics",
  locations: ["Pan-India Supply & Dispatch"],
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  industries: "/industries",
  industry: (slug: string) => `/industries/${slug}`,
  solutions: "/solutions",
  solution: (slug: string) => `/solutions/${slug}`,
  resources: "/resources",
  resource: (slug: string) => `/resources/${slug}`,
  gallery: "/gallery",
  customPackaging: "/custom-packaging",
  whyUs: "/why-us",
  contact: "/contact",
  quote: "/contact",
  sample: "/contact?type=sample",
  quoteForProduct: (slug: string) => `/contact?product=${slug}`,
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const PRODUCT_CATEGORY_SLUGS = [
  "corrugated-packaging",
  "epe-foam-packaging",
  "bubble-protective-packaging",
  "poly-bags-films",
  "packaging-accessories",
] as const satisfies readonly ProductCategorySlug[];

export const INDUSTRY_SLUGS = [
  "automotive",
  "engineering",
  "electronics",
  "pharmaceuticals",
  "food-fmcg",
  "ecommerce-logistics",
] as const satisfies readonly IndustrySlug[];

export const INQUIRY_LIMITS = {
  name: { min: 2, max: 80 },
  companyName: { max: 120 },
  email: { max: 160 },
  phone: { max: 20 },
  whatsapp: { max: 20 },
  material: { max: 120 },
  quantity: { max: 80 },
  size: { max: 120 },
  thickness: { max: 80 },
  application: { max: 140 },
  message: { min: 10, max: 2000 },
  honeypot: { max: 200 },
} as const;

export const INQUIRY_DEFAULTS = {
  status: "new",
  source: "website",
} as const;

export const API = {
  basePath: "/api",
  health: "/api/health",
  inquiries: "/api/inquiries",
  publicMethods: ["POST"] as const,
} as const;

export const RATE_LIMITS = {
  inquiries: { windowMs: 15 * 60 * 1000, max: 6 },
  general: { windowMs: 15 * 60 * 1000, max: 300 },
} as const;

export const BODY_LIMIT = "32kb";

export interface ColorMood {
  id: ColorMoodId;
  label: string;
  description: string;
  accent: string;
  accentSoft: string;
  accentContrast: string;
  accentSecondary: string;
  accentHighlight: string;
  gradientFrom: string;
  gradientTo: string;
}
