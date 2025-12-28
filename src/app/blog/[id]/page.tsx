import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// This function is needed for static export to know all possible dynamic routes
export async function generateStaticParams() {
  try {
    const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');
    
    if (!fs.existsSync(storiesFilePath)) {
      return [];
    }
    
    const storiesData = fs.readFileSync(storiesFilePath, 'utf8');
    const stories = JSON.parse(storiesData);
    
    // Return an array of params for each story
    return stories.map((story: any) => ({
      id: story.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Server component to fetch and render blog post
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');
    
    if (!fs.existsSync(storiesFilePath)) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Blog data not available</h2>
            <Link href="/blog" className="mt-4 inline-block text-cyan-400 hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }
    
    const storiesData = fs.readFileSync(storiesFilePath, 'utf8');
    const stories = JSON.parse(storiesData);
    
    const post = stories.find((story: any) => story.id === id);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
            <p className="mt-2 text-gray-400">The requested post does not exist.</p>
            <Link href="/blog" className="mt-4 inline-block text-cyan-400 hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      );
    }
    
    // Render the blog post content
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
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading blog post</h2>
          <p className="mt-2 text-gray-400">Please try again later.</p>
          <Link href="/blog" className="mt-4 inline-block text-cyan-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}