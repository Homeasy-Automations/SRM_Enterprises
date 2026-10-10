"use client";

import { Package, Ruler, Layers, Hash, Compass, Image as ImageIcon, HelpCircle, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";

export function QuoteFasterGuide(): JSX.Element {
  const cards = [
    {
      icon: Package,
      title: "Product",
      question: "What are you packing?",
      details: "Electronic PCB, automotive casting, fragile glassware, pharmaceutical vials, or retail goods.",
      color: "#1E6FFF",
    },
    {
      icon: Ruler,
      title: "Dimensions",
      question: "Length × Width × Height",
      details: "Internal cavity size or outer carton dimensions in mm, cm or inches.",
      color: "#19B26B",
    },
    {
      icon: Layers,
      title: "Material",
      question: "Corrugated / Foam / Bubble / Poly",
      details: "Preferred material grade: 3/5/7 ply, EPE density, bubble GSM, or LDPE thickness.",
      color: "#FF8A2B",
    },
    {
      icon: Hash,
      title: "Quantity",
      question: "Trial / Regular / Bulk",
      details: "Target sample count, one-off production run, or monthly recurring scheduled dispatches.",
      color: "#8B5CF6",
    },
    {
      icon: Compass,
      title: "Application",
      question: "Storage / Transit / Export",
      details: "Warehouse stacking height, sea freight export moisture protection, or drop-test compliance.",
      color: "#19C3E6",
    },
    {
      icon: ImageIcon,
      title: "Reference",
      question: "Photos / drawings / existing packaging",
      details: "CAD 2D/3D models, component photos, or existing carton benchmark photos.",
      color: "#FF5C8A",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-navy/10 relative" id="quote-guide">
      <div className="container-page">
        <SectionHeading
          eyebrow="QUOTATION CHECKLIST"
          title="Help Us Understand Your Requirement"
          description="A few additional details help our engineering team recommend the right protective packaging and quote the best volume rates faster."
          align="center"
          className="mx-auto max-w-2xl mb-12"
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title} variant="fade-up" className="h-full">
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-slate-50/60 p-6 sm:p-7 transition-all duration-300 hover:border-navy/20 hover:bg-white hover:shadow-xl hover:-translate-y-1.5">
                  <div>
                    <div
                      className="inline-grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${c.color}15`, color: c.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 font-ui text-lg font-bold text-navy">{c.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-accent">{c.question}</p>
                    <p className="mt-2 text-xs leading-relaxed text-navy-soft">{c.details}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Reassuring UX Note */}
        <Reveal variant="fade-up" delay={0.2} className="mt-12">
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-r from-accent/5 via-emerald-500/5 to-accent/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-sm">
                <HelpCircle className="h-6 w-6" />
              </span>
              <div>
                <h4 className="font-ui text-base sm:text-lg font-bold text-navy">
                  Don&apos;t have all the technical details? That&apos;s totally okay.
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-navy-soft leading-relaxed max-w-2xl">
                  Just tell us what you&apos;re trying to pack and roughly how much it weighs. Our technical packaging engineers will calculate the required flute, burst strength, and foam densities for you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("inquiry-form-card");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.hash = "#inquiry-form-card";
                }
              }}
              className="btn-primary shrink-0 py-3 px-6 text-sm flex items-center gap-2"
            >
              <span>Talk to an Engineer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
