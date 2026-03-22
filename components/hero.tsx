'use client';

import { Button, Avatar } from '@heroui/react';
import { Github, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className='min-h-[90vh] flex items-center justify-center px-6 md:px-8 pt-24 pb-16'>
      <div className='max-w-3xl w-full text-center space-y-8'>
        <div className='flex justify-center'>
          <div className='relative'>
            <Avatar size='lg' className='w-28 h-28 ring-2 ring-accent/40 ring-offset-2 ring-offset-background'>
              <Avatar.Image
                src='/professional-headshot.png'
                alt='Imanol Aracena'
              />
              <Avatar.Fallback>IA</Avatar.Fallback>
            </Avatar>
            <span className='absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse' />
          </div>
        </div>

        <div className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
          <span className='h-1 w-8 rounded-full bg-accent/70' />
          {t('signalOnline')}
        </div>

        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-foreground text-balance'>
          {t('heroTitle')}
        </h1>

        <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
          {t('heroSubtitle')}
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Button
            as='a'
            href='/projects'
            variant='solid'
            size='lg'
            className='bg-accent text-accent-foreground font-semibold px-8 hover:bg-accent/90 w-full sm:w-auto'
          >
            {t('viewMyProjects')}
          </Button>
          <Button
            as='a'
            href='https://www.linkedin.com/in/imanolaracena/'
            target='_blank'
            rel='noopener noreferrer'
            variant='bordered'
            size='lg'
            className='border-accent/40 text-foreground font-semibold px-8 hover:bg-accent/10 w-full sm:w-auto'
          >
            {t('linkedinLabel')}
          </Button>
        </div>

        <div className='flex items-center justify-center gap-4 pt-2'>
          <a
            href='https://github.com/userlaws'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t('githubLabel')}
            tabIndex={0}
            className='p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200'
          >
            <Github className='w-5 h-5' />
          </a>
          <a
            href='https://www.linkedin.com/in/imanolaracena/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t('linkedinLabel')}
            tabIndex={0}
            className='p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200'
          >
            <Linkedin className='w-5 h-5' />
          </a>
        </div>
      </div>
    </section>
  );
};
