import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { mona, publicSans } from "@/app/fonts";
import { homeMeta } from "@/content/pages/home";
import { shared } from "@/content/shared";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { RevealProvider } from "@/components/ui/Reveal";
import { Analytics, ChatSlot } from "@/components/integrations/Slots";

export const metadata: Metadata = {
  title: homeMeta.title,
  description: homeMeta.description,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" className={`${mona.variable} ${publicSans.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-skip focus:rounded-full focus:bg-band focus:px-5 focus:py-3 focus:font-semibold focus:text-on-band"
        >
          {shared.skipLink}
        </a>
        <RevealProvider />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <Analytics />
        <ChatSlot />
      </body>
    </html>
  );
}
