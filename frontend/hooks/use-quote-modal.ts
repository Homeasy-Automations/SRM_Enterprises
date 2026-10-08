"use client";

import { createContext, useContext } from "react";
import type { ProductCategorySlug } from "@srm/types";

export interface OpenQuoteModalOptions {
  product?: ProductCategorySlug | string;
  source?: string;
  initialMessage?: string;
  categoryName?: string;
}

export interface QuoteModalContextValue {
  isOpen: boolean;
  options: OpenQuoteModalOptions;
  openQuoteModal: (options?: OpenQuoteModalOptions) => void;
  closeQuoteModal: () => void;
}

export const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal(): QuoteModalContextValue {
  const context = useContext(QuoteModalContext);
  if (!context) {
    return {
      isOpen: false,
      options: {},
      openQuoteModal: (options) => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("open-quote-modal", { detail: options ?? {} }),
          );
        }
      },
      closeQuoteModal: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("close-quote-modal"));
        }
      },
    };
  }
  return context;
}

/** Global trigger helper that works even outside React hook contexts. */
export function triggerQuoteModal(options?: OpenQuoteModalOptions): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-quote-modal", { detail: options ?? {} }),
    );
  }
}
