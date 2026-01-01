'use client';

import { useEffect } from 'react';

export default function SupraBrainWidget() {
  useEffect(() => {
    // Dynamically load the SupraBrain Web Component
    const loadSupraBrain = async () => {
      // Check if the custom element is already defined
      if (!customElements.get('gdm-live-audio')) {
        // The Web Component will be defined via the layout importmap
        // We just need to ensure it's properly loaded
        console.log('SupraBrain Web Component will be loaded via layout importmap');
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