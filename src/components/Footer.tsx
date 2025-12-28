import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">Nezaira</div>
        <p>Innovating the future of medicine & technology</p>
        
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        
        <div className="copyright">
          &copy; {new Date().getFullYear()} Nezaira. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
