'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage: string | null;
}

// Client component to fetch and render blog post
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/stories`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const allPosts: BlogPost[] = await response.json();
        const foundPost = allPosts.find(post => post.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Error loading blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">{error || 'Post not found'}</h2>
          <p className="mt-2 text-gray-400">{post ? '' : 'The requested post does not exist.'}</p>
          <Link href="/blog" className="mt-4 inline-block text-cyan-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block flex items-center">
          <i className="fas fa-arrow-left mr-2"></i> Back to Blog
        </Link>
        
        {post.featuredImage && (
          <div className="blog-image mb-12 rounded-2xl overflow-hidden border border-gray-700">
            <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover" />
          </div>
        )}
        
        <div className="blog-content">
          <span className="blog-category inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-6">
            {post.category}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
          
          {post.subtitle && (
            <h2 className="text-2xl text-gray-300 mb-8">{post.subtitle}</h2>
          )}
          
          <div className="blog-meta flex flex-wrap justify-between items-center text-gray-500 text-sm mb-10 border-b border-gray-700 pb-4">
            <span className="mb-2 md:mb-0">{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          
          <div className="blog-body text-lg leading-relaxed text-gray-300 max-w-4xl">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// For static export, we need to define possible routes at build time
// Since we can't access the API at build time, we'll return an empty array
// This will cause a runtime error if someone tries to access a route that doesn't exist
// But the client-side fetching will handle missing posts gracefully
export async function generateStaticParams() {
  // For static export, we return an empty array to allow dynamic routes
  // The actual blog posts will be fetched client-side
  return [];
}