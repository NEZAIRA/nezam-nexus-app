'use client';

import Link from 'next/link';

const ProductsSection = () => {
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

  return (
    <section id="products" className="products-section">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Research & Innovation</h2>
        
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
                <Link href="#" className="btn btn-primary">
                  {product.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;