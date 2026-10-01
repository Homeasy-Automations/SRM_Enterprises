/** Web-app level constants and derived config. No secrets, no invented claims. */
import { BRAND, ROUTES } from "@srm/config";

export { BRAND, ROUTES };

export const SITE = {
  /** Canonical site URL without a trailing slash (NEXT_PUBLIC_SITE_URL). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  name: "SRM Enterprises",
  legalName: "SRM Enterprises",
  locale: "en_IN",
  defaultTitle:
    "SRM Enterprises — Complete Packaging Solutions Under One Roof | Industrial Packaging Supplier",
  defaultDescription:
    "SRM Enterprises supplies industrial packaging material — corrugated boxes, EPE foam, bubble & protective packaging, poly bags & films and packaging accessories. Trading, manufacturing and custom packaging for Gurugram, Manesar, Bhiwadi and NCR.",
  themeColor: "#1E6FFF",
  twitterCard: "summary_large_image" as const,
} as const;

export const CAPABILITIES = [
  {
    title: "Manufacturing & Trading",
    description:
      "Packaging material manufactured and traded under one roof, so one supplier can cover the whole requirement.",
    icon: "factory",
    color: "#1E6FFF",
  },
  {
    title: "High Quality Materials",
    description:
      "Consistent material and dimensional control, checked against the agreed specification.",
    icon: "badge",
    color: "#19B26B",
  },
  {
    title: "Fast & Reliable Supply",
    description: "Reliable dispatch planning for industrial customers and repeat requirements.",
    icon: "truck",
    color: "#FFC93C",
  },
  {
    title: "Custom Packaging Solutions",
    description:
      "Size, thickness, ply, printing and packing formats built around your product and process.",
    icon: "ruler",
    color: "#8B5CF6",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    key: "quality",
    title: "Quality",
    description:
      "Consistent material and dimensional control on every order, so packing standards stay stable batch after batch.",
    detail:
      "Material grade, ply, thickness and dimensions are confirmed before supply and checked against that specification, which keeps repeat packing predictable.",
    icon: "shield",
    color: "#1E6FFF",
  },
  {
    key: "custom",
    title: "Custom",
    description:
      "Size, thickness, printing and packing as required — from a small change to a fully customised format.",
    detail:
      "Requirements are assessed first, then material, dimensions and print are finalised, and a sample is prepared for approval before bulk supply.",
    icon: "ruler",
    color: "#19B26B",
  },
  {
    key: "value",
    title: "Value",
    description: "Competitive pricing for regular and bulk requirements across the packaging range.",
    detail:
      "Material options are matched to the actual protection needed, which keeps cost aligned with the application instead of over-specifying.",
    icon: "tag",
    color: "#FFC93C",
  },
  {
    key: "supply",
    title: "Supply",
    description: "Reliable dispatch planning for industrial customers and continuous consumption lines.",
    detail:
      "Regular requirements are planned as a standing supply so production lines are not held up waiting for packing material.",
    icon: "truck",
    color: "#FF5C8A",
  },
] as const;

export const WHY_CHOOSE_CLOSING_LINE =
  "From standard packaging to customized industrial solutions — SRM Enterprises can support your complete requirement.";

export const ABOUT_POINTS = [
  "Manufacturing and trading of industrial packaging materials",
  "Customized sizes, thicknesses, ply and specifications",
  "Consistent quality with competitive commercial pricing",
  "Suitable for automotive, engineering, electronics, e-commerce and general industry",
  "Bulk supply across NCR and nearby industrial clusters",
] as const;

export const ABOUT_INTRO =
  "One Partner. Multiple Packaging Solutions.";

export const ABOUT_DESCRIPTION =
  "SRM Enterprises works with industrial buyers who would rather deal with one dependable packaging partner than juggle five suppliers. Corrugated, foam, bubble, films and accessories are manufactured and traded under a single roof, in standard formats or built to your specification.";

export const WHAT_WE_PROVIDE = [
  {
    title: "Manufacturing",
    description:
      "Manufacturing of industrial packaging material to agreed dimensions, ply and thickness.",
    icon: "factory",
    color: "#1E6FFF",
  },
  {
    title: "Trading",
    description:
      "Trading supply of the wider packaging range so a single order can cover everything on your list.",
    icon: "package",
    color: "#19B26B",
  },
  {
    title: "Customization",
    description:
      "Custom sizes, thicknesses, ply, printing and packing formats developed with your team.",
    icon: "ruler",
    color: "#FF8A2B",
  },
  {
    title: "Bulk Supply",
    description:
      "Bulk supply planned for regular consumption across NCR and nearby industrial clusters.",
    icon: "truck",
    color: "#8B5CF6",
  },
] as const;

export const CAPABILITY_MATRIX = [
  { title: "Size", description: "Made-to-measure dimensions instead of forcing your product into a standard size." },
  { title: "Thickness", description: "Material thickness selected against the protection the application needs." },
  { title: "Ply", description: "3-ply, 5-ply and 7-ply corrugated options matched to load and handling." },
  { title: "Printing", description: "Branding, part numbers and handling marks printed as required." },
  { title: "Material", description: "Corrugated, EPE foam, bubble, films, strapping and accessory materials." },
  { title: "Quantity", description: "Single trial quantities through to regular bulk supply schedules." },
] as const;

export const QUALITY_PHILOSOPHY = [
  {
    title: "Specification first",
    description:
      "Every requirement is reduced to a written specification — material, dimensions, thickness or ply, printing and packing format.",
    color: "#1E6FFF",
  },
  {
    title: "Consistency over surprises",
    description:
      "Repeat orders are supplied to the same specification so your packing line behaves the same way every time.",
    color: "#19B26B",
  },
  {
    title: "Honest commercial discussion",
    description:
      "Material options are explained with their trade-offs, so cost decisions are made with full information.",
    color: "#FF8A2B",
  },
] as const;

export const SUPPLY_PHILOSOPHY = [
  {
    title: "Dispatch planning",
    description:
      "Regular requirements are scheduled ahead so material reaches you before the line runs out.",
    color: "#8B5CF6",
  },
  {
    title: "Industrial focus",
    description:
      "Supply is built around industrial consumption patterns — repeat orders, standing schedules and bulk quantities.",
    color: "#19C3E6",
  },
  {
    title: "Single-source convenience",
    description:
      "Primary packaging and accessories from one place, so there is one conversation instead of many.",
    color: "#FF5C8A",
  },
] as const;

export const NAVBAR_HEIGHT = 76;

export const FORM_SUCCESS_MESSAGE =
  "Inquiry submitted successfully. Our team will get back to you with material options and pricing.";

export const SERVICE_AREA_NOTE =
  "Bulk supply across NCR and nearby industrial clusters, dispatched from our Gurugram, Manesar and Bhiwadi network.";
