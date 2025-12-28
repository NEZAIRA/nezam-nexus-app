import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content max-w-4xl mx-auto text-center relative z-10">
        <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#201f1e]">
          Building the Future of Medicine & Technology
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-[#605e5c] mb-10 max-w-3xl mx-auto">
          Nezaira combines artificial intelligence with medical research to create innovative healthcare solutions.
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#products" className="px-8 py-3 bg-[#0078d4] text-white font-semibold rounded-md hover:bg-[#106ebe] transition-colors">
            Explore Products
          </Link>
          <Link href="#blog" className="px-8 py-3 bg-white border border-[#0078d4] text-[#0078d4] font-semibold rounded-md hover:bg-[#f3f2f1] transition-colors">
            Research Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;