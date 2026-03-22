'use client';

import { Navigation } from '@/components/navigation';
import { ProjectCard } from '@/components/project-card';
import { Footer } from '@/components/footer';
import { useLanguage } from '@/contexts/language-context';

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <main className='min-h-screen'>
      <Navigation />
      <div className='max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-16'>
        <div className='space-y-10'>
          <div className='text-center space-y-4'>
            <div className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
              <span className='h-1 w-8 rounded-full bg-accent/70' />
              {t('projects')}
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
              {t('memorableProjects')}
            </h1>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              {t('memorableProjectsSubtitle')}
            </p>
          </div>

          <div className='space-y-6'>
            <ProjectCard
              title={t('projectsNoteShareTitle')}
              tags={['Next.js', 'React', 'TypeScript', 'Supabase']}
              description={t('projectsNoteShareDesc')}
              href='https://noteshare.us/'
              featured
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                tags={['HTML', 'CSS', 'JavaScript']}
                description={t('projectsLegacyPortfolioDesc')}
                href='https://imanolaracena.com/'
              />

              <ProjectCard
                title={t('projectsIAResumeTitle')}
                tags={['Once UI', 'React', 'TypeScript']}
                description={t('projectsIAResumeDesc')}
                href='https://iaresume.org/'
              />
            </div>

            <ProjectCard
              title={t('projectsDiscordVCLeaderboardTitle')}
              tags={['Discord.js', 'Node.js', 'JavaScript', 'Bot']}
              description={t('projectsDiscordVCLeaderboardDesc')}
              href='#'
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
