'use client';

import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { WhatIDo } from '@/components/what-i-do';
import { ProofStrip } from '@/components/proof-strip';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <Hero />
      <AboutSection />
      <SkillsSection />
      <WhatIDo />
      <ProofStrip />
      <Footer />
    </main>
  );
}
