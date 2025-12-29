'use client';

import Image from "next/image";
import { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogSection from '@/components/BlogSection';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';
import ScrollOverlay from '@/components/ScrollOverlay';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Function to handle scroll events and check if page 2 is fully visible
      const handleScroll = () => {
        // Calculate scroll progress based on the scrollable area
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Based on ScrollOverlay logic, innovation section is fully visible when scrollY >= windowHeight
        // At that point, the section has moved from translateY(100%) to translateY(0%)
        if (scrollY >= windowHeight) {
          // Page 2 is fully visible, play the video
          if (video.ended) {
            video.currentTime = 0;
          }
          video.play().catch(e => console.log("Autoplay prevented: ", e));
        } else {
          // Page 2 is not fully visible, pause the video
          video.pause();
        }
      };
      
      // Initial check
      handleScroll();
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
      
      // Clean up
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Navbar />
          
      {/* Fixed Hero Section - stays in place */}
      <div className="fixed top-0 left-0 w-full h-screen z-10" id="hero-section">
        <Hero />
      </div>
          
      {/* Scrollable area that pushes other sections up */}
      <div className="h-screen" style={{ height: '300vh' }}>
        {/* This is just for scroll area */}
        <div className="h-full"></div>
      </div>
          
      {/* Innovation Section - slides up from bottom to cover hero */}
      <div className="fixed bottom-0 left-0 w-full h-screen z-20" id="innovation-section" style={{ transform: 'translateY(100%)' }}>
        <section id="innovation" className="w-full h-screen">
          <div className="w-full h-full rounded-tl-[80px] rounded-tr-[80px] relative overflow-hidden">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              src="/vecteezy_seasonal-blue-sparkle-background_74140680.mp4"
              autoPlay
              muted
              playsInline
              ref={videoRef}
            />
            <div className="w-full h-full bg-black/30 rounded-tl-[80px] rounded-tr-[80px] flex items-center justify-center relative z-10">
              <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Company <span className="text-cyan-300">Blogs & Innovation</span>
                  </h2>
                  <p className="text-xl text-gray-200 mb-12">
                    Discover our latest research, innovations, and insights in biotechnology.
                  </p>
                        
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-flask text-cyan-300 text-xl"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Research Insights</h3>
                      <p className="text-gray-200">
                        Latest findings in medical research and biotechnology
                      </p>
                    </div>
                          
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-lightbulb text-cyan-300 text-xl"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Innovation Hub</h3>
                      <p className="text-gray-200">
                        Cutting-edge innovations transforming healthcare
                      </p>
                    </div>
                          
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/30 flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-newspaper text-cyan-300 text-xl"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Blog Updates</h3>
                      <p className="text-gray-200">
                        Latest articles and thought leadership
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
            
      {/* Contact Section - slides up from bottom to cover innovation */}
      <div className="fixed bottom-0 left-0 w-full h-screen z-30" id="contact-section" style={{ transform: 'translateY(100%)' }}>
        <section id="contact" className="w-full h-screen">
          <div 
            className="w-full h-full rounded-tl-[80px] rounded-tr-[80px]"
            style={{
              backgroundImage: `url('/clay-banks-LjqARJaJotc-unsplash.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="w-full h-full bg-black/40 rounded-tl-[80px] rounded-tr-[80px] flex items-center justify-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Quick Access & <span className="text-indigo-300">Contact</span>
                  </h2>
                  <p className="text-xl text-gray-200 mb-12">
                    Get in touch with us and access important resources quickly.
                  </p>
                      
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
                      <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            
                      <div className="space-y-4 text-left">
                        <div className="flex items-center">
                          <i className="fas fa-envelope text-indigo-300 mr-3"></i>
                          <span className="text-gray-200">contact@nezaira.com</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fas fa-map-marker-alt text-indigo-300 mr-3"></i>
                          <span className="text-gray-200">Xi'an, China</span>
                        </div>
                      </div>
                    </div>
                          
                    <div className="p-8 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
                      <h3 className="text-2xl font-bold text-white mb-6">Quick Access</h3>
                            
                      <div className="space-y-4 text-left">
                        <a href="/products" className="flex items-center text-gray-200 hover:text-indigo-300 transition-colors">
                          <i className="fas fa-cube text-indigo-300 mr-3"></i>
                          <span>Our Products</span>
                        </a>
                        <a href="#blog" className="flex items-center text-gray-200 hover:text-indigo-300 transition-colors">
                          <i className="fas fa-blog text-indigo-300 mr-3"></i>
                          <span>Company Blog</span>
                        </a>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
          
      {/* Scroll Overlay Controller */}
      <ScrollOverlay />
          
      <Footer />
    </div>
  );
}