'use client';

import { Card } from '@heroui/react';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const AboutSection = () => {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section id='about' className='px-6 md:px-8 py-16 md:py-24'>
      <div ref={ref} className='reveal max-w-5xl mx-auto'>
        <Card className='border border-border/70 bg-card/80 shadow-none'>
          <Card.Content className='p-8 md:p-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16'>
              <div className='space-y-6'>
                <div className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
                  <span className='h-1 w-8 rounded-full bg-accent/70' />
                  {t('aboutMeTitle')}
                </div>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  {t('aboutMeBody')}
                </p>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='space-y-1'>
                  <p className='text-3xl font-bold font-mono text-foreground'>
                    20+
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {t('cicdValue')}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-3xl font-bold font-mono text-foreground'>
                    2
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {t('authProviders')}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-3xl font-bold font-mono text-foreground'>
                    0
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {t('rollbacks')}
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-3xl font-bold font-mono text-foreground'>
                    100+
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {t('dataIssues')}
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
};
