'use client';

import { Separator } from '@heroui/react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className='px-6 md:px-8 py-16 md:py-20'>
      <div className='max-w-5xl mx-auto space-y-10'>
        <div className='text-center space-y-4'>
          <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
            Let&apos;s connect
          </h2>
          <p className='text-muted-foreground max-w-md mx-auto'>
            Open to Associate Software Engineer, Junior Full-Stack, and
            Software Engineer I opportunities.
          </p>
          <div className='flex items-center justify-center gap-4 pt-4'>
            <a
              href='https://github.com/userlaws'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('githubLabel')}
              tabIndex={0}
              className='p-3 rounded-full border border-border/70 text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200'
            >
              <Github className='w-5 h-5' />
            </a>
            <a
              href='https://www.linkedin.com/in/imanolaracena/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('linkedinLabel')}
              tabIndex={0}
              className='p-3 rounded-full border border-border/70 text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200'
            >
              <Linkedin className='w-5 h-5' />
            </a>
            <a
              href='mailto:imanol.aracena@jjay.cuny.edu'
              aria-label='Email'
              tabIndex={0}
              className='p-3 rounded-full border border-border/70 text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200'
            >
              <Mail className='w-5 h-5' />
            </a>
          </div>
        </div>

        <Separator className='bg-border/50' />

        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
          <p>{t('footerCopyright')}</p>
          <nav className='flex items-center gap-6'>
            <a
              href='/'
              className='hover:text-foreground transition-colors'
            >
              {t('home')}
            </a>
            <a
              href='/projects'
              className='hover:text-foreground transition-colors'
            >
              {t('projects')}
            </a>
            <a
              href='/blog'
              className='hover:text-foreground transition-colors'
            >
              {t('blog')}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
