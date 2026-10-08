"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { QuoteModalContext, type OpenQuoteModalOptions, type QuoteModalContextValue } from "@/hooks/use-quote-modal";
import { QuoteModal } from "@/components/modals/QuoteModal";

export function QuoteModalProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OpenQuoteModalOptions>({});

  const openQuoteModal = useCallback((newOptions?: OpenQuoteModalOptions) => {
    setOptions(newOptions ?? {});
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen to window-level custom events
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<OpenQuoteModalOptions>;
      openQuoteModal(customEvent.detail);
    };

    const handleCloseEvent = () => {
      closeQuoteModal();
    };

    window.addEventListener("open-quote-modal", handleOpenEvent);
    window.addEventListener("close-quote-modal", handleCloseEvent);

    // Global click listener for elements with data-open-quote-modal or href="#quote"
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-open-quote-modal], a[href='#quote'], a[href='#quote-modal'], button[data-quote-trigger]");
      if (target) {
        e.preventDefault();
        const product = target.getAttribute("data-product") || target.getAttribute("data-quote-product") || undefined;
        openQuoteModal({ product });
      }
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("open-quote-modal", handleOpenEvent);
      window.removeEventListener("close-quote-modal", handleCloseEvent);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [openQuoteModal, closeQuoteModal]);

  const contextValue = useMemo<QuoteModalContextValue>(
    () => ({
      isOpen,
      options,
      openQuoteModal,
      closeQuoteModal,
    }),
    [isOpen, options, openQuoteModal, closeQuoteModal]
  );

  return (
    <QuoteModalContext.Provider value={contextValue}>
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        initialProduct={options.product}
        source={options.source}
      />
    </QuoteModalContext.Provider>
  );
}
