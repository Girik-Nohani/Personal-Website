// app/layout.tsx
import type { Metadata } from "next";
import { Jost, Exo_2, } from "next/font/google";
import "../globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });
const exo2 = Exo_2({ variable: "--font-exo2", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Girik Nohani — Security Analyst",
  description: "Cybersecurity enthusiast specializing in digital forensics and system security.",
  openGraph: {
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