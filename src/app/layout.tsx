import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/inter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nezam Nexus | Intelligent Systems for Healthcare Innovation",
  description: "Nezam Nexus - Building intelligent systems for medicine and technology. AI-powered healthcare solutions by Mahdi, an MBBS student passionate about health technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
