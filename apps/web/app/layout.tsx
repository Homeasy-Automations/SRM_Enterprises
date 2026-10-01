import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { SITE } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Analytics } from "@/components/layout/Analytics";
import { LazyFloatingActions, LazyLoadingScreen } from "@/components/layout/LazyOverlays";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ColorMoodProvider } from "@/components/providers/ColorMoodProvider";
import { JsonLd } from "@/components/sections/JsonLd";

/**
 * next/font self-hosts the two families at build time: no runtime request to Google,
 * no render-blocking stylesheet, and no flash of unstyled text beyond the swap window.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: "%s | SRM Enterprises",
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "industrial packaging material supplier",
    "corrugated boxes supplier",
    "EPE foam packaging",
    "LDPE bubble & protective packaging",
    "poly bags and films",
    "packaging accessories",
    "custom packaging supplier",
    "packaging supplier Pan India",
  ],
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
  },
  twitter: {
    card: SITE.twitterCard,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  category: "business",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "light",
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en-IN" data-mood="ocean" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <ColorMoodProvider>
          <SkipToContent />
          <LazyLoadingScreen />
          <ScrollProgressBar />
          <Navbar />

          {/* z-10 keeps page content above the decorative background layers. */}
          <main id="main-content" className="relative z-10">
            {children}
          </main>

          <Footer />
          <LazyFloatingActions />
        </ColorMoodProvider>

        <JsonLd id="organization-jsonld" data={organizationJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
