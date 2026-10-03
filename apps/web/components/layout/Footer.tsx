"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, ROUTES } from "@srm/config";
import { CONTACT, getMailtoLink, getTelLink, getWhatsAppLink } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

/** Site footer with expanded Solutions, Locations, Products, Quick Links and lead CTA. */
export function Footer(): JSX.Element {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden bg-gradient-to-b from-[#12294A] to-[#0A182E] text-white pt-16 pb-12"
    >
      <div className="container-wide relative z-10">
        <StaggerGroup once={false} stagger={0.07} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Positioning */}
          <StaggerItem variant="split-left" className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="text-sm font-semibold text-white/95">
              Complete Packaging Material Solutions
            </p>
            <p className="text-xs leading-relaxed text-white/75">
              Corrugated Boxes • EPE Foam • LDPE Bubble • Poly Bags • Films • Packaging Accessories.
              Engineered and supplied to specification for industrial and commercial operations across NCR.
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90">
              <MapPin className="h-4 w-4 text-accent-soft shrink-0" aria-hidden="true" />
              <span>{BRAND.locations.join(" • ")}</span>
            </p>
          </StaggerItem>

          {/* Col 2: Quick Links */}
          <StaggerItem variant="flip-up">
            <nav aria-label="Quick Links" className="flex flex-col gap-3">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
                Quick Links
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-white/80">
                {footerNav.quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="footer-link-interactive inline-flex py-1 text-white/85 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>

          {/* Col 3: Products */}
          <StaggerItem variant="flip-up">
            <nav aria-label="Products" className="flex flex-col gap-3">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
                Products
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-white/80">
                {footerNav.products.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="footer-link-interactive inline-flex py-1 text-white/85 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>

          {/* Col 4: Solutions */}
          <StaggerItem variant="flip-up">
            <nav aria-label="Solutions" className="flex flex-col gap-3">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
                Solutions
              </h2>
              <ul className="flex flex-col gap-1.5 text-xs text-white/80">
                {footerNav.solutions.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="footer-link-interactive inline-flex py-1 text-white/85 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>

          {/* Col 5: Locations & Contact */}
          <StaggerItem variant="split-right" className="flex flex-col gap-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/90">
              Locations &amp; Contact
            </h2>
            <div className="flex flex-wrap gap-1.5 pb-2">
              {footerNav.locations.map((loc) => (
                <Link
                  key={loc.label}
                  href={loc.href}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[0.68rem] font-medium text-white transition-colors hover:bg-white/25"
                >
                  {loc.label}
                </Link>
              ))}
            </div>

            <ul className="flex flex-col gap-2 text-xs text-white/85">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-soft" aria-hidden="true" />
                <a href={getMailtoLink("Packaging requirement")} className="footer-link-interactive">
                  {CONTACT.email}
                </a>
              </li>
              {telLink ? (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-soft" aria-hidden="true" />
                  <a href={telLink} className="footer-link-interactive">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
              ) : null}
              {whatsappLink ? (
                <li className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-interactive text-emerald-300"
                  >
                    WhatsApp us
                  </a>
                </li>
              ) : null}
            </ul>

            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-accent-deep hover:scale-105"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </StaggerItem>
        </StaggerGroup>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SRM Enterprises. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={ROUTES.privacy} className="hover:text-white">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href={ROUTES.terms} className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
