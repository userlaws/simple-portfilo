'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, PartyPopper, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768; // md breakpoint

      // Set scrolled state for desktop bubble effect
      setIsScrolled(currentScrollY > 50);

      if (!isMobile) {
        // Desktop: always show header, just style changes
        setIsHeaderVisible(true);
        return;
      }

      // Mobile: hide/show logic
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Touch gesture detection for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEndY(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!touchStartY || !touchEndY) return;

      const distance = touchStartY - touchEndY;
      const isMobile = window.innerWidth < 768;

      // Swipe down gesture - hide header on mobile
      if (isMobile && distance < -50 && window.scrollY > 50) {
        setIsHeaderVisible(false);
      }
    };

    // Tap outside detection
    const handleClickOutside = (e: MouseEvent) => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && isMobileMenuOpen) {
        const target = e.target as Element;
        if (!target.closest('header')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      document.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [touchStartY, touchEndY, isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/notes', label: t('notes') },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const togglePartyMode = () => {
    setTheme(theme === 'party' ? 'light' : 'party');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleHeaderTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.touches[0].clientY);
  };

  const handleHeaderTouchEnd = () => {
    if (!touchStartY || !touchEndY) return;

    const distance = touchStartY - touchEndY;
    const isMobile = window.innerWidth < 768;

    // Swipe down gesture - hide header on mobile
    if (isMobile && distance < -50 && window.scrollY > 50) {
      setIsHeaderVisible(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-transparent' : 'bg-background shadow-sm'}`}
      onTouchStart={handleHeaderTouchStart}
      onTouchMove={handleHeaderTouchMove}
      onTouchEnd={handleHeaderTouchEnd}
    >
      <div
        className={`transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'container mx-auto px-6 py-3 mt-4 mb-2 max-w-4xl bg-background/95 backdrop-blur-md rounded-full shadow-xl border border-border/50'
            : 'container mx-auto px-4 py-4'
        } flex items-center justify-between`}
      >
        {/* Logo Section */}
        <div className='flex items-center space-x-3'>
          <div
            className={`${
              isScrolled ? 'w-6 h-6' : 'w-8 h-8'
            } rounded-lg overflow-hidden transition-all duration-300 shadow-sm`}
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
            } font-bold text-foreground transition-all duration-300 tracking-tight leading-tight wrap-break-word min-h-[1.2em] overflow-visible`}
          >
            {t('portfolio')}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50 px-3 py-2 rounded-lg'
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Theme Controls */}
          <div className='hidden sm:flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              title='Toggle theme'
              className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
            >
              {theme === 'dark' && <Moon className='h-5 w-5' />}
              {theme === 'light' && <Sun className='h-5 w-5' />}
              {theme === 'party' && <Sun className='h-5 w-5' />}
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={togglePartyMode}
              title='Toggle party mode'
              className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
            >
              <PartyPopper
                className={`h-5 w-5 ${
                  theme === 'party' ? 'text-yellow-500' : ''
                }`}
              />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={toggleLanguage}
              title='Toggle language'
              className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
            >
              <Languages className='h-5 w-5' />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-foreground transition-all duration-200 hover:text-primary hover:scale-105 active:scale-95 p-2 rounded-xl hover:bg-muted/50'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-card/95 backdrop-blur-md border border-border/50 mx-3 mt-1 mb-2 rounded-2xl shadow-2xl ring-1 ring-border/20'
              : 'bg-card border-b border-l border-r border-border rounded-b-3xl mx-3 mb-4 shadow-xl ring-1 ring-border/20'
          }`}
        >
          <div className='p-6 space-y-6'>
            {/* Mobile Navigation Links */}
            <nav className='space-y-2'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='block text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50 px-3 py-2 rounded-lg'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Theme Controls */}
            <div className='flex items-center justify-center space-x-4 pt-4 border-t border-border/50'>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleTheme}
                className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
              >
                {theme === 'dark' && <Moon className='h-5 w-5' />}
                {theme === 'light' && <Sun className='h-5 w-5' />}
                {theme === 'party' && <Sun className='h-5 w-5' />}
              </Button>

              <Button
                variant='ghost'
                size='icon'
                onClick={togglePartyMode}
                className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
              >
                <PartyPopper
                  className={`h-5 w-5 ${
                    theme === 'party' ? 'text-yellow-500' : ''
                  }`}
                />
              </Button>

              <Button
                variant='ghost'
                size='icon'
                onClick={toggleLanguage}
                className='transition-all duration-200 hover:bg-muted/50 hover:scale-105 active:scale-95'
              >
                <Languages className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
