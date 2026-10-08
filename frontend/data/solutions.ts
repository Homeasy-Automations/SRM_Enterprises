export interface Solution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
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
    problem: "Standard boxes leave empty void space or force manual cutting, leading to part movement, crushed boxes, and slow packing lines.",
    approach: "Engineered CAD corrugated cartons + contour-matched EPE foam fitments dimensioned exactly to your part geometry.",
    result: "Zero internal movement, eliminated void fill cost, and 30% faster packing cycle times.",
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
    problem: "Inter-state freight, road potholes, and container shocks cause box bulging, ruptured tapes, and internal load shifting.",
    approach: "High-burst 5-ply / 7-ply kraft cartons + heavy PET strapping + corner edge protectors + tight pallet stretch wrapping.",
    result: "Rigid pallet integrity, zero box collapse during multi-tier container stacking, and secure long-haul delivery.",
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
    problem: "Precision-machined automotive gears, shafts, and polished metal parts collide during transit, causing rejection-triggering micro-dents.",
    approach: "High-density CNC-cut EPE foam interlocking matrix trays separating individual components with cushioned perimeter pockets.",
    result: "Zero metal-on-metal surface contact, eliminated transit rejections, and reusable returnable trays for plant loops.",
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
    problem: "Painted sheet metal panels, architectural glass, and acrylics arrive at customer sites with scuffs, scratches, and dust abrasions.",
    approach: "Peelable low-tack surface protection films + non-abrasive closed-cell EPE foam sheets and LDPE bubble lining.",
    result: "Flawless surface finish on arrival with residue-free peel off during final assembly.",
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
    problem: "Heavy machinery, cast iron pump housings, and large industrial spares break through standard cartons or require costly wooden crating.",
    approach: "Heavy-duty 7-ply virgin kraft containers with reinforced bottom deck, wooden skid integration, and moisture barrier liners.",
    result: "Wooden crate load strength at lower weight, lower freight cost, and compliance with export handling standards.",
    applications: ["Industrial Pumps & Motors", "Castings & Forgings", "Electrical Switchgear", "Bulk Hardware"],
    materialsUsed: ["7-Ply Heavy-Duty Boxes", "Composite Strapping", "Heavy Corrugated Sheets"],
    color: "#8438FF",
    icon: "hammer",
  },
  {
    id: "export-packaging",
    slug: "export-packaging",
    name: "Export Packaging",
    tagline: "International transit compliant packaging with marine humidity preservation",
    description:
      "Engineered sea freight packaging integrating VCI anti-corrosion barrier liners, heavy desiccants, and container-optimized dimensions.",
    problem: "Sea freight exposes machinery to salty humidity, rust, condensation, and rough container handling across weeks of transit.",
    approach: "Vacuum-sealed aluminum barrier / VCI anti-rust poly liners + heavy desiccants + export-grade corrugated boxes with ISPM-15 compliant palletization.",
    result: "Clean, corrosion-free parts upon arrival at overseas ports without greasy rust-preventive oil cleaning needed.",
    applications: ["Overseas Consignments", "Automotive Assemblies", "Electronics Hardware", "Machine Spares"],
    materialsUsed: ["VCI Poly Bags", "Heavy Export Cartons", "Silica Gel Desiccants"],
    color: "#1E6FFF",
    icon: "globe",
  },
  {
    id: "anti-static-packaging",
    slug: "anti-static-packaging",
    name: "Anti-Static / ESD Packaging",
    tagline: "Static-dissipative foam and bubble shielding for sensitive electronics & PCBs",
    description:
      "Specialized pink and black conductive EPE foam fitments and static-dissipative bubble bags that prevent electrostatic discharge catastrophic failures.",
    problem: "Static charge accumulation during handling and freight causes latent electrostatic discharge damage to PCBs and sensitive micro-electronics.",
    approach: "Surface-resistive pink/black anti-static bubble pouches (10^9 to 10^11 Ω/sq) + conductive dissipative EPE foam inserts.",
    result: "Complete electrostatic dissipation preventing component gate breakdown and electrical test failures.",
    applications: ["PCB & Semiconductor Assemblies", "Server Racks", "Sensor Instruments", "Automotive ECUs"],
    materialsUsed: ["Pink ESD Bubble Pouches", "Conductive EPE Foam", "Anti-Static Film"],
    color: "#E86620",
    icon: "cpu",
  },
  {
    id: "moisture-protection",
    slug: "moisture-protection",
    name: "Moisture & Barrier Packaging",
    tagline: "Water-repellent barriers, desiccant liners & sealed containment for humid transit",
    description:
      "Water-resistant coated corrugated cartons, sealed LDPE barrier bags, and humidity control packs that prevent box weakening and corrosion during monsoons.",
    problem: "Monsoon dispatches and high-humidity warehouse storage cause corrugated box sogginess, paper delamination, and water ingress.",
    approach: "Water-repellent barrier coated corrugated cartons + heavy LDPE inner poly bag liners + industrial desiccant bags.",
    result: "Dry, rigid packaging holding full compression strength even through peak monsoon logistics.",
    applications: ["Monsoon Logistics", "Chemical & Polymer Storage", "Textile Bundles", "Precision Tooling"],
    materialsUsed: ["Coated Corrugated Boxes", "LDPE Liners", "Industrial Desiccants"],
    color: "#19B26B",
    icon: "droplet",
  },
];
