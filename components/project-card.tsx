'use client';

import { Card, Chip } from '@heroui/react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  tags: string[];
  description: string;
  href: string;
  featured?: boolean;
}

export const ProjectCard = ({
  title,
  tags,
  description,
  href,
  featured = false,
}: ProjectCardProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${title} project`}
      className='block group'
    >
      <Card
        variant='bordered'
        className={`border-border/70 bg-card/70 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(76,195,255,0.06)] transition-all duration-300 shadow-none ${
          featured ? 'md:col-span-2' : ''
        }`}
      >
        <Card.Content className={`${featured ? 'p-8 md:p-10' : 'p-6 md:p-8'} space-y-4`}>
          <div className='flex items-start justify-between gap-4'>
            <div className='space-y-4 flex-1'>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    variant='bordered'
                    size='sm'
                    className='border-border/70 text-muted-foreground group-hover:border-accent/40 transition-colors text-xs'
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
              <h3
                className={`${
                  featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                } font-bold text-foreground group-hover:text-accent transition-colors duration-300`}
              >
                {title}
              </h3>
              <p className='text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300'>
                {description}
              </p>
            </div>
            <ExternalLink className='w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1' />
          </div>
        </Card.Content>
      </Card>
    </a>
  );
};
