'use client';

import { useState } from 'react';

const ProductsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Supra Brain",
      description: "AI intelligence platform for medical research and healthcare applications. Advanced natural language processing with medical knowledge integration.",
      icon: "fa-brain",
      category: "AI Intelligence"
    },
    {
      id: 2,
      name: "Faster",
      description: "Advanced fasting and health optimization platform. Personalized tracking with predictive analytics for optimal health outcomes.",
      icon: "fa-apple-alt",
      category: "Health Tech"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="products" className="relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Innovation Showcase</h2>
        
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 md:p-12">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="min-w-full flex-shrink-0 px-4"
              >
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                  <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-6">
                      {product.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">{product.name}</h3>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                      {product.description}
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-bold rounded-xl hover:opacity-90 transition-all transform hover:scale-105">
                      Explore Platform
                    </button>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                      <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
                        <i className={`fas ${product.icon} text-7xl text-cyan-400`}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-cyan-400 w-6' : 'bg-gray-600'}`}
              ></button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {products.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-gray-600 w-2'}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;