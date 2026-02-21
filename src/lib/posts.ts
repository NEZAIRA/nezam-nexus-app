import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPostMetas(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        category: data.category ?? 'General',
        readTime: data.readTime ?? '5 min read',
        excerpt: data.excerpt ?? '',
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);

  let filePath = '';
  if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else if (fs.existsSync(mdPath)) filePath = mdPath;
  else return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    category: data.category ?? 'General',
    readTime: data.readTime ?? '5 min read',
    excerpt: data.excerpt ?? '',
    content,
  };
}
