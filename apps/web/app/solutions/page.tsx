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

          <StaggerGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {solutions.map((sol) => {
              const Icon = ICON_MAP[sol.icon] ?? Shield;
              return (
                <StaggerItem key={sol.id} variant="kinetic-pop" className="h-full">
                  <article
                    className="card-home-vivid group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                    style={{ ["--accent" as string]: sol.color }}
                  >
                    <div className="flex flex-col gap-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <span
                          className="grid h-13 w-13 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                          style={{ background: sol.color }}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider"
                          style={{ background: `${sol.color}15`, color: sol.color }}
                        >
                          Problem Solver
                        </span>
                      </div>

                      <div>
                        <h2 className="font-display text-xl font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                          {sol.name}
                        </h2>
                        <p className="mt-1 text-xs font-semibold" style={{ color: sol.color }}>
                          {sol.tagline}
                        </p>
                      </div>

                      {/* PROBLEM → APPROACH → RESULT STORYTELLING BOX */}
                      <div className="flex flex-col gap-3 rounded-2xl bg-slate-50/90 p-4 border border-navy/10">
                        {/* The Problem */}
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 flex items-center gap-1 mb-1">
                            <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0" />
                            THE PROBLEM
                          </span>
                          <p className="text-xs leading-relaxed text-navy font-medium">
                            {sol.problem}
                          </p>
                        </div>

                        {/* Transition indicator */}
                        <div className="flex items-center justify-center text-navy/30 -my-1">
                          <ArrowDown className="h-3.5 w-3.5" />
                        </div>

                        {/* Our Approach */}
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-deep block mb-1">
                            OUR APPROACH
                          </span>
                          <p className="text-xs leading-relaxed text-navy-soft">
                            {sol.approach}
                          </p>
                        </div>

                        {/* Transition indicator */}
                        <div className="flex items-center justify-center text-navy/30 -my-1">
                          <ArrowDown className="h-3.5 w-3.5" />
                        </div>

                        {/* The Result */}
                        <div className="rounded-xl bg-emerald-50 border border-emerald-500/25 p-2.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 flex items-center gap-1 mb-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            RESULT
                          </span>
                          <p className="text-xs leading-relaxed text-emerald-950 font-semibold">
                            {sol.result}
                          </p>
                        </div>
                      </div>

                      {/* Materials Used */}
                      <div className="pt-2">
                        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft/80 block mb-1.5">
                          Core Materials:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sol.materialsUsed.map((mat) => (
                            <span
                              key={mat}
                              className="rounded-full border border-navy/10 bg-white px-2.5 py-0.5 text-[0.7rem] font-medium text-navy"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 pt-4 border-t border-navy/5">
                      <Link
                        href={`/contact?material=${encodeURIComponent(sol.name)}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold text-white shadow-xs transition-all duration-300 hover:shadow-md hover:brightness-105"
                        style={{ background: sol.color }}
                      >
                        <span>Request Similar Packaging</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
