'use client';

import { useLanguage } from '@/contexts/language-context';
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
} from 'react-icons/si';
import { SiCoder } from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'Java', icon: SiOpenjdk, color: '#f89820' },
  { name: 'C#', icon: SiSharp, color: '#239120' },
  { name: 'SQL', icon: SiMysql, color: '#336791' },
  { name: 'HTML', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS', icon: SiCss3, color: '#1572b6' },

  // Technologies
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },

  // Tools
  { name: 'Git', icon: SiGit, color: '#f05032' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed' },
  { name: 'VS Code', icon: SiCoder, color: '#007acc' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
  { name: 'Adobe Photoshop', icon: SiAdobephotoshop, color: '#31a8ff' },
  { name: 'Adobe Premiere', icon: SiAdobe, color: '#ea4335' },

  // Focus Areas
  { name: 'SSH', icon: SiOpenvpn, color: '#000000' },
  { name: 'Metasploit', icon: SiOpenvpn, color: '#ff6b6b' },
  { name: 'tcpdump', icon: SiOpenvpn, color: '#4ecdc4' },
  { name: 'OpenSSL', icon: SiOpenssl, color: '#721c24' },
  { name: 'Network Hardening', icon: SiOpenvpn, color: '#2c3e50' },
  { name: 'OAuth', icon: SiAuth0, color: '#4285f4' },
  { name: 'MFA', icon: SiGoogle, color: '#34a853' },
  { name: 'Row Level Security', icon: SiDiscord, color: '#ea4335' },
];

const skillCategories = {
  languages: [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'SQL',
    'HTML',
    'CSS',
  ],
  technologies: ['Next.js', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: [
    'Git',
    'GitHub Actions',
    'Docker',
    'VS Code',
    'Figma',
    'Adobe Photoshop',
    'Adobe Premiere',
  ],
  focusAreas: [
    'SSH',
    'Metasploit',
    'tcpdump',
    'OpenSSL',
    'Network Hardening',
    'OAuth',
    'MFA',
    'Row Level Security',
  ],
};

export function SkillsSection() {
  const { t } = useLanguage();

  const getSkillIcon = (skillName: string) => {
    const skill = skills.find((s) => s.name === skillName);
    return skill || { name: skillName, icon: SiJavascript, color: '#6b7280' };
  };

  const renderSkillChips = (category: keyof typeof skillCategories) => {
    return skillCategories[category].map((skillName) => {
      const skill = getSkillIcon(skillName);
      const IconComponent = skill.icon;
      return (
        <div
          key={skillName}
          className='inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-card/60 hover:border-accent/50 hover:bg-card transition-colors duration-200 group'
          style={{ borderLeft: `3px solid ${skill.color}` }}
        >
          <IconComponent
            className='text-lg group-hover:scale-110 transition-transform duration-200'
            style={{ color: skill.color }}
          />
          <span className='text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-200'>
            {skillName}
          </span>
        </div>
      );
    });
  };

  return (
    <section className='space-y-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-4'>{t('skills')}</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Languages */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg flex items-center gap-2 text-foreground'>
            <span className='text-2xl'>💻</span>
            {t('languages')}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {renderSkillChips('languages')}
          </div>
        </div>

        {/* Technologies */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg flex items-center gap-2 text-foreground'>
            <span className='text-2xl'>⚡</span>
            {t('technologies')}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {renderSkillChips('technologies')}
          </div>
        </div>

        {/* Tools */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg flex items-center gap-2 text-foreground'>
            <span className='text-2xl'>🛠️</span>
            {t('tools')}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {renderSkillChips('tools')}
          </div>
        </div>

        {/* Security */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-lg flex items-center gap-2 text-foreground'>
            <span className='text-2xl'>🔒</span>
            {t('security')}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {renderSkillChips('focusAreas')}
          </div>
        </div>
      </div>
    </section>
  );
}
