import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/inter";
import "./globals.css";
import SupraBrainWidget from "./components/SupraBrainWidget";


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
        <SupraBrainWidget />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", function() {
      // Initialize SupraBrain widget
      const widget = document.getElementById('supra-brain-widget');
      if (widget && !widget.hasChildNodes()) {
        // Create the widget HTML
        widget.innerHTML = "<div id=\\\"sb-container\\\" style=\\\"position: fixed; bottom: 20px; right: 20px; z-index: 10000; width: 400px; height: 500px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; flex-direction: column; font-family: sans-serif; color: #fff;\\\">\\n                  <div id=\\\"sb-header\\\" style=\\\"background: #1e293b; padding: 15px; text-align: center; color: white; border-bottom: 1px solid #334155; border-radius: 16px 16px 0 0;\\\">\\n                    <h3>🤖 SupraBrain AI Assistant</h3>\\n                  </div>\\n                  <div id=\\\"sb-body\\\" style=\\\"flex: 1; padding: 15px; overflow-y: auto; background: #0f172a; color: #cbd5e1;\\\">\\n                    <p>Hello! I'm SupraBrain, your AI assistant for Nezaira. How can I help you today?</p>\\n                  </div>\\n                  <div id=\\\"sb-footer\\\" style=\\\"padding: 15px; background: #1e293b; display: flex; border-top: 1px solid #334155; border-radius: 0 0 16px 16px;\\\">\\n                    <input type=\\\"text\\\" id=\\\"sb-input\\\" placeholder=\\\"Ask about Nezaira...\\\" style=\\\"flex: 1; padding: 10px; border: 1px solid #475569; border-radius: 8px; background: #1e293b; color: white;\\\" />\\n                    <button id=\\\"sb-send\\\" style=\\\"margin-left: 10px; padding: 10px 15px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;\\\">Send</button>\\n                  </div>\\n                </div>";
        
        // Add event listeners
        const sendBtn = document.getElementById('sb-send');
        const input = document.getElementById('sb-input');
        const body = document.getElementById('sb-body');
        
        if (sendBtn && input && body) {
          const sendMessage = function() {
            const message = input.value.trim();
            if (!message) return;
            
            // Add user message
            const userMsg = document.createElement('p');
            userMsg.innerHTML = '<strong>You:</strong> ' + message;
            userMsg.style.color = '#93c5fd';
            body.appendChild(userMsg);
            
            // Add bot response
            const botMsg = document.createElement('p');
            botMsg.innerHTML = '<strong>SupraBrain:</strong> This is the SupraBrain AI assistant. In production, I would connect to Google\\\\'s AI API to answer your questions about Nezaira and healthcare innovation.';
            botMsg.style.color = '#a78bfa';
            body.appendChild(botMsg);
            
            input.value = '';
            body.scrollTop = body.scrollHeight;
          };
          
          sendBtn.addEventListener('click', sendMessage);
          input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
          });
        }
      }
    });
  }
})();`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  if (typeof window !== 'undefined') {
    document.addEventListener(\"DOMContentLoaded\", function() {
      const widget = document.getElementById('supra-brain-widget');
      if (widget) {
        // Create widget HTML
        widget.innerHTML = \"<div id=\\\"sb-container\\\" style=\\\"position: fixed; bottom: 20px; right: 20px; z-index: 10000; width: 400px; height: 500px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; flex-direction: column; font-family: sans-serif; color: #fff;\\\">
                      <div id=\\\"sb-header\\\" style=\\\"background: #1e293b; padding: 15px; text-align: center; color: white; border-bottom: 1px solid #334155; border-radius: 16px 16px 0 0;\\\">
                        <h3>🤖 SupraBrain AI Assistant</h3>
                      </div>
                      <div id=\\\"sb-body\\\" style=\\\"flex: 1; padding: 15px; overflow-y: auto; background: #0f172a; color: #cbd5e1;\\\">
                        <p>Hello! I'm SupraBrain, your AI assistant for Nezaira. How can I help you today?</p>
                      </div>
                      <div id=\\\"sb-footer\\\" style=\\\"padding: 15px; background: #1e293b; display: flex; border-top: 1px solid #334155; border-radius: 0 0 16px 16px;\\\">
                        <input type=\\\"text\\\" id=\\\"sb-input\\\" placeholder=\\\"Ask about Nezaira...\\\" style=\\\"flex: 1; padding: 10px; border: 1px solid #475569; border-radius: 8px; background: #1e293b; color: white;\\\" />
                        <button id=\\\"sb-send\\\" style=\\\"margin-left: 10px; padding: 10px 15px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;\\\">Send</button>
                      </div>
                    </div>\";

        // Add functionality
        const sendBtn = document.getElementById('sb-send');
        const input = document.getElementById('sb-input');
        const body = document.getElementById('sb-body');

        if (sendBtn && input && body) {
          sendBtn.addEventListener('click', function() {
            const message = input.value.trim();

            if (message) {
              // Add user message
              const userMsg = document.createElement('p');
              userMsg.innerHTML = '<strong>You:</strong> ' + message;
              userMsg.style.color = '#93c5fd';
              body.appendChild(userMsg);

              // Add bot response
              const botMsg = document.createElement('p');
              botMsg.innerHTML = '<strong>SupraBrain:</strong> This is the SupraBrain AI assistant. In production, I would connect to Google\\'s AI API to answer your questions about Nezaira and healthcare innovation.';
              botMsg.style.color = '#a78bfa';
              body.appendChild(botMsg);

              input.value = '';
              body.scrollTop = body.scrollHeight;
            }
          });

          input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              sendBtn.click();
            }
          });
        }
      }
    });
  }
})();`
          }}
        />
      </body>
    </html>
  );
}
