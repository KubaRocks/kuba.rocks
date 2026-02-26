import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
