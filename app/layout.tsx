import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/inter";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nezaira | Intelligent Systems for Healthcare Innovation",
  description: "Nezaira - Building intelligent systems for medicine and technology. AI-powered healthcare solutions by Mahdi, an MBBS student passionate about health technology.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Nezaira | Intelligent Systems for Healthcare Innovation",
    description: "Nezaira - Building intelligent systems for medicine and technology. AI-powered healthcare solutions by Mahdi, an MBBS student passionate about health technology.",
    url: "https://nezaira.com",
    siteName: "Nezaira",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nezaira | Intelligent Systems for Healthcare Innovation",
    description: "Nezaira - Building intelligent systems for medicine and technology. AI-powered healthcare solutions by Mahdi, an MBBS student passionate about health technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        <main style={{ position: 'relative', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
