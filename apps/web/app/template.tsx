import type { ReactNode } from "react";
import { PageTransition } from "@/components/animations/PageTransition";

/**
 * A template is remounted by Next on every navigation, which is exactly what a route
 * transition needs. Browser back/forward behaviour is untouched — no router hacks, no
 * history manipulation.
 */
export default function Template({ children }: { children: ReactNode }): JSX.Element {
  return <PageTransition>{children}</PageTransition>;
}
