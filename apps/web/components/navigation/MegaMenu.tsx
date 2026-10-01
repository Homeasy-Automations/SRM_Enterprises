"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { NavItem } from "@/data/navigation";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  item: NavItem;
  onSelect: () => void;
  onHoverColor?: (color: string | null) => void;
}

/** Products mega menu — five coloured category items plus quick links and industries. */
export function MegaMenu({ item, onSelect, onHoverColor }: MegaMenuProps): JSX.Element | null {
  const reducedMotion = useReducedMotion();

  if (!item.groups || item.groups.length === 0) return null;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: reducedMotion ? 0.001 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full z-40 pt-3"
    >
      <div className="container-wide">
        <div
          role="menu"
          aria-label={`${item.label} menu`}
          className="grid gap-6 rounded-3xl border border-navy/10 bg-white p-6 shadow-lift lg:grid-cols-[1.5fr_1fr_1fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="px-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">
              Product categories
            </p>
            <ul className="flex flex-col gap-1.5">
              {(item.groups[0]?.items ?? []).map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    role="menuitem"
                    onClick={onSelect}
                    onMouseEnter={() => onHoverColor?.(child.color ?? null)}
                    onFocus={() => onHoverColor?.(child.color ?? null)}
                    onMouseLeave={() => onHoverColor?.(null)}
                    onBlur={() => onHoverColor?.(null)}
                    className="group/item flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all duration-300 hover:border-[color:var(--item-color)]/40 hover:bg-[color:var(--item-color)]/10"
                    style={{ ["--item-color" as string]: child.color ?? "var(--accent)" }}
                  >
                    <span
                      className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white transition-transform duration-300 group-hover/item:scale-110"
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
                                  : "accessories"
                        }
                        className="h-5 w-5"
                      />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-navy">{child.label}</span>
                      {child.description ? (
                        <span className="line-clamp-2 text-xs leading-snug text-navy-soft">
                          {child.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {(item.groups.slice(1) ?? []).map((group) => (
            <div key={group.heading} className="flex flex-col gap-2">
              <p className="px-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-navy-soft">
                {group.heading}
              </p>
              <ul className="flex flex-col gap-1">
                {group.items.map((child) => (
                  <li key={`${group.heading}-${child.href}`}>
                    <Link
                      href={child.href}
                      role="menuitem"
                      onClick={onSelect}
                      onMouseEnter={() => onHoverColor?.(child.color ?? null)}
                      onMouseLeave={() => onHoverColor?.(null)}
                      className={cn(
                        "block rounded-xl px-2 py-2 text-sm text-navy transition-colors duration-200",
                        "hover:bg-accent-soft hover:text-accent-deep",
                      )}
                    >
                      <span className="font-semibold">{child.label}</span>
                      {child.description ? (
                        <span className="mt-0.5 block text-xs leading-snug text-navy-soft">
                          {child.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
