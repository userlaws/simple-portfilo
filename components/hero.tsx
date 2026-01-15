'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className='flex items-center justify-center px-4 sm:px-6 lg:px-12 pt-20 pb-10 sm:pb-14'>
      <div className='max-w-5xl w-full'>
        <div className='rounded-3xl border border-border/70 bg-card/80 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_0_40px_rgba(76,195,255,0.08)]'>
          <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8'>
            <img
              src='/professional-headshot.png'
              alt='Profile'
              className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border border-accent/40 ring-1 ring-accent/20 shadow-lg shrink-0'
            />
            <div className='space-y-5 sm:space-y-6 flex-1 text-center sm:text-left'>
              <div className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
                <span className='h-1 w-8 rounded-full bg-accent/70'></span>
                {t('signalOnline')}
              </div>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance'>
                {t('heroTitle')}
              </h1>
              <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0'>
                {t('heroSubtitle')}
              </p>

              <div className='space-y-4'>
                <h2 className='text-xl sm:text-2xl font-semibold text-foreground'>
                  {t('aboutMeTitle')}
                </h2>
                <p className='text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto sm:mx-0 wrap-break-word'>
                  {t('aboutMeBody')}
                </p>

                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4'>
                  <Button
                    size='lg'
                    asChild
                    className='w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90'
                  >
                    <a href='/projects' aria-label={t('viewMyProjects')}>
                      {t('viewMyProjects')}
                    </a>
                  </Button>
                  <Button
                    size='lg'
                    variant='outline'
                    asChild
                    className='w-full sm:w-auto border-accent/40 text-foreground hover:bg-accent/10'
                  >
                    <a
                      href='https://www.linkedin.com/in/imanolaracena/'
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={t('linkedinLabel')}
                    >
                      {t('linkedinLabel')}
                    </a>
                  </Button>
                  <a
                    href='https://github.com/userlaws'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={t('githubLabel')}
                    className='text-primary hover:text-accent font-semibold flex items-center gap-2 transition-colors'
                  >
                    {t('githubLabel')}
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
