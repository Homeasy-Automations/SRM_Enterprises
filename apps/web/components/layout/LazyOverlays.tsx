"use client";

import dynamic from "next/dynamic";

/**
 * Heavy, purely decorative UI is loaded with a dynamic import and `ssr: false`, so it never
 * ships in the server-rendered HTML or the critical JS path:
 *   • FloatingActions — WhatsApp/Call/scroll-to-top/mood switcher (scroll listeners + motion)
 *   • LoadingScreen — the box-folding boot animation
 *
 * A small client wrapper is required because `ssr: false` is only allowed inside client
 * components in the App Router.
 */
const FloatingActions = dynamic(
  () => import("@/components/ui/FloatingActions").then((module) => module.FloatingActions),
  { ssr: false },
);

const LoadingScreen = dynamic(
  () => import("@/components/layout/LoadingScreen").then((module) => module.LoadingScreen),
  { ssr: false },
);

export function LazyFloatingActions(): JSX.Element {
  return <FloatingActions />;
}

export function LazyLoadingScreen(): JSX.Element {
  return <LoadingScreen />;
}
