'use client';

import { Navigation } from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';
import { useLanguage } from '@/contexts/language-context';

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-5xl'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='text-center sm:text-left py-2'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {t('memorableProjects')}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {t('memorableProjectsSubtitle')}
            </p>
          </div>

          <div className='space-y-8 sm:space-y-12'>
            <ProjectCard
              title='NoteShare'
              tags={['Next.js', 'React', 'TypeScript', 'Supabase']}
              description="This is my project that I made for myself to learn. It's a website that allows you to share notes with your friends."
              href='https://noteshare.us/'
            />

            <ProjectCard
              title='Gift Whisperer'
              tags={['Next.js', 'React', 'TypeScript', 'PostgreSQL']}
              description='The anonymous gift exchange platform for friends and family. Create wishlists, claim gifts, and keep the surprise alive this holiday season—or any season!'
              href='https://christmas-list-peach.vercel.app/'
            />

            <ProjectCard
              title='Personal Portfolio'
              tags={['Next.js', 'React', 'TypeScript', 'Tailwind CSS']}
              description='This is my official portfolio site showcasing my projects and skills as a full-stack developer.'
              href='/'
            />

            <ProjectCard
              title='Imanol Aracena Portfolio'
              tags={['HTML', 'CSS', 'JavaScript', 'Tutorial']}
              description='My first tutorial-based portfolio site built from scratch. A clean, responsive design showcasing my early development journey and learning process.'
              href='https://imanolaracena.com/'
            />

            <ProjectCard
              title='IA Resume'
              tags={['Once UI', 'React', 'TypeScript', 'Portfolio']}
              description='A modern portfolio site built using Once UI framework. Features a sleek design with advanced UI components and smooth animations.'
              href='https://iaresume.org/'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
