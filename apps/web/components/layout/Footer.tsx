import Link from "next/link";
import { Heart, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@srm/config";
import { CONTACT, getMailtoLink, getTelLink, getWhatsAppLink } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

/**
 * Footer — bright vivid gradient (blue → green), white text, four columns.
 * Top wavy edge overlaps the preceding section seamlessly with a vibrant color transition.
 */
export function Footer(): JSX.Element {
  const whatsappLink = getWhatsAppLink();
  const telLink = getTelLink();

  return (
    <footer className="relative text-white z-20">
      {/* Wavy transition that overlaps the upper section seamlessly with a blended ocean crest */}
      <div
        className="pointer-events-none relative -mt-[48px] sm:-mt-[66px] lg:-mt-[82px] -mb-px w-full overflow-hidden leading-[0] z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-[52px] w-full sm:h-[70px] lg:h-[86px] block"
          role="presentation"
          focusable="false"
        >
          {/* Subtle translucent crest that softly blends the upper section into the wave */}
          <path
            d="M0,64 C180,116 320,8 520,44 C700,76 820,124 1020,86 C1200,52 1320,20 1440,58 L1440,120 L0,120 Z"
            fill="#1E6FFF"
            opacity="0.32"
          />
          {/* Main solid wave matching the footer body 100% with zero seam */}
          <path
            d="M0,80 C160,32 320,120 480,84 C640,48 780,12 960,52 C1140,92 1300,116 1440,72 L1440,120 L0,120 Z"
            fill="#1E6FFF"
          />
        </svg>
      </div>

      {/* Main footer body with seamless top edge matching wave (#1E6FFF) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1E6FFF] via-[#1760E8] to-[#0E42A8] -mt-1 pb-10 pt-4 sm:pb-12 sm:pt-6">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25">
          <span className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-white/25 blur-3xl" />
          <span className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[#1E9BE0]/35 blur-3xl" />
          <span className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        </div>

        <div className="container-wide relative">
          <StaggerGroup once={false} stagger={0.09} className="grid gap-10 lg:grid-cols-4">
            <StaggerItem variant="split-left" className="flex flex-col gap-4">
              <Logo tone="light" />
              <p className="text-sm leading-relaxed text-white/90">{BRAND.footerLine}.</p>
              <p className="text-sm leading-relaxed text-white/80">
                Complete packaging solutions for industrial buyers — corrugated boxes, EPE
                Foam Packaging, LDPE Bubble & Protective Packaging, poly bags & films and packaging accessories.
              </p>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {BRAND.locations.join(" • ")}
              </p>
            </StaggerItem>

            <StaggerItem variant="flip-up">
              <nav aria-label="Products" className="flex flex-col gap-3">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                  Products
                </h2>
                <ul className="flex flex-col gap-2">
                  {footerNav.products.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="footer-link-interactive inline-flex min-h-[36px] items-center text-sm text-white/90"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </StaggerItem>

            <StaggerItem variant="flip-up">
              <nav aria-label="Company" className="flex flex-col gap-3">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                  Company
                </h2>
                <ul className="flex flex-col gap-2">
                  {footerNav.company.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="footer-link-interactive inline-flex min-h-[36px] items-center text-sm text-white/90"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </StaggerItem>

            <StaggerItem variant="split-right" className="flex flex-col gap-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
                Contact
              </h2>
              <ul className="flex flex-col gap-2.5 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{CONTACT.addressLine}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <a href={getMailtoLink("Packaging requirement")} className="footer-link-interactive">
                    {CONTACT.email}
                  </a>
                </li>
                {telLink ? (
                  <li className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <a href={telLink} className="footer-link-interactive">
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                ) : (
                  <li className="flex items-start gap-2 text-white/70">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{CONTACT.phoneDisplay} (placeholder)</span>
                  </li>
                )}
                {whatsappLink ? (
                  <li className="flex items-start gap-2">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link-interactive"
                    >
                      WhatsApp us
                    </a>
                  </li>
                ) : null}
              </ul>

              <Link
                href="/contact"
                className="btn-white btn-shimmer mt-2 w-full sm:w-auto shadow-md"
                aria-label="Go to the quote request form"
              >
                Request a Quote
              </Link>
            </StaggerItem>
          </StaggerGroup>

        <Reveal variant="fade-in" delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/25 pt-6 text-xs text-white/90 md:flex-row sm:text-sm">
            <p>© SRM Enterprises. All Rights Reserved.</p>

            <a
              href="https://kynyx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy/40 px-4 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-400/60 hover:bg-navy/70 hover:shadow-lg hover:scale-105"
              aria-label="Made with love by KYNYX SOLUTIONS (opens in new tab)"
            >
              <span className="text-white/90 transition-colors group-hover:text-white">Made with</span>
              <span className="inline-block transition-transform duration-300 group-hover:scale-125">
                <Heart
                  className="h-3.5 w-3.5 fill-current animate-pulse text-[color:var(--accent-highlight,#FF5C8A)] transition-colors duration-300 group-hover:text-rose-400"
                  aria-hidden="true"
                />
              </span>
              <span className="text-white/90 transition-colors group-hover:text-white">By</span>
              <span className="font-extrabold tracking-wide text-[#FFAE00] transition-all duration-300 group-hover:text-[#FFC93C] group-hover:drop-shadow-[0_0_10px_rgba(255,201,60,0.85)] group-hover:underline">
                KYNYX SOLUTIONS.
              </span>
            </a>

            <ul className="flex items-center gap-5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link-interactive inline-flex min-h-[36px] items-center hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </footer>
  );
}
