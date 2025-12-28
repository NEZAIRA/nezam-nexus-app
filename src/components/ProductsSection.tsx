'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const ProductsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const products = [
    {
      id: 1,
      name: "SupraBrain",
      description: "AI assistant for knowledge and intelligence. Combines medical knowledge with advanced AI technology to provide intelligent insights and assistance.",
      category: "AI Assistant",
      cta: "Learn More"
    },
    {
      id: 2,
      name: "Faster",
      description: "Fasting and water tracking app. Perfect for those following intermittent fasting or religious fasting practices with smart hydration monitoring.",
      category: "Health Tracker",
      cta: "Learn More"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#201f1e] mb-4">Our Products</h2>
          <p className="text-xl text-[#605e5c] max-w-2xl mx-auto">
            Innovative solutions at the intersection of artificial intelligence and healthcare
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Product showcase container */}
          <div 
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-lg"
            onMouseDown={() => clearInterval(Number(setInterval(() => {}, 0)))} // Pause auto-advance on interaction
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#f3f2f1] to-white p-12 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0078d4] to-[#106ebe] flex items-center justify-center text-white text-4xl mb-8">
                      <i className="fas fa-brain"></i>
                    </div>
                    <h3 className="text-3xl font-bold text-[#201f1e] mb-4">{product.name}</h3>
                    <span className="inline-block px-3 py-1 bg-[#0078d4]/10 text-[#0078d4] rounded-full text-sm font-semibold mb-6">
                      {product.category}
                    </span>
                    <p className="text-lg text-[#323130] mb-8 max-w-2xl">
                      {product.description}
                    </p>
                    <Link 
                      href="#" 
                      className="px-6 py-3 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors"
                    >
                      {product.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#201f1e] hover:bg-[#f3f2f1] transition-colors z-10"
            aria-label="Previous product"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#201f1e] hover:bg-[#f3f2f1] transition-colors z-10"
            aria-label="Next product"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#0078d4]' : 'bg-[#d2d0ce]'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;