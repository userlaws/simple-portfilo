'use client';

import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className='border-t border-border/70 bg-background/80 backdrop-blur-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-8 max-w-5xl'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
          <div>{t('footerCopyright')}</div>
          <div className='flex items-center gap-4'>
            <a
              href='https://www.linkedin.com/in/imanolaracena/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('linkedinLabel')}
              className='text-muted-foreground hover:text-accent transition-colors'
            >
              {t('linkedinLabel')}
            </a>
            <a
              href='https://github.com/userlaws'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('githubLabel')}
              className='text-muted-foreground hover:text-accent transition-colors'
            >
              {t('githubLabel')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
