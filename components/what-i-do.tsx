'use client';

import { useLanguage } from '@/contexts/language-context';

export function WhatIDo() {
  const { t } = useLanguage();

  const areas = [
    {
      title: t('backendAPIs'),
      description: t('backendAPIsDesc'),
    },
    {
      title: t('dataQuality'),
      description: t('dataQualityDesc'),
    },
    {
      title: t('fullStack'),
      description: t('fullStackDesc'),
    },
  ];

  return (
    <section className='px-4 sm:px-6 lg:px-12 py-8 sm:py-12'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left'>
          {t('whatIDo')}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          {areas.map((area) => (
            <div
              key={area.title}
              className='space-y-3 p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/70 shadow-[0_0_30px_rgba(76,195,255,0.05)] hover:border-accent/50 hover:bg-card transition-colors'
            >
              <h3 className='text-lg font-semibold leading-tight wrap-break-word min-h-[1.2em] overflow-visible'>
                {area.title}
              </h3>
              <div className='text-sm text-muted-foreground leading-relaxed space-y-2'>
                {area.description.split('\n').map((line, index) => (
                  <p
                    key={index}
                    className={`${
                      index === 0 ? '' : 'text-xs opacity-80'
                    } wrap-break-word overflow-visible`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
