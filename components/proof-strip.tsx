'use client';

import { Separator } from '@heroui/react';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

export const ProofStrip = () => {
  const { t } = useLanguage();
  const ref = useScrollReveal();

  const metrics = [
    { label: t('cicd'), value: t('cicdValue') },
    { label: t('dbsShipped'), value: t('dbsShippedValue') },
    { label: t('ciPipelines'), value: t('ciPipelinesValue') },
    { label: t('osMaintained'), value: t('osMaintainedValue') },
  ];

  return (
    <section className='px-6 md:px-8 py-12 md:py-16'>
      <div ref={ref} className='reveal max-w-5xl mx-auto'>
        <Separator className='bg-border/50 mb-12' />
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
          {metrics.map((metric) => (
            <div key={metric.label} className='space-y-2 text-center'>
              <p className='text-xs uppercase tracking-wider text-muted-foreground'>
                {metric.label}
              </p>
              <p className='text-base sm:text-lg font-mono font-semibold text-foreground'>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
        <Separator className='bg-border/50 mt-12' />
      </div>
    </section>
  );
};
