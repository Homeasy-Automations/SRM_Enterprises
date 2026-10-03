import { Building2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@srm/config";
import { CONTACT, getMailtoLink, getTelLink, getWhatsAppLink } from "@/data/company";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Contact details card.
 *
 * Every value here is a PLACEHOLDER that must be replaced before launch — the single
 * source is apps/web/data/company.ts (plus the NEXT_PUBLIC_* env values). Rows whose
 * click-through cannot be formed yet are shown as plain text rather than a broken link.
 */
export function ContactInfoPanel(): JSX.Element {
  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  const rows: { icon: JSX.Element; label: string; value: string; href?: string }[] = [
    {
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: "Email",
      value: CONTACT.email,
      href: getMailtoLink("Packaging requirement — SRM Enterprises"),
    },
    {
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      label: "Phone",
      value: CONTACT.phoneDisplay,
      href: telLink ?? undefined,
    },
    {
      icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
      label: "WhatsApp",
      value: CONTACT.whatsappDisplay,
      href: whatsappLink ?? undefined,
    },
    {
      icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
      label: "Coverage",
      value: BRAND.locations.join(" • "),
    },
    {
      icon: <Building2 className="h-5 w-5" aria-hidden="true" />,
      label: "Supply area",
      value: `Bulk supply ${BRAND.bulkSupplyLine}.`,
    },
    {
      icon: <Clock className="h-5 w-5" aria-hidden="true" />,
      label: "Response",
      value: "Inquiries are reviewed by our team; WhatsApp is the fastest route for urgent requirements.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Reveal variant="split-left">
        <div className="card-portal-glass p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-navy">Contact Details</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            Replace the placeholder email, phone and WhatsApp values in{" "}
            <code className="rounded bg-navy/5 px-1.5 py-0.5 text-xs">apps/web/data/company.ts</code> and the
            web <code className="rounded bg-navy/5 px-1.5 py-0.5 text-xs">.env.local</code> before launch.
          </p>

          <ul className="mt-5 flex flex-col gap-4">
            {rows.map((row) => (
              <li key={row.label} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-deep">
                  {row.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy-soft">{row.label}</p>
                  {row.href ? (
                    <a
                      href={row.href}
                      {...(row.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="break-words text-sm font-semibold text-navy underline-offset-4 hover:text-accent-deep hover:underline"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <p className="break-words text-sm font-semibold text-navy">
                      {row.value}
                      {/XXXXX|your-domain/i.test(row.value) ? (
                        <span className="ml-2 rounded-full bg-[#FFF1E3] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#C2620F]">
                          placeholder
                        </span>
                      ) : null}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal variant="fade-up" delay={0.08}>
        <div className="card-portal-glass bg-gradient-to-br from-accent-soft/40 via-white/80 to-[#FFF9F0]/70 p-6 sm:p-7">
          <h3 className="font-display text-lg font-bold text-navy">What to include in your inquiry</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-navy-soft">
            {[
              "Product category (corrugated, foam, bubble, films, accessories)",
              "Required size or dimensions",
              "Material, ply or thickness preference",
              "Quantity — trial, regular or bulk",
              "Application and handling details",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
