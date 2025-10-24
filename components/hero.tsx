'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className='flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 pb-8 sm:pb-12'>
      <div className='max-w-5xl w-full'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6'>
            <img
              src='/professional-headshot.png'
              alt='Profile'
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-accent/20 shadow-lg shrink-0'
            />
            <div className='space-y-4 sm:space-y-6 flex-1 text-center sm:text-left'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance'>
                {t('heroTitle')}
              </h1>
              <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0'>
                {t('heroSubtitle')}
              </p>

              {/* About Me Section */}
              <div className='space-y-4'>
                <h2 className='text-xl sm:text-2xl font-semibold text-foreground'>
                  About Me
                </h2>
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0 wrap-break-word'>
                  I love to code and build things. I want to keep learning and
                  keep building. I do build websites and apps for fun. I am a
                  gamer so I started coding bots for Discord and that was the
                  start of my coding journey.
                </p>

                {/* GitHub Link and Button */}
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4'>
                  <Button size='lg' asChild className='w-full sm:w-auto'>
                    <a href='/projects'>{t('viewMyProjects')}</a>
                  </Button>
                  <a
                    href='https://github.com/userlaws'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors'
                  >
                    GitHub
                    <svg
                      className='w-4 h-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
