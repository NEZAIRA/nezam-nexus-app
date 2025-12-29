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
    <section id="products" className="py-16 products-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Innovation Portfolio</h2>
        
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="min-w-full flex-shrink-0 px-4"
              >
                <div className="flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
                  <div className="flex-1 text-center md:text-left">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                      {product.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-lg mx-auto md:mx-0">
                      {product.description}
                    </p>
                    {product.name === "Supra Brain" && (
                      <ul className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto md:mx-0 list-disc pl-5 space-y-1">
                        <li>Advanced NLP for medical texts</li>
                        <li>Real-time research analysis</li>
                        <li>Predictive healthcare insights</li>
                        <li>Multi-modal data processing</li>
                      </ul>
                    )}
                    <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm mt-6">
                      {product.name === "Supra Brain" ? "In process of developing" : product.name === "Faster" ? "modern fasting app v1 published 2025/12/26" : "Learn More"}
                    </button>
                  </div>
                  
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center border border-blue-200 dark:border-blue-800/50">
                      <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-blue-200 dark:bg-blue-800/30 flex items-center justify-center">
                        <i className={`fas ${product.icon} text-5xl text-blue-600 dark:text-blue-400`}></i>
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10 shadow-sm"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10 shadow-sm"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;