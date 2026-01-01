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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                lit: "https://esm.sh/lit@^3.3.0",
                "lit/": "https://esm.sh/lit@^3.3.0/",
                "@lit/context": "https://esm.sh/@lit/context@^1.1.5",
                "@google/genai": "https://esm.sh/@google/genai@^1.15.0",
                three: "https://esm.sh/three@^0.176.0",
                "three/": "https://esm.sh/three@^0.176.0/"
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
        <div dangerouslySetInnerHTML={{ __html: '<gdm-live-audio></gdm-live-audio>' }} />
        <script type="module" src="https://cdn.jsdelivr.net/gh/NEZAIRA/SupraBrain-chatbot@main/dist/index.js"></script>
      </body>
    </html>
  );
}
