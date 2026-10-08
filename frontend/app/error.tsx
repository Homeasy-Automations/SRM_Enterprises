"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

/**
 * Global error boundary. Shows a friendly, light-theme recovery screen and never exposes
 * a stack trace or internal message to the visitor (the digest is enough for support).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    // Logged for the browser console/observability only; never rendered to the visitor.
    console.error("[SRM] Unhandled UI error:", error.digest ?? error.name);
  }, [error]);

  return (
    <section className="band-sky section-pad" aria-labelledby="error-heading">
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[28px] border border-navy/10 bg-white p-8 text-center shadow-card sm:p-12">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-[#B3275B]">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </span>

          <h1 id="error-heading" className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Something went wrong on our side
          </h1>
          <p className="text-base leading-relaxed text-navy-soft">
            This page could not be displayed. Your details were not submitted anywhere. Please try
            again — and if it keeps happening, reach us on WhatsApp or by email and we will help
            directly.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button type="button" onClick={reset} className="btn-primary w-full sm:w-auto">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </button>
            <Link href="/" className="btn-outline w-full sm:w-auto">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>

          {error.digest ? (
            <p className="text-xs text-navy-soft">
              Reference for support: <span className="font-mono">{error.digest}</span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
