'use client';

import { useLanguage } from '@/contexts/language-context';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      role='contentinfo'
      className='container-page mt-16 mb-8 pt-6 border-t border-[var(--line-soft)]'
    >
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--dim)]'>
        <p>{t('footerCopyright')}</p>
        <p>
          CRAFTED IN NYC <span className='text-[var(--accent)]'>·</span> v2.0
        </p>
      </div>
    </footer>
  );
};
