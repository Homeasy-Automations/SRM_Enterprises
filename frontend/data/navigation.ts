/** Navigation model for the navbar, the mega menu, the mobile drawer and the footer. */
import { ROUTES } from "@srm/config";
import { industries } from "./industries";
import { products } from "./products";
import { solutions } from "./solutions";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  color?: string;
}

export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  children?: NavChild[];
  /** Grouped children (mega menu columns). */
  groups?: { heading: string; items: NavChild[] }[];
}

export interface MegaCategoryColumn {
  title: string;
  slug: string;
  href: string;
  color: string;
  icon: "box" | "foam" | "bubble" | "film" | "accessories";
  subItems: { label: string; href: string }[];
}

export const productCategoriesMega: MegaCategoryColumn[] = [
  {
    title: "Corrugated",
    slug: "corrugated-packaging",
    href: "/products/corrugated-packaging",
    color: "#E86620",
    icon: "box",
    subItems: [
      { label: "3 Ply Boxes", href: "/products/corrugated-packaging#specifications" },
      { label: "5 Ply Boxes", href: "/products/corrugated-packaging#specifications" },
      { label: "7 Ply Heavy Duty", href: "/products/corrugated-packaging#specifications" },
      { label: "Die Cut Boxes", href: "/products/corrugated-packaging#specifications" },
      { label: "Heavy Duty Master Cartons", href: "/products/corrugated-packaging#specifications" },
    ],
  },
  {
    title: "EPE Foam",
    slug: "epe-foam-packaging",
    href: "/products/epe-foam-packaging",
    color: "#19B26B",
    icon: "foam",
    subItems: [
      { label: "EPE Sheets", href: "/products/epe-foam-packaging#specifications" },
      { label: "EPE Bags & Pouches", href: "/products/epe-foam-packaging#specifications" },
      { label: "EPE Foam Rolls", href: "/products/epe-foam-packaging#specifications" },
      { label: "Custom Fitments & Trays", href: "/products/epe-foam-packaging#specifications" },
    ],
  },
  {
    title: "Bubble Wrap",
    slug: "bubble-protective-packaging",
    href: "/products/bubble-protective-packaging",
    color: "#1E6FFF",
    icon: "bubble",
    subItems: [
      { label: "Bubble Rolls", href: "/products/bubble-protective-packaging#specifications" },
      { label: "Bubble Bags", href: "/products/bubble-protective-packaging#specifications" },
      { label: "Protective Pouches", href: "/products/bubble-protective-packaging#specifications" },
      { label: "Anti-Static Bubble", href: "/products/bubble-protective-packaging#specifications" },
    ],
  },
  {
    title: "Films",
    slug: "poly-bags-films",
    href: "/products/poly-bags-films",
    color: "#0FA47F",
    icon: "film",
    subItems: [
      { label: "LDPE Liners & Bags", href: "/products/poly-bags-films#specifications" },
      { label: "Pallet Stretch Film", href: "/products/poly-bags-films#specifications" },
      { label: "Shrink Films", href: "/products/poly-bags-films#specifications" },
    ],
  },
  {
    title: "Accessories",
    slug: "packaging-accessories",
    href: "/products/packaging-accessories",
    color: "#8438FF",
    icon: "accessories",
    subItems: [
      { label: "BOPP Packing Tapes", href: "/products/packaging-accessories#specifications" },
      { label: "PP & PET Strapping", href: "/products/packaging-accessories#specifications" },
      { label: "Edge Protectors", href: "/products/packaging-accessories#specifications" },
      { label: "VCI Anti-Rust Films", href: "/products/packaging-accessories#specifications" },
      { label: "ESD Protection", href: "/products/packaging-accessories#specifications" },
    ],
  },
];

export const productMegaMenu: NavChild[] = products.map((product) => ({
  label: product.name,
  href: ROUTES.product(product.slug),
  description: product.tagline,
  color: product.color,
}));

export const industryMenu: NavChild[] = industries.map((industry) => ({
  label: industry.name,
  href: ROUTES.industry(industry.slug),
  description: industry.tagline,
  color: industry.color,
}));

export const solutionMenu: NavChild[] = solutions.slice(0, 8).map((sol) => ({
  label: sol.name,
  href: ROUTES.solutions,
  description: sol.tagline,
  color: sol.color,
}));



