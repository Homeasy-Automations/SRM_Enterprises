export interface CaseStudy {
  id: string;
  slug: string;
  industry: string;
  title: string;
  requirement: string;
  challenge: string;
  solution: string;
  specification: string;
  result: string;
  color: string;
}

export interface PackagingGuide {
  id: string;
  slug: string;
  title: string;
  readingTime: string;
  summary: string;
  keyTakeaways: string[];
  color: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "automotive-transmission-gears",
    slug: "automotive-transmission-gears",
    industry: "Automotive & Auto Components",
    title: "Zero-Scratch Transit Packaging for Machined Transmission Gears",
    requirement:
      "A Tier-1 automotive component manufacturer in a major industrial hub needed to pack precision-machined pinion and crown gears for daily OEM plant transit.",
    challenge:
      "Vibration during inter-facility freight caused parts to collide inside standard boxes, leading to micro-dents on gear teeth and reject rates of over 3.2%.",
    solution:
      "SRM engineered custom 10mm high-density EPE foam interlocking matrix trays housed inside heavy-duty 5-ply corrugated outer boxes with reinforced corner posts.",
    specification:
      "5-ply 250 GSM kraft corrugated master box + multi-pocket 28 kg/m³ CNC-cut EPE foam separators + VCI anti-rust liner film.",
    result:
      "Transit reject rate dropped to 0.0%, packing cycle time reduced by 22%, and the reusable foam inserts cut recurring material spend by 18%.",
    color: "#E86620",
  },
  {
    id: "industrial-pump-housings",
    slug: "industrial-pump-housings",
    industry: "Engineering & Industrial",
    title: "High-Compression Heavy-Duty Packaging for 85kg Cast Iron Pump Assemblies",
    requirement:
      "A large-scale industrial pump fabricator needed to ship heavy cast iron housings across India with multi-tier container stacking.",
    challenge:
      "Conventional packaging suffered box bulging, bottom tear-out, and humidity damage during prolonged monsoon transit in standard trucks.",
    solution:
      "SRM designed a 7-ply heavy-duty container with a heavy bottom deck, reinforced corrugated edge protectors, and high-tensile PET strapping.",
    specification:
      "7-ply 300 GSM virgin kraft box with water-repellent coating + 19mm high-tensile PET strap + 50mm heavy-duty edge board + silica desiccants.",
    result:
      "Supported 3-high warehouse stacking without box deformation, eliminated transit moisture staining, and replaced costly wooden crates.",
    color: "#1E6FFF",
  },
  {
    id: "ecommerce-multi-category-fulfilment",
    slug: "ecommerce-multi-category-fulfilment",
    industry: "E-Commerce & Logistics",
    title: "Rapid Pack-Out Optimization for a Multi-Node 3PL Fulfilment Centre",
    requirement:
      "A high-volume national 3PL logistics provider handling over 14,000 packages daily required an integrated supply of boxes, tapes, and cushioning.",
    challenge:
      "Coordinating six different suppliers caused tape shortages, box dimension mismatches, and bottleneck delays during peak sale dispatches.",
    solution:
      "SRM established a single-source supply agreement with weekly scheduled replenishment of 12 standard die-cut box sizes, pre-printed BOPP tapes, and air bubble rolls.",
    specification:
      "Die-cut 3-ply tuck-in self-locking boxes (12 sizes) + 48mm 45-micron high-tack BOPP tape + 10mm double-layer bubble wrap rolls.",
    result:
      "Consolidated invoicing into a single vendor, achieved 100% on-time stock availability, and accelerated dispatch speed by 15%.",
    color: "#19B26B",
  },
];

export const packagingGuides: PackagingGuide[] = [
  {
    id: "3-ply-vs-5-ply-boxes",
    slug: "3-ply-vs-5-ply-boxes",
    title: "3-Ply vs 5-Ply Corrugated Boxes: How to Choose the Right Wall Thickness",
    readingTime: "5 min read",
    summary:
      "A practical engineering guide comparing burst strength, stacking capacity, weight limits, and cost trade-offs between single-wall and double-wall boxes.",
    keyTakeaways: [
      "Use 3-ply (single wall) for lightweight products up to 8–10 kg with internal support",
      "Use 5-ply (double wall) for payloads between 10 kg and 35 kg requiring stackability",
      "Pay attention to paper GSM and flute type (B, C, or E) alongside ply count",
      "Consider climate humidity when determining required burst strength",
    ],
    color: "#E86620",
  },
  {
    id: "how-to-choose-epe-foam-thickness",
    slug: "how-to-choose-epe-foam-thickness",
    title: "How to Choose the Right EPE Foam Thickness & Density for Component Protection",
    readingTime: "6 min read",
    summary:
      "Learn how to calculate cushioning requirements based on product drop height, part fragility (G-factor), and weight distribution.",
    keyTakeaways: [
      "0.5mm – 2mm foam rolls are ideal for surface scratch protection and wrapping",
      "5mm – 20mm sheets provide excellent mid-level vibration and side cushioning",
      "25mm+ custom die-cut foam fitments protect heavy precision hardware from drop shocks",
      "Match foam density (20 kg/m³ to 32 kg/m³) to the static load bearing pressure",
    ],
    color: "#1E6FFF",
  },
  {
    id: "bubble-wrap-vs-epe-foam",
    slug: "bubble-wrap-vs-epe-foam",
    title: "Air Bubble Wrap vs EPE Foam: Which Protective Packaging Performs Best?",
    readingTime: "4 min read",
    summary:
      "An objective head-to-head comparison of bubble wrap and EPE foam across shock absorption, puncture resistance, dust-free performance, and cost.",
    keyTakeaways: [
      "Air bubble is flexible, transparent, and great for void fill and odd-shaped retail products",
      "EPE foam provides superior repeated impact resistance and will not pop under static loads",
      "EPE foam produces zero abrasive friction against sensitive painted and polished finishes",
      "Laminated foam + bubble pouches combine the surface softness of foam with bubble cushioning",
    ],
    color: "#0FA47F",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "automotive-packaging-trends-india",
    slug: "automotive-packaging-trends-india",
    title: "Sustainable Packaging Trends in India's Automotive Component Supply Chain",
    date: "March 2026",
    category: "Industry Insights",
    excerpt:
      "How automotive OEMs across India's industrial corridors are transitioning from single-use plastics to closed-loop recyclable EPE fitments and high-strength corrugated systems.",
    readTime: "4 min read",
  },
  {
    id: "preventing-corrosion-monsoon-transit",
    slug: "preventing-corrosion-monsoon-transit",
    title: "Preventing Rust During Monsoon Transit: A Guide to VCI Films & Desiccants",
    date: "February 2026",
    category: "Technical Guide",
    excerpt:
      "Critical humidity-control protocols for metal stampings, auto parts, and precision shafts in transit across high-humidity Indian monsoon freight corridors.",
    readTime: "5 min read",
  },
  {
    id: "packaging-cost-reduction-strategies",
    slug: "packaging-cost-reduction-strategies",
    title: "5 Actionable Ways Industrial Plants Can Reduce Annual Packaging Costs",
    date: "January 2026",
    category: "Procurement",
    excerpt:
      "From standardizing box dimensions to eliminating multi-vendor margin stacking, practical strategies for procurement managers to trim packing line expenses.",
    readTime: "6 min read",
  },
];
