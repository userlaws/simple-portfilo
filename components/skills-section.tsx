'use client';

import { useState } from 'react';
import { Chip } from '@heroui/react';
import { useLanguage } from '@/contexts/language-context';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiOpenjdk,
  SiSharp,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiFigma,
  SiAdobephotoshop,
  SiAdobe,
  SiOpenvpn,
  SiOpenssl,
  SiAuth0,
  SiGoogle,
  SiDiscord,
  SiCoder,
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const skillMap: Record<string, Skill> = {
  JavaScript: { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  TypeScript: { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  Python: { name: 'Python', icon: SiPython, color: '#3776ab' },
  Java: { name: 'Java', icon: SiOpenjdk, color: '#f89820' },
  'C#': { name: 'C#', icon: SiSharp, color: '#239120' },
  SQL: { name: 'SQL', icon: SiMysql, color: '#336791' },
  HTML: { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
  CSS: { name: 'CSS', icon: SiCss3, color: '#1572b6' },
  'Next.js': { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  React: { name: 'React', icon: SiReact, color: '#61dafb' },
  'Node.js': { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  Express: { name: 'Express', icon: SiExpress, color: '#000000' },
  'Tailwind CSS': { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  Git: { name: 'Git', icon: SiGit, color: '#f05032' },
  'GitHub Actions': { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
  Docker: { name: 'Docker', icon: SiDocker, color: '#2496ed' },
  'VS Code': { name: 'VS Code', icon: SiCoder, color: '#007acc' },
  Figma: { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
  'Adobe Photoshop': { name: 'Adobe Photoshop', icon: SiAdobephotoshop, color: '#31a8ff' },
  'Adobe Premiere': { name: 'Adobe Premiere', icon: SiAdobe, color: '#ea4335' },
  SSH: { name: 'SSH', icon: SiOpenvpn, color: '#6b7280' },
  Metasploit: { name: 'Metasploit', icon: SiOpenvpn, color: '#ff6b6b' },
  tcpdump: { name: 'tcpdump', icon: SiOpenvpn, color: '#4ecdc4' },
  OpenSSL: { name: 'OpenSSL', icon: SiOpenssl, color: '#721c24' },
  'Network Hardening': { name: 'Network Hardening', icon: SiOpenvpn, color: '#2c3e50' },
  OAuth: { name: 'OAuth', icon: SiAuth0, color: '#4285f4' },
  MFA: { name: 'MFA', icon: SiGoogle, color: '#34a853' },
  'Row Level Security': { name: 'Row Level Security', icon: SiDiscord, color: '#ea4335' },
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
                    className='text-base'
                    style={{ color: skill.color }}
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
