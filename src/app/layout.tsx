import type { Metadata, Viewport } from "next";
import {
  Barlow,
  Barlow_Condensed,
  Chivo_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeColor } from "@/components/layout/theme-color";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const bigShoulders = localFont({
  src: "./fonts/big-shoulders.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-big-shoulders",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  display: "swap",
});

// Years, tenure, stats and the footer year are computed at render time;
// re-render daily so the static pages don't freeze at the deploy date.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    default: "kuba.rocks — Full-Stack Developer",
    template: "%s | kuba.rocks",
  },
  description:
    "Kuba Florczuk — Full-Stack Developer and Team Leader based in Warsaw, Poland.",
  metadataBase: new URL("https://kuba.rocks"),
  openGraph: {
    title: "kuba.rocks — Full-Stack Developer",
    description:
      "Kuba Florczuk — Full-Stack Developer and Team Leader based in Warsaw, Poland.",
    url: "https://kuba.rocks",
    siteName: "kuba.rocks",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${barlow.variable} ${barlowCondensed.variable} ${chivoMono.variable}`}
      // The theme script below sets data-theme before React hydrates
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <ThemeColor />
      </head>
      <body className="min-h-screen bg-navy text-chalk">
        <a
          href="#main"
          className="absolute left-3 top-[-60px] z-[100] bg-amber px-4 py-2.5 font-mono text-sm font-bold text-on-accent no-underline focus:top-3"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
