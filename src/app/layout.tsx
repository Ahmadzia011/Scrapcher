import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisScroll from "../lib/lenis";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Scrapcher",
  description: "AI chatbot of every given link.",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} h-full antialiased`}
    >
      <LenisScroll><body className="min-h-full flex flex-col">{children}</body></LenisScroll>
    </html>
  );
}
