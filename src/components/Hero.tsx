import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content max-w-4xl mx-auto text-center relative z-10">
        <div className="floating-element">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Nezaira</span>
          </h1>
        </div>
        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Technology × Medicine × Future Research
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#products" className="futuristic-btn px-8 py-4 bg-[#00c6ff] text-[#0a2540] font-bold rounded-lg text-lg hover:bg-[#00a8e8] transition-all">
            Research Direction
          </Link>
          <Link href="#blog" className="futuristic-btn px-8 py-4 bg-transparent border border-[#00c6ff]/50 text-[#00c6ff] font-bold rounded-lg text-lg hover:bg-[#00c6ff]/10 transition-all">
            Research Insights
          </Link>
        </div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="floating-shape shape-1 absolute w-2 h-2 bg-[#00c6ff] rounded-full pulse"></div>
      <div className="floating-shape shape-2 absolute w-1 h-1 bg-[#0072ff] rounded-full"></div>
      <div className="floating-shape shape-3 absolute w-1.5 h-1.5 bg-[#00c6ff] rounded-full"></div>
    </section>
  );
};

export default Hero;