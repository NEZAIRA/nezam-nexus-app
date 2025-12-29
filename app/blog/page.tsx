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

const BlogContent = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/home-stories');
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
  }, []);

  // Function to calculate excerpt from content
  const getExcerpt = (content: string, length: number = 150) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading research...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Research & Insights</h1>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300 cursor-pointer bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {getExcerpt(post.content)}
              </p>
              <div 
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center cursor-not-allowed opacity-50"
              >
                Read full article →
              </div>
            </div>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No research articles available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogContent;