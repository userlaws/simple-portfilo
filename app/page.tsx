'use client';

import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/proof-strip';
import { WhatIDo } from '@/components/what-i-do';
import { SkillsSection } from '@/components/skills-section';
import { Confetti } from '@/components/confetti';
import { Footer } from '@/components/footer';
import { useTheme } from '@/contexts/theme-context';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className='min-h-screen'>
      {theme === 'party' && <Confetti />}
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
