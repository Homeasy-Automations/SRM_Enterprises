/**
 * Typed image configuration.
 *
 * Every visual on the site today is a hand-built SVG/CSS illustration, so there are no
 * external image dependencies that can break. When real photographs become available,
 * drop them into `apps/web/public/images/` and set `src` here — nothing else changes,
 * because components read this config rather than hard-coded paths.
 */

export interface ImageSlot {
  /** File name inside /public/images, or null to keep the built-in illustration. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** Descriptive placeholder guidance for whoever supplies the final photo. */
  artDirection: string;
}

export const IMAGE_SLOTS = {
  heroPrimary: {
    src: "hero1.png",
    alt: "Industrial packaging materials — corrugated boxes, foam and protective rolls",
    width: 1200,
    height: 900,
    artDirection:
      "Stacked corrugated boxes, foam rolls and bubble wrap on a clean facility floor.",
  },
  aboutFacility: {
    src: "About/warehouse.png",
    alt: "Packaging material handling and dispatch area",
    width: 1200,
    height: 900,
    artDirection:
      "Packing and handling area with material staged for dispatch.",
  },
  corrugated: {
    src: "Products/corrugated_sec.png",
    alt: "Corrugated packaging — boxes, sheets, rolls and die-cut formats",
    width: 1200,
    height: 900,
    artDirection: "Corrugated boxes, sheets, rolls and partitions.",
  },
  epeFoam: {
    src: "Products/cushioning_sec.png",
    alt: "EPE foam packaging — bags, sheets, rolls and custom fitments",
    width: 1200,
    height: 900,
    artDirection: "EPE foam rolls, sheets, fitments and cushioning.",
  },
  bubble: {
    src: "Products/bubble_sec.png",
    alt: "LDPE bubble and protective packaging — rolls, sheets and pouches",
    width: 1200,
    height: 900,
    artDirection: "Air bubble rolls, sheets, pouches and cushioning.",
  },
  polyFilm: {
    src: "Products/poly_sec.png",
    alt: "Poly bags, films and flexible packaging — bags, stretch film and shrink film",
    width: 1200,
    height: 900,
    artDirection: "Poly bags, stretch film, shrink film and liners.",
  },
  accessories: {
    src: "Products/custom_sec.png",
    alt: "Packaging accessories — tapes, strapping, edge protectors and protective bags",
    width: 1200,
    height: 900,
    artDirection: "Tapes, strapping, edge protectors and packaging consumables.",
  },
  industryAutomotive: {
    src: "Industries/industries_automotive.png",
    alt: "Automotive component packaging approach and engineered protection",
    width: 1200,
    height: 900,
    artDirection: "Auto component packing and engineered cushioning.",
  },
  industryEngineering: {
    src: "Industries/industries_engineering.png",
    alt: "Engineering and industrial packaging approach for heavy machinery",
    width: 1200,
    height: 900,
    artDirection: "Machined parts and heavy engineering packing.",
  },
  industryElectronics: {
    src: "Industries/industries_electrical.png",
    alt: "Electrical and electronics anti-static ESD safe packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Electronics and anti-static packaging.",
  },
  industryPharma: {
    src: "Industries/industries_pharma.png",
    alt: "Pharmaceutical and healthcare cleanroom packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Clean pharmaceutical packing photo.",
  },
  industryFood: {
    src: "Industries/industries_fmcg.png",
    alt: "Food and FMCG secondary packaging and shipper cartons",
    width: 1200,
    height: 900,
    artDirection: "FMCG carton and secondary packaging photo.",
  },
  industryLogistics: {
    src: "Industries/industries_logistics.png",
    alt: "E-commerce, 3PL and logistics dispatch packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Dispatch and warehouse logistics packing photo.",
  },
  customPackaging: {
    src: "packagings/custom-cad.png",
    alt: "Custom packaging design, CAD blueprinting and sample prototype development",
    width: 1200,
    height: 900,
    artDirection: "Custom engineered CAD packaging prototype pack.",
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof IMAGE_SLOTS;

export function getImageSlot(key: string): ImageSlot | undefined {
  return (IMAGE_SLOTS as Record<string, ImageSlot>)[key];
}

/** Absolute path helper for slots that do have a real photo configured. */
export function imageSrc(key: ImageSlotKey): string | null {
  const slot = IMAGE_SLOTS[key];
  return slot.src ? `/images/${slot.src}` : null;
}
