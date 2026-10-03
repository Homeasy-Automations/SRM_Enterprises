/**
 * Shared configuration constants: brand, routes, colour tokens and validation limits.
 * Imported by both `apps/web` and `services/api` so the two can never drift apart.
 */
import type { ColorMoodId, IndustrySlug, ProductCategorySlug } from "@srm/types";

export const BRAND = {
  name: "SRM ENTERPRISES",
  nameShort: "SRM",
  tagline: "Complete Packaging Solutions",
  heroHeadline: "Complete Packaging Solutions Under One Roof",
  footerLine: "Your Complete Packaging Material Partner",
  positioning:
    "Industrial packaging material supplier with reliable Pan India supply & dispatch.",
  bulkSupplyLine: "across Pan India with reliable dispatch logistics",
  locations: ["Pan India"],
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  industries: "/industries",
  industry: (slug: string) => `/industries/${slug}`,
  customPackaging: "/custom-packaging",
  whyUs: "/why-us",
  contact: "/contact",
  quote: "/contact",
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

/** Validation limits — the single source of truth for both frontend and backend Zod schemas. */
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
  /** Public write-only API: no read, update or delete endpoints exist by design. */
  publicMethods: ["POST"] as const,
} as const;

export const RATE_LIMITS = {
  inquiries: { windowMs: 15 * 60 * 1000, max: 6 },
  general: { windowMs: 15 * 60 * 1000, max: 300 },
} as const;

export const BODY_LIMIT = "32kb";

/** Base (light) surface + brand colour tokens. Mirrored as CSS variables in the web app. */
export const BASE_TOKENS = {
  white: "#FFFFFF",
  skyTint: "#F3F9FF",
  cream: "#FFF9F0",
  navy: "#12294A",
  navySoft: "#3D5A80",
  brandBlue: "#1E6FFF",
  brandGreen: "#19B26B",
  sunnyYellow: "#FFC93C",
} as const;

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

/** Four LIGHT palettes for the floating "Color Mood" switcher. */
export const COLOR_MOODS: readonly ColorMood[] = [
  {
    id: "ocean",
    label: "Ocean",
    description: "Vivid blue with fresh green",
    accent: "#1E6FFF",
    accentSoft: "#E8F1FF",
    accentContrast: "#FFFFFF",
    accentSecondary: "#19B26B",
    accentHighlight: "#FFC93C",
    gradientFrom: "#1E6FFF",
    gradientTo: "#19B26B",
  },
  {
    id: "citrus",
    label: "Citrus",
    description: "Sunny orange with bright lemon",
    accent: "#FF7A18",
    accentSoft: "#FFF1E3",
    accentContrast: "#FFFFFF",
    accentSecondary: "#FFB020",
    accentHighlight: "#FFE066",
    gradientFrom: "#FF7A18",
    gradientTo: "#FFB020",
  },
  {
    id: "meadow",
    label: "Meadow",
    description: "Fresh green with aqua",
    accent: "#0FA968",
    accentSoft: "#E6FAF1",
    accentContrast: "#FFFFFF",
    accentSecondary: "#19C3E6",
    accentHighlight: "#FFD84D",
    gradientFrom: "#0FA968",
    gradientTo: "#19C3E6",
  },
  {
    id: "berry",
    label: "Berry",
    description: "Violet with coral pink",
    accent: "#7C3AED",
    accentSoft: "#F3ECFF",
    accentContrast: "#FFFFFF",
    accentSecondary: "#FF5C8A",
    accentHighlight: "#FFC93C",
    gradientFrom: "#7C3AED",
    gradientTo: "#FF5C8A",
  },
] as const;

export const DEFAULT_COLOR_MOOD: ColorMoodId = "ocean";

/** Category colour ownership — every product card and product page uses its own colour. */
export const CATEGORY_COLORS: Record<ProductCategorySlug, string> = {
  "corrugated-packaging": "#FF8A2B",
  "epe-foam-packaging": "#19C3E6",
  "bubble-protective-packaging": "#8B5CF6",
  "poly-bags-films": "#10B981",
  "packaging-accessories": "#FF5C8A",
};

export const INDUSTRY_COLORS: Record<IndustrySlug, string> = {
  automotive: "#1E6FFF",
  engineering: "#FF8A2B",
  electronics: "#8B5CF6",
  pharmaceuticals: "#19B26B",
  "food-fmcg": "#FFC93C",
  "ecommerce-logistics": "#19C3E6",
};

/** The six-step custom packaging workflow, reused by the homepage + /custom-packaging timeline. */
export const CUSTOM_PROCESS_STEPS = [
  {
    id: "requirement",
    title: "Requirement",
    summary: "Share your product details, application and the protection it needs.",
    detail:
      "We start with your application: what is being packed, how it is handled, stacked, stored and transported. Photographs, drawings or a sample product all help us quote accurately.",
    color: "#1E6FFF",
  },
  {
    id: "material-selection",
    title: "Material Selection",
    summary: "We suggest the right material — corrugated, EPE foam, bubble, films or accessories.",
    detail:
      "Material is matched to the protection requirement: ply and grade for corrugated, density and thickness for foam, film thickness for poly and bubble, plus accessories such as tape, strapping and edge protection.",
    color: "#19B26B",
  },
  {
    id: "design",
    title: "Design",
    summary: "Dimensions, ply, thickness and printing are finalised with you.",
    detail:
      "We work out dimensions, ply, thickness, printing or branding needs and packing format so the solution fits your dispatch line rather than the other way around.",
    color: "#FFC93C",
  },
  {
    id: "prototype",
    title: "Prototype / Sample",
    summary: "A sample is prepared for your approval before bulk production.",
    detail:
      "A prototype or sample lets you check fit, strength and appearance on your own product before any bulk commitment.",
    color: "#FF8A2B",
  },
  {
    id: "production",
    title: "Production",
    summary: "Bulk manufacturing and trading supply as per the approved specification.",
    detail:
      "Once the sample is approved, the requirement moves into production and/or organised trading supply, with quantities planned around your schedule.",
    color: "#8B5CF6",
  },
  {
    id: "dispatch",
    title: "Dispatch",
    summary: "Planned dispatch for regular and bulk industrial requirements.",
    detail:
      "Dispatch is planned with your team so material reaches you when it is needed — for one-off orders as well as repeat industrial supply.",
    color: "#FF5C8A",
  },
] as const;