export const resourcesMenu: NavChild[] = [
  {
    label: "Case Studies",
    href: `${ROUTES.resources}#case-studies`,
    description: "Real B2B packaging challenge, solution & results",
    color: "#E86620",
  },
  {
    label: "Packaging Guides",
    href: `${ROUTES.resources}#guides`,
    description: "3-Ply vs 5-Ply, EPE thickness selection & material guides",
    color: "#1E6FFF",
  },
  {
    label: "FAQs",
    href: `${ROUTES.home}#faq`,
    description: "Common commercial, MOQ, lead-time & sample questions",
    color: "#19B26B",
  },
  {
    label: "Blog",
    href: `${ROUTES.resources}#blog`,
    description: "Industry packaging insights, monsoon protection & trends",
    color: "#8438FF",
  },
];

export const aboutMenu: NavChild[] = [
  {
    label: "Company Overview",
    href: `${ROUTES.about}#overview`,
    description: "Who SRM Enterprises is and what we do",
    color: "#1E6FFF",
  },
  {
    label: "Production & Infrastructure",
    href: `${ROUTES.about}#infrastructure`,
    description: "Facility, equipment, converting capacity & dispatch",
    color: "#E86620",
  },
  {
    label: "Quality Assurance",
    href: `${ROUTES.about}#quality`,
    description: "QC process, testing and material/specification control",
    color: "#19B26B",
  },
  {
    label: "Our Process",
    href: `${ROUTES.about}#process`,
    description: "Requirement → Material → Design → Sample → Production → Dispatch",
    color: "#8438FF",
  },
];

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: ROUTES.about,
    ariaLabel: "About SRM Enterprises",
    children: aboutMenu,
  },
  {
    label: "Products",
    href: ROUTES.products,
    ariaLabel: "Browse packaging products",
    children: productMegaMenu,
    groups: [
      {
        heading: "Core Categories",
        items: productMegaMenu,
      },
      {
        heading: "Applications & Solutions",
        items: solutionMenu.slice(0, 4),
      },
      {
        heading: "Key Industries",
        items: industryMenu.slice(0, 4),
      },
    ],
  },
  {
    label: "Industries",
    href: ROUTES.industries,
    ariaLabel: "Packaging solutions by industry",
    children: industryMenu,
  },
  {
    label: "Solutions",
    href: ROUTES.solutions,
    ariaLabel: "Packaging applications and solutions",
    children: solutionMenu,
  },
  {
    label: "Resources",
    href: ROUTES.resources,
    ariaLabel: "Case studies, guides and FAQs",
    children: resourcesMenu,
  },
  {
    label: "Gallery",
    href: ROUTES.gallery,
    ariaLabel: "Factory, products and process gallery",
  },
  {
    label: "Contact",
    href: ROUTES.contact,
    ariaLabel: "Contact SRM Enterprises and B2B Inquiries",
  },
];

export const footerNav = {
  products: products.map((product) => ({
    label: product.name,
    href: ROUTES.product(product.slug),
  })),
  solutions: solutions.slice(0, 8).map((sol) => ({
    label: sol.name,
    href: ROUTES.solutions,
  })),
  panIndia: [
    { label: "Northern Industrial Corridor", href: ROUTES.contact },
    { label: "Western Industrial Belts", href: ROUTES.contact },
    { label: "Southern Auto & Electronics", href: ROUTES.contact },
    { label: "Eastern & National Freight", href: ROUTES.contact },
  ],
  quickLinks: [
    { label: "Home", href: ROUTES.home },
    { label: "About Us", href: ROUTES.about },
    { label: "Products", href: ROUTES.products },
    { label: "Industries", href: ROUTES.industries },
    { label: "Solutions", href: ROUTES.solutions },
    { label: "Resources", href: ROUTES.resources },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ],
  company: [
    { label: "About Us", href: ROUTES.about },
    { label: "All Products", href: ROUTES.products },
    { label: "Industries", href: ROUTES.industries },
    { label: "Solutions", href: ROUTES.solutions },
    { label: "Resources", href: ROUTES.resources },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.privacy },
    { label: "Terms & Conditions", href: ROUTES.terms },
  ],
} as const;

/** Clientele brand names used by the marquee ribbon. */
export const clienteleItems: string[] = [
  "Ecotwist",
  "Castors Global",
  "Sumedha Agro",
  "BharatX Agro",
  "Ecotwist",
  "Castors Global",
  "Sumedha Agro",
  "BharatX Agro",
];

/** Product names used by the infinite marquee ribbon. */
export const marqueeItems: string[] = [
  "Corrugated Boxes",
  "EPE Foam Sheets",
  "Air Bubble Rolls",
  "LDPE Poly Bags",
  "Stretch Film",
  "BOPP Tapes",
  "Edge Protectors",
  "Die-Cut Boxes",
  "VCI Bags",
  "Strapping Rolls",
  "Shrink Film",
  "Foam Fitments",
  "HM / HDPE Bags",
  "Partitions & Dividers",
  "ESD Packaging",
  "Heat-Sealing Bags",
];

