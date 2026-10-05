"use client";

import { Building2, Quote, Star, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

const TRUSTED_SECTORS = [
  { name: "Automotive Tier-1 OEMs", desc: "Transmission, chassis & powertrain parts", icon: "🚗" },
  { name: "Precision CNC Engineering", desc: "Gears, shafts, bearings & tooling", icon: "⚙️" },
  { name: "Industrial Equipment & Pumps", desc: "Cast iron housings & motors", icon: "🏭" },
  { name: "Electronics & PCB Exporters", desc: "Surface-mount boards & sensors", icon: "⚡" },
  { name: "National 3PL Logistics", desc: "Multi-node warehouse hubs", icon: "📦" },
  { name: "FMCG & Consumer Goods", desc: "Retail packaging & palletizing", icon: "🛒" },
];

const TESTIMONIALS = [
  {
    quote:
      "SRM helped us standardize our packaging across multiple component sizes and significantly simplify procurement. Instead of juggling box makers and foam vendors, we now have a single technical partner for our entire assembly line.",
    author: "Senior Procurement Manager",
    org: "Automotive OEM Tier-1 Supplier",
    location: "Gurugram / Manesar Corridor",
    industry: "Automotive",
    rating: 5,
    highlight: "Standardized Multi-Component Sizing",
  },
  {
    quote:
      "Consistently accurate 5-ply bursting factor and zero moisture sogginess during inter-state monsoon deliveries. Their scheduled buffer inventory keeps our daily dispatch line completely uninterrupted.",
    author: "Head of Supply Chain & Logistics",
    org: "Industrial Pump & Heavy Machinery OEM",
    location: "Faridabad Industrial Cluster",
    industry: "Heavy Engineering",
    rating: 5,
    highlight: "Zero Transit Moisture Sogginess",
  },
  {
    quote:
      "The custom die-cut EPE foam trays fit our machined gears with zero play. Transit reject rates dropped to zero from day one, and their sample turnaround time for new part drawings is under 48 hours.",
    author: "Quality Assurance Lead",
    org: "Precision CNC Gear Components Hub",
    location: "NCR Industrial Belt",
    industry: "Precision Machining",
    rating: 5,
    highlight: "Eliminated Transit Rejects to 0%",
  },
];

export function CustomerTrustSection(): JSX.Element {
  return (
    <section className="band-sky section-pad relative overflow-hidden" aria-labelledby="trust-testimonials-heading">
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="CLIENT TRUST & REPUTATION"
          title="What Procurement & Packaging Teams Say"
          description="Industrial buyers rely on SRM Enterprises for consistent specifications, predictable pricing, and dependable scheduled deliveries."
          align="center"
          className="mx-auto max-w-3xl"
        />

        {/* Sector Trust Strip */}
        <div className="mt-6 sm:mt-8 rounded-2xl border border-navy/10 bg-white/80 p-5 backdrop-blur-sm">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-navy-soft mb-4">
            Trusted by Procurement Leaders Across Critical Sectors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRUSTED_SECTORS.map((sector) => (
              <div
                key={sector.name}
                className="flex flex-col items-center text-center p-3 rounded-xl border border-navy/5 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all"
              >
                <span className="text-2xl mb-1 select-none">{sector.icon}</span>
                <span className="text-xs font-bold text-navy leading-tight">{sector.name}</span>
                <span className="text-[10px] text-navy-soft mt-0.5 leading-snug">{sector.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Industrial Testimonials Grid */}
        <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {TESTIMONIALS.map((item, idx) => (
            <StaggerItem key={idx} variant="kinetic-pop" className="h-full">
              <article className="card-home-vivid flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      Verified Industrial Client
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <span className="inline-block rounded-lg bg-navy/5 px-2.5 py-1 text-[11px] font-bold text-navy mb-3">
                    Key Outcome: {item.highlight}
                  </span>

                  <blockquote className="relative text-xs sm:text-sm leading-relaxed text-navy-soft italic">
                    <Quote className="h-4 w-4 text-accent/30 inline-block mr-1 -mt-1" />
                    "{item.quote}"
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-navy/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold text-navy">
                      {item.author}
                    </h4>
                    <p className="text-[11px] font-medium text-navy-soft">{item.org}</p>
                    <p className="text-[10px] text-navy/50">{item.location}</p>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-navy/60">
                    <Building2 className="h-4 w-4" />
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
