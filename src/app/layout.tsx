import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cosmic Circles — AstroLive",
  description:
    "Shared relationship forecasts that unlock when both people join. A new way to explore your connections through astrology.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F5F0FF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh bg-cream font-sans text-charcoal antialiased">
        <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col bg-cream bg-constellation relative shadow-xl shadow-indigo/5">
          <main className="flex-1 pb-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
