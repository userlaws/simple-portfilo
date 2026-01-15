'use client';

import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/proof-strip';
import { WhatIDo } from '@/components/what-i-do';
import { SkillsSection } from '@/components/skills-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <Hero />
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 max-w-5xl'>
        <SkillsSection />
      </div>
      <WhatIDo />
      <ProofStrip />
      <Footer />
    </main>
  );
}
