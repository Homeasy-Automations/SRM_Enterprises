import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Shield,
  Box,
  Truck,
  Layers,
  Hammer,
  Globe,
  Cpu,
  Droplet,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { PackagingFinderTool } from "@/components/sections/PackagingFinderTool";
import { buildMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = buildMetadata({
  title: "Industrial Packaging Solutions & Applications | SRM Enterprises",
  description:
    "Tailored industrial packaging solutions: custom dimensions, transit packaging, component protection, surface guarding, heavy-duty boxes, export packaging, anti-static and corrosion protection.",
  path: "/solutions",
});

const breadcrumbs = [{ name: "Solutions", path: "/solutions" }];

const ICON_MAP: Record<string, typeof Shield> = {
  box: Box,
  truck: Truck,
  shield: Shield,
  layers: Layers,
  hammer: Hammer,
  globe: Globe,
  cpu: Cpu,
  droplet: Droplet,
  package: Sparkles,
};

export default function SolutionsPage(): JSX.Element {
  return (
    <>
      <PageHero
        eyebrow="PACKAGING SOLUTIONS"
        title="Packaging Designed Around What You Actually Need to Protect"
        description="Products answer what we supply. Solutions answer what problem we solve — from preventing transit vibration micro-dents and surface scratches to heavy-duty export freight and moisture-barrier preservation."
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
        backgroundImage="/images/solutions_hero.png"
      >
        <HeroActions
          primaryLabel="Discuss Your Requirement"
          primaryHref="/contact"
          secondaryLabel="View 6-Step Process"
          secondaryHref="/custom-packaging"
          location="solutions-hero"
        />
      </PageHero>

      {/* Interactive Tool on Solutions Page */}
      <PackagingFinderTool />

      <section className="band-white pattern-dots section-pad" aria-labelledby="all-solutions-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="PROBLEM → APPROACH → RESULT"
            title="Real Packaging Solutions for Common Factory Challenges"
            description="Explore how we analyze component fragility, handle transit stresses, and eliminate damage through purposeful material combinations."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2" stagger={0.06}>
            {solutions.map((sol) => {
              const Icon = ICON_MAP[sol.icon] ?? Shield;
              return (
                <StaggerItem key={sol.id} variant="kinetic-pop" className="h-full">
                  <article
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-navy/10 bg-white p-5 sm:p-5.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      borderTopColor: sol.color,
                      borderTopWidth: 3.5,
                      ["--accent" as string]: sol.color,
                    }}
                  >
                    {/* Dynamic Ambient Hover Glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-20"
                      style={{ background: sol.color }}
                    />

                    <div className="flex flex-col gap-3">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <span
                          className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl text-white shadow-2xs transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                          style={{ background: sol.color }}
                        >
                          <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" aria-hidden="true" />
                        </span>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider shadow-2xs"
                          style={{ background: `${sol.color}15`, color: sol.color }}
                        >
                          Problem Solver
                        </span>
                      </div>

                      {/* Title & Tagline with exact uniform heights and no truncation */}
                      <div>
                        <h2 className="font-display text-lg sm:text-xl font-bold text-navy transition-colors duration-200 group-hover:text-accent min-h-[1.75rem] flex items-center">
                          {sol.name}
                        </h2>
                        <p
                          className="mt-0.5 text-xs font-semibold min-h-[2.25rem] flex items-center leading-relaxed"
                          style={{ color: sol.color }}
                        >
                          {sol.tagline}
                        </p>
                      </div>

                      {/* PROBLEM → APPROACH → RESULT STORYTELLING BOX (Uniform heights with 100% full text visibility) */}
                      <div className="flex flex-col gap-1.5 rounded-2xl bg-slate-50/90 p-3 border border-navy/10">
                        {/* The Problem */}
                        <div className="min-h-[3.75rem] flex flex-col justify-start">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 flex items-center gap-1 mb-0.5">
                            <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0" />
                            THE PROBLEM
                          </span>
                          <p className="text-[0.73rem] sm:text-xs leading-relaxed text-navy font-medium">
                            {sol.problem}
                          </p>
                        </div>

                        {/* Transition indicator */}
                        <div className="flex items-center justify-center text-navy/20 h-3 -my-0.5">
                          <ArrowDown className="h-3 w-3" />
                        </div>

                        {/* Our Approach */}
                        <div className="min-h-[3.75rem] flex flex-col justify-start">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-deep block mb-0.5">
                            OUR APPROACH
                          </span>
                          <p className="text-[0.73rem] sm:text-xs leading-relaxed text-navy-soft">
                            {sol.approach}
                          </p>
                        </div>

                        {/* Transition indicator */}
                        <div className="flex items-center justify-center text-navy/20 h-3 -my-0.5">
                          <ArrowDown className="h-3 w-3" />
                        </div>

                        {/* The Result */}
                        <div className="rounded-xl bg-emerald-50/90 border border-emerald-500/20 px-2.5 py-1.5 min-h-[3.25rem] flex flex-col justify-center">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 flex items-center gap-1 mb-0.5">
                            <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                            RESULT
                          </span>
                          <p className="text-[0.73rem] sm:text-xs leading-snug text-emerald-950 font-semibold">
                            {sol.result}
                          </p>
                        </div>
                      </div>

                      {/* Materials Used (No pills hidden) */}
                      <div className="min-h-[2.5rem] flex items-center gap-1.5 flex-wrap">
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft/80 shrink-0 mr-1">
                          Core Materials:
                        </span>
                        {sol.materialsUsed.map((mat) => (
                          <span
                            key={mat}
                            className="rounded-full border border-navy/8 bg-slate-50/90 px-2.5 py-0.5 text-[0.68rem] font-medium text-navy shadow-2xs transition-colors duration-200 group-hover:bg-white group-hover:border-navy/15"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA (Exact uniform placement) */}
                    <div className="mt-3.5 pt-3 border-t border-navy/5">
                      <Link
                        href={`/contact?material=${encodeURIComponent(sol.name)}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full py-2 text-xs font-bold text-white shadow-xs transition-all duration-300 hover:shadow-md hover:brightness-105"
                        style={{ background: sol.color }}
                      >
                        <span>Request Similar Packaging</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <CtaBanner
        title="Have an unlisted or complex packaging requirement?"
        description="Our packaging engineers visit plant floors and evaluate 3D drawings to configure dedicated custom protective setups."
        primaryLabel="Schedule a Technical Discussion"
        primaryHref="/contact"
        secondaryLabel="Explore All Products"
        secondaryHref="/products"
      />
    </>
  );
}
