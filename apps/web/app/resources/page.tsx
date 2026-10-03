import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Accordion } from "@/components/ui/Accordion";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, packagingGuides, blogPosts } from "@/data/resources";
import { homepageFaq } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "Packaging Resources, Case Studies & Technical Guides | SRM Enterprises",
  description:
    "Explore B2B packaging case studies, technical guides (3-ply vs 5-ply, EPE thickness calculations), FAQs and industrial packaging best practices.",
  path: "/resources",
});

const breadcrumbs = [{ name: "Resources", path: "/resources" }];

export default function ResourcesPage(): JSX.Element {
  return (
    <>
      <PageHero
        eyebrow="RESOURCES &amp; INSIGHTS"
        title="Engineering Knowledge, Case Studies &amp; Technical Guides"
        description="Practical resources designed to help procurement officers, packaging engineers, and supply chain managers select the right material, eliminate transit damage, and optimize packaging budgets."
        breadcrumbs={breadcrumbs}
        accentColor="#19B26B"
      >
        <HeroActions
          primaryLabel="Request a Sample"
          primaryHref="/contact?type=sample"
          secondaryLabel="Get a Custom Quote"
          secondaryHref="/contact"
          location="resources-hero"
        />
      </PageHero>

      {/* 1. Case Studies Section */}
      <section id="case-studies" className="band-cream section-pad relative scroll-mt-24" aria-labelledby="cases-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="CASE STUDIES"
            title="Packaging in Practice: Real Industrial Challenges Solved"
            description="How SRM Enterprises engineered custom fitments, heavy-duty boxes, and rapid fulfilment packs for automotive, industrial, and logistics leaders."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-12 grid gap-8 lg:grid-cols-3" stagger={0.1}>
            {caseStudies.map((study) => (
              <StaggerItem key={study.id} variant="kinetic-pop" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{ ["--accent" as string]: study.color }}
                >
                  <div className="flex flex-col gap-4">
                    <span
                      className="w-fit text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs"
                      style={{ background: study.color }}
                    >
                      {study.industry}
                    </span>

                    <h3 className="font-display text-xl font-bold text-navy leading-snug transition-colors duration-200 group-hover:text-accent">
                      {study.title}
                    </h3>

                    <div className="flex flex-col gap-3 pt-2 text-xs">
                      <div className="rounded-xl bg-slate-50 p-3 border border-navy/5">
                        <span className="font-bold text-navy flex items-center gap-1.5 mb-1">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                          The Challenge:
                        </span>
                        <p className="text-navy-soft leading-relaxed">{study.challenge}</p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 border border-navy/5">
                        <span className="font-bold text-navy flex items-center gap-1.5 mb-1">
                          <Sparkles className="h-3.5 w-3.5" style={{ color: study.color }} />
                          The Solution:
                        </span>
                        <p className="text-navy-soft leading-relaxed">{study.solution}</p>
                      </div>

                      <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-500/20">
                        <span className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                          Documented Result:
                        </span>
                        <p className="text-emerald-900 leading-relaxed font-medium">{study.result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-navy/5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 hover:gap-2"
                      style={{ color: study.color }}
                    >
                      <span>Inquire for Similar Parts</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 2. Packaging Technical Guides */}
      <section id="guides" className="band-white section-pad relative scroll-mt-24 pattern-dots" aria-labelledby="guides-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="PACKAGING GUIDES"
            title="Technical Decision Frameworks for Engineers"
            description="Clear engineering comparisons helping you choose the right flute, board ply, and foam density."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-12 grid gap-8 md:grid-cols-3" stagger={0.08}>
            {packagingGuides.map((guide) => (
              <StaggerItem key={guide.id} variant="kinetic-pop" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ ["--accent" as string]: guide.color }}
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between text-xs text-navy-soft">
                      <span className="inline-flex items-center gap-1 font-semibold text-accent">
                        <BookOpen className="h-3.5 w-3.5" />
                        Technical Guide
                      </span>
                      <span>{guide.readingTime}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                      {guide.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-navy-soft">{guide.summary}</p>

                    <div className="pt-2 border-t border-navy/5">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft block mb-1.5">
                        Key Rules of Thumb:
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {guide.keyTakeaways.map((takeaway) => (
                          <li key={takeaway} className="text-xs text-navy-soft flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: guide.color }} />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-navy/5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 hover:gap-2"
                      style={{ color: guide.color }}
                    >
                      <span className="underline-grow">Consult on this specification</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 3. Blog Articles */}
      <section id="blog" className="band-cream section-pad relative scroll-mt-24" aria-labelledby="blog-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="PACKAGING BLOG"
            title="Industry Insights, Monsoon Protection &amp; Supply Trends"
            description="Articles and operational updates from SRM Enterprises' packaging specialists."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="card-home-vivid group flex flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-navy-soft mb-2">
                    <span className="font-semibold text-accent">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-navy-soft">{post.excerpt}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-between text-xs">
                  <span className="text-navy-soft">{post.readTime}</span>
                  <Link href="/contact" className="font-bold text-accent hover:underline">
                    Inquire →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section id="faq" className="band-white section-pad relative scroll-mt-24 pattern-dots" aria-labelledby="faq-page-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="COMMERCIAL FAQ"
            title="Frequently Asked Questions"
            description="Clear answers regarding MOQ, custom dimensions, sample turnarounds, and delivery terms."
            align="center"
            className="mx-auto max-w-3xl"
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={homepageFaq} />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Have a Specific Packaging Question or Sample Request?"
        description="Our technical team is ready to evaluate your part dimensions and provide physical prototypes."
      />
    </>
  );
}
