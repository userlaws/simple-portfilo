'use client';

import { useLanguage } from '@/contexts/language-context';

export function ProofStrip() {
  const { t } = useLanguage();

  const metrics = [
    { label: t('cicd'), value: t('cicdValue') },
    { label: t('authProviders'), value: t('authProvidersValue') },
    { label: t('dbsShipped'), value: t('dbsShippedValue') },
    { label: t('ciPipelines'), value: t('ciPipelinesValue') },
    { label: t('osMaintained'), value: t('osMaintainedValue') },
  ];

  return (
    <section className='px-4 sm:px-6 lg:px-12 py-8 sm:py-12 border-t border-border/70 bg-card/40'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8'>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className='space-y-2 text-center sm:text-left min-w-0'
            >
              <p className='text-sm text-muted-foreground wrap-break-word'>
                {metric.label}
              </p>
              <p className='text-lg sm:text-xl lg:text-2xl font-mono font-semibold wrap-break-word text-foreground'>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
