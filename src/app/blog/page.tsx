'use client';

import Link from 'next/link';
import { useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to calculate reading time based on word count
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of AI in Healthcare Diagnosis",
      excerpt: "Exploring how artificial intelligence is revolutionizing diagnostic medicine and improving patient outcomes.",
      content: "Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.",
      date: "December 27, 2025",
      category: "AI",
      readTime: calculateReadingTime("Exploring how artificial intelligence is revolutionizing diagnostic medicine and improving patient outcomes. Artificial intelligence is transforming healthcare in unprecedented ways. From diagnostic algorithms that can detect diseases earlier than human doctors to predictive models that anticipate patient deterioration, AI is revolutionizing how we approach medicine. These technologies are not meant to replace healthcare professionals but to augment their capabilities, allowing them to focus on what they do best - providing compassionate care to patients. The integration of AI in healthcare systems is creating more efficient workflows, reducing medical errors, and ultimately improving patient outcomes.")
    },
    {
      id: 2,
      title: "Innovative Approaches to Health Data Security",
      excerpt: "Protecting sensitive patient information while enabling advanced analytics and AI applications.",
      content: "Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.",
      date: "December 26, 2025",
      category: "Technology",
      readTime: calculateReadingTime("Protecting sensitive patient information while enabling advanced analytics and AI applications. Healthcare data security is a critical concern as medical institutions increasingly rely on digital systems. With the rise of AI applications in healthcare, protecting sensitive patient information while enabling advanced analytics presents unique challenges. Modern encryption techniques, blockchain technology, and federated learning approaches are creating new paradigms for secure health data management. These solutions ensure that patient privacy is maintained while still allowing researchers and clinicians to access the data they need to improve care and develop new treatments.")
    },
    {
      id: 3,
      title: "Medical Education in the Digital Age",
      excerpt: "How modern approaches are leveraging technology to enhance learning and practice.",
      content: "Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.",
      date: "December 25, 2025",
      category: "Medicine",
      readTime: calculateReadingTime("How modern approaches are leveraging technology to enhance learning and practice. Medical education has undergone significant changes with the integration of digital technologies. Virtual reality simulations allow students to practice procedures in risk-free environments, while AI-powered learning platforms adapt to individual student needs. Online resources provide access to vast medical knowledge, and telemedicine experiences offer new perspectives on patient care. These innovations are preparing the next generation of physicians with skills that blend traditional medical knowledge with cutting-edge technological capabilities, creating more versatile and effective healthcare providers.")
    },
    {
      id: 4,
      title: "Ethical Considerations in AI Healthcare",
      excerpt: "Examining the ethical implications of artificial intelligence in medical decision-making.",
      content: "As artificial intelligence becomes more prevalent in healthcare, ethical considerations become increasingly important. Questions of bias in AI algorithms, patient consent for AI-assisted diagnosis, and the responsibility for AI-driven medical decisions require careful consideration. Healthcare institutions must develop frameworks that ensure AI is used in ways that prioritize patient welfare, maintain human oversight, and preserve the doctor-patient relationship that is fundamental to quality care.",
      date: "December 24, 2025",
      category: "Future Innovations",
      readTime: calculateReadingTime("Examining the ethical implications of artificial intelligence in medical decision-making. As artificial intelligence becomes more prevalent in healthcare, ethical considerations become increasingly important. Questions of bias in AI algorithms, patient consent for AI-assisted diagnosis, and the responsibility for AI-driven medical decisions require careful consideration. Healthcare institutions must develop frameworks that ensure AI is used in ways that prioritize patient welfare, maintain human oversight, and preserve the doctor-patient relationship that is fundamental to quality care.")
    },
    {
      id: 5,
      title: "Telemedicine: Bridging Healthcare Gaps",
      excerpt: "How remote healthcare solutions are expanding access to medical expertise worldwide.",
      content: "Telemedicine has emerged as a powerful tool for expanding access to healthcare, particularly in underserved areas. Through video consultations, remote monitoring, and digital health platforms, patients can now access specialist care without the need for travel. This technology has proven especially valuable during global health challenges, enabling continuity of care while maintaining safety protocols. The future of telemedicine includes more sophisticated remote diagnostic tools and AI-assisted preliminary assessments.",
      date: "December 23, 2025",
      category: "Technology",
      readTime: calculateReadingTime("How remote healthcare solutions are expanding access to medical expertise worldwide. Telemedicine has emerged as a powerful tool for expanding access to healthcare, particularly in underserved areas. Through video consultations, remote monitoring, and digital health platforms, patients can now access specialist care without the need for travel. This technology has proven especially valuable during global health challenges, enabling continuity of care while maintaining safety protocols. The future of telemedicine includes more sophisticated remote diagnostic tools and AI-assisted preliminary assessments.")
    },
    {
      id: 6,
      title: "Personalized Medicine Through AI",
      excerpt: "Tailoring treatments to individual genetic profiles using machine learning algorithms.",
      content: "Personalized medicine represents the future of healthcare, where treatments are tailored to individual patients based on their genetic makeup, lifestyle, and medical history. AI algorithms can analyze vast amounts of patient data to identify patterns and predict treatment responses, leading to more effective therapies with fewer side effects. This approach moves beyond one-size-fits-all treatments toward precision medicine that maximizes therapeutic benefits while minimizing risks.",
      date: "December 22, 2025",
      category: "Medicine",
      readTime: calculateReadingTime("Tailoring treatments to individual genetic profiles using machine learning algorithms. Personalized medicine represents the future of healthcare, where treatments are tailored to individual patients based on their genetic makeup, lifestyle, and medical history. AI algorithms can analyze vast amounts of patient data to identify patterns and predict treatment responses, leading to more effective therapies with fewer side effects. This approach moves beyond one-size-fits-all treatments toward precision medicine that maximizes therapeutic benefits while minimizing risks.")
    }
  ];

  const categories = ['All', 'Medicine', 'Technology', 'AI', 'Future Innovations'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="blog-section py-24 px-4">
        <h2 className="section-title mb-12">Blog & Research</h2>
        
        <div className="category-filters flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn px-6 py-2 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-[#00c6ff] text-[#0a2540] font-medium' 
                  : 'bg-[#0a2540] text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="search-container max-w-2xl mx-auto mb-12 relative">
          <i className="fas fa-search search-icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            className="search-input w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00c6ff]"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2">
              <div className="blog-image h-48 bg-gradient-to-r from-[#0a2540] to-[#0072ce] flex items-center justify-center text-white text-4xl">
                <i className={`fas ${post.category === 'AI' ? 'fa-brain' : 
                              post.category === 'Technology' ? 'fa-laptop-code' : 
                              post.category === 'Medicine' ? 'fa-heartbeat' : 
                              'fa-infinity'}`}></i>
              </div>
              <div className="blog-content p-6">
                <span className="blog-category inline-block px-3 py-1 bg-[#00c6ff]/10 text-[#00c6ff] rounded-full text-sm font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="blog-title text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="blog-excerpt text-gray-600 mb-4">{post.excerpt}</p>
                <div className="blog-meta flex justify-between items-center text-gray-500 text-sm border-t border-gray-100 pt-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href="#" className="read-more text-[#00c6ff] font-semibold hover:text-[#0a2540] transition-colors mt-4 inline-block">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">No articles found</h3>
            <p className="text-gray-500 mt-2">Try changing your search or filter criteria</p>
          </div>
        )}
        
        <div className="pagination flex justify-center gap-2 mt-12">
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">1</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">2</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">3</button>
          <button className="page-btn px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;