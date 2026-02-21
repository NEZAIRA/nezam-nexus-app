import Link from 'next/link';
import { getAllPostMetas } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPostMetas();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-[0.3em] text-blue-500 uppercase mb-3">
            Nezaira Research
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Research & Insights
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
            Engineering notes, space medicine research, and development updates from the Mica1 team.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map((post) => (
            <article key={post.slug} className="py-10 group">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">· {post.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 max-w-2xl">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-200"
              >
                Read article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 dark:text-gray-500 text-lg">No articles yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
