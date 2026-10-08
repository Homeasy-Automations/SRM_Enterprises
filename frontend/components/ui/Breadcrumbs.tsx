import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbEntry } from "@/lib/seo";

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
  className?: string;
  /** Colour used for the current (last) crumb — usually the category colour. */
  accentColor?: string;
}

/** Visible breadcrumb trail for inner pages. The matching JSON-LD is emitted per page. */
export function Breadcrumbs({ items, className, accentColor }: BreadcrumbsProps): JSX.Element {
  if (items.length === 0) return <></>;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-navy-soft sm:text-sm">
        <li className="flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-1 py-0.5 transition-colors hover:text-accent-deep"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-navy/30" aria-hidden="true" />
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold"
                  style={{ color: accentColor ?? "var(--accent)" }}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="rounded-full px-1 py-0.5 transition-colors hover:text-accent-deep"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
