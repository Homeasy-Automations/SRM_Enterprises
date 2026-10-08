"use client";

import { Truck, Globe, ShieldCheck, Factory, Cpu, Car, Pill, Utensils, Box } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

export function PanIndiaServiceArea(): JSX.Element {
  const industries = [
    { name: "Automotive", icon: Car, desc: "OEM & auto-component transit boxes & foam trays" },
    { name: "Engineering", icon: Factory, desc: "Heavy machine parts, fasteners & anti-rust packing" },
    { name: "Electronics", icon: Cpu, desc: "Anti-static (ESD) foam, bubble bags & precision boxes" },
    { name: "Pharmaceuticals", icon: Pill, desc: "Cleanroom poly bags, corrugated shippers & vials wrap" },
    { name: "Food & FMCG", icon: Utensils, desc: "Moisture barrier liners, corrugated outer cartons" },
    { name: "E-Commerce & Logistics", icon: Box, desc: "High-speed packing tape, courier bags & stretch film" },
  ];

  const regions = [
    {
      name: "Northern Industrial Corridor",
      cities: "Delhi NCR • Haryana • Rajasthan • Punjab • UP",
      highlight: "Daily Scheduled Replenishment Routes",
    },
    {
      name: "Western Industrial Belt",
      cities: "Maharashtra • Gujarat • Madhya Pradesh",
      highlight: "Full Truckload (FTL) & Plant Delivery",
    },
    {
      name: "Southern Manufacturing Hubs",
      cities: "Karnataka • Tamil Nadu • Telangana • Andhra Pradesh",
      highlight: "Precision ESD & Component Freight",
    },
    {
      name: "Eastern & Port Gateways",
      cities: "West Bengal • Odisha • Export Gateway Corridors",
      highlight: "Seaworthy VCI & Port-bound Consignments",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-navy/10 relative overflow-hidden" id="pan-india-service">
      {/* Background radial highlights */}
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="PAN-INDIA REACH"
          title="Packaging Supply Wherever Your Business Operates"
          description="Supporting industrial, commercial and logistics requirements across India with reliable dispatch planning and dedicated freight handling."
          align="center"
          className="mx-auto max-w-3xl mb-12"
        />

        {/* Central Pan-India Highlight Showcase */}
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left: Stylized Interactive Visual Representation */}
          <div className="lg:col-span-6">
            <Reveal variant="depth-zoom">
              <div className="relative rounded-3xl border border-navy/10 bg-gradient-to-br from-navy via-[#102340] to-[#0A1629] p-8 sm:p-10 text-white shadow-2xl overflow-hidden">
                {/* Decorative Grid Lines */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Big Center Badge */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-widest">
                    <Globe className="h-3.5 w-3.5" />
                    Nationwide Dispatch Logistics
                  </div>

                  <h3 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    PAN INDIA <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
                      SUPPLY &amp; DISPATCH
                    </span>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    From auto-clusters in Gurugram and Pune to electronics corridors in Bengaluru and Chennai, we dispatch bulk consignments directly to manufacturing facilities and central distribution warehouses across the nation.
                  </p>

                  {/* Stylized Network Points */}
                  <div className="mt-8 grid grid-cols-2 gap-3 pt-6 border-t border-white/10">
                    {regions.map((reg) => (
                      <div key={reg.name} className="rounded-xl bg-white/5 border border-white/10 p-3">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                          <h4 className="text-xs font-bold text-white">{reg.name}</h4>
                        </div>
                        <p className="mt-1 text-[11px] text-white/70">{reg.cities}</p>
                        <p className="mt-1 text-[10px] font-semibold text-accent-highlight">{reg.highlight}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs text-white/60 pt-4 border-t border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Truck className="h-4 w-4 text-emerald-400" />
                      Full Truckload (FTL) &amp; PTL Scheduled Dispatches
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      Zero Line-Downtime Commitment
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Key Industry Sectors Served */}
          <div className="lg:col-span-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-navy-soft mb-4">
              Industries Relying On Our Supply Network:
            </h3>

            <StaggerGroup className="grid gap-3.5 sm:grid-cols-2">
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <StaggerItem key={ind.name} variant="fade-up">
                    <div className="flex items-start gap-3.5 rounded-2xl border border-navy/10 bg-white p-4 shadow-xs transition-all hover:border-accent/40 hover:shadow-md hover:-translate-y-1">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-navy">{ind.name}</h4>
                        <p className="mt-0.5 text-xs text-navy-soft leading-normal">{ind.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
