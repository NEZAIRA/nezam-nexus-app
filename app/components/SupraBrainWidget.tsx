'use client';

import { useEffect } from 'react';

export default function SupraBrainWidget() {
  useEffect(() => {
    // Create widget container
    const widget = document.createElement('div');
    widget.id = 'supra-brain-widget';
    document.body.appendChild(widget);

    // Create the widget HTML with toggle icon initially
    widget.innerHTML = `
      <div id="sb-toggle" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
        <span id="sb-icon" style="font-size: 24px; font-weight: bold; color: #3b82f6;">S</span>
      </div>
      <div id="sb-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; width: 400px; height: 500px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: none; flex-direction: column; font-family: sans-serif; color: #fff;">
        <div id="sb-header" style="background: #1e293b; padding: 15px; text-align: center; color: white; border-bottom: 1px solid #334155; border-radius: 24px 24px 0 0; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0;">SupraBrain AI Assistant</h3>
          <button id="sb-close" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        <div id="sb-body" style="flex: 1; padding: 15px; overflow-y: auto; background: #0f172a; color: #cbd5e1;">
          <p>Hello! I'm SupraBrain, your AI assistant for Nezaira. How can I help you today?</p>
        </div>
        <div id="sb-footer" style="padding: 15px; background: #1e293b; display: flex; border-top: 1px solid #334155; border-radius: 0 0 24px 24px;">
          <input type="text" id="sb-input" placeholder="Ask about Nezaira..." style="flex: 1; padding: 10px; border: 1px solid #475569; border-radius: 8px; background: #1e293b; color: white;" />
          <button id="sb-send" style="margin-left: 10px; padding: 10px 15px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;">Send</button>
        </div>
      </div>
    `;

    // Get elements
    const toggleIcon = document.getElementById('sb-toggle');
    const container = document.getElementById('sb-container');
    const closeBtn = document.getElementById('sb-close') as HTMLButtonElement;
    const sendBtn = document.getElementById('sb-send') as HTMLButtonElement;
    const input = document.getElementById('sb-input') as HTMLInputElement;
    const body = document.getElementById('sb-body') as HTMLElement;

    // Toggle functionality
    const toggleWidget = () => {
      if (container && toggleIcon) {
        if (container.style.display === 'none') {
          container.style.display = 'flex';
          toggleIcon.style.display = 'none';
        } else {
          container.style.display = 'none';
          toggleIcon.style.display = 'flex';
        }
      }
    };

    // Add event listeners
    if (toggleIcon) {
      toggleIcon.addEventListener('click', toggleWidget);
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', toggleWidget);
    }

    if (sendBtn && input && body) {
      const sendMessage = () => {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        const userMsg = document.createElement('p');
        userMsg.innerHTML = '<strong>You:</strong> ' + message;
        userMsg.style.color = '#93c5fd';
        body.appendChild(userMsg);

        // Add bot response
        const botMsg = document.createElement('p');
        botMsg.innerHTML = '<strong>SupraBrain:</strong> I can not proccess your message right now';
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

    // Cleanup function
    return () => {
      if (widget && widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
}