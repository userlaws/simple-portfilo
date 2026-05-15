'use client';

import { useState } from 'react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'WORK' },
    { href: '/projects', label: 'LAB' },
    { href: '/blog', label: 'NOTES' },
    { href: '/#contact', label: 'CONTACT' },
  ];

  const handleToggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleToggleMobile = () => setIsMobileOpen((open) => !open);

  return (
    <header className='topbar' role='banner'>
      <div className='container-page flex items-center justify-between h-[68px]'>
        <a
          href='/'
          aria-label='Home'
          className='flex items-center gap-3 group'
        >
          <span className='logo-mark'>IA</span>
          <span className='font-medium tracking-tight text-[15px] group-hover:text-[var(--accent)] transition-colors'>
            Imanol Aracena
          </span>
        </a>

        <nav
          aria-label='Primary'
          className='hidden md:flex items-center gap-1 p-1 rounded-full border border-[var(--line)] bg-[var(--card)]'
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mute)] hover:text-[var(--text)] hover:bg-[var(--card-elev)] transition-colors'
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <span className='hidden sm:inline-flex pill items-center gap-2'>
            <span className='status-dot' aria-hidden='true' />
            <span>OPEN TO WORK</span>
          </span>

          <button
            type='button'
            onClick={handleToggleLanguage}
            aria-label='Toggle language'
            tabIndex={0}
            className='hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--text)] hover:border-[color-mix(in_oklch,var(--line)_50%,var(--accent)_50%)] transition-colors'
          >
            <Languages className='w-4 h-4' aria-hidden='true' />
          </button>

          <button
            type='button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
            tabIndex={0}
            className='inline-flex w-9 h-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--text)] hover:border-[color-mix(in_oklch,var(--line)_50%,var(--accent)_50%)] transition-colors'
          >
            {theme === 'dark' ? (
              <Moon className='w-4 h-4' aria-hidden='true' />
            ) : (
              <Sun className='w-4 h-4' aria-hidden='true' />
            )}
          </button>

          <button
            type='button'
            onClick={handleToggleMobile}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            className='md:hidden inline-flex w-9 h-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--text)] transition-colors'
          >
            {isMobileOpen ? (
              <X className='w-4 h-4' aria-hidden='true' />
            ) : (
              <Menu className='w-4 h-4' aria-hidden='true' />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          isMobileOpen ? 'max-h-[280px]' : 'max-h-0'
        }`}
      >
        <nav
          aria-label='Mobile primary'
          className='container-page flex flex-col gap-1 pb-4'
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className='px-4 py-3 rounded-[var(--radius-sm)] font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--mute)] hover:text-[var(--text)] hover:bg-[var(--card-elev)] transition-colors'
            >
              {link.label}
            </a>
          ))}
          <div className='mt-2 flex items-center justify-between gap-2 px-1'>
            <span className='inline-flex pill items-center gap-2'>
              <span className='status-dot' aria-hidden='true' />
              <span>OPEN TO WORK</span>
            </span>
            <button
              type='button'
              onClick={handleToggleLanguage}
              aria-label='Toggle language'
              className='inline-flex w-9 h-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--text)] transition-colors'
            >
              <Languages className='w-4 h-4' aria-hidden='true' />
            </button>
          </div>
          <p className='sr-only'>{t('home')}</p>
        </nav>
      </div>
    </header>
  );
};
