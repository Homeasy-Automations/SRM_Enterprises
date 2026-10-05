"use client";

import Link from "next/link";
import { ArrowRight, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { caseStudies } from "@/data/resources";

/** Section 12: Case Studies — Packaging in Practice: Built Around Real Packaging Requirements. */
export function CaseStudiesSection(): JSX.Element {
  return (
    <section className="band-cream section-pad relative overflow-hidden" aria-labelledby="case-studies-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="PACKAGING IN PRACTICE"
            title="Built Around Real Packaging Requirements"
            description="Different products require different levels of protection, handling and packaging performance. Explore how SRM Enterprises approaches packaging requirements based on product characteristics, application and supply needs."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/resources#case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <span>View All Studies</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-8 sm:mt-10 grid gap-8 lg:grid-cols-3" stagger={0.1}>
          {caseStudies.map((study) => (
            <StaggerItem key={study.id} variant="kinetic-pop" className="h-full">
              <article
                className="card-home-vivid group flex h-full flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ ["--accent" as string]: study.color }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs"
                      style={{ background: study.color }}
                    >
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-navy leading-snug transition-colors duration-200 group-hover:text-accent">
                    {study.title}
                  </h3>

                  {/* Structured Step Flow */}
                  <div className="flex flex-col gap-3 pt-2 text-xs">
                    <div className="rounded-xl bg-slate-50 p-3 border border-navy/5">
                      <span className="font-bold text-navy flex items-center gap-1.5 mb-1">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        Packaging Challenge:
                      </span>
                      <p className="text-navy-soft leading-relaxed">{study.challenge}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3 border border-navy/5">
                      <span className="font-bold text-navy flex items-center gap-1.5 mb-1">
                        <Sparkles className="h-3.5 w-3.5" style={{ color: study.color }} />
                        Engineered Solution:
                      </span>
                      <p className="text-navy-soft leading-relaxed">{study.solution}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-500/20">
                      <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                        Illustrative Packaging Application:
                      </span>
                      <p className="text-emerald-900 leading-relaxed font-medium">{study.result}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-navy/5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                    style={{ color: study.color }}
                  >
                    <span className="underline-grow">Request Similar Solution</span>
                    <ArrowRight className="h-3.5 w-3.5 icon-arrow-spring" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
