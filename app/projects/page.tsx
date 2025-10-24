'use client';

import { Navigation } from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';
import { Confetti } from '@/components/confetti';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleCancelParty = () => {
    setTheme('light');
  };

  // Get the full document height for the overlay
  const getDocumentHeight = () => {
    if (typeof window !== 'undefined') {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    }
    return '100vh';
  };

  return (
    <main className='min-h-screen'>
      {theme === 'party' && <Confetti />}
      {theme === 'party' && (
        <div
          onClick={handleCancelParty}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: `${getDocumentHeight()}px`,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={handleCancelParty}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '30px 60px',
                border: '5px solid white',
                borderRadius: '15px',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 50px rgba(255, 0, 0, 0.8)',
                marginBottom: '20px',
              }}
            >
              🎉 CANCEL PARTY 🎉
            </button>
            <div
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px 20px',
                borderRadius: '10px',
              }}
            >
              Or tap anywhere to cancel
            </div>
          </div>
        </div>
      )}
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

            <ProjectCard
              title='Discord VC Leaderboard'
              tags={['Discord.js', 'Node.js', 'JavaScript', 'Bot']}
              description='A Discord bot that tracks voice channel activity and creates leaderboards. Features real-time tracking, weekly/monthly rankings, and customizable settings for server administrators.'
              href='#'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
