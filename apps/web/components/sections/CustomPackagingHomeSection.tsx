"use client";

import Link from "next/link";
import { ArrowRight, Layers, Palette, Ruler, Shield, Sparkles, Truck, Box, CheckCircle2, FileCheck, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { CustomDesignArt } from "@/components/ui/art";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

const CUSTOM_POINTS = [
  {
    step: "01",
    label: "Custom Dimensions",
    tag: "Part-Matched",
    desc: "Length, width & height engineered to fit your exact part geometry and CAD drawings without wasted void space.",
    icon: Ruler,
    color: "#1E6FFF",
  },
  {
    step: "02",
    label: "Material Selection",
    tag: "Multi-Substrate",
    desc: "High-compression virgin kraft, resilient EPE foam, air bubble, poly films, or composite barrier laminates.",
    icon: Layers,
    color: "#E86620",
  },
  {
    step: "03",
    label: "Thickness & Ply Options",
    tag: "Load Calibrated",
    desc: "3-ply, 5-ply, 7-ply heavy boards and 0.5mm–50mm foam cushioning densities matched to product payload.",
    icon: Box,
    color: "#19B26B",
  },
  {
    step: "04",
    label: "Printing & Branding",
    tag: "High-Res Flexo",
    desc: "Crisp company brand logos, SKU barcoding, handling hazard marks, and multi-color shop-floor instructions.",
    icon: Palette,
    color: "#8438FF",
  },
  {
    step: "05",
    label: "Protective Fitments",
    tag: "CNC Die-Cut",
    desc: "Precision contour-cut foam inserts, interlocking partition dividers, and reinforced corrugated edge buffers.",
    icon: Shield,
    color: "#0FA47F",
  },
  {
    step: "06",
    label: "Application-Specific Build",
    tag: "Hazard Guarded",
    desc: "Anti-static pink ESD safe packaging, VCI anti-corrosion barrier papers, and export seaworthy wrapping.",
    icon: Sparkles,
    color: "#C83D6D",
  },
  {
    step: "07",
    label: "Bulk Quantity Requirements",
    tag: "Scalable Supply",
    desc: "Scalable batch production from small pilot trial runs to scheduled recurring OEM truckload deliveries.",
    icon: Truck,
    color: "#3D5A80",
  },
  {
    step: "08",
    label: "Sample & Prototype Approval",
    tag: "Zero-Risk Sign-off",
    desc: "Hands-on physical sample evaluation directly on your product before moving into commercial production.",
    icon: CheckCircle2,
    color: "#16A34A",
  },
];

/** Section 4: Custom Packaging — Packaging Designed Around Your Requirement. */
export function CustomPackagingHomeSection(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-white to-[#F8FAFC] section-pad pattern-grid" aria-labelledby="custom-packaging-heading">
      {/* Ambient background glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#19B26B]/5 blur-3xl" />

      <div className="container-page relative z-10">
        {/* Top Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="CUSTOM PACKAGING"
              title="Packaging Designed Around Your Requirement"
              description="Every industrial product demands tailored protection. We develop custom packaging around your product's exact dimensions, material sensitivities, transit stresses, and handling volumes."
              underline={true}
            />
          </div>

          <Reveal variant="fade-up" delay={0.1} className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-accent-deep hover:shadow-lg hover:scale-105"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>

            <Link
              href="/custom-packaging"
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-sm"
            >
              <span>View 6-Step Process</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* 8-Card Symmetrical Grid */}
        <div className="mt-8 sm:mt-10">
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {CUSTOM_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.label} variant="flip-up" className="h-full">
                  <div
                    className="card-heritage-pedestal group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                    style={{ ["--accent" as string]: point.color }}
                  >
                    {/* Top Row: Step Number & Feature Tag */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-mono text-sm font-black transition-transform duration-300 group-hover:scale-110"
                          style={{ color: point.color }}
                        >
                          {point.step}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                          style={{
                            background: `${point.color}15`,
                            color: point.color,
                          }}
                        >
                          {point.tag}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="mt-4 flex items-center gap-3">
                        <span
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: point.color }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h3 className="font-display text-base font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                          {point.label}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs leading-relaxed text-navy-soft">
                        {point.desc}
                      </p>
                    </div>

                    {/* Bottom Dynamic Hover Bar */}
                    <div className="mt-5 pt-3 border-t border-navy/5">
                      <div
                        className="h-1 w-8 rounded-full transition-all duration-500 group-hover:w-full"
                        style={{ background: point.color }}
                      />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>

        {/* Integrated CAD & Engineering Specification Blueprint Banner */}
        <div className="mt-8 sm:mt-10 rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-card">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Visual CAD Blueprint */}
            <div className="lg:col-span-5 relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy/[0.03] to-navy/[0.08] p-6 border border-navy/5 overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(#1E6FFF 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative z-10 w-full max-w-xs">
                <CustomDesignArt accent="#1E6FFF" className="h-40 w-full drop-shadow-sm" title="Custom packaging engineering illustration" />
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono font-semibold text-navy/70 border-t border-navy/10 pt-2">
                  <span>Tolerance: ±1mm</span>
                  <span>CAD Matched</span>
                </div>
              </div>
            </div>

            {/* Technical Highlights & Direct Action */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1 text-xs font-bold text-accent-deep w-fit mb-3">
                <Cpu className="h-3.5 w-3.5" />
                ENGINEERED TOLERANCES & PHYSICAL SAMPLING
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
                Have specific drawings, CAD files, or product dimensions?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-soft">
                Send your physical samples or dimensional parameters. Our packaging specialists verify fitment clearances, bursting factor requirements, and cushioning resistance before any bulk production begins.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Physical Prototype Trial</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Custom Flexo Printing</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Pan-India Supply & Dispatch</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    analytics.ctaClick("Request Custom Prototype Sample", "custom-packaging-home");
                    openQuoteModal({
                      initialMessage: "Inquiry for Custom Prototype Sample — please contact me regarding custom engineering and sample prototype.",
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-navy/90 hover:shadow-md hover:scale-105"
                >
                  <FileCheck className="h-4 w-4 text-accent" />
                  <span>Request Custom Prototype Sample</span>
                </button>
                <Link
                  href="/contact"
                  className="text-xs sm:text-sm font-semibold text-navy-soft hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span>Inquire About Bulk Tooling</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
