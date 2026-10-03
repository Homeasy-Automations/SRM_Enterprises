"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { CONTACT, getTelLink, getWhatsAppLink } from "@/data/company";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { Logo } from "@/components/ui/Logo";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { analytics } from "@/lib/analytics";
import { cn, isActivePath } from "@/lib/utils";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation drawer: slides in from the right with an overlay, locks body scroll,
 * contains a Products accordion and the quote CTA, and closes on X, link tap, Escape or
 * an overlay click. Focus returns to the trigger because the parent keeps the button.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps): JSX.Element {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>("Products");
  const reducedMotion = useReducedMotion();
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const whatsappLink = getWhatsAppLink();
  const telLink = getTelLink();

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            className="absolute inset-0 bg-navy/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-[380px] flex-col overflow-y-auto bg-white shadow-lift"
            initial={reducedMotion ? { opacity: 1 } : { x: "100%" }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reducedMotion ? 0.001 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-navy/10 px-4 py-4">
              <Logo showTagline={false} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 text-navy transition-colors hover:bg-navy/5"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex-1 px-3 py-4">
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const isExpanded = expanded === item.label;

                  return (
                    <li key={item.label}>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex-1 rounded-xl px-3 py-3 text-base font-semibold transition-colors",
                            active ? "bg-accent-soft text-accent-deep" : "text-navy hover:bg-navy/5",
                          )}
                        >
                          {item.label}
                        </Link>
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(isExpanded ? null : item.label)}
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} links`}
                            className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-navy/5"
                          >
                            <ChevronDown
                              className={cn("h-5 w-5 transition-transform duration-300", isExpanded && "rotate-180")}
                              aria-hidden="true"
                            />
                          </button>
                        ) : null}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasChildren && isExpanded ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0.001 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden pl-2"
                          >
                            {(item.children ?? []).map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={(e) => {
                                    onClose();
                                    if (child.href.includes("#")) {
                                      const [targetPath, hash] = child.href.split("#");
                                      const currentPath = window.location.pathname.replace(/\/$/, "");
                                      const normTarget = (targetPath || currentPath).replace(/\/$/, "");
                                      if (currentPath === normTarget && hash) {
                                        const el = document.getElementById(hash);
                                        if (el) {
                                          e.preventDefault();
                                          window.history.pushState(null, "", `#${hash}`);
                                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }
                                      }
                                    }
                                  }}
                                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-soft transition-colors hover:bg-[color:var(--child-color)]/10 hover:text-navy"
                                  style={{ ["--child-color" as string]: child.color ?? "var(--accent)" }}
                                >
                                  <span
                                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
                                    style={{ background: child.color ?? "var(--accent)" }}
                                  >
                                    <CategoryIcon
                                      name={
                                        child.label.includes("Corrugated")
                                          ? "box"
                                          : child.label.includes("EPE")
                                            ? "foam"
                                            : child.label.includes("Bubble")
                                              ? "bubble"
                                              : child.label.includes("Poly")
                                                ? "film"
                                                : child.label.includes("Accessor")
                                                  ? "accessories"
                                                  : "truck"
                                      }
                                      className="h-4 w-4"
                                      strokeWidth={2}
                                    />
                                  </span>
                                  <span className="line-clamp-2">{child.label}</span>
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-navy/10 px-4 py-5">
              <Link href="/contact" onClick={onClose} className="btn-primary w-full">
                Get a Quote
              </Link>

              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    analytics.whatsappClick("mobile-drawer");
                    onClose();
                  }}
                  className="btn-outline w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              ) : null}

              {telLink ? (
                <a
                  href={telLink}
                  onClick={() => {
                    analytics.phoneClick("mobile-drawer");
                    onClose();
                  }}
                  className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-navy/10 text-sm font-semibold text-navy-soft"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              ) : null}

              <p className="text-center text-[0.7rem] leading-snug text-navy-soft">
                Pan India Supply &amp; Dispatch
              </p>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
