"use client";

import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { contactFaq } from "@/data/faq";

export function ContactFaqSection(): JSX.Element {
  return (
    <section className="py-20 lg:py-24 bg-white border-t border-navy/10 relative" id="faq" aria-labelledby="contact-faq-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to Know Before Inquiring"
          description="Clear answers about response timelines, technical specifications, custom prototyping, MOQs and Pan-India dispatch."
          align="center"
          className="mx-auto max-w-2xl mb-12"
        />

        <div className="mx-auto max-w-3xl">
          <Reveal variant="fade-up" delay={0.1}>
            <Accordion
              items={contactFaq}
              allowMultiple={false}
              defaultOpenId="response-time"
              accentColor="#19B26B"
              className="gap-3.5"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
