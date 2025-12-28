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
    <section id="products" className="products-section">
      <h2 className="section-title">Our Products</h2>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-triangle">
              <div className="triangle-shape">
                <i className="fas fa-brain"></i>
              </div>
            </div>
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Link href="#" className="btn btn-primary">{product.cta}</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;