import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";
import { SITE_NAME, SITE_URL, seo } from "./lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: seo.title,
    description: "Secure access to premium subscriptions at optimized global pricing. Instant delivery, no password required, full warranty.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiscTools - Cheap Discord Nitro & Premium Subscriptions",
    description: "Buy Discord Nitro, Server Boosts, Spotify, YouTube Premium at the best prices. Instant delivery & 24/7 support.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-zinc-950 text-zinc-50 antialiased selection:bg-fuchsia-500/30 overflow-x-hidden`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
