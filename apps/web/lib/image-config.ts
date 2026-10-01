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
    src: null,
    alt: "Industrial packaging materials — corrugated boxes, foam and protective rolls",
    width: 1200,
    height: 900,
    artDirection:
      "Placeholder illustration. Replace with a bright photo of stacked corrugated boxes, foam rolls and bubble wrap on a clean floor.",
  },
  aboutFacility: {
    src: null,
    alt: "Packaging material handling and dispatch area",
    width: 1200,
    height: 900,
    artDirection:
      "Placeholder illustration. Replace with a photo of the packing/handling area with material staged for dispatch.",
  },
  corrugated: {
    src: null,
    alt: "Corrugated packaging — boxes, sheets, rolls and die-cut formats",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with corrugated boxes and sheet stacks.",
  },
  epeFoam: {
    src: null,
    alt: "EPE foam packaging — bags, sheets, rolls and custom fitments",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with EPE foam sheets and rolls.",
  },
  bubble: {
    src: null,
    alt: "LDPE bubble and protective packaging — rolls, sheets and pouches",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with air bubble rolls and pouches.",
  },
  polyFilm: {
    src: null,
    alt: "Poly bags, films and flexible packaging — bags, stretch film and shrink film",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with poly bags and film rolls.",
  },
  accessories: {
    src: null,
    alt: "Packaging accessories — tapes, strapping, edge protectors and protective bags",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with tapes, strapping and edge protectors.",
  },
  industryAutomotive: {
    src: null,
    alt: "Automotive component packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with auto component packing photo.",
  },
  industryEngineering: {
    src: null,
    alt: "Engineering and industrial packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with machined parts packing photo.",
  },
  industryElectronics: {
    src: null,
    alt: "Electrical and electronics packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with electronics packing photo.",
  },
  industryPharma: {
    src: null,
    alt: "Pharmaceutical packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with clean pharma packing photo.",
  },
  industryFood: {
    src: null,
    alt: "Food and FMCG packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with FMCG carton packing photo.",
  },
  industryLogistics: {
    src: null,
    alt: "E-commerce and logistics packaging approach",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with dispatch/warehouse packing photo.",
  },
  customPackaging: {
    src: null,
    alt: "Custom packaging design and sample development",
    width: 1200,
    height: 900,
    artDirection: "Placeholder illustration. Replace with a photo of a sample/prototype pack.",
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
