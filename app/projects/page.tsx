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
      <div className='container-page pt-16 pb-16'>
        <div className='space-y-10'>
          <header className='text-center space-y-4'>
            <p className='mono-label'>— {t('projects')}</p>
            <h1 className='display-lg'>
              {t('memorableProjects').split(' ')[0]}{' '}
              <span className='text-accent'>
                {t('memorableProjects').split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className='text-[15px] text-[var(--mute)] max-w-2xl mx-auto'>
              {t('memorableProjectsSubtitle')}
            </p>
          </header>

          <div className='bento mt-6'>
            <ProjectCard
              title={t('projectsJJAYCompanionTitle')}
              tags={[
                'React Native',
                'Expo',
                'TypeScript',
                'Supabase',
                'iOS App Store',
              ]}
              description={t('projectsJJAYCompanionDesc')}
              href='#'
              featured
              span='span-12'
            />

            <ProjectCard
              title={t('projectsNoteShareTitle')}
              tags={[
                'Next.js',
                'React',
                'TypeScript',
                'Node.js',
                'Supabase',
                'Vercel',
              ]}
              description={t('projectsNoteShareDesc')}
              href='https://noteshare.us/'
              span='span-6'
            />

            <ProjectCard
              title={t('projectsGiftWhispererTitle')}
              tags={[
                'React',
                'TypeScript',
                'Express',
                'Prisma',
                'PostgreSQL',
              ]}
              description={t('projectsGiftWhispererDesc')}
              href='https://christmas-list-peach.vercel.app/'
              span='span-6'
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
