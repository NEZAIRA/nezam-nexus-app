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
    <section id="products" className="products-section py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-4xl font-bold text-center mb-16">Research & Innovation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="glass-effect p-8 rounded-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00c6ff]/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] flex items-center justify-center mr-4">
                  <i className="fas fa-brain text-white"></i>
                </div>
                <span className="text-[#00c6ff] font-semibold text-sm uppercase tracking-wider">{product.category}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
              <p className="text-gray-300 mb-6">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <Link href="#" className="futuristic-btn px-6 py-2 bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg hover:bg-[#00a8e8] transition-all">
                  {product.cta}
                </Link>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#00c6ff]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#0072ff]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#00c6ff]"></div>
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