import { db } from '@/lib/db';
import { BlogPageClient } from './blog-client';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch blog posts from database
  let blogPosts: Array<{
    title: string;
    description: string;
    slug: string;
    category: string;
  }> = [];

  try {
    // Only fetch if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      const posts = await db.getAllPosts();
      blogPosts = posts.map((post) => ({
        title: post.title,
        description: post.description,
        slug: post.slug,
        category: post.category,
      }));
    }
  } catch (error) {
    // If database is not available during build, use empty array
    // Posts will be fetched on-demand at runtime
    console.warn('Could not fetch blog posts during build:', error);
  }

  return <BlogPageClient posts={blogPosts} />;
}
