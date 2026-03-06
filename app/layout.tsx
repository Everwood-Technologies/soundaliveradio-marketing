import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import heroBg from "@/app/assets/hero-bg.png";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Sound Alive Radio - The World's First Fully Decentralized Radio Network",
    template: "%s | Sound Alive Radio",
  },
  description:
    "Powered by Evernode DePIN on XRPL. 24/7 streaming, no middlemen, direct artist-to-listener connections and crypto payouts. Developed by Super Producer E. Smitty.",
  openGraph: {
    title: "Sound Alive Radio - The World's First Fully Decentralized Radio Network",
    description:
      "Powered by Evernode DePIN. 24/7 streaming, no gatekeepers, blockchain-driven broadcasting. soundaliveradio.net",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sound Alive Radio - The World's First Fully Decentralized Radio Network",
    description:
      "Powered by Evernode DePIN. 24/7 streaming. No middlemen. @SoundAliveRadio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ ["--hero-bg-url" as string]: `url(${heroBg.src})` }}>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen pb-20`}>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Nav />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
