'use client';

import { ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
}

export const BlogCard = ({
  title,
  description,
  slug,
  category,
}: BlogCardProps) => {
  return (
    <a
      href={`/blog/${slug}`}
      aria-label={`Read ${title}`}
      tabIndex={0}
      className='block group'
    >
      <article className='tile tile-interactive'>
        <header className='flex items-start justify-between gap-4 mb-4'>
          {category ? (
            <span className='chip'>{category}</span>
          ) : (
            <span aria-hidden='true' />
          )}
          <ArrowUpRight
            className='w-5 h-5 text-[var(--mute)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0'
            aria-hidden='true'
          />
        </header>

        <h3 className='display-md text-[24px] sm:text-[28px] group-hover:text-[var(--accent)] transition-colors'>
          {title}
        </h3>

        <p className='mt-3 text-[15px] text-[var(--mute)] leading-relaxed'>
          {description}
        </p>
      </article>
    </a>
  );
};
