import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { db } from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ChevronLeft } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    if (!process.env.DATABASE_URL) return [];
    const posts = await db.getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
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
      <div className='max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-16'>
        <div className='space-y-8'>
          <div className='text-center space-y-4'>
            <span className='inline-flex text-xs bg-accent/10 px-3 py-1 rounded-full text-accent border border-accent/20'>
              {post.category}
            </span>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight'>
              {post.title}
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {post.description}
            </p>
            <p className='text-sm text-muted-foreground'>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <article className='prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-base prose-p:leading-relaxed prose-a:text-accent hover:prose-a:text-accent/80 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-sm'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          <div className='pt-8 border-t border-border/50'>
            <a
              href='/blog'
              className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors'
            >
              <ChevronLeft className='w-4 h-4' />
              Back to Blog
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
