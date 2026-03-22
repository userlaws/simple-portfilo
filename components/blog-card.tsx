'use client';

import { Card, Chip } from '@heroui/react';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
}

export const BlogCard = ({ title, description, slug, category }: BlogCardProps) => {
  return (
    <a
      href={`/blog/${slug}`}
      aria-label={`Read ${title}`}
      className='block group'
    >
      <Card
        variant='bordered'
        className='border-border/70 bg-card/70 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(76,195,255,0.06)] transition-all duration-300 shadow-none'
      >
        <Card.Content className='p-6 md:p-8 space-y-4'>
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-3 flex-1'>
              {category && (
                <Chip
                  variant='bordered'
                  size='sm'
                  className='border-border/70 text-muted-foreground text-xs'
                >
                  {category}
                </Chip>
              )}
              <h3 className='text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300'>
                {title}
              </h3>
              <p className='text-base text-muted-foreground leading-relaxed'>
                {description}
              </p>
            </div>
            <ArrowRight className='w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1' />
          </div>
        </Card.Content>
      </Card>
    </a>
  );
};
