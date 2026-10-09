"use client";

import { ArrowRight, Ruler, Wrench, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

export function ProductCustomizationFlow(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();

  const steps = [
    {
      step: "01",
      title: "Specify Part & Fragility",
      desc: "Share your product dimensions, CAD drawing, or photo. We assess shock vulnerability, handling loads, and stack requirements.",
      icon: Ruler,
      color: "#1E6FFF",
    },
    {
      step: "02",
      title: "Material & Sample Match",
      desc: "We engineer the optimal ply count (3/5/7-ply) and custom EPE foam fitment. A physical trial sample is dispatched to your facility for fit approval.",
      icon: Wrench,
      color: "#19B26B",
    },
    {
      step: "03",
      title: "Fast Bulk Batch Dispatch",
      desc: "Full production commences strictly to approved tolerances with scheduled, recurring truck deliveries across major industrial hubs Pan-India.",
      icon: Truck,
      color: "#E86620",
    },
  ];

  return (
    <section className="band-sky section-pad relative" aria-labelledby="customization-how-it-works">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="CUSTOMIZATION PROCESS"
            title="How Customization Works: From Drawing to Dispatch"
            description="Every product we supply can be tailored to your exact dimensions, ply strength, thickness, and packing format. Here is our 3-step rapid workflow."
            className="max-w-3xl"
          />

          <Link
            href="/custom-packaging"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-deep hover:underline self-start lg:self-auto shrink-0"
          >
            <span>Read Complete Engineering Process</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-300 group-hover:scale-110"
                      style={{ background: item.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-accent text-3xl sm:text-4xl font-normal text-navy/25 tracking-wider">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-navy group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-navy-soft">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-navy/5 flex items-center justify-between text-xs text-navy-soft">
                  <span className="font-semibold text-navy">Step {item.step} of 03</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-10 rounded-2xl border border-navy/10 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="text-xs sm:text-sm font-semibold text-navy">
              Need a custom prototype box or foam sample for drop testing?
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              analytics.ctaClick("Products Custom Sample Request", "customization-flow");
              openQuoteModal({ initialMessage: "I would like to request a custom packaging prototype sample." });
            }}
            className="rounded-full bg-navy px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy/90 hover:scale-[1.02] transition-all shrink-0"
          >
            Request Custom Prototype
          </button>
        </div>
      </div>
    </section>
  );
}
