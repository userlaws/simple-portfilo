'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '@heroui/react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      setIsScrolled(currentScrollY > 50);

      if (!isMobile) {
        setIsHeaderVisible(true);
        return;
      }

      if (isMobileMenuOpen) return;

      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen && headerRef.current) {
        const target = e.target as Node;
        if (!headerRef.current.contains(target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/blog', label: t('blog') },
  ];

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleToggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-transparent' : 'bg-background/80 backdrop-blur-md'}`}
    >
      <div
        className={`transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'max-w-4xl mx-auto px-6 py-3 mt-4 mb-2 bg-background/85 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(76,195,255,0.08)] border border-border/70'
            : 'max-w-7xl mx-auto px-6 md:px-8 py-4 border-b border-border/50'
        } flex items-center justify-between`}
      >
        <a
          href='/'
          aria-label='Home'
          className='flex items-center gap-3 hover:opacity-80 transition-opacity duration-200'
        >
          <div
            className={`${
              isScrolled ? 'w-6 h-6' : 'w-8 h-8'
            } rounded-lg overflow-hidden transition-all duration-300 shadow-sm ring-1 ring-accent/30`}
          >
            <img
              src='/icon.png'
              alt='Portfolio'
              className={`${
                isScrolled ? 'w-6 h-6' : 'w-8 h-8'
              } object-cover transition-all duration-300`}
            />
          </div>
          <span
            className={`${
              isScrolled ? 'text-lg' : 'text-xl'
            } font-bold text-foreground transition-all duration-300 tracking-tight`}
          >
            {t('portfolio')}
          </span>
        </a>

        <nav className='hidden md:flex items-center gap-1'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 px-4 py-2 rounded-full hover:bg-accent/10'
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <div className='hidden sm:flex items-center gap-1'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              onPress={handleToggleTheme}
              aria-label='Toggle theme'
              className='text-foreground hover:bg-accent/10'
            >
              {theme === 'dark' ? (
                <Moon className='h-4 w-4' />
              ) : (
                <Sun className='h-4 w-4' />
              )}
            </Button>

            <Button
              isIconOnly
              variant='light'
              size='sm'
              onPress={handleToggleLanguage}
              aria-label='Toggle language'
              className='text-foreground hover:bg-accent/10'
            >
              <Languages className='h-4 w-4' />
            </Button>
          </div>

          <button
            className='md:hidden text-foreground transition-all duration-200 hover:text-accent p-2 rounded-xl hover:bg-accent/10'
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            type='button'
          >
            <div className='relative w-6 h-6'>
              <Menu
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'rotate-90 opacity-0 scale-75'
                    : 'rotate-0 opacity-100 scale-100'
                }`}
              />
              <X
                className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'rotate-0 opacity-100 scale-100'
                    : '-rotate-90 opacity-0 scale-75'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='bg-card/95 backdrop-blur-md border border-border/70 mx-3 mt-1 mb-2 rounded-2xl shadow-2xl ring-1 ring-border/30'>
          <div className='p-6 space-y-6'>
            <nav className='space-y-1'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='block text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-accent/10 px-4 py-3 rounded-xl'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className='flex items-center justify-center gap-2 pt-4 border-t border-border/50'>
              <Button
                isIconOnly
                variant='light'
                size='sm'
                onPress={handleToggleTheme}
                aria-label='Toggle theme'
                className='text-foreground hover:bg-accent/10'
              >
                {theme === 'dark' ? (
                  <Moon className='h-5 w-5' />
                ) : (
                  <Sun className='h-5 w-5' />
                )}
              </Button>

              <Button
                isIconOnly
                variant='light'
                size='sm'
                onPress={handleToggleLanguage}
                aria-label='Toggle language'
                className='text-foreground hover:bg-accent/10'
              >
                <Languages className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
