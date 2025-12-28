import Image from "next/image";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BlogSection from '@/components/BlogSection';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navbar />
      <main>
        <Hero />
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BlogSection />
            <ProductsSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}