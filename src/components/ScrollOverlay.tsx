'use client';

import { useEffect } from 'react';

const ScrollOverlay = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1) for each section
      const heroSection = document.getElementById('hero-section');
      const innovationSection = document.getElementById('innovation-section');
      const contactSection = document.getElementById('contact-section');
      
      if (heroSection && innovationSection && contactSection) {
        // When we've scrolled 100% of the first screen height, start showing innovation section
        if (scrollPosition >= windowHeight) {
          innovationSection.style.transform = 'translateY(0)';
        } else {
          innovationSection.style.transform = `translateY(${100 - (scrollPosition / windowHeight) * 100}%)`;
        }
        
        // When we've scrolled 200% of the screen height, start showing contact section
        if (scrollPosition >= windowHeight * 2) {
          contactSection.style.transform = 'translateY(0)';
        } else if (scrollPosition >= windowHeight) {
          const progress = (scrollPosition - windowHeight) / windowHeight;
          contactSection.style.transform = `translateY(${100 - progress * 100}%)`;
        } else {
          contactSection.style.transform = 'translateY(100%)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct positions
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollOverlay;