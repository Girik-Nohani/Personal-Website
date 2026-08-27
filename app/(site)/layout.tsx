// app/layout.tsx
import type { Metadata } from "next";
import { Jost, Exo_2, } from "next/font/google";
import "../globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });
const exo2 = Exo_2({ variable: "--font-exo2", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://personal-website-three-theta-48.vercel.app'),
  title: "Girik Nohani — Security Analyst",
  description: "Cybersecurity enthusiast specializing in digital forensics and system security.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Girik Nohani",
    locale: "en_US",
    title: "Girik Nohani — Security Analyst",
    description: "Cybersecurity enthusiast specializing in digital forensics and system security.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Girik Nohani — Security Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Girik Nohani — Security Analyst",
    description: "Cybersecurity enthusiast specializing in digital forensics and system security.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${exo2.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-text-primary">{children}</body>
    </html>
  );
}