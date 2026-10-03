export interface Solution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  materialsUsed: string[];
  color: string;
  icon: string;
}

export const solutions: Solution[] = [
  {
    id: "custom-packaging",
    slug: "custom-packaging",
    name: "Custom Packaging",
    tagline: "Engineered specifically around your product dimensions & handling conditions",
    description:
      "Custom sizes, thickness, multi-material fitments and branded prints developed from scratch to fit your exact part geometry and supply chain.",
    applications: ["Precision Components", "Irregular Geometries", "Brand Presentation", "Multi-part Assembly Kits"],
    materialsUsed: ["Corrugated Board", "EPE Foam Fitments", "Custom Poly Bags"],
    color: "#1E6FFF",
    icon: "box",
  },
  {
    id: "transit-packaging",
    slug: "transit-packaging",
    name: "Transit Packaging",
    tagline: "High-durability outer protection for long-distance road, rail & freight logistics",
    description:
      "Heavy-duty shipping boxes, edge reinforcement, pallet wrapping, and strapping systems designed to survive stacking, shock, and transit vibration.",
    applications: ["Inter-state Logistics", "Fleet Dispatch", "Warehouse Stacking", "Freight Forwarding"],
    materialsUsed: ["5-Ply / 7-Ply Boxes", "Stretch Film", "PET Strapping", "Edge Protectors"],
    color: "#E86620",
    icon: "truck",
  },
  {
    id: "component-protection",
    slug: "component-protection",
    name: "Component Protection",
    tagline: "Dedicated cushioning and separator fitments for precision engineered parts",
    description:
      "Custom CNC-routed and die-cut foam inserts, partitions, and pouches preventing metal-to-metal contact, abrasions, and mechanical deformation.",
    applications: ["Automotive Gears & Shafts", "CNC Machined Parts", "Bearing Assemblies", "Medical Hardware"],
    materialsUsed: ["EPE Foam Fitments", "Corrugated Partitions", "Foam Sleeves"],
    color: "#19B26B",
    icon: "shield",
  },
  {
    id: "surface-protection",
    slug: "surface-protection",
    name: "Surface Protection",
    tagline: "Non-abrasive films and bubble linings preventing scratches and cosmetic defects",
    description:
      "Self-adhesive protective films, anti-scratch EPE sheets, and LDPE bubble rolls that safeguard high-gloss, painted, and polished surfaces during handling.",
    applications: ["Sheet Metal Panels", "Glass & Acrylic", "Powder-coated Enclosures", "Architectural Extrusions"],
    materialsUsed: ["Surface Protection Film", "Air Bubble Rolls", "EPE Foam Sheets"],
    color: "#0FA47F",
    icon: "layers",
  },
  {
    id: "heavy-duty-packaging",
    slug: "heavy-duty-packaging",
    name: "Heavy-Duty Packaging",
    tagline: "Reinforced structural boxes and strapping for high-load industrial payloads",
    description:
      "High-GSM 7-ply corrugated bulk containers, heavy wooden/composite replacements, and composite strapping engineered for intense top-load compression.",
    applications: ["Industrial Pumps & Motors", "Castings & Forgings", "Electrical Switchgear", "Bulk Hardware"],
    materialsUsed: ["7-Ply Heavy-Duty Boxes", "Composite Strapping", "Heavy Corrugated Sheets"],
    color: "#8438FF",
    icon: "hammer",
  },
  {
    id: "export-packaging",
    slug: "export-packaging",
    name: "Export Packaging",
    tagline: "Seaworthy, multi-climate compliant packaging for international maritime shipping",
    description:
      "Moisture-barrier vacuum bags, desiccants, heavy corrugated outer packs, and tamper-evident sealing designed for prolonged ocean freight voyages.",
    applications: ["Overseas Machinery Shipments", "Sub-assembly Exports", "Global Tier-1 Supply"],
    materialsUsed: ["Aluminium Barrier Bags", "Heavy-Duty Boxes", "VCI Films", "Desiccants"],
    color: "#3D5A80",
    icon: "globe",
  },
  {
    id: "anti-static-packaging",
    slug: "anti-static-packaging",
    name: "Anti-Static (ESD) Packaging",
    tagline: "Electrostatic discharge prevention for sensitive electronics and PCBs",
    description:
      "Pink anti-static bubble pouches, ESD shielding bags, and conductive foam fitments that dissipate static charges and protect delicate micro-circuitry.",
    applications: ["PCB Assemblies", "Semiconductor Devices", "Sensor Modules", "Control Units"],
    materialsUsed: ["Pink Anti-Static Bubble", "ESD Shielding Bags", "Dissipative Foam"],
    color: "#C83D6D",
    icon: "cpu",
  },
  {
    id: "corrosion-protection",
    slug: "corrosion-protection",
    name: "Corrosion Protection (VCI)",
    tagline: "Volatile corrosion inhibitor films and papers preventing rust without oils",
    description:
      "VCI poly bags, barrier wraps, and emitter inserts that release molecular protective vapor to shield ferrous and non-ferrous metals against humidity and oxidation.",
    applications: ["Engine Blocks", "Bare Steel Stampings", "Precision Tooling", "Storage Inventories"],
    materialsUsed: ["VCI Poly Bags", "VCI Stretch Film", "VCI Kraft Paper"],
    color: "#D97706",
    icon: "droplet",
  },
  {
    id: "cushioning-impact",
    slug: "cushioning-impact",
    name: "Cushioning & Impact Protection",
    tagline: "Multi-layer shock absorption safeguarding fragile and high-value equipment",
    description:
      "High-density bubble wraps, air pillows, and resilient multi-laminate foam systems engineered to absorb repeated drop and impact shocks.",
    applications: ["Laboratory Equipment", "Display Monitors", "Ceramics & Glassware", "High-value Optics"],
    materialsUsed: ["Multi-layer Bubble", "Air Pillows", "High-density EPE"],
    color: "#FF8A2B",
    icon: "package",
  },
];
