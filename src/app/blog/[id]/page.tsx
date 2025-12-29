import BlogPostClient from './BlogPostClient';

// This function is needed for static export to know all possible dynamic routes
export async function generateStaticParams() {
  // For static export, we return an empty array
  // In a real production environment, you would fetch actual data
  // but for static export we need to return known paths at build time
  return [];
}

// Server component that fetches data and passes it to the client component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch all stories from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/stories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Failed to load blog data</h2>
          </div>
        </div>
      );
    }
    
    const stories = await response.json();
    const post = stories.find((story: any) => story.id === id);
    
    if (!post) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Post not found</h2>
          </div>
        </div>
      );
    }

    // Pass the post data to the client component
    return <BlogPostClient post={post} />;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading blog post</h2>
        </div>
      </div>
    );
  }
}
