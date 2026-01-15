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
        <div className='space-y-8 sm:space-y-10'>
          <div className='rounded-3xl border border-border/70 bg-card/70 px-6 py-7 sm:px-8 sm:py-8 shadow-[0_0_40px_rgba(76,195,255,0.08)] text-center sm:text-left'>
            <div className='h-1 w-10 rounded-full bg-accent/70 mb-4 mx-auto sm:mx-0'></div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {t('memorableProjects')}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {t('memorableProjectsSubtitle')}
            </p>
          </div>

          <div className='space-y-8 sm:space-y-12'>
            <ProjectCard
              title={t('projectsNoteShareTitle')}
              tags={['Next.js', 'React', 'TypeScript', 'Supabase']}
              description={t('projectsNoteShareDesc')}
              href='https://noteshare.us/'
            />

            <ProjectCard
              title={t('projectsGiftWhispererTitle')}
              tags={['Next.js', 'React', 'TypeScript', 'PostgreSQL']}
              description={t('projectsGiftWhispererDesc')}
              href='https://christmas-list-peach.vercel.app/'
            />

            <ProjectCard
              title={t('projectsPortfolioTitle')}
              tags={['Next.js', 'React', 'TypeScript', 'Tailwind CSS']}
              description={t('projectsPortfolioDesc')}
              href='/'
            />

            <ProjectCard
              title={t('projectsLegacyPortfolioTitle')}
              tags={['HTML', 'CSS', 'JavaScript', 'Tutorial']}
              description={t('projectsLegacyPortfolioDesc')}
              href='https://imanolaracena.com/'
            />

            <ProjectCard
              title={t('projectsIAResumeTitle')}
              tags={['Once UI', 'React', 'TypeScript', 'Portfolio']}
              description={t('projectsIAResumeDesc')}
              href='https://iaresume.org/'
            />

            <ProjectCard
              title={t('projectsDiscordVCLeaderboardTitle')}
              tags={['Discord.js', 'Node.js', 'JavaScript', 'Bot']}
              description={t('projectsDiscordVCLeaderboardDesc')}
              href='#'
            />
          </div>
        </div>
      </div>
    </main>
  );
}
