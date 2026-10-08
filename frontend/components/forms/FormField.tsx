"use client";

import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean;
    className: string;
  }) => ReactNode;
  className?: string;
}

/**
 * Shared field wrapper: visible label, optional hint, inline error and the full
 * aria-describedby / aria-invalid wiring. The input itself is rendered by the caller
 * through a render prop so inputs, selects and textareas all behave identically.
 */
export function FormField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
  className,
}: FieldShellProps): JSX.Element {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-1 text-[#D63C69]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-navy-soft">(optional)</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="text-xs leading-snug text-navy-soft">
          {hint}
        </p>
      ) : null}

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": Boolean(error),
        className: cn(
          "min-h-[48px] w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40",
          "transition-[border-color,box-shadow,background-color] duration-200",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/25",
          error ? "border-[#D63C69] bg-[#FFF5F8]" : "border-navy/15 hover:border-accent/50 focus:border-accent",
        ),
      })}

      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-xs font-medium text-[#B3275B]">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
