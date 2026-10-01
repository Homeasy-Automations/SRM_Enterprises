"use client";

import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { WhatsAppCta } from "@/components/forms/WhatsAppCta";
import { analytics } from "@/lib/analytics";

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
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <MagneticButton
        href={primaryHref}
        variant="primary"
        className="w-full sm:w-auto"
        onClick={() => analytics.ctaClick(primaryLabel, location)}
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
