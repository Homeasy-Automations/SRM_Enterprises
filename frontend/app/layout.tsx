import type { Metadata, Viewport } from "next";
import { Fraunces, Syne, Merriweather } from "next/font/google";
import "./globals.css";

import { SITE } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Analytics } from "@/components/layout/Analytics";
import { LazyFloatingActions } from "@/components/layout/LazyOverlays";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { ColorMoodProvider } from "@/components/providers/ColorMoodProvider";
import { QuoteModalProvider } from "@/components/providers/QuoteModalProvider";
import { HashScrollHandler } from "@/components/navigation/HashScrollHandler";
import { JsonLd } from "@/components/sections/JsonLd";

/**
 * next/font self-hosts all font families at build time: no runtime request to Google,
 * no render-blocking stylesheet, and no flash of unstyled text beyond the swap window.
 */
// Display: h1/h2, hero-scale titles, quotes, big stat callouts. Variable, with the optical-size axis.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

// UI: h3–h6, card titles, nav, buttons, eyebrows, badges, number markers, form labels.
const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

// Body: paragraphs, inputs, footer text, legal pages — everything else.
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-merriweather",
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
    <html
      lang="en-IN"
      data-mood="ocean"
      className={`${fraunces.variable} ${syne.variable} ${merriweather.variable}`}
    >
      <body className="font-body antialiased">
        <ColorMoodProvider>
          <QuoteModalProvider>
            <HashScrollHandler />
            <SkipToContent />
            <ScrollProgressBar />
            <Navbar />

            {/* z-10 keeps page content above the decorative background layers. */}
            <main id="main-content" className="relative z-10">
              {children}
            </main>

            <Footer />
            <LazyFloatingActions />
          </QuoteModalProvider>
        </ColorMoodProvider>

        <JsonLd id="organization-jsonld" data={organizationJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
