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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        <main style={{ position: 'relative', minHeight: '100vh' }}>
          {children}
        </main>
        
        {/* SupraBrain Widget */}
        <div id="supra-brain-widget" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: '99999' }}>
          <div className="launcher" style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: '#ffffff', 
            border: '3px solid #eef2f7', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div className="logo-s" style={{ 
                fontSize: '32px', 
                fontWeight: '900', 
                color: '#00d2ff', 
                userSelect: 'none', 
                lineHeight: '1',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                S
              </div>
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#28a745',
                border: '2px solid white'
              }}></div>
            </div>
          </div>
        </div>
        
        {/* SupraBrain Welcome Message */}
        <div id="supra-brain-welcome" style={{ 
          position: 'fixed', 
          bottom: '110px', 
          right: '30px', 
          zIndex: '99998',
          background: 'rgba(8, 12, 20, 0.98)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '16px 24px',
          maxWidth: '280px',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          display: 'none',
          opacity: '0',
          transform: 'scale(0.9) translateY(10px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#00d2ff', marginBottom: '4px' }}>SupraBrain</div>
            <div>I'm glad to help you!</div>
          </div>
        </div>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Show the welcome message after 8 seconds
                setTimeout(function() {
                  const welcomeMsg = document.getElementById('supra-brain-welcome');
                  if (welcomeMsg) {
                    welcomeMsg.style.display = 'block';
                    // Trigger the animation
                    setTimeout(function() {
                      welcomeMsg.style.opacity = '1';
                      welcomeMsg.style.transform = 'scale(1) translateY(0)';
                      
                      // Hide the message after 5 seconds
                      setTimeout(function() {
                        welcomeMsg.style.opacity = '0';
                        welcomeMsg.style.transform = 'scale(0.9) translateY(10px)';
                        
                        // Hide element after animation completes
                        setTimeout(function() {
                          welcomeMsg.style.display = 'none';
                        }, 500);
                      }, 5000);
                    }, 10);
                  }
                }, 8000);
              });
            `
          }}
        />
      </body>
    </html>
  );
}
