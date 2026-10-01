"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { CONTACT, getTelLink } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn, isActivePath } from "@/lib/utils";
import { analytics } from "@/lib/analytics";
import { products } from "@/data/products";

/** Section ids the homepage showcase scroll-spy watches (see ProductShowcase). */
const SHOWCASE_SECTION_IDS: readonly string[] = products.map(
  (product) => `showcase-${product.slug}`,
);

/**
 * Site navigation.
 *
 * States: transparent over a hero, frosted white glass once scrolled. The active page
 * gets a coloured underline; the accent of the whole bar (underline + CTA) shifts as you
 * move through the homepage product showcase or hover a category in the mega menu.
 * Fully keyboard accessible: mega menu opens on focus/hover, Escape closes it, and every
 * control has an aria label.
 */
export function Navbar(): JSX.Element {
  const pathname = usePathname();
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

  // Close the mega menu on any route change.
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
        <div className="container-wide flex h-[76px] items-center justify-between gap-4">
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
                        "underline-grow inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold transition-colors duration-300",
                        active ? "text-navy" : "text-navy-soft hover:text-navy",
                      )}
                      data-active={active}
                      style={{ ["--accent" as string]: "var(--nav-accent)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {telLink ? (
              <a
                href={telLink}
                onClick={() => analytics.phoneClick("navbar")}
                aria-label={`Call SRM Enterprises on ${CONTACT.phoneDisplay}`}
                className="hidden min-h-[44px] items-center gap-2 rounded-full border border-navy/10 px-4 text-sm font-semibold text-navy-soft transition-colors hover:border-accent hover:text-accent-deep xl:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden 2xl:inline">{CONTACT.phoneDisplay}</span>
                <span className="2xl:hidden">Call</span>
              </a>
            ) : null}

            <Link
              href="/contact"
              onClick={() => analytics.ctaClick("Get a Quote", "navbar")}
              className="btn-primary hidden min-h-[46px] px-5 text-sm sm:inline-flex"
              style={{ ["--accent" as string]: "var(--nav-accent)" }}
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-white/70 text-navy transition-colors hover:bg-white lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

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
