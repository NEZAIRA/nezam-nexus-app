import BlogPostClient from './BlogPostClient';

export const dynamic = 'force-static';

// This function is needed for static export to know all possible dynamic routes
export async function generateStaticParams() {
  // For static export, we return an empty array
  // In a real production environment, you would fetch actual data
  // but for static export we need to return known paths at build time
  return [];
}

// Server component that passes the params to the client component
// The client component will handle fetching the blog post data
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Pass the id to the client component which will fetch the data
  return <BlogPostClient id={id} />;
}
