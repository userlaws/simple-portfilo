'use client';

import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/proof-strip';
import { WhatIDo } from '@/components/what-i-do';
import { SkillsSection } from '@/components/skills-section';
import { Confetti } from '@/components/confetti';
import { Footer } from '@/components/footer';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const handleCancelParty = () => {
    setTheme('light');
  };

  return (
    <main className='min-h-screen'>
      {theme === 'party' && <Confetti />}
      {theme === 'party' && (
        <Button
          onClick={handleCancelParty}
          className='fixed top-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse'
          size='sm'
        >
          <X className='h-4 w-4 mr-2' />
          Cancel Party
        </Button>
      )}
      <Navigation />
      <Hero />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-5xl'>
        <SkillsSection />
      </div>
      <WhatIDo />
      <ProofStrip />
      <Footer />
    </main>
  );
}
