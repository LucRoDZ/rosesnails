import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { brand } from "@/config/brand";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: brand.seo.title,
    template: `%s | ${brand.name}`,
  },
  description: brand.seo.description,
  metadataBase: new URL(brand.seo.url),
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    url: brand.seo.url,
    siteName: brand.name,
    locale: brand.seo.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
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
    <ClerkProvider>
      <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
