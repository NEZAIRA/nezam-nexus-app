'use client';

import Link from 'next/link';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Supra Brain",
      description: "An AI chatbot designed to assist with medical queries and health information. Combines medical knowledge with advanced AI technology.",
      category: "AI Assistant",
      cta: "Learn More"
    },
    {
      id: 2,
      name: "Faster",
      description: "An app to track and check fasting times. Perfect for those following intermittent fasting or religious fasting practices.",
      category: "Health Tracker",
      cta: "Coming Soon"
    }
  ];

  return (
    <section id="products" className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Products & Projects</h2>
        <p className="text-gray-600">Innovative solutions at the intersection of medicine and technology.</p>
      </div>
      
      <div className="space-y-12">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="mx-auto w-48 h-48 flex items-center justify-center mb-6">
              {/* Triangle shape with smooth curves */}
              <div className="relative w-40 h-40">
                <div className="
                  absolute inset-0 
                  w-full h-full 
                  bg-gradient-to-br from-blue-50 to-cyan-50 
                  border-2 border-blue-200 
                  clip-triangle 
                  transform transition-all duration-500 
                  group-hover:rotate-6 group-hover:shadow-xl
                  rounded-[15%]
                "></div>
                <div className="
                  absolute inset-0 
                  w-full h-full 
                  bg-gradient-to-br from-blue-100/30 to-cyan-100/30 
                  clip-triangle 
                  transform transition-all duration-700 
                  group-hover:rotate-12
                  rounded-[15%]
                "></div>
              </div>
            </div>
            
            <div className="text-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-800 bg-cyan-100 rounded-full mb-3">
                {product.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <button className="
                px-6 py-3 bg-blue-900 text-white font-medium rounded-lg 
                hover:bg-blue-800 transition-colors 
                shadow-md hover:shadow-lg
                transform hover:-translate-y-1 transition duration-300
                group-hover:scale-105 transition-transform
              ">
                {product.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      

    </section>
  );
};

export default ProductsSection;