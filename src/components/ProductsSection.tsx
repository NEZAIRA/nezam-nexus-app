'use client';

import Link from 'next/link';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: "Supra Brain",
      description: "AI assistant for knowledge and intelligence. Combines medical knowledge with advanced AI technology to provide intelligent insights and assistance.",
      category: "AI Assistant",
      cta: "Try Demo"
    },
    {
      id: 2,
      name: "Faster",
      description: "Fasting and water tracking app. Perfect for those following intermittent fasting or religious fasting practices with smart hydration monitoring.",
      category: "Health Tracker",
      cta: "Try Demo"
    }
  ];

  return (
    <section id="products" className="relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 border border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-4">
                  <i className={`fas ${product.id === 1 ? 'fa-brain' : 'fa-glass-whiskey'} text-white`}></i>
                </div>
                <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">{product.category}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{product.name}</h3>
              <p className="text-gray-300 mb-6">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <Link href="#" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-bold rounded-lg hover:opacity-90 transition-all">
                  {product.cta}
                </Link>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;