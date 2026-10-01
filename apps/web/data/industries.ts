/**
 * Industry verticals — exactly six, written qualitatively.
 * No numbers, capacities, client names or performance claims anywhere.
 */
import type { IndustrySlug, ProductCategorySlug } from "@srm/types";
import { INDUSTRY_COLORS } from "@srm/config";

export type IndustryIconKey =
  | "car"
  | "engineering"
  | "electronics"
  | "pharma"
  | "food"
  | "logistics";

export interface RecommendedPackaging {
  /** Slug of the product category that addresses the challenge. */
  productSlug: ProductCategorySlug;
  /** What that category does for this industry — qualitative only. */
  reason: string;
}

export interface Industry {
  slug: IndustrySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  intro: string;
  challenges: string[];
  recommendedPackaging: RecommendedPackaging[];
  approach: string[];
  supplyNotes: string[];
  color: string;
  icon: IndustryIconKey;
  imageKey: string;
}

export const industryTagline =
  "Packaging solutions designed around product protection and supply-chain needs";

export const industries: Industry[] = [
  {
    slug: "automotive",
    name: "Automotive & Auto Components",
    shortName: "Automotive",
    tagline: "Protection for components that travel between plants, vendors and dealers",
    description:
      "Packaging for auto components, spares and assemblies moving through multi-stage supply chains.",
    intro:
      "Automotive packing has to survive more than one trip of handling. Components are packed at a vendor, unpacked at a line, and often repacked for service dispatch. Packaging that fits the component properly, protects the finish and stays usable across those stages matters more than any single feature.",
    challenges: [
      "Paint, plating and machined surfaces that mark easily during handling",
      "Components of irregular shape that need support and separation",
      "Multi-stage movement between vendors, plants and service networks",
      "Mixed part numbers in one consignment that must stay identifiable",
      "Returnable and repeat supply cycles where packaging is reused",
    ],
    recommendedPackaging: [
      {
        productSlug: "epe-foam-packaging",
        reason:
          "Foam bags, sleeves and fitments hold shaped components in place and keep contact surfaces protected.",
      },
      {
        productSlug: "bubble-protective-packaging",
        reason:
          "Bubble rolls and pouches add a cushioned layer for painted, polished and precision parts.",
      },
      {
        productSlug: "corrugated-packaging",
        reason:
          "Corrugated boxes with partitions and dividers keep multiple components separate in one carton.",
      },
      {
        productSlug: "packaging-accessories",
        reason:
          "VCI bags and papers cover corrosion-sensitive metal parts, while tape and strapping close and secure packs.",
      },
    ],
    approach: [
      "Component profile reviewed first — shape, finish and how it is handled",
      "Interior separation planned so parts cannot contact each other in transit",
      "Outer box ply matched to stacking and consignment size",
      "Identification and printing kept clear for part numbers and handling marks",
    ],
    supplyNotes: [
      "Repeat requirements planned as a standing supply rather than one-off orders",
      "Material kept consistent across cycles so packing standards do not drift",
      "Bulk quantities supported for regular consumption lines",
    ],
    color: INDUSTRY_COLORS.automotive,
    icon: "car",
    imageKey: "industryAutomotive",
  },
  {
    slug: "engineering",
    name: "Engineering & Industrial",
    shortName: "Engineering",
    tagline: "Heavy, awkward and high-value parts packed to survive movement",
    description:
      "Packaging for machined parts, fabricated items, castings and industrial equipment.",
    intro:
      "Engineering goods are usually heavy, often irregular, and expensive to replace if damaged. The packaging priority is support and stability: the part should not shift inside the pack, and the pack should not collapse under the load.",
    challenges: [
      "Heavy parts where packaging must carry load without deformation",
      "Irregular profiles that do not sit flat in standard cartons",
      "Sharp edges and corners that can cut through packing materials",
      "Rust and corrosion sensitive to storage conditions",
      "Over-sized items that need custom box formats",
    ],
    recommendedPackaging: [
      {
        productSlug: "corrugated-packaging",
        reason:
          "Heavy-duty boxes, custom dimensions and die-cut formats for irregular and over-sized parts.",
      },
      {
        productSlug: "epe-foam-packaging",
        reason: "Foam sheets and fitments cushion machined surfaces and absorb impact.",
      },
      {
        productSlug: "packaging-accessories",
        reason:
          "Edge protectors, strapping and VCI materials handle sharp corners, load securing and corrosion.",
      },
      {
        productSlug: "poly-bags-films",
        reason: "Poly bags and films keep parts dust-free during storage and between operations.",
      },
    ],
    approach: [
      "Load and handling method reviewed before material selection",
      "Reinforcement planned where corners and edges take stress",
      "Corrosion-sensitive items routed to VCI protection",
      "Box format designed around the part rather than the other way round",
    ],
    supplyNotes: [
      "Mixed packaging sets supplied together for a single packing station",
      "Bulk and repeat requirements planned around production schedules",
      "Consistent material so packing procedures stay repeatable",
    ],
    color: INDUSTRY_COLORS.engineering,
    icon: "engineering",
    imageKey: "industryEngineering",
  },
  {
    slug: "electronics",
    name: "Electrical & Electronics",
    shortName: "Electronics",
    tagline: "Impact, dust and static protection for sensitive assemblies",
    description:
      "Packaging for electronic assemblies, electrical goods and precision components.",
    intro:
      "Electronic items combine two risks: physical damage from impact, and damage that cannot be seen at all — static discharge and dust. Packaging needs to address both while keeping the unit presentable on arrival.",
    challenges: [
      "Impact and drop damage to assemblies and enclosures",
      "Static discharge that can damage components invisibly",
      "Dust and moisture ingress during storage",
      "Small components that need organised separation",
      "Presentation standards for dealer and end-customer delivery",
    ],
    recommendedPackaging: [
      {
        productSlug: "packaging-accessories",
        reason:
          "ESD and anti-static bags address static sensitivity, while tapes and heat-sealing bags close packs cleanly.",
      },
      {
        productSlug: "epe-foam-packaging",
        reason: "Foam bags and fitments absorb shock and hold assemblies firmly in position.",
      },
      {
        productSlug: "bubble-protective-packaging",
        reason: "Bubble wraps and pouches protect displays, casings and polished surfaces.",
      },
      {
        productSlug: "corrugated-packaging",
        reason: "Printed corrugated boxes with partitions give finished units a presentable outer pack.",
      },
    ],
    approach: [
      "Sensitivity of the item classified first — static, impact, dust, moisture",
      "Inner protection selected before the outer box",
      "Clean-room-free packing lines supported by dust-controlled materials",
      "Outer carton printing used for handling and identification",
    ],
    supplyNotes: [
      "Anti-static and standard materials supplied side by side for mixed lines",
      "Repeat orders kept to the same specification for consistency",
      "Bulk supply for high-volume packing operations",
    ],
    color: INDUSTRY_COLORS.electronics,
    icon: "electronics",
    imageKey: "industryElectronics",
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    shortName: "Pharmaceuticals",
    tagline: "Clean, dust-free packing for sensitive products and equipment",
    description:
      "Packaging for pharma packaging lines, equipment, glassware and consumables.",
    intro:
      "Pharma requirements are shaped by cleanliness and consistency. Packing materials should not shed dust, should keep items sealed and should arrive to the same specification every time the packing line runs.",
    challenges: [
      "Dust and contamination control in packing areas",
      "Sensitive glass and fragile items with low impact tolerance",
      "Consistent specification required across repeat supply",
      "Clean appearance suitable for controlled environments",
      "Small-format items that need organised separation",
    ],
    recommendedPackaging: [
      {
        productSlug: "epe-foam-packaging",
        reason: "Foam sheets and pouches protect fragile glass and equipment surfaces.",
      },
      {
        productSlug: "poly-bags-films",
        reason: "Poly bags and films keep packs sealed and dust-free in storage areas.",
      },
      {
        productSlug: "corrugated-packaging",
        reason: "Clean corrugated boxes with dividers keep items organised and presentable.",
      },
      {
        productSlug: "packaging-accessories",
        reason: "Heat-sealing bags and tapes complete sealed, tidy packing formats.",
      },
    ],
    approach: [
      "Material selected for clean handling rather than aesthetics alone",
      "Sealed formats preferred where dust control matters",
      "Specification locked for repeat supply so line behaviour does not change",
      "Fragile items protected with dedicated cushioning layers",
    ],
    supplyNotes: [
      "Repeat and seasonal requirements planned in advance",
      "Consistent material sourcing to avoid packing line surprises",
      "Bulk supply supported for high-consumption items",
    ],
    color: INDUSTRY_COLORS.pharmaceuticals,
    icon: "pharma",
    imageKey: "industryPharma",
  },
  {
    slug: "food-fmcg",
    name: "Food & FMCG",
    shortName: "Food & FMCG",
    tagline: "Hygienic handling and clean presentation for fast-moving lines",
    description:
      "Packaging for FMCG cartons, food-grade packing lines and high-volume distribution.",
    intro:
      "FMCG lines run at volume and cannot afford packing material surprises. The priorities are clean handling, dimension consistency and steady supply, so a line keeps running without rework or rejects.",
    challenges: [
      "High-volume lines needing consistent dimensions and material",
      "Hygiene expectations during handling and outbound logistics",
      "Product presentation at the retail and distribution end",
      "Mixed pack sizes across one distribution cycle",
      "Continuous consumption needing reliable replenishment",
    ],
    recommendedPackaging: [
      {
        productSlug: "poly-bags-films",
        reason: "Poly bags, films and utility bags cover everyday packing and hygiene needs.",
      },
      {
        productSlug: "corrugated-packaging",
        reason: "Printed corrugated cartons support distribution, stacking and branding.",
      },
      {
        productSlug: "packaging-accessories",
        reason: "BOPP tapes and strapping keep cartons closed and pallets stable.",
      },
      {
        productSlug: "epe-foam-packaging",
        reason: "Foam inserts stabilise glass, jar and bottle formats during transit.",
      },
    ],
    approach: [
      "Repeat-consistency treated as the primary specification",
      "Materials chosen for clean handling in occupied areas",
      "Pack sizes and printing aligned to distribution requirements",
      "Supply planned as a running requirement, not occasional orders",
    ],
    supplyNotes: [
      "Regular dispatch planning for continuous consumption",
      "Bulk supply across NCR and nearby industrial clusters",
      "Buffer stock guidance for high-usage items",
    ],
    color: INDUSTRY_COLORS["food-fmcg"],
    icon: "food",
    imageKey: "industryFood",
  },
  {
    slug: "ecommerce-logistics",
    name: "E-Commerce & Logistics",
    shortName: "E-Commerce",
    tagline: "Fast, uniform packing that holds up through the last mile",
    description:
      "Packaging for fulfilment operations, warehouse dispatch and courier movement.",
    intro:
      "E-commerce packing is driven by speed and uniformity. The same box has to protect very different products, handle sorting machinery and still be efficient to pack during peak volume.",
    challenges: [
      "Wide product mix packed on the same station",
      "Repeated handling through sorting hubs and last-mile delivery",
      "Peak volumes where packing speed matters as much as protection",
      "Multiple box sizes to keep void fill and freight under control",
      "Dust and moisture during transit and storage",
    ],
    recommendedPackaging: [
      {
        productSlug: "corrugated-packaging",
        reason: "3-ply and 5-ply boxes in multiple sizes cover the everyday shipping mix.",
      },
      {
        productSlug: "bubble-protective-packaging",
        reason: "Bubble rolls, pouches and surface films protect contents inside the shipper.",
      },
      {
        productSlug: "packaging-accessories",
        reason: "Tapes, strapping and edge protectors close and stabilise parcels quickly.",
      },
      {
        productSlug: "poly-bags-films",
        reason: "Poly bags keep products clean and allow packing before the outer box is closed.",
      },
    ],
    approach: [
      "Box size ladder designed to reduce void fill and freight",
      "Materials chosen for packing speed on a busy station",
      "Inner protection matched to product fragility rather than applied uniformly",
      "Supply planned around order volume patterns and peak seasons",
    ],
    supplyNotes: [
      "Bulk supply for fulfilment centres and 3PL operations",
      "Regular dispatch schedules for high-consumption items",
      "Mixed material sets supplied from a single source",
    ],
    color: INDUSTRY_COLORS["ecommerce-logistics"],
    icon: "logistics",
    imageKey: "industryLogistics",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const industrySlugs: string[] = industries.map((industry) => industry.slug);
