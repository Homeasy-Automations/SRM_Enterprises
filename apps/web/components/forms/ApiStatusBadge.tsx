"use client";

import { useEffect, useState } from "react";
import { Activity, CircleSlash } from "lucide-react";
import { API_BASE_LABEL, checkApiHealth } from "@/lib/api";
import { cn } from "@/lib/utils";

type Status = "checking" | "ok" | "degraded" | "offline";

/**
 * Small live badge that pings GET /api/health so it is immediately obvious whether the
 * frontend is really talking to the Express API + MongoDB. Server-side failures are
 * reported honestly instead of being hidden.
 */
export function ApiStatusBadge({ className }: { className?: string }): JSX.Element {
  const [status, setStatus] = useState<Status>("checking");
  const [database, setDatabase] = useState<string>("unknown");

  useEffect(() => {
    let cancelled = false;

    const run = async (): Promise<void> => {
      const result = await checkApiHealth();
      if (cancelled) return;

      if (!result.ok) {
        setStatus("offline");
        return;
      }
      setDatabase(result.data.database ?? "unknown");
      setStatus(result.data.status === "ok" ? "ok" : "degraded");
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    status === "checking"
      ? "Checking API…"
      : status === "ok"
        ? "API and database connected"
        : status === "degraded"
          ? `API online, database ${database}`
          : "API not reachable from this browser";

  return (
    <p
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        status === "ok"
          ? "border-[#19B26B]/30 bg-[#EAFBF4] text-[#0F8B55]"
          : status === "offline"
            ? "border-[#D63C69]/30 bg-[#FFF5F8] text-[#B3275B]"
            : "border-navy/15 bg-white text-navy-soft",
        className,
      )}
    >
      {status === "offline" ? (
        <CircleSlash className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Activity className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{label}</span>
      <span className="font-mono text-[0.65rem] font-normal text-navy-soft">{API_BASE_LABEL}</span>
    </p>
  );
}
