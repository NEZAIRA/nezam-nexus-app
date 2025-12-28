'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/stories`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const allPosts: BlogPost[] = await response.json();
        const foundPost = allPosts.find(post => post.id === id);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
          <p className="mt-2">{error || 'The requested post does not exist.'}</p>
          <Link href="/blog" className="mt-4 inline-block text-blue-500 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Blog
        </Link>
        
        {post.featuredImage && (
          <div className="blog-image mb-8">
            <img src={post.featuredImage} alt={post.title} className="w-full h-96 object-cover rounded" />
          </div>
        )}
        
        <div className="blog-content">
          <span className="blog-category inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            {post.category}
          </span>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          {post.subtitle && (
            <h2 className="text-2xl text-gray-600 mb-6">{post.subtitle}</h2>
          )}
          
          <div className="blog-meta flex justify-between items-center text-gray-500 text-sm mb-8 border-b pb-4">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          
          <div className="blog-body text-lg leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;