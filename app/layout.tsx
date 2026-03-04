import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Automation Partner - Lead Your Business with AI",
  description: "We help businesses harness the power of AI to work smarter, scale faster, and innovate boldly using custom automation & intelligent solutions.",
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
        {children}
      </body>
    </html>
  );
}
