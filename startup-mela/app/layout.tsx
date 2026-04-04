import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Footer from "@/components/ui/footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup Mela",
  description: "Startup Mela is the entrepreneurship fest organized by E-Cell SMVIT, aimed at fostering innovation, startup culture, and connecting founders with investors. This repository contains the official web platform built with a modern full-stack architecture. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Script 
          src="https://sdk.cashfree.com/js/v3/cashfree.js" 
          strategy="beforeInteractive" 
        />
        <Footer/>
      </body>
    </html>
  );
}
