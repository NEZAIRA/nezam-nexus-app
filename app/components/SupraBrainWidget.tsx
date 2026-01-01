'use client';

import { useEffect } from 'react';

export default function SupraBrainWidget() {
  useEffect(() => {
    // Dynamically load the SupraBrain Web Component
    const loadSupraBrain = async () => {
      // Check if the custom element is already defined
      if (!customElements.get('gdm-live-audio')) {
        // Import the necessary modules and define the custom element
        // Since we don't have the complete implementation, we'll create a basic version
        // that matches the provided CSS and functionality
        class GdmLiveAudio extends HTMLElement {
          private isRecording = false;
          private isOpen = false;
          private transcriptionHistory: { id: string; role: 'user' | 'model'; text: string }[] = [];
          private currentInput = '';
          private currentOutput = '';
          private isOnline = navigator.onLine;
          private status = 'SUPRABRAIN IDLE';
          private error = '';

          constructor() {
            super();
            this.setupShadowDOM();
          }

          private setupShadowDOM() {
            const shadow = this.attachShadow({ mode: 'open' });
            
            // Include the CSS styles
            const style = document.createElement('style');
            style.textContent = `
              :host {
                --primary: #00d2ff;
                --accent: #ff3366;
                --panel-bg: rgba(8, 12, 20, 0.98);
                --glass: rgba(255, 255, 255, 0.08);
                
                display: block;
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 99999;
                font-family: 'Inter', system-ui, sans-serif;
                color: #fff;
              }

              .launcher {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #ffffff;
                border: 3px solid #eef2f7;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
              }

              .launcher:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 15px rgba(0, 210, 255, 0.3);
              }

              .launcher.active { border-color: var(--primary); }

              .launcher .logo-s {
                font-size: 32px;
                font-weight: 900;
                color: var(--primary);
                user-select: none;
                line-height: 1;
              }

              .chat-panel {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 400px;
                height: 620px;
                max-height: calc(100vh - 120px);
                background: var(--panel-bg);
                backdrop-filter: blur(30px);
                border: 1px solid var(--glass);
                border-radius: 24px;
                display: flex;
                flex-direction: column;
                transform-origin: bottom right;
                transform: scale(0.9) translateY(20px);
                opacity: 0;
                pointer-events: none;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                box-shadow: 0 40px 80px rgba(0,0,0,0.9);
                overflow: hidden;
              }

              .chat-panel.open {
                transform: scale(1) translateY(0);
                opacity: 1;
                pointer-events: auto;
              }

              .chat-header {
                padding: 20px 24px;
                background: linear-gradient(to bottom, rgba(0,210,255,0.1), transparent);
                border-bottom: 1px solid var(--glass);
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              .chat-header h2 {
                margin: 0;
                font-size: 14px;
                letter-spacing: 5px;
                text-transform: uppercase;
                font-weight: 300;
                color: #fff;
              }

              .status-line {
                padding: 8px 24px;
                font-size: 8px;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: var(--primary);
                background: rgba(0,0,0,0.4);
                border-bottom: 1px solid var(--glass);
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .status-line .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 5px var(--primary); }
              .status-line.recording { color: var(--accent); }
              .status-line.recording .dot { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
              .status-line.error { color: var(--accent); font-weight: bold; }

              .transcript-area {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 24px;
                scrollbar-width: none;
              }

              .transcript-area::-webkit-scrollbar { display: none; }

              .message {
                max-width: 85%;
                font-size: 13.5px;
                line-height: 1.6;
                animation: msgIn 0.4s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
                position: relative;
              }

              @keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

              .message.user { align-self: flex-end; text-align: right; color: #fff; }
              .message.model { align-self: flex-start; border-left: 2px solid var(--primary); padding-left: 15px; color: #d0d0d0; }

              .speaker-btn {
                background: rgba(0, 210, 255, 0.05);
                border: 1px solid rgba(0, 210, 255, 0.1);
                color: var(--primary);
                cursor: pointer;
                padding: 6px 12px;
                font-size: 9px;
                letter-spacing: 1px;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s;
                width: fit-content;
                border-radius: 6px;
                margin-top: 8px;
              }

              .speaker-btn.active { background: var(--primary); color: #000; }

              .message-label {
                font-size: 7px;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 6px;
                opacity: 0.4;
                font-weight: 800;
              }

              .input-controls {
                padding: 20px;
                background: rgba(0,0,0,0.4);
                border-top: 1px solid var(--glass);
              }

              .text-bar {
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(255,255,255,0.05);
                border: 1px solid var(--glass);
                border-radius: 20px;
                padding: 4px 8px 4px 16px;
              }

              .text-input {
                flex: 1;
                background: none;
                border: none;
                color: #fff;
                font-size: 13.5px;
                outline: none;
                padding: 10px 0;
              }

              .text-input::placeholder { color: rgba(255,255,255,0.2); }

              .action-btn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                border: none;
                background: transparent;
                color: rgba(255,255,255,0.6);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
              }

              .action-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
              .action-btn.send { background: var(--primary); color: #000; }
              .action-btn.mic.active { color: var(--accent); background: rgba(255, 51, 102, 0.1); }
            `;

            shadow.appendChild(style);

            // Create the widget HTML
            shadow.innerHTML += `
              <div class="launcher">
                <div class="logo-s">S</div>
              </div>
              
              <div class="chat-panel">
                <div class="chat-header">
                  <h2>SUPRABRAIN</h2>
                </div>
                
                <div class="status-line">
                  <div class="dot"></div>
                  <span>SUPRABRAIN IDLE</span>
                </div>
                
                <div class="transcript-area">
                  <div class="message model">
                    <div class="message-label">MODEL</div>
                    <div>Hello! I'm SupraBrain, your AI assistant for Nezaira powered by Google AI. How can I help you today?</div>
                  </div>
                </div>
                
                <div class="input-controls">
                  <div class="text-bar">
                    <input type="text" class="text-input" placeholder="Ask about Nezaira..." />
                    <button class="action-btn send">
                      <i class="fas fa-paper-plane"></i>
                    </button>
                    <button class="action-btn mic">
                      <i class="fas fa-microphone"></i>
                    </button>
                  </div>
                </div>
              </div>
            `;

            // Add event listeners
            const launcher = shadow.querySelector('.launcher');
            const chatPanel = shadow.querySelector('.chat-panel');
            const sendBtn = shadow.querySelector('.action-btn.send');
            const micBtn = shadow.querySelector('.action-btn.mic');
            const input = shadow.querySelector('.text-input') as HTMLInputElement;
            const transcriptArea = shadow.querySelector('.transcript-area');
            const statusLine = shadow.querySelector('.status-line span');

            if (launcher && chatPanel) {
              launcher.addEventListener('click', () => {
                chatPanel.classList.toggle('open');
              });
            }

            if (sendBtn && input && transcriptArea) {
              const sendMessage = () => {
                const message = input.value.trim();
                if (!message) return;

                // Add user message
                const userMsg = document.createElement('div');
                userMsg.className = 'message user';
                userMsg.innerHTML = `
                  <div class="message-label">USER</div>
                  <div>${message}</div>
                `;
                transcriptArea.appendChild(userMsg);

                // Add bot response using Google AI API
                const botMsg = document.createElement('div');
                botMsg.className = 'message model';
                botMsg.innerHTML = `
                  <div class="message-label">MODEL</div>
                  <div>Processing...</div>
                `;
                transcriptArea.appendChild(botMsg);

                // Google AI API call
                const API_KEY = 'gen-lang-client-0296186778';
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
                
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    contents: [{
                      parts: [{
                        text: message
                      }]
                    }]
                  })
                })
                .then(response => response.json())
                .then(data => {
                  if (data.candidates && data.candidates[0].content.parts[0].text) {
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    botMsg.innerHTML = `
                      <div class="message-label">MODEL</div>
                      <div>${aiResponse}</div>
                    `;
                  } else {
                    botMsg.innerHTML = `
                      <div class="message-label">MODEL</div>
                      <div>I can not proccess your message right now</div>
                    `;
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                  botMsg.innerHTML = `
                    <div class="message-label">MODEL</div>
                    <div>I can not proccess your message right now</div>
                  `;
                });

                input.value = '';
                transcriptArea.scrollTop = transcriptArea.scrollHeight;
              };

              sendBtn.addEventListener('click', sendMessage);
              input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
              });
            }

            if (micBtn) {
              micBtn.addEventListener('click', () => {
                micBtn.classList.toggle('active');
                if (micBtn.classList.contains('active')) {
                  micBtn.innerHTML = '<i class="fas fa-stop"></i>';
                  if (statusLine) statusLine.textContent = 'LISTENING...';
                } else {
                  micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                  if (statusLine) statusLine.textContent = 'SUPRABRAIN IDLE';
                }
              });
            }
          }
        }

        // Define the custom element
        customElements.define('gdm-live-audio', GdmLiveAudio);
      }

      // Create the widget container
      const existingWidget = document.getElementById('supra-brain-widget');
      if (!existingWidget) {
        const widget = document.createElement('div');
        widget.id = 'supra-brain-widget';
        document.body.appendChild(widget);

        // Add Font Awesome for icons
        if (!document.querySelector('link[href*="fontawesome"]')) {
          const faLink = document.createElement('link');
          faLink.rel = 'stylesheet';
          faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
          document.head.appendChild(faLink);
        }

        // Create the Web Component instance
        const suprabrain = document.createElement('gdm-live-audio');
        widget.appendChild(suprabrain);
      }
    };

    loadSupraBrain();

    // Cleanup function
    return () => {
      const widget = document.getElementById('supra-brain-widget');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
}