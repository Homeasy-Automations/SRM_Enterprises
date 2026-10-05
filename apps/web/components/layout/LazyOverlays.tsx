"use client";

import dynamic from "next/dynamic";

/**
 * Dynamic client overlay loaded with ssr: false so it never ships in the initial
 * server-rendered HTML or blocks critical page rendering:
 *   • FloatingActions — WhatsApp/Call/scroll-to-top/mood switcher
 */
const FloatingActions = dynamic(
  () => import("@/components/ui/FloatingActions").then((module) => module.FloatingActions),
  { ssr: false },
);

export function LazyFloatingActions(): JSX.Element {
  return <FloatingActions />;
}
