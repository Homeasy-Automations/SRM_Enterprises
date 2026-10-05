export interface GalleryItem {
  id: string;
  category: "products" | "process" | "infrastructure" | "completed";
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  aspect?: "tall" | "wide" | "normal";
  tags: string[];
  color: string;
  icon: string;
}

export const galleryCategories = [
  { id: "all", label: "All Proof & Photos" },
  { id: "products", label: "Products" },
  { id: "process", label: "Packaging in Process" },
  { id: "infrastructure", label: "Infrastructure & Facility" },
  { id: "completed", label: "Completed Dispatches" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    category: "products",
    categoryLabel: "Products",
    title: "Multi-Ply Heavy-Duty Master Cartons",
    subtitle: "5-Ply & 7-Ply corrugated boxes staged for bulk OEM dispatch",
    description: "High-compression kraft cartons engineered for heavy industrial payload transport and warehouse stacking.",
    image: "/images/hero3.png",
    aspect: "wide",
    tags: ["Corrugated", "5-Ply", "Heavy Payload"],
    color: "#E86620",
    icon: "box",
  },
  {
    id: "g2",
    category: "products",
    categoryLabel: "Products",
    title: "Precision Die-Cut EPE Foam Fitments",
    subtitle: "Custom-profile cushioning trays for automotive transmission components",
    description: "CNC-cut resilient polyethylene foam designed to securely lock irregular automotive parts in place.",
    image: "/images/hero4.png",
    aspect: "tall",
    tags: ["EPE Foam", "Automotive", "Zero Scratch"],
    color: "#1E6FFF",
    icon: "foam",
  },
  {
    id: "g3",
    category: "process",
    categoryLabel: "Packaging in Process",
    title: "Automated Box Slotting & Creasing",
    subtitle: "High-speed precision slotting ensuring accurate dimensional tolerances",
    description: "Flawless scoring and die-cutting ensuring clean folding and uniform box squareness on high-speed lines.",
    image: "/images/hero6.png",
    aspect: "normal",
    tags: ["Precision Production", "Quality Control", "Automation"],
    color: "#19B26B",
    icon: "hammer",
  },
  {
    id: "g4",
    category: "infrastructure",
    categoryLabel: "Infrastructure & Facility",
    title: "Integrated Packaging Manufacturing Plant",
    subtitle: "Modern equipment floor for corrugation, laminating & die-cutting",
    description: "Multi-station production floor designed for rapid setup, consistent flute calibration, and continuous quality monitoring.",
    image: "/images/hero1.png",
    aspect: "tall",
    tags: ["Manufacturing", "Plant Floor", "Quality Assured"],
    color: "#0FA47F",
    icon: "warehouse",
  },
  {
    id: "g5",
    category: "completed",
    categoryLabel: "Completed Dispatches",
    title: "Warehouse Staging & Pan-India Loading Docks",
    subtitle: "Fleet loading with high-tensile stretch wrapping and weather protection",
    description: "Organized staging docks with verified pallet stretch wrapping and daily scheduled dispatch routes.",
    image: "/images/hero2.png",
    aspect: "wide",
    tags: ["Logistics", "Dispatch Fleet", "Pan-India Supply"],
    color: "#8438FF",
    icon: "truck",
  },
  {
    id: "g6",
    category: "products",
    categoryLabel: "Products",
    title: "Industrial Stretch Wrap & Packaging Accessories",
    subtitle: "High-yield pallet wrap, BOPP sealing tapes & strapping rolls",
    description: "Reliable secondary packaging materials providing tamper evidence, puncture resistance, and weather protection.",
    image: "/images/hero5.png",
    aspect: "normal",
    tags: ["Stretch Film", "BOPP Tape", "Strapping"],
    color: "#3D5A80",
    icon: "package",
  },
  {
    id: "g7",
    category: "completed",
    categoryLabel: "Completed Dispatches",
    title: "Export Consignment & Seaworthy Barrier Kits",
    subtitle: "Seaworthy packaging assembly for overseas engineering machinery components",
    description: "Turnkey combination of VCI moisture barrier bags, desiccants, heavy corrugated packs, and PET strapping.",
    image: "/images/contact-hero.jpg",
    aspect: "normal",
    tags: ["Export Quality", "VCI Anti-Rust", "Turnkey Solution"],
    color: "#D97706",
    icon: "globe",
  },
  {
    id: "g8",
    category: "process",
    categoryLabel: "Packaging in Process",
    title: "Custom Prototype Testing & CAD Fitting",
    subtitle: "Hands-on dimensional inspection before full production runs",
    description: "Pre-production validation testing ensures custom EPE foam fitments and corrugated die-cuts meet zero-play tolerances.",
    image: "/images/hero6.png",
    aspect: "normal",
    tags: ["Sample Approval", "CAD Design", "Tolerances"],
    color: "#C83D6D",
    icon: "hammer",
  },
];
