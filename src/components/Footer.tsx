import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0a0e1a] border-t border-[#00c6ff]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="footer-logo gradient-text text-3xl font-bold mb-4">Nezaira</div>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Advancing the intersection of technology, medicine, and future research. Building intelligent systems for a healthier tomorrow.</p>
          
          <div className="footer-links flex flex-wrap justify-center gap-6 mb-8">
            <Link href="/" className="text-gray-300 hover:text-[#00c6ff] transition-colors">Home</Link>
            <Link href="/products" className="text-gray-300 hover:text-[#00c6ff] transition-colors">Research</Link>
            <Link href="/blog" className="text-gray-300 hover:text-[#00c6ff] transition-colors">Insights</Link>
            <Link href="/about" className="text-gray-300 hover:text-[#00c6ff] transition-colors">About</Link>
            <Link href="/contact" className="text-gray-300 hover:text-[#00c6ff] transition-colors">Contact</Link>
            <Link href="/admin" className="text-gray-300 hover:text-[#00c6ff] transition-colors">Admin</Link>
          </div>
          
          <div className="social-links flex justify-center gap-6 mb-8">
            <a href="#" className="w-10 h-10 rounded-full bg-[#0a2540] flex items-center justify-center text-gray-300 hover:text-[#00c6ff] transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#0a2540] flex items-center justify-center text-gray-300 hover:text-[#00c6ff] transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#0a2540] flex items-center justify-center text-gray-300 hover:text-[#00c6ff] transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          
          <div className="copyright text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Nezaira. All rights reserved. | Building the future of medical technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
