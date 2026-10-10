import type { Metadata } from "next";
import Image from "next/image";
import {
  CircleCheck,
  ShieldCheck,
  Warehouse,
  Truck,
  Award,
  FileText,
  Cpu,
  Users,
  CheckCircle2,
  Clock,
  PackageCheck,
} from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About SRM Enterprises — Industrial Packaging Partner Across Pan India",
  description:
    "Learn about SRM Enterprises: our founding story, leadership team, manufacturing facilities, ISO & MSME certifications, genuine metrics, and customer promise.",
  path: "/about",
  keywords: [
    "about SRM Enterprises",
    "industrial packaging supplier India",
    "packaging manufacturing infrastructure",
    "corrugated boxes supplier India",
    "EPE foam packaging infrastructure",
  ],
});

const breadcrumbs = [{ name: "About Us", path: "/about" }];

const GENUINE_NUMBERS = [
  { value: 15, suffix: "+", label: "Years Experience", desc: "Operational since 2009 in industrial packaging", color: "#1E6FFF" },
  { value: 500, suffix: "+", label: "Customers & Plants", desc: "Supplied across manufacturing and logistics hubs", color: "#19B26B" },
  { value: 25, suffix: "+", label: "Packaging Types", desc: "Corrugated, EPE, Bubble, Films & Accessories", color: "#E86620" },
  { value: 40, suffix: "+", label: "Cities Covered", desc: "Scheduled bulk supply logistics Pan-India", color: "#8438FF" },
];

const PROMISES = [
  {
    title: "Exact Specification Guarantee",
    desc: "We strictly verify GSM, bursting strength (BF), and dimension tolerances on every single production batch.",
    icon: ShieldCheck,
    color: "#1E6FFF",
  },
  {
    title: "24–48 Hour Sample Prototypes",
    desc: "Evaluate physical box and foam fitments directly on your assembly line before committing to bulk production.",
    icon: Clock,
    color: "#19B26B",
  },
  {
    title: "Dedicated Buffer Inventory",
    desc: "For recurring industrial clients, we hold 2–4 weeks of safety stock to completely insulate your plant from supply shocks.",
    icon: Warehouse,
    color: "#E86620",
  },
  {
    title: "Dependable JIT Logistics",
    desc: "Scheduled truckload dispatches coordinated with your warehouse unloading schedule across India.",
    icon: Truck,
    color: "#8438FF",
  },
];

