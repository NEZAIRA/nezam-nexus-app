import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      
      <h1>Innovating the future of medicine & technology, one small step at a time.</h1>
      <p>Creating intelligent systems that bridge the gap between medical expertise and technological innovation.</p>
      
      <div className="cta-buttons">
        <Link href="#products" className="btn btn-primary">Explore Products</Link>
        <Link href="#blog" className="btn btn-secondary">Read Blog</Link>
      </div>
    </section>
  );
};

export default Hero;