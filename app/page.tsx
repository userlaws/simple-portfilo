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

  // Get the full document height for the overlay
  const getDocumentHeight = () => {
    if (typeof window !== 'undefined') {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    }
    return '100vh';
  };

  return (
    <main className='min-h-screen'>
      {theme === 'party' && <Confetti />}
      {theme === 'party' && (
        <div
          onClick={handleCancelParty}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: `${getDocumentHeight()}px`,
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              textAlign: 'center',
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={handleCancelParty}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '30px 60px',
                border: '5px solid white',
                borderRadius: '15px',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 50px rgba(255, 0, 0, 0.8)',
                marginBottom: '20px',
              }}
            >
              🎉 CANCEL PARTY 🎉
            </button>
            <div
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '10px 20px',
                borderRadius: '10px',
              }}
            >
              Or tap anywhere to cancel
            </div>
          </div>
        </div>
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