const COMPLIANCE_ITEMS = [
  {
    badge: "ISO Process",
    title: "ISO 9001:2015 Compliant Workflow",
    desc: "Standard operating procedures governing raw material inspection, flute bonding, and pre-dispatch checks.",
    icon: Award,
    color: "#1E6FFF",
  },
  {
    badge: "B2B Billing",
    title: "Verified GSTIN Registered Enterprise",
    desc: "Full GST tax compliance, transparent HSN/SAC classification, and instant e-way bill generation for interstate freight.",
    icon: FileText,
    color: "#19B26B",
  },
  {
    badge: "Govt. Recognized",
    title: "MSME / Udyam Registered",
    desc: "Recognized micro, small & medium manufacturing enterprise under the Ministry of MSME, Government of India.",
    icon: ShieldCheck,
    color: "#E86620",
  },
  {
    badge: "Safe Polymers",
    title: "RoHS & REACH Compliant Materials",
    desc: "Virgin LDPE polymers and EPE foams verified free of heavy metals, phthalates, and restricted chemical compounds.",
    icon: CheckCircle2,
    color: "#0FA47F",
  },
  {
    badge: "Electronics Grade",
    title: "ESD Static-Dissipative Safe",
    desc: "Specialized anti-static pink/black foams and bubble films manufactured to 10^9 – 10^11 Ω/sq surface resistivity.",
    icon: Cpu,
    color: "#8438FF",
  },
  {
    badge: "Quality Audit",
    title: "Material Test Reports (MTR) on Demand",
    desc: "Batch-wise bursting factor, Cobb sizing, and tensile strength lab test reports provided for buyer technical audits.",
    icon: PackageCheck,
    color: "#1E6FFF",
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="ABOUT SRM ENTERPRISES"
        title="Industrial Packaging. Built to Your Specification."
        description="One reliable partner for all your industrial packaging needs — so your procurement and packing teams can stop coordinating five separate vendors and rely on consistent material quality."
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
        backgroundImage="/images/About/about_hero.png"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="Explore Products"
          secondaryHref="/products"
          location="about-hero"
        />
      </PageHero>

      {/* 2 — Genuine Figures Strip with Counter Animation */}
      <section className="border-b border-navy/10 bg-white py-2" aria-label="Key Numbers">
        <div className="container-page">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {GENUINE_NUMBERS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/70 border border-navy/5">
                <span className="font-display text-4xl sm:text-5xl font-bold text-navy">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-ui mt-2 text-xs sm:text-sm font-bold uppercase tracking-[0.12em]" style={{ color: stat.color }}>
                  {stat.label}
                </span>
                <span className="text-xs text-navy-soft max-w-[200px]">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Our Story: Who started SRM & The Problem We Solved */}
      <section id="our-story" className="band-white pattern-weave section-pad scroll-mt-24" aria-labelledby="story-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal variant="split-left" className="flex flex-col gap-6 lg:col-span-7">
              <SectionHeading
                eyebrow="OUR STORY & BACKGROUND"
                title="Founded to End Fragmented Packaging Procurement"
                description="Before SRM Enterprises, manufacturing plants had to source corrugated boxes from one local supplier, foam cushioning from another converter, bubble wrap from a third trader, and tapes from a fourth distributor."
              />

              <div className="space-y-4 text-sm leading-relaxed text-navy-soft sm:text-base">
                <p>
                  This fragmentation led to inconsistent dimensional tolerances, mismatched thicknesses, constant finger-pointing during transit damage, and massive administrative overhead for procurement teams.
                </p>
                <p>
                  <strong className="text-navy font-semibold">In 2009, SRM Enterprises was established</strong> with a clear purpose: to serve as a single, technically rigorous packaging partner capable of engineering complete kits — master outer cartons, custom-cut EPE foam trays, protective bubble wrap, poly films, and industrial accessories — with exact specification control and predictable bulk supply across India.
                </p>
                <p>
                  Today, over 500 manufacturing plants, automotive OEMs, and logistics providers rely on our production facilities to keep their dispatch lines moving with zero transit rejects.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-navy/5">
                  <CircleCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-navy">Single-Source Contract Simplicity</span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-navy/5">
                  <CircleCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-navy">Engineered Around Your Component CAD</span>
                </div>
              </div>
            </Reveal>

            {/* Visual Facility Image Preview */}
            <Reveal variant="fade-up" className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-3xl border border-navy/10 shadow-lift">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/hero1.png"
                    alt="SRM Enterprises industrial packaging facility"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-ui inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] mb-2">
                      Modern Facility
                    </span>
                    <h4 className="font-ui text-lg font-bold">SRM Manufacturing &amp; Logistics Hub</h4>
                    <p className="mt-1 text-xs text-white/80">
                      Integrated corrugation, die-cutting, foam fabrication &amp; dispatch staging.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Leadership & Team Profile */}
      <section className="band-sky section-pad" aria-labelledby="leadership-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="LEADERSHIP & ENGINEERING"
            title="Hands-On Leadership Committed to Packaging Integrity"
            description="Our leadership team brings decades of combined experience in paper technology, polymer fabrication, and industrial logistics."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <div className="mt-10 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Founder Card */}
            <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative h-28 w-28 shrink-0 rounded-2xl bg-gradient-to-br from-navy to-accent grid place-items-center text-white shadow-md">
                <Users className="h-12 w-12 text-white/80" />
                <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div>
                <span className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-accent">Founder &amp; Managing Director</span>
                <h3 className="font-ui text-xl font-bold text-navy mt-1">Mr. R.K. Sharma</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-soft">
                  Over 15 years directing industrial packaging operations, supply chain logistics, and long-term client procurement partnerships across major automotive and manufacturing belts.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-navy font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Procurement &amp; Strategic Operations</span>
                </div>
              </div>
            </div>

            {/* Engineering Lead Card */}
            <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative h-28 w-28 shrink-0 rounded-2xl bg-gradient-to-br from-navy via-slate-800 to-emerald-600 grid place-items-center text-white shadow-md">
                <Cpu className="h-12 w-12 text-white/80" />
                <span className="absolute bottom-2 right-2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div>
                <span className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">Technical &amp; Quality Lead</span>
                <h3 className="font-ui text-xl font-bold text-navy mt-1">P. Sharma</h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-soft">
                  Specializes in CAD component fitment design, EPE foam density calculations, drop-test prototyping, and rigorous batch GSM &amp; burst factor verification.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-navy font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>CAD Prototyping &amp; Quality Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Production & Facility Photos */}
      <section className="band-white section-pad pattern-grid" aria-labelledby="facility-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="FACILITY & INFRASTRUCTURE"
            title="Production Setup, Raw Material Storage & Fleet Dispatch"
            description="Our infrastructure is designed to maintain consistent paper and foam inventory buffers, ensuring your production line never stops due to stockouts."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/About/corrugation.png"
                  alt="Corrugated box manufacturing and stacking"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-ui text-sm font-bold text-navy">Corrugation &amp; Slotting Lines</h4>
                <p className="mt-1 text-xs text-navy-soft">
                  Automatic box creasing, slotting, and multi-color flexo printing.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/About/cnc_foam.png"
                  alt="Custom EPE foam die cutting and cushioning"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-ui text-sm font-bold text-navy">CNC Foam Cutting &amp; Fabrication</h4>
                <p className="mt-1 text-xs text-navy-soft">
                  Thermal lamination, hydraulic punch presses &amp; contour routing.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/About/warehouse.png"
                  alt="Warehouse inventory and truck dispatch loading"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h4 className="font-ui text-sm font-bold text-navy">Warehouse Buffer &amp; Fleet Loading</h4>
                <p className="mt-1 text-xs text-navy-soft">
                  High-capacity palletized storage with scheduled Pan-India truck dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Our Promise: Short & Visual */}
      <section className="band-sky section-pad" aria-labelledby="promise-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="OUR SERVICE COMMITMENT"
            title="The SRM Guarantee to Procurement Teams"
            description="Clear, dependable business standards you can hold us accountable for every single month."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {PROMISES.map((promise) => {
              const Icon = promise.icon;
              return (
                <StaggerItem key={promise.title} variant="flip-up" className="h-full">
                  <div
                    className="card-heritage-pedestal flex h-full flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                    style={{ ["--accent" as string]: promise.color }}
                  >
                    <div>
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300"
                        style={{ background: `${promise.color}15`, color: promise.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-ui text-base font-bold text-navy">
                        {promise.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-navy-soft">
                        {promise.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-navy/5">
                      <span className="text-[11px] font-bold" style={{ color: promise.color }}>
                        Guaranteed Standard ✓
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 7 — Quality & Compliance Cards with Verified Logos */}
      <section id="certifications" className="band-white section-pad pattern-dots scroll-mt-24" aria-labelledby="certifications-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="QUALITY & COMPLIANCE"
            title="Procurement-Ready Standards & Compliance"
            description="We supply industrial packaging with verifiable compliance certificates to meet your internal quality audits and client vendor standards."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy/10 bg-slate-50/60 p-6 transition-all duration-300 hover:bg-white hover:shadow-soft hover:border-navy/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-ui rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-2xs"
                      style={{ background: item.color }}
                    >
                      {item.badge}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-2xs" style={{ color: item.color }}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="font-ui text-base font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-soft">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 — Customer Trust Section */}
      {/* <CustomerTrustSection /> */}

      {/* 9 — Final CTA */}
      <CtaBanner
        title="Ready to standardize your packaging supply?"
        description="Share your sizes, drawings, or current packaging pain points. We provide tailored material options, samples, and a clear commercial proposal."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Explore All Products"
        secondaryHref="/products"
      />

      <JsonLd
        id="about-breadcrumb-jsonld"
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])}
      />
    </>
  );
}
