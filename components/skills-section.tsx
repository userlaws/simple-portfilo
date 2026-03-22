'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Braces,
  Brackets,
  Code2,
  Coffee,
  Container,
  Database,
  Figma,
  GitBranch,
  Hash,
  Image,
  KeyRound,
  Lock,
  Network,
  Paintbrush,
  PanelsTopLeft,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Terminal,
  Video,
  Waypoints,
  Wind,
  Workflow,
  CodeXml,
} from 'lucide-react';
import { Chip } from '@heroui/react';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

const skillMap: Record<string, Skill> = {
  JavaScript: { name: 'JavaScript', icon: Braces, color: '#f7df1e' },
  TypeScript: { name: 'TypeScript', icon: Brackets, color: '#3178c6' },
  Python: { name: 'Python', icon: Terminal, color: '#3776ab' },
  Java: { name: 'Java', icon: Coffee, color: '#f89820' },
  'C#': { name: 'C#', icon: Hash, color: '#239120' },
  SQL: { name: 'SQL', icon: Database, color: '#336791' },
  HTML: { name: 'HTML', icon: CodeXml, color: '#e34f26' },
  CSS: { name: 'CSS', icon: Paintbrush, color: '#1572b6' },
  'Next.js': { name: 'Next.js', icon: PanelsTopLeft, color: '#000000' },
  React: { name: 'React', icon: Atom, color: '#61dafb' },
  'Node.js': { name: 'Node.js', icon: Server, color: '#339933' },
  Express: { name: 'Express', icon: Waypoints, color: '#000000' },
  'Tailwind CSS': { name: 'Tailwind CSS', icon: Wind, color: '#06b6d4' },
  Git: { name: 'Git', icon: GitBranch, color: '#f05032' },
  'GitHub Actions': { name: 'GitHub Actions', icon: Workflow, color: '#2088ff' },
  Docker: { name: 'Docker', icon: Container, color: '#2496ed' },
  'VS Code': { name: 'VS Code', icon: Code2, color: '#007acc' },
  Figma: { name: 'Figma', icon: Figma, color: '#f24e1e' },
  'Adobe Photoshop': { name: 'Adobe Photoshop', icon: Image, color: '#31a8ff' },
  'Adobe Premiere': { name: 'Adobe Premiere', icon: Video, color: '#ea4335' },
  SSH: { name: 'SSH', icon: Terminal, color: '#6b7280' },
  Metasploit: { name: 'Metasploit', icon: ShieldAlert, color: '#ff6b6b' },
  tcpdump: { name: 'tcpdump', icon: Network, color: '#4ecdc4' },
  OpenSSL: { name: 'OpenSSL', icon: Lock, color: '#721c24' },
  'Network Hardening': { name: 'Network Hardening', icon: Shield, color: '#2c3e50' },
  OAuth: { name: 'OAuth', icon: KeyRound, color: '#4285f4' },
  MFA: { name: 'MFA', icon: Smartphone, color: '#34a853' },
  'Row Level Security': { name: 'Row Level Security', icon: ShieldCheck, color: '#ea4335' },
};

type CategoryKey = 'languages' | 'technologies' | 'tools' | 'focusAreas';

const categories: Record<CategoryKey, string[]> = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL', 'HTML', 'CSS'],
  technologies: ['Next.js', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: ['Git', 'GitHub Actions', 'Docker', 'VS Code', 'Figma', 'Adobe Photoshop', 'Adobe Premiere'],
  focusAreas: ['SSH', 'Metasploit', 'tcpdump', 'OpenSSL', 'Network Hardening', 'OAuth', 'MFA', 'Row Level Security'],
};

const tabKeys: CategoryKey[] = ['languages', 'technologies', 'tools', 'focusAreas'];

export const SkillsSection = () => {
  const { t } = useLanguage();
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState<CategoryKey>('languages');

  const tabLabels: Record<CategoryKey, string> = {
    languages: t('languages'),
    technologies: t('technologies'),
    tools: t('tools'),
    focusAreas: t('security'),
  };

  return (
    <section className='px-6 md:px-8 py-16 md:py-24'>
      <div ref={ref} className='reveal max-w-5xl mx-auto space-y-8'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center'>{t('skills')}</h2>

        <div className='flex flex-wrap justify-center gap-2'>
          {tabKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === key
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {tabLabels[key]}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap justify-center gap-3 reveal-children visible' key={activeTab}>
          {categories[activeTab].map((skillName) => {
            const skill = skillMap[skillName];
            if (!skill) return null;
            const IconComponent = skill.icon;
            return (
              <Chip
                key={skillName}
                variant='bordered'
                className='border-border/70 bg-card/60 hover:border-accent/50 transition-colors duration-200 px-3 py-5 gap-2'
              >
                <span className='flex items-center gap-2'>
                  <IconComponent
                    className='h-4 w-4 shrink-0'
                    style={{ color: skill.color }}
                    aria-hidden
                  />
                  <span className='text-sm font-medium text-foreground'>
                    {skillName}
                  </span>
                </span>
              </Chip>
            );
          })}
        </div>
      </div>
    </section>
  );
};
