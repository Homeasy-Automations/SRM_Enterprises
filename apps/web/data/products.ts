/**
 * Product catalogue — the exact, final product names supplied by SRM Enterprises.
 * No claims, statistics or specifications beyond what was provided are added here.
 *
 * Each category owns a colour (see CATEGORY_COLORS in @srm/config) which drives the
 * card hover state and the page-level accent on /products/<slug>.
 */
import type { IndustrySlug, ProductCategorySlug } from "@srm/types";
import { CATEGORY_COLORS } from "@srm/config";

export type ProductIconKey =
  | "box"
  | "foam"
  | "bubble"
  | "film"
  | "accessories";

export interface ProtectionPoint {
  title: string;
  description: string;
}

export interface ProductCategory {
  slug: ProductCategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  /** Short qualifier shown on cards. Only present where the client supplied one. */
  note?: string;
  description: string;
  intro: string;
  items: string[];
  applications: string[];
  customization: string[];
  protection: ProtectionPoint[];
  /** Industry slugs this category is commonly used in (links to /industries/<slug>). */
  industries: IndustrySlug[];
  color: string;
  colorName: string;
  icon: ProductIconKey;
  /** Key into lib/image-config.ts — lets real photos replace the illustrations later. */
  imageKey: string;
}

export const products: ProductCategory[] = [
  {
    slug: "corrugated-packaging",
    name: "Corrugated Packaging",
    shortName: "Corrugated",
    tagline:
      "Strong, economical and customizable packaging for industrial and logistics applications",
    note: "Custom dimensions • Printing • Bulk quantities",
    description:
      "Corrugated boxes, sheets, partitions and die-cut formats for industrial packing, storage and dispatch.",
    intro:
      "Corrugated packaging is the workhorse of industrial dispatch — used for transit boxes, storage cartons and component packing. Ply, grade, dimensions and printing are chosen around the load the box has to carry and how it is handled through the supply chain.",
    items: [
      "3-Ply / 5-Ply / 7-Ply Corrugated Boxes",
      "Corrugated Sheets & Rolls",
      "Partitions & Dividers",
      "Die-Cut Boxes",
      "Heavy-Duty Industrial Boxes",
      "Printed & Customized Boxes",
    ],
    applications: [
      "Industrial and logistics dispatch packing",
      "Component and spare-part packing",
      "Storage and warehousing cartons",
      "E-commerce and retail shipping boxes",
      "Die-cut presentation and inner packing",
    ],
    customization: [
      "Custom dimensions and ply selection",
      "Single or multi-colour printing",
      "Die-cut formats and cut-outs",
      "Partitions and dividers to your layout",
      "Bulk quantities for regular requirements",
    ],
    protection: [
      {
        title: "Stacking strength",
        description:
          "Ply and board selection is matched to the load so boxes hold their shape during storage and transit.",
      },
      {
        title: "Dimensional control",
        description:
          "Dimensions are fixed against your product so boxes fit consistently across repeat orders.",
      },
      {
        title: "Print clarity",
        description:
          "Printing is applied for identification and branding — product codes, handling marks and logos.",
      },
    ],
    industries: ["automotive", "engineering", "electronics", "food-fmcg", "ecommerce-logistics"],
    color: CATEGORY_COLORS["corrugated-packaging"],
    colorName: "Kraft Orange",
    icon: "box",
    imageKey: "corrugated",
  },
  {
    slug: "epe-foam-packaging",
    name: "EPE Foam Packaging",
    shortName: "EPE Foam",
    tagline: "Lightweight cushioning and surface protection for components and finished products",
    note: "Available in different thicknesses and sizes",
    description:
      "EPE foam bags, sheets, rolls and custom fitments for cushioning and surface protection.",
    intro:
      "EPE foam absorbs shock and protects surfaces without adding much weight. It is supplied as bags, sheets and rolls, or fabricated into fitments shaped around your product.",
    items: [
      "EPE Foam Bags",
      "EPE Foam Sheets",
      "EPE Foam Rolls",
      "EPE Pouches & Sleeves",
      "Custom Foam Fitments",
      "Protective Component Packaging",
    ],
    applications: [
      "Component cushioning in transit",
      "Surface protection for finished goods",
      "Electronics and appliance packing",
      "Furniture and glass handling",
      "Repeat-use interleaving and separators",
    ],
    customization: [
      "Different thicknesses and sizes",
      "Cut-to-size sheets and rolls",
      "Bag and sleeve formats",
      "Foam fitments cut to your product profile",
      "Combined foam + corrugated packing sets",
    ],
    protection: [
      {
        title: "Shock absorption",
        description:
          "Foam thickness is selected so impact is absorbed before it reaches the product.",
      },
      {
        title: "Surface safety",
        description:
          "Soft foam contact faces reduce scratches and scuffing on painted, polished or printed surfaces.",
      },
      {
        title: "Lightweight packing",
        description:
          "Protective packing stays light, which keeps handling and freight practical.",
      },
    ],
    industries: ["automotive", "electronics", "engineering", "pharmaceuticals", "food-fmcg"],
    color: CATEGORY_COLORS["epe-foam-packaging"],
    colorName: "Foam Aqua",
    icon: "foam",
    imageKey: "epeFoam",
  },
  {
    slug: "bubble-protective-packaging",
    name: "LDPE Bubble & Protective Packaging",
    shortName: "Bubble & Protective",
    tagline: "Protection against scratches, impact, dust and handling damage",
    note: "Ideal for auto parts, electronics, glass and precision components",
    description:
      "Air bubble bags, rolls, pouches and laminated protective formats for sensitive surfaces.",
    intro:
      "Bubble and laminated protective packaging creates a cushioned barrier between your product and everything else — other cartons, pallets, vehicle walls and handling equipment.",
    items: [
      "LDPE Air Bubble Bags",
      "Air Bubble Rolls & Sheets",
      "Bubble Pouches",
      "Foam + Bubble Laminated Bags",
      "Surface Protection Films",
      "Customized Protective Packaging",
    ],
    applications: [
      "Auto parts and precision components",
      "Electronics and electrical goods",
      "Glass, laminates and polished surfaces",
      "Furniture and interior fittings",
      "Warehouse and shifting protection",
    ],
    customization: [
      "Bag and pouch sizes to your product",
      "Rolls and sheets in required widths",
      "Foam laminated for extra cushioning",
      "Printed protection with your branding",
      "Cut-to-length dispatch-ready formats",
    ],
    protection: [
      {
        title: "Impact cushioning",
        description:
          "Entrapped air absorbs knocks and vibration through the journey, not just at loading.",
      },
      {
        title: "Scratch prevention",
        description:
          "A soft, non-abrasive layer keeps finished surfaces free from handling marks.",
      },
      {
        title: "Dust and moisture barrier",
        description:
          "Full wrapping keeps dust and light moisture away from the product during storage.",
      },
    ],
    industries: ["automotive", "electronics", "engineering", "ecommerce-logistics"],
    color: CATEGORY_COLORS["bubble-protective-packaging"],
    colorName: "Protective Violet",
    icon: "bubble",
    imageKey: "bubble",
  },
  {
    slug: "poly-bags-films",
    name: "Poly Bags, Films & Flexible Packaging",
    shortName: "Poly Bags & Films",
    tagline: "Flexible packaging for storage, protection and dispatch",
    description:
      "LDPE, HM/HDPE, stretch and shrink films plus clear and printed bags for daily packing lines.",
    intro:
      "Flexible packaging covers the everyday requirement: keeping products clean, bundled, stabilised and ready for dispatch, in the format that suits your packing line.",
    items: [
      "LDPE / LLDPE Poly Bags",
      "HM / HDPE Bags",
      "Clear & Printed Bags",
      "Stretch Film",
      "Shrink Film",
      "Garbage / Industrial Utility Bags",
    ],
    applications: [
      "Component and hardware packing",
      "Pallet wrapping and load stability",
      "Storage and dust protection",
      "Bundling for retail and wholesale",
      "Industrial housekeeping and waste handling",
    ],
    customization: [
      "Bag sizes, gauges and roll widths",
      "Printed bags with brand or product details",
      "Perforated and plain rolls",
      "Micro-perforated or vented formats",
      "Bulk packing of accessories and consumables",
    ],
    protection: [
      {
        title: "Dust and moisture control",
        description:
          "Sealed and covered packing keeps products clean between production and dispatch.",
      },
      {
        title: "Load stability",
        description:
          "Stretch and shrink formats hold cartons and components together on pallets and trolleys.",
      },
      {
        title: "Consistent supply",
        description:
          "Repeat gauges and sizes so your packing line consumes the same material every time.",
      },
    ],
    industries: ["automotive", "engineering", "electronics", "food-fmcg", "ecommerce-logistics"],
    color: CATEGORY_COLORS["poly-bags-films"],
    colorName: "Film Emerald",
    icon: "film",
    imageKey: "polyFilm",
  },
  {
    slug: "packaging-accessories",
    name: "Packaging Accessories",
    shortName: "Accessories",
    tagline: "Complete your packaging requirement from one source",
    description:
      "Tapes, strapping, edge protection, VCI and ESD materials that finish the packing job.",
    intro:
      "Accessories are what make a packing job actually work — closing, securing, protecting edges and guarding sensitive components. They are supplied alongside your primary packaging from the same place.",
    items: [
      "BOPP Packaging Tapes",
      "PP / PET Strapping",
      "Heat-Sealing Bags",
      "Edge Protectors",
      "VCI Bags & Papers",
      "ESD / Anti-Static Packaging",
    ],
    applications: [
      "Carton sealing and closing",
      "Pallet and bundle securing",
      "Edge and corner protection",
      "Corrosion-sensitive metal parts",
      "Static-sensitive electronic components",
    ],
    customization: [
      "Tape colours, print and widths",
      "Strapping size and strength options",
      "Edge protector length and thickness",
      "Anti-static and VCI formats",
      "Bulk supply of mixed accessories",
    ],
    protection: [
      {
        title: "Secure closure",
        description:
          "Tapes and strapping keep packed goods closed and stable through handling.",
      },
      {
        title: "Edge strength",
        description:
          "Edge protectors take the pressure off corners during strapping and stacking.",
      },
      {
        title: "Specialised guarding",
        description:
          "VCI and ESD formats cover corrosion and static-sensitive requirements where needed.",
      },
    ],
    industries: ["automotive", "engineering", "electronics", "pharmaceuticals", "food-fmcg"],
    color: CATEGORY_COLORS["packaging-accessories"],
    colorName: "Coral Pink",
    icon: "accessories",
    imageKey: "accessories",
  },
];

/** Safe lookup — returns undefined instead of throwing for an unknown slug. */
export function getProductBySlug(slug: string): ProductCategory | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductName(slug: string): string {
  return getProductBySlug(slug)?.name ?? "Packaging Requirement";
}

export const productSlugs: string[] = products.map((product) => product.slug);

/** Compact option list used by the quote form's category select. */
export const productOptions: { value: ProductCategorySlug; label: string }[] = products.map(
  (product) => ({ value: product.slug, label: product.name }),
);

/** Cards on the homepage showcase use this trimmed shape. */
export interface ProductShowcase {
  product: ProductCategory;
  /** First 3–4 items shown on the card. */
  items: string[];
}

export const productShowcases: ProductShowcase[] = products.map((product) => ({
  product,
  items: product.items.slice(0, 4),
}));
