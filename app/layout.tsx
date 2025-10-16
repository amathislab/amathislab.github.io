import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkipLink } from "@/components/layout/SkipLink";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathis Group | Computational Neuroscience & Machine Learning",
  description: "We work at the intersection of computational neuroscience and machine learning to understand behavior and reverse-engineer brain algorithms.",
  keywords: ["neuroscience", "machine learning", "computational neuroscience", "DeepLabCut", "motor control", "EPFL"],
  authors: [{ name: "Alexander Mathis" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Mathis Group | Computational Neuroscience & Machine Learning",
    description: "We work at the intersection of computational neuroscience and machine learning to understand behavior and reverse-engineer brain algorithms.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
