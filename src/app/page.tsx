import Image from "next/image";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogSection from '@/components/BlogSection';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <Hero />
        
        {/* Microscope Lens Interactive Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Interactive <span className="text-blue-600">Microscope Lens</span> Technology
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Experience our cutting-edge visualization tools. Move your cursor around the page to explore microscopic details.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-microscope text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Visualization</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore microscopic details with our interactive lens technology
                  </p>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-brain text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Leverage AI to enhance microscopic image analysis and insights
                  </p>
                </div>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-search text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precision Focus</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    High-precision focusing for detailed microscopic examination
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <BlogSection />
            <ProductsSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}