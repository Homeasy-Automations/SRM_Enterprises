import type { AccordionItemData } from "@/components/ui/Accordion";

/** Core homepage & commercial FAQs directly aligned with company presentation. */
export const homepageFaq: AccordionItemData[] = [
  {
    id: "materials-supplied",
    question: "What packaging materials does SRM Enterprises supply?",
    answer:
      "SRM Enterprises supplies corrugated boxes, EPE foam packaging, LDPE bubble packaging, poly bags, stretch film, shrink film and various packaging accessories under one roof.",
  },
  {
    id: "customized-packaging",
    question: "Do you provide customized packaging?",
    answer:
      "Yes. Packaging can be customized according to required dimensions, thickness, ply, material, printing and application requirements tailored to your components.",
  },
  {
    id: "bulk-supply",
    question: "Do you supply packaging materials in bulk?",
    answer:
      "Yes. SRM Enterprises supports bulk packaging requirements for industrial, commercial, logistics and recurring plant operations across NCR and India.",
  },
  {
    id: "industries-served",
    question: "What industries do you serve?",
    answer:
      "SRM Enterprises serves automotive and auto components, engineering and industrial, electrical and electronics, pharmaceuticals, food and FMCG, and e-commerce and logistics sectors.",
  },
  {
    id: "sample-request",
    question: "Can I request a packaging sample?",
    answer:
      "Where applicable, sample and prototype evaluation can be discussed and arranged based on your product geometry and protective packaging requirement.",
  },
  {
    id: "locations-served",
    question: "Which locations do you serve?",
    answer:
      "SRM Enterprises serves businesses across Gurugram, Manesar, Bhiwadi, the wider Delhi NCR region, and scheduled bulk dispatch across Pan India.",
  },
  {
    id: "get-quote",
    question: "How can I get a packaging quotation?",
    answer:
      "Share your packaging requirement, including product/application, dimensions, material preference, quantity and delivery location. Our packaging team will review and provide a structured quotation.",
  },
];

export const contactFaq: AccordionItemData[] = [
  ...homepageFaq,
  {
    id: "how-fast",
    question: "How soon will I get a response to my inquiry?",
    answer:
      "Your inquiry reaches our sales team immediately upon submission. We review the specification and respond promptly with material options and pricing.",
  },
  {
    id: "mixed-order",
    question: "Can I order different packaging items together?",
    answer:
      "Yes. Corrugated boxes, protective foam, bubble rolls, stretch films and strapping can be consolidated into a single PO and delivered together.",
  },
];

export const generalFaq: AccordionItemData[] = homepageFaq;
