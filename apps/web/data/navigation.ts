/** Navigation model for the navbar, the mega menu, the mobile drawer and the footer. */
import { ROUTES } from "@srm/config";
import { industries } from "./industries";
import { products } from "./products";

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

export const primaryNav: NavItem[] = [
  { label: "Home", href: ROUTES.home, ariaLabel: "Go to the SRM Enterprises home page" },
  { label: "About", href: ROUTES.about, ariaLabel: "About SRM Enterprises" },
  {
    label: "Products",
    href: ROUTES.products,
    ariaLabel: "Browse all packaging product categories",
    children: productMegaMenu,
    groups: [
      {
        heading: "Product categories",
        items: productMegaMenu,
      },
      {
        heading: "Related pages",
        items: [
          {
            label: "All Products",
            href: ROUTES.products,
            description: "Every packaging category in one place",
          },
          {
            label: "Custom Packaging",
            href: ROUTES.customPackaging,
            description: "Packaging designed around your product",
          },
          {
            label: "Packaging Accessories",
            href: ROUTES.product("packaging-accessories"),
            description: "Complete your requirement from one source",
          },
        ],
      },
      {
        heading: "Industries",
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
    label: "Custom Packaging",
    href: ROUTES.customPackaging,
    ariaLabel: "Custom packaging process",
  },
  { label: "Why Us", href: ROUTES.whyUs, ariaLabel: "Why businesses choose SRM Enterprises" },
  { label: "Contact", href: ROUTES.contact, ariaLabel: "Contact SRM Enterprises" },
];

export const footerNav = {
  products: products.map((product) => ({
    label: product.name,
    href: ROUTES.product(product.slug),
  })),
  company: [
    { label: "About Us", href: ROUTES.about },
    { label: "All Products", href: ROUTES.products },
    { label: "Industries", href: ROUTES.industries },
    { label: "Custom Packaging", href: ROUTES.customPackaging },
    { label: "Why Us", href: ROUTES.whyUs },
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
