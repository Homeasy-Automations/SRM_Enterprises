import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

interface FaqAccordionProps {
  items: AccordionItemData[];
  title?: string;
  description?: string;
  eyebrow?: string;
  accentColor?: string;
  className?: string;
}

/** FAQ block — accessible, animated accordion; reused on the contact page and elsewhere. */
export function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  description = "Quick answers about quoting, customisation, supply and how your inquiry data is handled.",
  eyebrow = "FAQ",
  accentColor,
  className,
}: FaqAccordionProps): JSX.Element {
  return (
    <section className={className} aria-labelledby="faq-heading">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} className="max-w-3xl" />
      <Reveal variant="fade-up" delay={0.08} className="mt-8">
        <Accordion items={items} allowMultiple accentColor={accentColor} />
      </Reveal>
    </section>
  );
}
