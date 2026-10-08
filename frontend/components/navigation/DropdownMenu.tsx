"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/data/navigation";

interface DropdownMenuProps {
  item: NavItem;
  onSelect: () => void;
  onHoverColor?: (color: string | null) => void;
}

/**
 * Compact, floating dropdown menu for navigation categories with children (Solutions, Locations, Resources, About, Industries).
 * Features smooth emergence, glassmorphism, micro-scale hover reactions, and category color dots.
 */
export function DropdownMenu({ item, onSelect, onHoverColor }: DropdownMenuProps): JSX.Element | null {
  const reducedMotion = useReducedMotion();

  if (!item.children || item.children.length === 0) return null;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: reducedMotion ? 0.001 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-2"
    >
      <div
        role="menu"
        aria-label={`${item.label} dropdown`}
        className="w-[320px] sm:w-[360px] rounded-3xl border border-navy/10 bg-white/95 p-3 shadow-2xl backdrop-blur-md"
      >
        <div className="mb-2 flex items-center justify-between border-b border-navy/5 px-3 pb-2 pt-1">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-navy-soft">
            {item.label}
          </span>
          <Link
            href={item.href}
            onClick={onSelect}
            className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-accent hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <ul className="flex flex-col gap-1 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                role="menuitem"
                onClick={(e) => {
                  onSelect();
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
                onMouseEnter={() => onHoverColor?.(child.color ?? null)}
                onFocus={() => onHoverColor?.(child.color ?? null)}
                onMouseLeave={() => onHoverColor?.(null)}
                onBlur={() => onHoverColor?.(null)}
                className="group/item flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-300 hover:bg-slate-50 hover:translate-x-1"
                style={{ ["--item-accent" as string]: child.color ?? "var(--accent)" }}
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover/item:scale-125"
                  style={{ background: child.color ?? "var(--accent)" }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-navy transition-colors duration-200 group-hover/item:text-[var(--item-accent)]">
                    {child.label}
                  </span>
                  {child.description ? (
                    <span className="text-xs leading-snug text-navy-soft line-clamp-1">
                      {child.description}
                    </span>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
