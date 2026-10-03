export interface GalleryItem {
  id: string;
  category: "products" | "process" | "infrastructure" | "completed";
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
}

export const galleryCategories = [
  { id: "all", label: "All Proof" },
  { id: "products", label: "Products" },
  { id: "process", label: "Packaging in Process" },
  { id: "infrastructure", label: "Infrastructure & Facility" },
  { id: "completed", label: "Completed Requirements" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    category: "products",
    categoryLabel: "Products",
    title: "Multi-Ply Heavy-Duty Master Cartons",
    subtitle: "5-Ply & 7-Ply corrugated boxes staged for bulk OEM dispatch",
    description: "High-compression kraft cartons engineered for heavy industrial payload transport and warehouse stacking.",
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
    tags: ["Manufacturing", "Quality Control", "Automation"],
    color: "#19B26B",
    icon: "hammer",
  },
  {
    id: "g4",
    category: "process",
    categoryLabel: "Packaging in Process",
    title: "Foam Fabrication & Heat Lamination",
    subtitle: "Multi-layer thermal bonding creating custom protective pouches and fitments",
    description: "Strong thermal bonding of EPE foam layers without toxic glues, producing lightweight shock-absorbing structures.",
    tags: ["Lamination", "Custom Fabrications", "Clean Process"],
    color: "#0FA47F",
    icon: "layers",
  },
  {
    id: "g5",
    category: "infrastructure",
    categoryLabel: "Infrastructure & Facility",
    title: "Warehouse & Raw Material Inventory",
    subtitle: "Temperature & humidity-controlled staging of kraft reels and foam rolls",
    description: "Extensive raw material buffers ensuring uninterrupted production schedules even during peak market demand.",
    tags: ["Raw Material", "Buffer Stock", "Supply Assurance"],
    color: "#8438FF",
    icon: "warehouse",
  },
  {
    id: "g6",
    category: "infrastructure",
    categoryLabel: "Infrastructure & Facility",
    title: "Dedicated Dispatch & Loading Bay",
    subtitle: "Dedicated commercial loading docks ensuring safe weather-shielded pallet handling",
    description: "Organized staging docks with verified pallet stretch wrapping and daily scheduled dispatch routes.",
    tags: ["Logistics", "Dispatch Fleet", "NCR Coverage"],
    color: "#3D5A80",
    icon: "truck",
  },
  {
    id: "g7",
    category: "completed",
    categoryLabel: "Completed Requirements",
    title: "Complete Export Consignment Packaging",
    subtitle: "Seaworthy packaging assembly for overseas engineering machinery components",
    description: "Turnkey combination of VCI moisture barrier bags, desiccants, heavy corrugated packs, and PET strapping.",
    tags: ["Export Quality", "VCI Anti-Rust", "Turnkey Solution"],
    color: "#D97706",
    icon: "globe",
  },
  {
    id: "g8",
    category: "completed",
    categoryLabel: "Completed Requirements",
    title: "E-Commerce Fast-Pack Custom Box Kits",
    subtitle: "10,000 unit batch of self-locking printed boxes delivered for quick fulfillment",
    description: "High-grade die-cut boxes with sharp single-color brand printing and quick-fold tuck closures.",
    tags: ["E-Commerce", "Custom Print", "Fast Assembly"],
    color: "#C83D6D",
    icon: "package",
  },
];
