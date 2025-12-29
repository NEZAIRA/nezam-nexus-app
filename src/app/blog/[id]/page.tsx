import fs from 'fs';
import path from 'path';
import BlogPostClient from './BlogPostClient';

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

// Server component that fetches data and passes it to the client component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const storiesFilePath = path.join(process.cwd(), 'data', 'stories.json');
    
    if (!fs.existsSync(storiesFilePath)) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500">Blog data not available</h2>
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
