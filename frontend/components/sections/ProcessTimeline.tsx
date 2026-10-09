"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Hammer,
  Layers,
  PackageCheck,
  PackageSearch,
  PencilRuler,
  Sparkles,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { CUSTOM_PROCESS_STEPS } from "@srm/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

const STEP_ICONS = [PackageSearch, Layers, PencilRuler, Hammer, PackageCheck, Truck] as const;

interface ProcessTimelineProps {
  compact?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
}

/**
 * Enhanced, interactive 6-step workflow representation from requirement to dispatch.
 * Fully responsive 3x2 grid with connected flow, interactive step selection,
 * expandable activity details, and rich hover states.
 */
export function ProcessTimeline({
  compact = false,
  eyebrow = "HOW WE WORK",
  title = "From Requirement to Reliable Supply",
  description = "We follow a straightforward process to understand your requirement and deliver packaging material suited to your application.",
}: ProcessTimelineProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const { openQuoteModal } = useQuoteModal();
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setActiveStepId(id);
    setExpandedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="process" className="band-white section-pad relative overflow-hidden" aria-labelledby="process-heading">
      {/* Subtle background ambient circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent-soft/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-secondary/5 blur-3xl"
      />

      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto max-w-3xl"
        />

        {/* 1. Quick Navigation Stepper Strip (Desktop / Tablet) */}
        <div className="mt-6 sm:mt-8 hidden overflow-x-auto pb-3 pt-1 md:block">
          <div className="mx-auto flex w-full max-w-5xl min-w-max items-center justify-between gap-1 rounded-2xl border border-navy/10 bg-slate-50/90 p-2 sm:p-2.5 backdrop-blur-md shadow-xs">
            {CUSTOM_PROCESS_STEPS.map((step, idx) => {
              const isCurrent = activeStepId === step.id;
              const Icon = STEP_ICONS[idx] ?? PackageSearch;

              return (
                <div key={`nav-${step.id}`} className="flex items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStepId(step.id);
                      const cardElement = document.getElementById(`step-card-${step.id}`);
                      if (cardElement) {
                        cardElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 py-1.5 lg:px-3 lg:py-2 text-[0.72rem] lg:text-xs font-semibold transition-all duration-300",
                      isCurrent
                        ? "bg-white text-navy shadow-sm ring-1 ring-navy/10 scale-102"
                        : "text-navy-soft hover:bg-white/70 hover:text-navy",
                    )}
                  >
                    <span
                      className="grid h-5 w-5 lg:h-6 lg:w-6 place-items-center rounded-lg text-white shrink-0"
                      style={{ background: step.color }}
                    >
                      <Icon className="h-3 w-3 lg:h-3.5 lg:w-3.5" aria-hidden="true" />
                    </span>
                    <span className="whitespace-nowrap">
                      {idx + 1}. {step.title}
                    </span>
                  </button>

                  {idx < CUSTOM_PROCESS_STEPS.length - 1 ? (
                    <span className="px-1 text-navy/25 text-xs select-none shrink-0" aria-hidden="true">→</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Responsive 6-Card Grid: 2 cards in a line on tablet and desktop */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:grid-cols-2">
          {CUSTOM_PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? PackageSearch;
            const isSelected = activeStepId === step.id;
            const isHovered = hoveredStepId === step.id;
            const isExpanded = Boolean(expandedSteps[step.id]);
            const nextStep = CUSTOM_PROCESS_STEPS[index + 1];

            return (
              <motion.article
                key={step.id}
                id={`step-card-${step.id}`}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reducedMotion ? 0.001 : 0.65,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                onMouseEnter={() => setHoveredStepId(step.id)}
                onMouseLeave={() => setHoveredStepId(null)}
                onClick={() => toggleExpand(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(step.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                className={cn(
                  "group card-interactive relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border bg-white cursor-pointer select-none",
                  "p-5 sm:p-6 lg:py-5 lg:px-6",
                  "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                  isSelected
                    ? "ring-2 ring-accent/20 shadow-md"
                    : "shadow-soft",
                )}
                style={{
                  borderTopColor: step.color,
                  borderTopWidth: 4,
                  borderColor: isSelected || isHovered ? `${step.color}60` : undefined,
                  backgroundColor: isHovered ? `${step.color}08` : "#ffffff",
                  boxShadow: isHovered
                    ? `0 14px 28px -8px ${step.color}2e, 0 4px 12px -3px ${step.color}15`
                    : undefined,
                }}
              >
                {/* Dynamic Ambient Color Glow on Hover */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-opacity duration-500 ease-out",
                    isHovered ? "opacity-25" : "opacity-0",
                  )}
                  style={{ background: step.color }}
                />

                {/* Large Background Step Number Watermark */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute right-3.5 top-1.5 select-none font-display text-5xl sm:text-6xl font-black transition-all duration-300 ease-out",
                    isHovered ? "scale-105 opacity-20" : "opacity-[0.06]",
                  )}
                  style={{ color: step.color }}
                >
                  0{index + 1}
                </span>

                <div className="flex flex-col flex-1">
                  {/* Step Header: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                      style={{ background: step.color }}
                    >
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" aria-hidden="true" />
                    </span>

                    <span
                      className="badge-interactive inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider shadow-2xs transition-all duration-300"
                      style={{
                        background: isHovered ? `${step.color}25` : `${step.color}15`,
                        color: step.color,
                      }}
                    >
                      Step 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Summary with coordinated min-heights for identical vertical alignment */}
                  <h3
                    className="mt-3 sm:mt-3.5 font-display text-lg sm:text-xl font-bold text-navy transition-colors duration-300 min-h-[1.75rem] sm:min-h-[2rem] flex items-center"
                    style={{ color: isHovered ? step.color : undefined }}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-1 sm:mt-1.5 text-xs sm:text-[0.875rem] leading-relaxed text-navy-soft min-h-[2.6rem] sm:min-h-[2.85rem] flex items-start">
                    {step.summary}
                  </p>

                  {/* Expandable Key Activities Section */}
                  <div className="mt-auto pt-3.5 border-t border-navy/10">
                    <div
                      className="flex w-full items-center justify-between py-0.5 text-xs font-bold uppercase tracking-wider text-navy transition-colors duration-300"
                      style={{ color: isHovered ? step.color : undefined }}
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2
                          className="h-3.5 w-3.5"
                          style={{ color: step.color }}
                          aria-hidden="true"
                        />
                        Process Scope
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-300",
                          isExpanded && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: reducedMotion ? 0.001 : 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 rounded-xl bg-slate-50/90 p-3 text-xs leading-relaxed text-navy border border-navy/5 cursor-text select-text"
                      >
                        {step.detail}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Card Footer: Next Step Link or Complete badge */}
                <div className="mt-3.5 sm:mt-4 flex items-center justify-between pt-2.5 border-t border-navy/5 text-xs text-navy-soft">
                  {nextStep ? (
                    <span className="flex items-center gap-1 font-medium">
                      Next: <strong className="text-navy font-semibold">{nextStep.title}</strong>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: isHovered ? step.color : undefined }}
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Material Delivered
                    </span>
                  )}

                  <span
                    className={cn(
                      "rounded-full transition-all duration-300",
                      isHovered ? "h-2.5 w-2.5 shadow-xs" : "h-2 w-2",
                    )}
                    style={{ background: step.color }}
                    aria-hidden="true"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 3. Reassurance & CTA Callout Banner */}
        {!compact ? (
          <div className="mx-auto mt-8 max-w-5xl sm:mt-10 rounded-3xl border border-navy/10 bg-gradient-to-br from-white via-accent-soft/30 to-[#FFF9F0]/60 p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-deep">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  No Guesswork • Complete Clarity
                </span>
                <h4 className="mt-1.5 font-display text-lg font-bold text-navy sm:text-xl">
                  Ready to discuss your packaging requirements?
                </h4>
                <p className="mt-1 text-sm text-navy-soft">
                  Share your sizes, material preferences, and monthly quantities. We provide tailored material options, samples, and a clear commercial proposal.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  analytics.ctaClick("Request Custom Quote", "process-timeline");
                  openQuoteModal();
                }}
                className="btn-primary shrink-0 min-h-[46px] px-6 text-sm"
              >
                Request Custom Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
