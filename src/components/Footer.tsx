import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="footer-logo text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Nezaira</div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Advancing the intersection of technology, medicine, and future research. Building intelligent systems for a healthier tomorrow.</p>
          
          <div className="footer-links flex flex-wrap justify-center gap-6 mb-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-cyan-400 transition-colors">Products</Link>
            <Link href="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors">Blog</Link>
            <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
          
          <div className="copyright text-gray-500">
            &copy; {new Date().getFullYear()} Nezaira. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;