/**
 * Analytics-ready, no-op by default.
 * Google Analytics, Google Tag Manager and the Meta Pixel are only loaded when the
 * matching NEXT_PUBLIC_* environment variable is set, and every helper degrades to a
 * silent no-op when nothing is configured.
 */

export const ANALYTICS_IDS = {
  ga: (process.env.NEXT_PUBLIC_GA_ID ?? "").trim(),
  gtm: (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim(),
  metaPixel: (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim(),
} as const;

export const analyticsEnabled: boolean =
  ANALYTICS_IDS.ga.length > 0 ||
  ANALYTICS_IDS.gtm.length > 0 ||
  ANALYTICS_IDS.metaPixel.length > 0;

export type AnalyticsEvent =
  | "page_view"
  | "quote_form_start"
  | "quote_submission"
  | "whatsapp_click"
  | "phone_click"
  | "product_view"
  | "cta_click";

export interface AnalyticsPayload {
  /** Human-readable label, e.g. the product name or the CTA text. */
  label?: string;
  /** Page path the event happened on. */
  path?: string;
  /** Optional extra dimensions. */
  value?: string | number;
  /** Where the interaction happened, e.g. "navbar" | "footer" | "product-card". */
  location?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const EVENT_NAME_MAP: Record<AnalyticsEvent, string> = {
  page_view: "page_view",
  quote_form_start: "quote_form_start",
  quote_submission: "quote_submission",
  whatsapp_click: "whatsapp_click",
  phone_click: "phone_click",
  product_view: "product_view",
  cta_click: "cta_click",
};

/**
 * Sends an event to every configured provider. Safe to call anywhere: on the server it
 * returns immediately, and with no IDs configured it does nothing at all.
 */
export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  const params = {
    event_category: payload.location ?? "site",
    event_label: payload.label,
    page_path: payload.path ?? window.location.pathname,
    value: payload.value,
  };

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", EVENT_NAME_MAP[event], params);
    }

    if (Array.isArray(window.dataLayer) && ANALYTICS_IDS.gtm.length > 0) {
      window.dataLayer.push({ event: EVENT_NAME_MAP[event], ...params });
    }

    if (typeof window.fbq === "function") {
      // The Meta Pixel has a fixed vocabulary; map our events onto standard ones.
      const standard =
        event === "quote_submission"
          ? "Lead"
          : event === "product_view"
            ? "ViewContent"
            : event === "whatsapp_click" || event === "phone_click"
              ? "Contact"
              : "CustomizeProduct";
      window.fbq("track", standard, { content_name: payload.label });
    }
  } catch {
    // Analytics must never break the page.
  }
}

/** Convenience wrappers for the events the site actually fires. */
export const analytics = {
  pageView(path: string, title?: string): void {
    trackEvent("page_view", { path, label: title });
  },
  quoteFormStart(productCategory?: string): void {
    trackEvent("quote_form_start", { label: productCategory ?? "quote form", location: "contact" });
  },
  quoteSubmitted(productCategory: string): void {
    trackEvent("quote_submission", { label: productCategory, location: "contact" });
  },
  whatsappClick(location: string, label?: string): void {
    trackEvent("whatsapp_click", { location, label });
  },
  phoneClick(location: string): void {
    trackEvent("phone_click", { location });
  },
  productView(productName: string, slug: string): void {
    trackEvent("product_view", { label: productName, value: slug });
  },
  ctaClick(label: string, location: string): void {
    trackEvent("cta_click", { label, location });
  },
} as const;
