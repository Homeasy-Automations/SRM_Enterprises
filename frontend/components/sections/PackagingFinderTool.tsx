"use client";

import { useState } from "react";
import {
  Car,
  Cpu,
  Wrench,
  Sparkles,
  ShoppingBag,
  Package,
  Shield,
  Layers,
  Droplet,
  ShieldAlert,
  Zap,
  Boxes,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Box,
} from "lucide-react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface PackingItem {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultProtections: string[];
}

const PACKING_ITEMS: PackingItem[] = [
  {
    id: "automotive",
    label: "Automotive Parts",
    subtitle: "Gears, shafts, brake parts & engine assemblies",
    icon: Car,
    defaultProtections: ["impact", "corrosion"],
  },
  {
    id: "electronics",
    label: "Electronics & PCB",
    subtitle: "Circuit boards, sensors, displays & drives",
    icon: Cpu,
    defaultProtections: ["esd", "scratch"],
  },
  {
    id: "machinery",
    label: "Heavy Machinery",
    subtitle: "Pumps, castings, motor housings & tools",
    icon: Wrench,
    defaultProtections: ["heavy-load", "moisture"],
  },
  {
    id: "glass",
    label: "Glass & Fragile",
    subtitle: "Bottles, laboratory glass, panels & optics",
    icon: Sparkles,
    defaultProtections: ["impact", "scratch"],
  },
  {
    id: "fmcg",
    label: "FMCG & Consumer",
    subtitle: "Retail bottles, food cartons & cosmetics",
    icon: ShoppingBag,
    defaultProtections: ["impact", "moisture"],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    subtitle: "Multi-item fulfillment, mailers & retail boxes",
    icon: Package,
    defaultProtections: ["impact", "heavy-load"],
  },
];

