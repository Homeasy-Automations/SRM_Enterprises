"use client";

import { FileText, Search, Calculator, PackageCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";

export function WhatHappensNext(): JSX.Element {
  const steps = [
    {
      num: "01",
      title: "Requirement Received",
      description: "We review your packaging requirement, component dimensions, and technical specifications.",
      icon: FileText,
      color: "#1E6FFF",
      eta: "Within 2-4 hours",
    },
    {
      num: "02",
      title: "Requirement Assessment",
      description: "Our engineers analyze the load, fragility, stacking, transit hazards, and optimal material grade.",
      icon: Search,
      color: "#19B26B",
      eta: "Same Business Day",
    },
    {
      num: "03",
      title: "Solution & Commercial Proposal",
      description: "We recommend the engineered packaging solution along with tiered commercial pricing.",
      icon: Calculator,
      color: "#FF8A2B",
      eta: "Detailed Quotation",
    },
    {
      num: "04",
      title: "Sample / Supply",
      description: "Where required, prototype samples can be evaluated before proceeding with full bulk supply.",
      icon: PackageCheck,
      color: "#8B5CF6",
      eta: "Prototyping & Dispatch",
    },
  ];

  const workflowPills = [
    "Inquiry",
    "Assessment",
    "Material Selection",
    "Quote",
    "Sample",
    "Supply",
  ];

  return (
    <section className="bg-slate-50/70 py-20 lg:py-24 border-t border-navy/10 relative overflow-hidden" id="what-happens-next">
      <div className="container-page">
        <SectionHeading
          eyebrow="TRANSPARENT PROCUREMENT"
          title="What Happens Next?"
          description="A clear, predictable roadmap from your initial inquiry to sample sign-off and continuous bulk factory replenishment."
          align="center"
          className="mx-auto max-w-2xl mb-12"
        />

        {/* 4 Main Steps */}
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <StaggerItem key={st.num} variant="fade-up" className="h-full">
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* Step Number Badge */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-ui font-bold tracking-wider px-2.5 py-1 rounded-lg border text-white shadow-xs"
                        style={{ backgroundColor: st.color, borderColor: st.color }}
                      >
                        STEP {st.num}
                      </span>
                      <span className="text-[11px] font-semibold text-navy-soft bg-navy/5 px-2 py-0.5 rounded-full">
                        {st.eta}
                      </span>
                    </div>

                    <div
                      className="mt-6 inline-grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${st.color}15`, color: st.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 font-ui text-lg font-bold text-navy">{st.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-navy-soft">{st.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-navy/5 flex items-center gap-1.5 text-xs font-bold text-navy">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Quality-assessed phase</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Animated Workflow Ribbon */}
        <Reveal variant="fade-up" delay={0.2} className="mt-14">
          <div className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
            <p className="font-ui text-center text-xs font-bold uppercase tracking-[0.12em] text-navy/70 mb-5">
              Full Industrial Workflow Sequence:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {workflowPills.map((pill, idx) => (
                <div key={pill} className="flex items-center gap-2 sm:gap-4">
                  <span className="rounded-xl border border-navy/15 bg-slate-50 px-4 py-2 text-xs sm:text-sm font-bold text-navy shadow-2xs">
                    {pill}
                  </span>
                  {idx < workflowPills.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
