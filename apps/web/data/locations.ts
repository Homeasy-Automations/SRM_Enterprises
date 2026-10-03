export interface LocationHub {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  clusters: string[];
  keyIndustries: string[];
  dispatchSchedule: string;
  color: string;
}

export const locations: LocationHub[] = [
  {
    id: "gurugram",
    slug: "gurugram",
    name: "Gurugram",
    headline: "Industrial & commercial packaging supply hub",
    description:
      "Daily bulk delivery and just-in-time dispatch across Udyog Vihar, Sector 37, Behrampur, and surrounding commercial zones.",
    clusters: ["Udyog Vihar (Phases I - V)", "Pace City I & II", "Sector 37 Industrial Area", "Behrampur"],
    keyIndustries: ["Electronics & Assembly", "E-Commerce Fulfilment", "Commercial FMCG", "Export Garments"],
    dispatchSchedule: "Same-day / 24-hour delivery for regular recurring lines",
    color: "#1E6FFF",
  },
  {
    id: "manesar",
    slug: "manesar",
    name: "Manesar",
    headline: "Automotive, engineering & component packaging hub",
    description:
      "Dedicated packaging supply for IMT Manesar's automotive manufacturers, Tier-1 component makers, and heavy fabrication plants.",
    clusters: ["IMT Manesar (Sectors 1 - 8)", "Kasan Industrial Belt", "Naurangpur Corridor"],
    keyIndustries: ["Automotive Components", "Precision CNC Tooling", "Engineering Machinery", "Heavy Stamping"],
    dispatchSchedule: "Scheduled daily milk-run dispatches tailored to shift cycles",
    color: "#E86620",
  },
  {
    id: "bhiwadi",
    slug: "bhiwadi",
    name: "Bhiwadi",
    headline: "Industrial packaging for heavy manufacturing & chemical clusters",
    description:
      "Corrugated boxes, protective foam, and heavy-duty strapping supply across RIICO Industrial Areas, Chopanki, and Khushkhera.",
    clusters: ["RIICO Phase I - IV", "Chopanki Industrial Area", "Khushkhera", "Tapukara Corridor"],
    keyIndustries: ["Steel & Metal Fabrication", "Chemical & Polymers", "Automotive Assemblies", "Consumer Goods"],
    dispatchSchedule: "Regular scheduled truckloads and planned bulk dispatches",
    color: "#19B26B",
  },
  {
    id: "delhi-ncr",
    slug: "delhi-ncr",
    name: "Delhi NCR",
    headline: "Bulk packaging material distribution across the wider NCR region",
    description:
      "Comprehensive packaging material supply covering Noida, Greater Noida, Faridabad, Bahadurgarh, and Kundli industrial hubs.",
    clusters: ["Faridabad Industrial Area", "Noida / Greater Noida", "Bahadurgarh", "Kundli / Rai"],
    keyIndustries: ["Consumer Electronics", "Pharma & Healthcare", "Industrial Distribution", "3PL Logistics"],
    dispatchSchedule: "Organized dispatch routes with verified freight tracking",
    color: "#8438FF",
  },
];
