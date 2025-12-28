import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content max-w-4xl mx-auto text-center relative z-10">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Nezaira
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Technology × Medicine × Future Research
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#products" className="btn btn-primary">
            Research Direction
          </Link>
          <Link href="#blog" className="btn btn-secondary">
            Research Insights
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;