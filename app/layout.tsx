import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DiscTools — Cheap Discord Nitro, Server Boosts & Premium Subscriptions",
  description: "Buy Cheap Discord Nitro, Server Boosts, Spotify Premium, YouTube Premium and more. Secure checkout, instant delivery, 24/7 human support, and a full-service warranty. Legal regional pricing with zero account risk.",
  keywords: "cheap discord nitro, discord server boosts, spotify premium cheap, youtube premium cheap, discord members, crunchyroll cheap, buy discord nitro, cheap subscriptions",
  openGraph: {
    title: "DiscTools — Cheap Discord Nitro, Server Boosts & Premium Subscriptions",
    description: "Secure access to premium subscriptions at optimized global pricing. Instant delivery, no password required, full warranty.",
    url: "https://discordtools.net",
    siteName: "DiscTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiscTools — Cheap Discord Nitro & Premium Subscriptions",
    description: "Buy Discord Nitro, Server Boosts, Spotify, YouTube Premium at the best prices. Instant delivery & 24/7 support.",
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
