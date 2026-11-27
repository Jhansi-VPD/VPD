import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { company } from "@/data/company";

const manrope = localFont({
  src: "./fonts/manrope.woff2",
  weight: "400 800",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "VPD Technologies | Software & Digital Engineering from Kurnool",
    template: "%s | VPD Technologies",
  },
  description:
    "VPD Technologies builds custom software, enterprise applications, mobile apps and AI-powered digital solutions that help businesses work smarter and grow.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "VPD Technologies",
    title: "VPD Technologies | Technology That Moves Your Business Forward",
    description: "Custom software, enterprise applications and digital solutions, built in Kurnool, Andhra Pradesh.",
    url: company.siteUrl,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a0a0a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
