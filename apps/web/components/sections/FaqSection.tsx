"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { homepageFaq } from "@/data/faq";

/** Section 14: FAQ — Frequently Asked Questions. */
export function FaqSection(): JSX.Element {
  return (
    <section id="faq" className="band-cream section-pad relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about materials, custom dimensions, bulk minimums, sample availability and dispatch schedules."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={homepageFaq} />
        </div>
      </div>
    </section>
  );
}
