'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string | null;
  createdAt: string;
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/stories' + (activeCategory !== 'All' ? `?category=${activeCategory}` : ''));
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [activeCategory]);

  // Function to calculate excerpt from content
  const getExcerpt = (content: string, length: number = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const categories = ['All', 'Blog', 'Research'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          getExcerpt(post.content).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="blog-section">
        <div className="container mx-auto px-4">
          <h2>Research Insights</h2>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-section">
        <div className="container mx-auto px-4">
          <h2>Research Insights</h2>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-section">
      <div className="container mx-auto px-4">
        <h2>Research Insights</h2>
        
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
              {post.featuredImage && (
                <div className="blog-image">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover" />
                </div>
              )}
              <div className="blog-content">
                <h3>{post.title}</h3>
                {post.subtitle && <p className="blog-subtitle">{post.subtitle}</p>}
                <p className="blog-excerpt">{getExcerpt(post.content)}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </div>
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