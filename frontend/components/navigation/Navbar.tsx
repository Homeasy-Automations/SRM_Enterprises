"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { CONTACT, getTelLink, getWhatsAppLink } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { DropdownMenu } from "./DropdownMenu";
import { MobileDrawer } from "./MobileDrawer";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn, isActivePath } from "@/lib/utils";
import { analytics } from "@/lib/analytics";
import { products } from "@/data/products";

import { useQuoteModal } from "@/hooks/use-quote-modal";

/** Section ids the homepage showcase scroll-spy watches (see ProductShowcase). */
const SHOWCASE_SECTION_IDS: readonly string[] = products.map(
  (product) => `showcase-${product.slug}`,
);

/**
 * Site navigation.
 *
 * Desktop Header:
 * SRM ENTERPRISES Logo
 * Home | About ▾ | Products ▾ | Industries ▾ | Solutions ▾ | Locations ▾ | Resources ▾ | Gallery
 * Secondary Utility:
 * WhatsApp | Call | Get a Quote
 */
export function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  const { pastThreshold } = useScrollProgress(24);
  const reducedMotion = useReducedMotion();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoverColor, setHoverColor] = useState<string | null>(null);

  const activeShowcaseId = useActiveSection(pathname === "/" ? SHOWCASE_SECTION_IDS : [], 200);
  const showcaseColor = useMemo(() => {
    if (pathname !== "/") return null;
    const slug = activeShowcaseId?.replace("showcase-", "");
    return products.find((product) => product.slug === slug)?.color ?? null;
  }, [activeShowcaseId, pathname]);

  const navAccent = hoverColor ?? showcaseColor ?? "var(--accent)";
  const solid = pastThreshold || drawerOpen;

  // Close menus on route change.
  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const telLink = getTelLink();
  const whatsappLink = getWhatsAppLink();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[70] w-full transition-all duration-500",
          solid ? "glass-panel border-b border-navy/10 shadow-soft" : "bg-transparent",
        )}
        style={{ ["--nav-accent" as string]: navAccent }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container-wide flex h-[76px] items-center justify-between gap-3">
          <Logo />

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const menuOpen = openMenu === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(hasChildren ? item.label : null)}
                    onFocus={() => setOpenMenu(hasChildren ? item.label : null)}
                  >
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? menuOpen : undefined}
                      onClick={() => setOpenMenu(null)}
                      className={cn(
                        "underline-grow inline-flex min-h-[42px] items-center gap-1 rounded-full px-2.5 xl:px-3 font-outfit text-xs xl:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy/5",
                        active ? "text-navy bg-navy/5" : "text-navy-soft hover:text-navy",
                      )}
                      data-active={active}
                      style={{ ["--accent" as string]: "var(--nav-accent)" }}
                    >
                      <span>{item.label}</span>
                      {hasChildren ? (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 text-navy/40 transition-transform duration-300",
                            menuOpen && "rotate-180 text-navy",
                          )}
                          aria-hidden="true"
                        />
                      ) : null}
                    </Link>

                    {/* Floating Dropdown for categories with children (not full mega-groups) */}
                    <AnimatePresence>
                      {menuOpen && hasChildren && !item.groups ? (
                        <DropdownMenu
                          item={item}
                          onSelect={() => setOpenMenu(null)}
                          onHoverColor={setHoverColor}
                        />
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Secondary Utility Area: WhatsApp | Call | Get a Quote */}
          <div className="flex items-center gap-2">
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.whatsappClick("navbar")}
                aria-label="Chat with SRM Enterprises on WhatsApp"
                className="hidden min-h-[38px] items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50/80 px-3 font-outfit text-xs font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-xs md:inline-flex"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            {telLink ? (
              <a
                href={telLink}
                onClick={() => analytics.phoneClick("navbar")}
                aria-label={`Call SRM Enterprises on ${CONTACT.phoneDisplay}`}
                className="hidden min-h-[38px] items-center gap-1.5 rounded-full border border-navy/10 px-3 font-outfit text-xs font-semibold text-navy-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent-deep hover:shadow-xs hover:bg-accent-soft/30 xl:inline-flex"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Call</span>
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => {
                analytics.ctaClick("Get a Quote", "navbar");
                openQuoteModal();
              }}
              className="btn-primary hidden min-h-[40px] px-4 font-outfit text-xs font-bold sm:inline-flex items-center"
              style={{ ["--accent" as string]: "var(--nav-accent)" }}
            >
              Get a Quote
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-navy/10 bg-white/70 text-navy transition-all duration-300 hover:bg-white hover:border-accent/40 hover:scale-105 hover:shadow-soft lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Full-width Mega Menu for grouped items (Products) */}
        <AnimatePresence>
          {primaryNav
            .filter((item) => item.label === openMenu && item.groups)
            .map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setOpenMenu(item.label)}
                className="relative hidden lg:block"
              >
                <MegaMenu item={item} onSelect={() => setOpenMenu(null)} onHoverColor={setHoverColor} />
              </div>
            ))}
        </AnimatePresence>

        {/* Progress strip keeps the navbar tied to scroll position. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{ background: navAccent }}
          animate={{ scaleX: solid ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0.001 : 0.4 }}
        />
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
