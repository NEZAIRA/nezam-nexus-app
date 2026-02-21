import { NextResponse } from 'next/server';
import { getAllPostMetas } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const posts = getAllPostMetas().slice(0, 3);

    const stories = posts.map((p) => ({
      id: p.slug,
      title: p.title,
      subtitle: p.excerpt,
      content: p.excerpt,
      date: new Date(p.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      category: p.category,
      readTime: p.readTime,
      featuredImage: null,
      createdAt: new Date(p.date).toISOString(),
    }));

    return NextResponse.json(stories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}
