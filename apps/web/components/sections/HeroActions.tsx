"use client";

import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { WhatsAppCta } from "@/components/forms/WhatsAppCta";
import { analytics } from "@/lib/analytics";

import { useQuoteModal } from "@/hooks/use-quote-modal";

interface HeroActionsProps {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Product name so the WhatsApp message is contextual. */
  productName?: string;
  location: string;
}

/**
 * Primary/secondary CTA row plus the WhatsApp option, used inside page heroes.
 * Client component because the CTAs fire analytics events on click.
 */
export function HeroActions({
  primaryLabel = "Get a Quote",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  productName,
  location,
}: HeroActionsProps): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
  const productMatch = primaryHref.match(/product=([^&]+)/);
  const rawSlug = productMatch?.[1];
  const productSlug = rawSlug ? decodeURIComponent(rawSlug) : undefined;

  const handlePrimaryClick = () => {
    analytics.ctaClick(primaryLabel, location);
    openQuoteModal({ product: productSlug });
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <MagneticButton
        type="button"
        variant="primary"
        className="w-full sm:w-auto"
        onClick={handlePrimaryClick}
      >
        {primaryLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </MagneticButton>

      {secondaryLabel && secondaryHref ? (
        <MagneticButton
          href={secondaryHref}
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => analytics.ctaClick(secondaryLabel, location)}
        >
          {secondaryLabel}
        </MagneticButton>
      ) : null}

      <WhatsAppCta productName={productName} location={location} showCall={false} className="w-full sm:w-auto" />
    </div>
  );
}
