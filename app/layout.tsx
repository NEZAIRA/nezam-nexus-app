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
  description: "Nezaira builds intelligent digital health and biotech systems at the intersection of medicine and technology, advancing human health and next-generation healthcare.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Nezaira | Intelligent Systems for Healthcare Innovation",
    description: "Nezaira builds intelligent digital health and biotech systems at the intersection of medicine and technology, advancing human health and next-generation healthcare.",
    url: "https://nezaira.com",
    siteName: "Nezaira",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nezaira | Intelligent Systems for Healthcare Innovation",
    description: "Nezaira builds intelligent digital health and biotech systems at the intersection of medicine and technology, advancing human health and next-generation healthcare.",
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
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                lit: "https://esm.run/lit@^3.3.0",
                "lit/": "https://esm.run/lit@^3.3.0/",
                "@lit/context": "https://esm.run/@lit/context@^1.1.5",
                "@google/genai": "https://esm.run/@google/genai@^1.15.0",
                three: "https://esm.run/three@^0.176.0",
                "three/": "https://esm.run/three@^0.176.0/"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        <main style={{ position: 'relative', minHeight: '100vh' }}>
          {children}
        </main>
        <div id="supra-brain-widget"></div>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
              // Import the SupraBrain Web Component
              import('../SupraBrain-chatbot/index');
              
              // Initialize the widget after the page loads
              document.addEventListener("DOMContentLoaded", function() {
                const widget = document.getElementById('supra-brain-widget');
                if (widget && !widget.querySelector('gdm-live-audio')) {
                  const suprabrain = document.createElement('gdm-live-audio');
                  widget.appendChild(suprabrain);
                }
              });
            `
          }}
        />
        
      </body>
    </html>
  );
}