interface ProtectionOption {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROTECTION_OPTIONS: ProtectionOption[] = [
  { id: "impact", label: "Impact & Shock", desc: "Drop & vibration buffer", icon: Shield },
  { id: "scratch", label: "Scratch & Scuff", desc: "Surface finish protection", icon: Layers },
  { id: "moisture", label: "Moisture & Rain", desc: "Monsoon humidity barrier", icon: Droplet },
  { id: "corrosion", label: "Corrosion / Rust", desc: "VCI chemical protection", icon: ShieldAlert },
  { id: "esd", label: "Anti-Static / ESD", desc: "Static dissipative safety", icon: Zap },
  { id: "heavy-load", label: "Heavy Stacking", desc: "High crush resistance", icon: Boxes },
];

interface Recommendation {
  box: string;
  cushion: string;
  wrapOrSecuring: string;
  rationale: string;
  leadTime: string;
}

function getRecommendation(itemId: string, protections: string[]): Recommendation {
  const has = (p: string) => protections.includes(p);

  if (itemId === "automotive") {
    return {
      box: has("heavy-load") ? "7-Ply Heavy Duty Master Carton" : "5-Ply High-GSM Corrugated Box",
      cushion: "CNC Die-Cut EPE Foam Multi-Pocket Interlocking Trays",
      wrapOrSecuring: has("corrosion") ? "VCI Anti-Rust Liner Poly Bag" : "Heavy Duty Stretch Film + PET Strapping",
      rationale: "Prevents metal-on-metal collision micro-dents while VCI liner neutralizes atmospheric oxidation.",
      leadTime: "Sample fitment in 24–48 hrs",
    };
  }

  if (itemId === "electronics") {
    return {
      box: "3-Ply Die-Cut Tuck-In Locking Box (Custom Print)",
      cushion: has("esd") ? "Pink Conductive ESD-Safe EPE Foam Fitments" : "High-Density Precision Foam Trays",
      wrapOrSecuring: has("esd") ? "Anti-Static Bubble Wrap Pouches (10^9 to 10^11 Ω/sq)" : "Double-Layer Air Bubble Bags",
      rationale: "Shields sensitive micro-circuitry from static charge buildup and mechanical drop vibration.",
      leadTime: "Sample fitment in 24–48 hrs",
    };
  }

  if (itemId === "machinery") {
    return {
      box: "7-Ply Export-Grade Heavy-Duty Container",
      cushion: "High-Density (40 kg/m³) EPE Corner Pads & Saddle Blocks",
      wrapOrSecuring: "High-Tensile PET Strapping + Corrugated Edge Boards",
      rationale: "Provides maximum container top-compression strength for 3-high stacking without bottom deck tear.",
      leadTime: "Sample container in 24–48 hrs",
    };
  }

  if (itemId === "glass") {
    return {
      box: "5-Ply Corrugated Box with Internal Honeycomb Dividers",
      cushion: "EPE Foam End-Cap Sleeves & Custom Contour Die-Cuts",
      wrapOrSecuring: "10mm Double-Layer Air Bubble Cushion Wrap",
      rationale: "Isolates individual fragile units with zero perimeter contact and generous deceleration room.",
      leadTime: "Sample kit in 24–48 hrs",
    };
  }

  if (itemId === "fmcg") {
    return {
      box: "3-Ply / 5-Ply Regular Slotted Container (RSC) with Branded Print",
      cushion: "Corrugated Partitions / EPE Foam Separators",
      wrapOrSecuring: "High-Yield Pallet Stretch Film (23 micron) + 48mm BOPP Tape",
      rationale: "Optimizes pallet space, protects retail labels from scuffs, and seals against dust during transit.",
      leadTime: "Fast batch production",
    };
  }

  // E-commerce default
  return {
    box: "Die-Cut Self-Locking Corrugated Mailer Boxes (Kraft or White)",
    cushion: "Inflatable Air Bubble Pouches / Biodegradable Void Fill",
    wrapOrSecuring: "Custom Printed High-Tack BOPP Sealing Tape",
    rationale: "Minimizes pack-line assembly seconds while guaranteeing tamper-evident closure for end-customer delivery.",
    leadTime: "Standard sizes in stock; custom in 48 hrs",
  };
}

export function PackagingFinderTool(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
  const [selectedItem, setSelectedItem] = useState<string>("automotive");
  const [selectedProtections, setSelectedProtections] = useState<string[]>(["impact", "corrosion"]);

  const toggleProtection = (id: string) => {
    setSelectedProtections((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    );
  };

  const activeItem = PACKING_ITEMS.find((item) => item.id === selectedItem) ?? PACKING_ITEMS[0]!;
  const recommendation = getRecommendation(selectedItem, selectedProtections);

  const handleSelectProductType = (item: PackingItem) => {
    setSelectedItem(item.id);
    setSelectedProtections(item.defaultProtections);
    analytics.ctaClick(`Configurator ${item.label}`, "packaging-finder");
  };

  const handleRequestQuote = () => {
    analytics.ctaClick("Request Configured Packaging", "packaging-finder");
    const summary = `Product: ${activeItem.label} | Protection: ${selectedProtections.join(
      ", "
    )} | Recommended: ${recommendation.box} + ${recommendation.cushion} + ${recommendation.wrapOrSecuring}`;
    openQuoteModal({
      initialMessage: `Inquiry from Packaging Configurator:\n${summary}`,
    });
  };

  return (
    <section id="packaging-finder" className="band-cream section-pad relative overflow-hidden" aria-labelledby="finder-heading">
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="SMART PACKAGING CONFIGURATOR"
          title="Choose Your Packaging: Tailored to What You Pack"
          description="Select what you are shipping and the protective performance you need. We'll automatically match the right corrugated grade, foam cushioning, and securing accessories."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-8 sm:mt-10 rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-soft">
          {/* STEP 1: What are you packing? */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-accent text-white grid place-items-center text-[11px] font-bold">1</span>
                What are you packing?
              </span>
              <span className="text-xs text-navy-soft font-medium">Select your component profile</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PACKING_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedItem === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSelectProductType(item)}
                    className={cn(
                      "flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer group",
                      isSelected
                        ? "border-accent bg-accent-soft/40 shadow-sm ring-2 ring-accent/20 scale-[1.02]"
                        : "border-navy/10 bg-slate-50/60 hover:bg-slate-50 hover:border-navy/20"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl transition-all duration-300",
                        isSelected ? "bg-accent text-white shadow-xs" : "bg-white text-navy group-hover:scale-110 shadow-2xs"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="mt-2.5 font-display text-xs font-bold text-navy line-clamp-1">
                      {item.label}
                    </span>
                    <span className="mt-0.5 text-[10px] text-navy-soft line-clamp-1">
                      {item.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: What protection do you need? */}
          <div className="mt-8 pt-8 border-t border-navy/10">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-accent text-white grid place-items-center text-[11px] font-bold">2</span>
                What protection do you need?
              </span>
              <span className="text-xs text-navy-soft font-medium">Select one or more requirements</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PROTECTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedProtections.includes(opt.id);
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => toggleProtection(opt.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/70 text-navy shadow-2xs ring-1 ring-emerald-500/30"
                        : "border-navy/10 bg-slate-50/60 text-navy-soft hover:bg-slate-50 hover:border-navy/20 hover:text-navy"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors",
                        isSelected ? "bg-emerald-600 text-white" : "bg-white text-navy/60"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-navy leading-tight truncate">{opt.label}</p>
                      <p className="text-[10px] text-navy-soft leading-tight truncate">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Recommended Configuration Box */}
          <div className="mt-8 pt-8 border-t border-navy/10">
            <div className="rounded-2xl border border-navy/15 bg-gradient-to-br from-slate-50 via-white to-accent-soft/20 p-5 sm:p-7">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Recommended Packaging Specification
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-navy">
                    Engineered Kit for {activeItem.label}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-navy-soft max-w-2xl leading-relaxed">
                    {recommendation.rationale}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem("automotive");
                      setSelectedProtections(["impact", "corrosion"]);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-xs font-bold text-navy hover:bg-slate-50 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-navy/90 hover:scale-[1.02] transition-all"
                  >
                    <span>Request Recommended Packaging</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 3 Material Pillars */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3 pt-6 border-t border-navy/10">
                <div className="rounded-xl bg-white p-4 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1 flex items-center gap-1">
                    <Box className="h-3.5 w-3.5 text-accent" />
                    Outer Container
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {recommendation.box}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1 flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-emerald-600" />
                    Internal Cushioning
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {recommendation.cushion}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8438FF] block mb-1 flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-[#8438FF]" />
                    Securing &amp; Preservation
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-navy leading-snug">
                    {recommendation.wrapOrSecuring}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-navy-soft">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  {recommendation.leadTime}
                </span>
                <span className="font-medium text-navy/70">
                  Bulk dispatch logistics across major industrial clusters Pan-India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
