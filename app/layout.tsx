import type { Metadata } from "next";
import { Exo_2, Jost } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  weight: ["400", "600", "700", "800"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Girik Nohani",
    default: "Girik Nohani — Cybersecurity Professional",
  },
  description: "Personal portfolio of Girik Nohani — cybersecurity enthusiast specializing in digital forensics and system security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} ${jost.variable} bg-page text-gray-2 font-jost`}>
        {children}
      </body>
    </html>
  );
}