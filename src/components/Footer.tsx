import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#ffffff] border-t border-[#e1dfdd] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="footer-logo text-2xl font-bold mb-4 text-[#201f1e]">Nezaira</div>
          <p className="text-[#605e5c] mb-6 max-w-2xl mx-auto">Advancing the intersection of technology, medicine, and future research. Building intelligent systems for a healthier tomorrow.</p>
          
          <div className="footer-links flex flex-wrap justify-center gap-6 mb-6">
            <Link href="/" className="text-[#323130] hover:text-[#0078d4] transition-colors">Home</Link>
            <Link href="/products" className="text-[#323130] hover:text-[#0078d4] transition-colors">Products</Link>
            <Link href="/blog" className="text-[#323130] hover:text-[#0078d4] transition-colors">Research</Link>
            <Link href="/about" className="text-[#323130] hover:text-[#0078d4] transition-colors">About</Link>
            <Link href="/contact" className="text-[#323130] hover:text-[#0078d4] transition-colors">Contact</Link>
            <Link href="/admin" className="text-[#323130] hover:text-[#0078d4] transition-colors">Admin</Link>
          </div>
          
          <div className="social-links flex justify-center gap-4 mb-6">
            <a href="#" className="w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#f3f2f1] flex items-center justify-center text-[#0078d4] hover:bg-[#edebe9] transition-colors">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          
          <div className="copyright text-[#605e5c] text-sm">
            &copy; {new Date().getFullYear()} Nezaira. All rights reserved. | Building the future of medical technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
