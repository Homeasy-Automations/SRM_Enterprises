import type { Metadata } from "next";
import { CircleCheck, ShieldCheck, Factory, Warehouse, Truck, Award, CheckCircle2, FileText, Cpu } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { FactoryArt, TruckArt, WarehouseArt } from "@/components/ui/art";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import {
  ABOUT_DESCRIPTION,
  ABOUT_POINTS,
  QUALITY_PHILOSOPHY,
  SUPPLY_PHILOSOPHY,
} from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "About SRM Enterprises — Industrial Packaging Partner across Pan India",
  description:
    "SRM Enterprises provides complete industrial packaging material solutions across Pan India. Learn about our company overview, packaging production capabilities, quality assurance, verified certifications, and 6-step supply process.",
  path: "/about",
  keywords: [
    "about SRM Enterprises",
    "industrial packaging supplier India",
    "packaging solutions supplier India",
    "corrugated boxes supplier India",
    "EPE foam packaging infrastructure",
  ],
});

const breadcrumbs = [{ name: "About Us", path: "/about" }];

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
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="Explore Products"
          secondaryHref="/products"
          location="about-hero"
        />
      </PageHero>

      {/* 2 — Company Overview (#overview) */}
      <section id="overview" className="band-white pattern-weave section-pad scroll-mt-24" aria-labelledby="about-intro-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="split-left" className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Company Overview"
                title="Who SRM Enterprises Is and What We Do"
                description={ABOUT_DESCRIPTION}
              />

              <p className="text-sm leading-relaxed text-navy-soft sm:text-base">
                SRM Enterprises delivers complete packaging solutions that make every kind of packaging mentioned across our portfolio. Our approach focuses on engineering the exact packaging material, thickness, and configuration suited to your application while maintaining scheduled bulk dispatches across all major industrial clusters throughout Pan India.
              </p>

              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {ABOUT_POINTS.map((point) => (
                  <StaggerItem as="li" key={point} variant="kinetic-pop" className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                      <CircleCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{point}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>

            <Reveal variant="iris-clip">
              <MediaPanel imageKey="aboutFacility" accent="#19B26B" aspect="video">
                <div className="grid h-full grid-cols-2 items-end gap-3">
                  <FactoryArt accent="#1E6FFF" className="h-full w-full" />
                  <TruckArt accent="#19B26B" className="h-full w-full" />
                  <div className="col-span-2">
                    <WarehouseArt accent="#FF8A2B" className="h-24 w-full" />
                  </div>
                </div>
              </MediaPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Production & Infrastructure (#infrastructure) */}
      <section id="infrastructure" className="band-sky pattern-grid section-pad scroll-mt-28" aria-labelledby="infrastructure-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Production & Infrastructure"
            title="Production Capability, Storage & Planned Dispatch"
            description="Our production setup and warehousing facilities are built to support both bespoke prototype runs and high-volume recurring packaging orders."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Custom Production",
                desc: "Precision corrugated box slotting, die-cutting, and custom thermal EPE foam fitment fabrication tailored to component CAD designs.",
                icon: Factory,
                color: "#1E6FFF",
              },
              {
                title: "Integrated Material Supply",
                desc: "Direct partnerships for kraft paper, virgin LDPE polymers, stretch films, and strapping to guarantee consistent raw material quality.",
                icon: Cpu,
                color: "#19B26B",
              },
              {
                title: "Raw Material Warehouse",
                desc: "Substantial buffer stock of corrugated sheets, bubble rolls, and foam coils to insulate client production from supply chain shocks.",
                icon: Warehouse,
                color: "#FF8A2B",
              },
              {
                title: "Pan-India Dispatch Network",
                desc: "Systematic route planning and freight logistics across all major industrial corridors for JIT (Just-In-Time) plant deliveries.",
                icon: Truck,
                color: "#8438FF",
              },
            ].map((infra) => {
              const Icon = infra.icon;
              return (
                <StaggerItem key={infra.title} variant="flip-up" className="h-full">
                  <div
                    className="card-heritage-pedestal group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                    style={{ ["--accent" as string]: infra.color }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${infra.color}15`, color: infra.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {infra.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-soft">{infra.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — Quality Assurance (#quality) */}
      <section id="quality" className="band-white pattern-weave section-pad scroll-mt-24" aria-labelledby="quality-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quality Assurance"
            title="Consistent Specifications. Reliable Packaging Supply."
            description="For industrial packaging, consistency matters. Variations in material, dimensions, thickness, or construction can affect handling, storage, and product protection."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-navy">
                Specification & Material Control
              </h3>
              {QUALITY_PHILOSOPHY.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="slide-right"
                  delay={index * 0.08}
                  className="group/philosophy relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-default"
                  style={{ ["--card-accent" as string]: item.color }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/philosophy:opacity-25"
                    style={{ background: item.color }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 scale-y-0 rounded-l-2xl transition-transform duration-300 origin-center group-hover/philosophy:scale-y-100"
                    style={{ background: item.color }}
                  />
                  <div className="relative z-10 flex items-start gap-3.5">
                    <span className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <span
                        className="relative h-3 w-3 rounded-full transition-all duration-300 group-hover/philosophy:scale-125"
                        style={{ background: item.color }}
                      />
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy group-hover/philosophy:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-navy">
                Supply Discipline & Dispatch Controls
              </h3>
              {SUPPLY_PHILOSOPHY.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="slide-left"
                  delay={index * 0.08}
                  className="group/philosophy relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-default"
                  style={{ ["--card-accent" as string]: item.color }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/philosophy:opacity-25"
                    style={{ background: item.color }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 scale-y-0 rounded-l-2xl transition-transform duration-300 origin-center group-hover/philosophy:scale-y-100"
                    style={{ background: item.color }}
                  />
                  <div className="relative z-10 flex items-start gap-3.5">
                    <span className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <span
                        className="relative h-3 w-3 rounded-full transition-all duration-300 group-hover/philosophy:scale-125"
                        style={{ background: item.color }}
                      />
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy group-hover/philosophy:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Certifications & Standards (#certifications) */}
      <section id="certifications" className="band-cream pattern-grid section-pad scroll-mt-24" aria-labelledby="certifications-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Standards & Compliance"
            title="Verified Compliance & Traceable Specifications"
            description="We prioritize verifiable material integrity over unsubstantiated marketing claims. All packaging batches are matched strictly to buyer technical data sheets."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Material Test Reports (MTR)",
                desc: "Bursting strength (BF), GSM certificates, and thickness tolerance reports provided on buyer request for each corrugated batch.",
                icon: FileText,
                color: "#1E6FFF",
              },
              {
                title: "RoHS & Anti-Static Compliance",
                desc: "ESD-safe pink/black conductive foam and antistatic bubble bags produced to surface resistivity specifications (10^9 to 10^11 ohms/sq).",
                icon: ShieldCheck,
                color: "#19B26B",
              },
              {
                title: "Verified OEM Standard Alignment",
                desc: "Packaging designed to fit standard pallet patterns (1200x1000mm & 1200x800mm) without overhang or container space wastage.",
                icon: Award,
                color: "#FF8A2B",
              },
            ].map((cert) => {
              const Icon = cert.icon;
              return (
                <Reveal key={cert.title} variant="fade-up" className="h-full">
                  <div
                    className="card-heritage-pedestal flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                    style={{ ["--accent" as string]: cert.color }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${cert.color}15`, color: cert.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy">{cert.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-soft">{cert.desc}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Verified Specification</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — Our Process (#process) */}
      <section id="process" className="band-white pattern-cad section-pad scroll-mt-28" aria-labelledby="about-process-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Process"
            title="Stage-Gate Verification: From CAD to Dock Dispatch"
            description="Unlike one-size-fits-all vendors, every custom run moves through 6 dedicated technical checkpoints so production batches match the approved sample every time."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Engineering Assessment",
                gate: "Gate 1: Specification Sign-off",
                desc: "We analyze part geometry, weight distribution, surface sensitivity, and transit stress profiles to select proper fluting and foam density.",
                color: "#1E6FFF",
              },
              {
                step: "02",
                title: "Raw Material Validation",
                gate: "Gate 2: GSM & Density Test",
                desc: "Kraft reels are tested for Bursting Factor (BF) and GSM, while polyethylene resin batches undergo melt flow index and density checks.",
                color: "#19B26B",
              },
              {
                step: "03",
                title: "Prototype & Physical Validation",
                gate: "Gate 3: Fitment & Drop Check",
                desc: "Physical samples are evaluated directly with the customer's actual parts, validating clearances, locking tabs, and cushioning integrity.",
                color: "#FF8A2B",
              },
              {
                step: "04",
                title: "Calibrated Batch Production",
                gate: "Gate 4: In-line Tolerance Control",
                desc: "High-speed slotting, creasing, and thermal laminating operate with continuous dimensional checks to prevent drift across large runs.",
                color: "#8438FF",
              },
              {
                step: "05",
                title: "Palletization & Weatherproofing",
                gate: "Gate 5: Transit Packaging Audit",
                desc: "Finished consignments are edge-protected, compressed, and wrapped in industrial stretch film to prevent moisture and handling damage.",
                color: "#0FA47F",
              },
              {
                step: "06",
                title: "Scheduled Pan-India Dispatch",
                gate: "Gate 6: Delivery Handover",
                desc: "Consignments dispatch on scheduled routes across industrial corridors nationwide with signed delivery checklists.",
                color: "#E86620",
              },
            ].map((stg) => (
              <StaggerItem key={stg.step} variant="flip-up" className="h-full">
                <article
                  className="card-heritage-pedestal group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                  style={{ ["--accent" as string]: stg.color }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-2xl font-black transition-transform duration-300 group-hover:scale-110"
                      style={{ color: stg.color }}
                    >
                      {stg.step}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: stg.color }}
                    >
                      {stg.gate}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                    {stg.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-navy-soft sm:text-sm">
                    {stg.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-navy/5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified Quality Gate</span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 7 — CTA */}
      <CtaBanner
        title="Ready to discuss your packaging specification?"
        description="Share your product dimensions, required protection level, and delivery schedule with our technical team."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
      />

      <JsonLd id="about-breadcrumb-jsonld" data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}
