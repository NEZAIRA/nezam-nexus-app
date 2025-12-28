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
    <div className="blog-section">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Research Insights</h2>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search research articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-post">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <Link href="#">Read More</Link>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div>
            <h3>No articles found</h3>
            <p>Try changing your search or filter criteria</p>
          </div>
        )}
        
        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;