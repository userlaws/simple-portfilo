'use client';

import { ArrowUpRight } from 'lucide-react';

type SpanClass =
  | 'span-3'
  | 'span-4'
  | 'span-5'
  | 'span-6'
  | 'span-7'
  | 'span-8'
  | 'span-9'
  | 'span-12';

interface ProjectCardProps {
  title: string;
  tags: string[];
  description: string;
  href: string;
  featured?: boolean;
  span?: SpanClass;
}

export const ProjectCard = ({
  title,
  tags,
  description,
  href,
  featured = false,
  span = 'span-6',
}: ProjectCardProps) => {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={`${title} project`}
      tabIndex={0}
      className={`block group ${span}`}
    >
      <article
        className={`tile tile-interactive h-full ${
          featured ? 'tile-featured' : ''
        }`}
      >
        <header className='flex items-start justify-between gap-4 mb-4'>
          <ul className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <li key={tag} className='chip'>
                {tag}
              </li>
            ))}
          </ul>
          <ArrowUpRight
            className='w-5 h-5 text-[var(--mute)] group-hover:text-[var(--accent)] transition-colors shrink-0'
            aria-hidden='true'
          />
        </header>

        <h3
          className={`display-md ${
            featured ? 'text-[40px] sm:text-[48px]' : 'text-[28px] sm:text-[32px]'
          } group-hover:text-[var(--accent)] transition-colors`}
        >
          {title}
        </h3>

        <p className='mt-3 text-[15px] text-[var(--mute)] leading-relaxed'>
          {description}
        </p>
      </article>
    </a>
  );
};
