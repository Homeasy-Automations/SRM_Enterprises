export {
  API,
  BODY_LIMIT,
  BRAND,
  INDUSTRY_SLUGS,
  INQUIRY_DEFAULTS,
  INQUIRY_LIMITS,
  PRODUCT_CATEGORY_SLUGS,
  RATE_LIMITS,
  ROUTES,
} from "./config";

export const INQUIRY_STATUSES = ["new", "contacted", "quoted", "closed"] as const;

export const PRODUCT_LABELS: Record<string, string> = {
  "corrugated-packaging": "Corrugated Packaging",
  "epe-foam-packaging": "EPE Foam Packaging",
  "bubble-protective-packaging": "LDPE Bubble & Protective Packaging",
  "poly-bags-films": "Poly Bags, Films & Flexible Packaging",
  "packaging-accessories": "Packaging Accessories",
};

export const INDUSTRY_LABELS: Record<string, string> = {
  automotive: "Automotive & Auto Components",
  engineering: "Engineering & Industrial",
  electronics: "Electrical & Electronics",
  pharmaceuticals: "Pharmaceuticals",
  "food-fmcg": "Food & FMCG",
  "ecommerce-logistics": "E-Commerce & Logistics",
};

export function productLabel(slug: string): string {
  return PRODUCT_LABELS[slug] ?? "Packaging Requirement";
}

export function industryLabel(slug: string): string {
  return INDUSTRY_LABELS[slug] ?? "Industrial Packaging";
}
