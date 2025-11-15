import { db } from '@/lib/db';
import { BlogPageClient } from './blog-client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch blog posts from database
  const posts = await db.getAllPosts();

  // Convert to format expected by UI
  const blogPosts = posts.map((post) => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    category: post.category,
  }));

  return <BlogPageClient posts={blogPosts} />;
}
