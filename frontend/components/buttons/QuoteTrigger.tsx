"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

interface QuoteTriggerProps {
  children: ReactNode;
  className?: string;
  product?: string;
  location?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Reusable client button that opens the Get a Quote modal popup.
 * Can be dropped directly into Server Components or Client Components.
 */
export function QuoteTrigger({
  children,
  className,
  product,
  location = "quote-trigger",
  onClick,
  ariaLabel,
}: QuoteTriggerProps): JSX.Element {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        analytics.ctaClick("Get a Quote", location);
        onClick?.();
        openQuoteModal({ product });
      }}
    >
      {children}
    </button>
  );
}
