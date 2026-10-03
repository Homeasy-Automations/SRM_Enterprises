/** Navigation model for the navbar, the mega menu, the mobile drawer and the footer. */
import { ROUTES } from "@srm/config";
import { industries } from "./industries";
import { products } from "./products";
import { solutions } from "./solutions";
import { locations } from "./locations";

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

export const locationMenu: NavChild[] = locations.map((loc) => ({
  label: loc.name,
  href: ROUTES.locations,
  description: loc.headline,
  color: loc.color,
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
    label: "Manufacturing & Infrastructure",
    href: `${ROUTES.about}#infrastructure`,
    description: "Facility, machinery, production capability & dispatch",
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
    href: ROUTES.customPackaging,
    description: "Requirement → Material → Design → Sample → Production → Dispatch",
    color: "#8438FF",
  },
];

export const primaryNav: NavItem[] = [
  {
    label: "Home",
    href: ROUTES.home,
    ariaLabel: "SRM Enterprises Home",
  },
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
    label: "Locations",
    href: ROUTES.locations,
    ariaLabel: "Service hubs across NCR",
    children: locationMenu,
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
  locations: locations.map((loc) => ({
    label: loc.name,
    href: ROUTES.locations,
  })),
  quickLinks: [
    { label: "Home", href: ROUTES.home },
    { label: "About Us", href: ROUTES.about },
    { label: "Products", href: ROUTES.products },
    { label: "Industries", href: ROUTES.industries },
    { label: "Solutions", href: ROUTES.solutions },
    { label: "Locations", href: ROUTES.locations },
    { label: "Resources", href: ROUTES.resources },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ],
  company: [
    { label: "About Us", href: ROUTES.about },
    { label: "All Products", href: ROUTES.products },
    { label: "Industries", href: ROUTES.industries },
    { label: "Solutions", href: ROUTES.solutions },
    { label: "Locations", href: ROUTES.locations },
    { label: "Resources", href: ROUTES.resources },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ],
  legal: [
    { label: "Privacy Policy", href: ROUTES.privacy },
    { label: "Terms & Conditions", href: ROUTES.terms },
  ],
} as const;

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
