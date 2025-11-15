import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { db } from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export const revalidate = 60; // Revalidate every 60 seconds

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    // Only generate params if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      return [];
    }
    const posts = await db.getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    // If database is not available during build, return empty array
    // Posts will be generated on-demand
    console.warn('Could not generate static params during build:', error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await db.getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-4xl'>
        <div className='space-y-6 sm:space-y-8'>
          {/* Header */}
          <div className='text-center sm:text-left py-2'>
            <div className='mb-4'>
              <span className='text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground'>
                {post.category}
              </span>
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {post.title}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {post.description}
            </p>
            <div className='mt-4 text-sm text-muted-foreground'>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          {/* Content */}
          <article className='prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-base prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-sm'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Back to Blog */}
          <div className='pt-8 border-t border-border'>
            <a
              href='/blog'
              className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m15 18-6-6 6-6' />
              </svg>
              Back to Blog
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

