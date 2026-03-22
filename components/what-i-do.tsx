'use client';

import { Card } from '@heroui/react';
import { Server, Database, Layers } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const WhatIDo = () => {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  const areas = [
    {
      title: t('backendAPIs'),
      description: t('backendAPIsDesc'),
      icon: Server,
    },
    {
      title: t('dataQuality'),
      description: t('dataQualityDesc'),
      icon: Database,
    },
    {
      title: t('fullStack'),
      description: t('fullStackDesc'),
      icon: Layers,
    },
  ];

  return (
    <section className='px-6 md:px-8 py-16 md:py-24'>
      <div ref={ref} className='reveal max-w-5xl mx-auto space-y-10'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center'>
          {t('whatIDo')}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {areas.map((area) => {
            const IconComponent = area.icon;
            return (
              <Card
                key={area.title}
                variant='bordered'
                className='border-border/70 bg-card/70 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(76,195,255,0.06)] transition-all duration-300 shadow-none'
              >
                <Card.Content className='p-6 md:p-8 space-y-4'>
                  <div className='w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center'>
                    <IconComponent className='w-5 h-5 text-accent' />
                  </div>
                  <h3 className='text-lg font-semibold text-foreground'>
                    {area.title}
                  </h3>
                  <div className='text-sm text-muted-foreground leading-relaxed space-y-2'>
                    {area.description.split('\n').map((line, index) => (
                      <p
                        key={index}
                        className={index === 0 ? '' : 'text-xs opacity-80'}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
