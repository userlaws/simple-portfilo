'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Globe,
  Plus,
  Minus,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage();

  const projects = useProjects();
  const services = useServices();
  const stack = useStack();
  const stats = useStats();
  const marqueeTags = MARQUEE_TAGS;

  return (
    <>
      <Navigation />
      <main id='work' className='container-page pt-8 pb-4'>
        {/* HERO ROW ───────────────────────── */}
        <section
          aria-label='Intro'
          className='bento'
          style={{ animationDelay: '40ms' }}
        >
          <HeroTile />
          <NowTile />
        </section>

        {/* STAT ROW ───────────────────────── */}
        <section
          aria-label='Stats'
          className='bento mt-4'
          style={{ animationDelay: '80ms' }}
        >
          {stats.map((s, i) => (
            <article
              key={s.label}
              className={`tile span-3 fade-up ${
                i === stats.length - 1 ? 'tile-accent' : ''
              }`}
              style={{ animationDelay: `${120 + i * 60}ms` }}
            >
              <p className='num text-[44px] sm:text-[52px] leading-none'>
                {s.value}
              </p>
              <p className='mono-label mt-3'>{s.label}</p>
            </article>
          ))}
        </section>

        {/* MARQUEE ────────────────────────── */}
        <section
          aria-label='Capabilities marquee'
          className='tile span-12 mt-4 marquee fade-up'
          style={{ animationDelay: '240ms', padding: 0 }}
        >
          <div className='marquee'>
            <div className='marquee-track'>
              {[...marqueeTags, ...marqueeTags].map((tag, i) => (
                <span key={`${tag}-${i}`} className='inline-flex items-center gap-8'>
                  <span>{tag}</span>
                  <span className='marquee-sep' aria-hidden='true'>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK ──────────────────── */}
        <section aria-label='Selected work' className='mt-12'>
          <SectionHeader
            heading={
              <>
                {t('memorableProjects').split(' ')[0]}{' '}
                <span className='text-accent'>
                  {t('memorableProjects').split(' ').slice(1).join(' ') ||
                    'work.'}
                </span>
              </>
            }
            count={projects.length}
            countLabel='PROJECTS'
          />

          <div className='bento mt-6'>
            {projects.map((p, i) => (
              <ProjectTile key={p.title} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* HOMELAB ────────────────────────── */}
        <section aria-label='Homelab' className='mt-12'>
          <SectionHeader
            heading={
              <>
                The <span className='text-accent'>homelab.</span>
              </>
            }
            count={1}
            countLabel='LIVE'
          />

          <div className='bento mt-6'>
            <BioTile />
            <NeofetchTile services={services} />
          </div>
        </section>

        {/* STACK ──────────────────────────── */}
        <section aria-label='Stack' className='mt-12'>
          <SectionHeader
            heading={
              <>
                The <span className='text-accent'>stack.</span>
              </>
            }
            count={stack.length}
            countLabel='CATEGORIES'
          />

          <div className='bento mt-6'>
            {stack.map((cat) => (
              <article
                key={cat.title}
                className='tile tile-interactive span-4 fade-up'
              >
                <header className='flex items-center justify-between mb-4'>
                  <h3 className='display-md text-[20px]'>{cat.title}</h3>
                  <span className='pill'>{cat.items.length}</span>
                </header>
                <ul className='flex flex-wrap gap-2'>
                  {cat.items.map((item) => (
                    <li key={item} className='chip'>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT ────────────────────────── */}
        <section
          id='contact'
          aria-label='Contact'
          className='mt-12'
        >
          <ContactTile />
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero tile (8-col)
   ───────────────────────────────────────────────────────────── */
const HeroTile = () => {
  const { t } = useLanguage();
  return (
    <article
      className='tile tile-featured span-8 fade-up flex flex-col justify-between min-h-[360px]'
      style={{ animationDelay: '0ms' }}
    >
      <div className='flex items-center gap-3'>
        <span className='mono-label'>— PORTFOLIO</span>
        <span className='mono-label text-[var(--dim)]'>NYC · 2026</span>
      </div>

      <div className='mt-8'>
        <h1 className='display-xl'>
          Imanol
          <br />
          <span className='text-accent'>Aracena.</span>
        </h1>
        <p className='mt-6 max-w-[52ch] text-[var(--mute)] text-[15px] leading-relaxed'>
          {t('heroSubtitle')}
        </p>
      </div>

      <div className='mt-8 flex flex-wrap items-center gap-3'>
        <a
          href='#contact'
          className='pill pill-accent'
          aria-label='Jump to contact'
          tabIndex={0}
        >
          <span>GET IN TOUCH</span>
          <ArrowUpRight className='w-3.5 h-3.5' aria-hidden='true' />
        </a>
        <a
          href='/projects'
          className='pill'
          aria-label={t('viewMyProjects')}
          tabIndex={0}
        >
          {t('viewMyProjects')}
        </a>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Now tile (4-col) — avatar, time, typewriter, meta rows
   ───────────────────────────────────────────────────────────── */
const ROLE_ROTATION = [
  'Full-Stack Developer',
  'Backend Engineer',
  'IT Professional',
  'Systems Engineer',
];

const NowTile = () => {
  const { t } = useLanguage();
  const role = useTypewriter(ROLE_ROTATION);
  const time = useLocalTime('America/New_York');

  return (
    <article
      className='tile span-4 fade-up flex flex-col gap-5 min-h-[360px]'
      style={{ animationDelay: '80ms' }}
    >
      <header className='flex items-start justify-between'>
        <div
          className='w-14 h-14 rounded-[14px] flex items-center justify-center font-mono font-semibold'
          style={{
            background:
              'linear-gradient(135deg, var(--accent) 0%, color-mix(in oklch, var(--accent) 60%, #000 40%) 100%)',
            color: 'var(--accent-ink)',
            boxShadow: 'var(--shadow-md)',
          }}
          aria-label='Imanol Aracena avatar'
        >
          IA
        </div>
        <div className='text-right'>
          <p className='mono-label'>LOCAL TIME</p>
          <p className='font-mono text-[18px] num text-[var(--text)] mt-1'>
            {time}
          </p>
        </div>
      </header>

      <div>
        <p className='mono-label'>CURRENTLY</p>
        <p className='mt-2 font-medium text-[18px] tracking-tight'>
          {role}
          <span className='caret' aria-hidden='true'>
            ▌
          </span>
        </p>
      </div>

      <dl className='mt-auto'>
        <div className='meta-row'>
          <dt>BASED</dt>
          <dd>Manhattan, NYC</dd>
        </div>
        <div className='meta-row'>
          <dt>DEGREE</dt>
          <dd>B.S. CS &amp; InfoSec</dd>
        </div>
        <div className='meta-row'>
          <dt>LANGS</dt>
          <dd>EN · ES</dd>
        </div>
      </dl>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Section header (display heading + mono count)
   ───────────────────────────────────────────────────────────── */
const SectionHeader = ({
  heading,
  count,
  countLabel,
}: {
  heading: React.ReactNode;
  count: number;
  countLabel: string;
}) => (
  <header className='flex items-end justify-between gap-4 px-1'>
    <h2 className='display-lg'>{heading}</h2>
    <span className='mono-label'>
      {String(count).padStart(2, '0')} · {countLabel}
    </span>
  </header>
);

/* ─────────────────────────────────────────────────────────────
   Project tile — varied spans, expandable details
   ───────────────────────────────────────────────────────────── */
type Project = {
  title: string;
  period: string;
  blurb: string;
  tags: string[];
  href: string;
  span: 'span-4' | 'span-6' | 'span-8';
  featured?: boolean;
  bullets?: string[];
};

const ProjectTile = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((open) => !open);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((open) => !open);
    }
  };

  return (
    <article
      className={`tile tile-interactive ${project.span} ${
        project.featured ? 'tile-featured' : ''
      } fade-up flex flex-col`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <header className='flex items-center justify-between mb-5'>
        <span className='mono-label'>
          № {String(index + 1).padStart(2, '0')}
        </span>
        <span className='mono-label text-[var(--dim)]'>{project.period}</span>
      </header>

      <h3
        className={`display-md ${
          project.span === 'span-8' || project.span === 'span-6'
            ? 'text-[40px] sm:text-[48px]'
            : 'text-[32px]'
        } hover:text-[var(--accent)] transition-colors`}
      >
        {project.title}
      </h3>

      <p className='mt-3 text-[15px] text-[var(--mute)] leading-relaxed max-w-[60ch]'>
        {project.blurb}
      </p>

      <ul className='mt-4 flex flex-wrap gap-2'>
        {project.tags.map((tag) => (
          <li key={tag} className='chip'>
            {tag}
          </li>
        ))}
      </ul>

      {project.bullets && project.bullets.length > 0 ? (
        <button
          type='button'
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          tabIndex={0}
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${project.title} details`}
          className='mt-5 self-start mono-label text-[var(--mute)] hover:text-[var(--text)] transition-colors flex items-center gap-2'
        >
          <span>{isOpen ? 'COLLAPSE' : 'CLICK TO EXPAND'}</span>
        </button>
      ) : null}

      {isOpen && project.bullets ? (
        <ul className='mt-4 space-y-2 text-[14px] text-[var(--mute)]'>
          {project.bullets.map((b) => (
            <li key={b} className='flex gap-2'>
              <span className='text-[var(--accent)]' aria-hidden='true'>
                ›
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <footer className='mt-auto pt-6 flex items-center justify-between'>
        <a
          href={project.href}
          target={project.href.startsWith('http') ? '_blank' : undefined}
          rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={`Open ${project.title}`}
          tabIndex={0}
          className='pill'
        >
          <span>VIEW</span>
          <ArrowUpRight className='w-3.5 h-3.5' aria-hidden='true' />
        </a>
        <button
          type='button'
          onClick={handleToggle}
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${project.title}`}
          tabIndex={0}
          className='w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--card-elev)] flex items-center justify-center text-[var(--mute)] hover:text-[var(--text)] hover:border-[color-mix(in_oklch,var(--line)_50%,var(--accent)_50%)] transition-all'
        >
          {isOpen ? (
            <Minus className='w-4 h-4' aria-hidden='true' />
          ) : (
            <Plus className='w-4 h-4' aria-hidden='true' />
          )}
        </button>
      </footer>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Bio tile (5-col)
   ───────────────────────────────────────────────────────────── */
const BioTile = () => {
  const { t } = useLanguage();
  const tech = ['arch-linux', 'discord-bots', 'minecraft-server', 'tmux', 'systemd'];

  return (
    <article className='tile tile-interactive span-5 fade-up'>
      <p className='mono-label'>— LIVE · INFRA</p>
      <h3 className='display-md mt-3 text-[28px]'>
        I run my own <span className='text-accent'>stack</span>, end-to-end.
      </h3>
      <p className='mt-4 text-[15px] text-[var(--mute)] leading-relaxed'>
        A self-administered Arch box I maintain entirely, over SSH. It hosts
        userlaws.dev, Discord bots, and game servers for friends. Previews
        might mix Linux. No managed services — every break is mine to fix.
      </p>
      <ul className='mt-6 flex flex-wrap gap-2'>
        {tech.map((item) => (
          <li key={item} className='chip'>
            {item}
          </li>
        ))}
      </ul>
      <p className='sr-only'>{t('aboutMeBody')}</p>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Neofetch terminal tile (7-col)
   ───────────────────────────────────────────────────────────── */
type Service = { name: string; port: string };

const NeofetchTile = ({ services }: { services: Service[] }) => (
  <article className='tile span-7 fade-up' style={{ padding: 18 }}>
    <div className='terminal'>
      <div className='terminal-bar'>
        <span>userlaws.dev — 1 selected</span>
        <span className='inline-flex items-center gap-2'>
          <span className='status-dot' aria-hidden='true' /> 27D 4H 12M
        </span>
      </div>

      <dl className='space-y-0'>
        <div className='term-row'>
          <dt>HOST</dt>
          <dd>userlaws.dev</dd>
        </div>
        <div className='term-row'>
          <dt>OS</dt>
          <dd>Arch Linux x86_64</dd>
        </div>
        <div className='term-row'>
          <dt>KERNEL</dt>
          <dd>6.6 #stable</dd>
        </div>
        <div className='term-row'>
          <dt>SHELL</dt>
          <dd>zsh 5.9</dd>
        </div>
        <div className='term-row'>
          <dt>UPTIME</dt>
          <dd>187d 17h 41m</dd>
        </div>
        <div className='term-row'>
          <dt>PACKAGES</dt>
          <dd>1.3k · 281</dd>
        </div>
      </dl>

      <p className='mono-label mt-5 mb-2 text-[var(--accent)]'>
        ACTIVE SERVICES
      </p>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1'>
        {services.map((s) => (
          <li
            key={s.name}
            className='flex items-center justify-between font-mono text-[12px] py-1 border-b border-dashed border-[var(--line-soft)]'
          >
            <span className='inline-flex items-center gap-2'>
              <span
                className='w-1.5 h-1.5 rounded-full'
                style={{ background: 'var(--good)' }}
                aria-hidden='true'
              />
              {s.name}
            </span>
            <span className='text-[var(--dim)]'>{s.port}</span>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

/* ─────────────────────────────────────────────────────────────
   Contact tile
   ───────────────────────────────────────────────────────────── */
const ContactTile = () => {
  const { t } = useLanguage();
  const contacts = [
    {
      label: 'github.com/userlaws',
      href: 'https://github.com/userlaws',
      Icon: Github,
    },
    {
      label: 'linkedin.com/in/imanolaracena',
      href: 'https://www.linkedin.com/in/imanolaracena/',
      Icon: Linkedin,
    },
    {
      label: 'userlaws.dev',
      href: 'https://userlaws.dev',
      Icon: Globe,
    },
  ];

  return (
    <article className='tile span-12 fade-up relative overflow-hidden text-center px-6 py-16 sm:py-24'>
      <div
        aria-hidden='true'
        className='absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none'
        style={{
          background:
            'radial-gradient(closest-side, var(--accent-soft), transparent 70%)',
        }}
      />
      <div className='relative'>
        <p className='mono-label'>
          — LET&apos;S BUILD SOMETHING
        </p>
        <h2 className='display-lg mt-4 text-[clamp(48px,9vw,120px)]'>
          Say <span className='text-accent'>hello.</span>
        </h2>
        <p className='mt-6 max-w-[56ch] mx-auto text-[var(--mute)] text-[15px]'>
          {t('contactTagline')}
        </p>

        <ul className='mt-10 flex flex-wrap items-center justify-center gap-3'>
          {contacts.map(({ label, href, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                tabIndex={0}
                className='pill'
              >
                <Icon className='w-3.5 h-3.5' aria-hidden='true' />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Hooks
   ───────────────────────────────────────────────────────────── */
const useTypewriter = (words: string[], speed = 90, pause = 1400) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setText(words[0]);
      return;
    }

    const current = words[wordIndex % words.length];
    const isComplete = !isDeleting && text === current;
    const isCleared = isDeleting && text === '';

    if (isComplete) {
      const t = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (isCleared) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText(
          isDeleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
};

const useLocalTime = (timeZone: string) => {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
};

/* ─────────────────────────────────────────────────────────────
   Data — projects, services, stack, stats, marquee tags
   Add new entries below; markup above stays untouched.
   ───────────────────────────────────────────────────────────── */
const useProjects = (): Project[] => {
  const { t } = useLanguage();
  return useMemo(
    () => [
      {
        title: t('projectsJJAYCompanionTitle'),
        period: 'NOV 2024 — ONGOING',
        blurb: t('projectsJJAYCompanionDesc'),
        tags: [
          'React Native',
          'Expo',
          'TypeScript',
          'Supabase',
          'Edge Functions',
          'iOS',
        ],
        href: '#',
        span: 'span-8',
        featured: true,
        bullets: [
          'Shipped to Apple App Store; thousands of John Jay students',
          'Component-based RN UI across 5 tabs w/ dark/light theming',
          '15 RLS-enabled Supabase tables + Edge Functions for event ingest',
          'Iterated through multiple App Store review cycles',
        ],
      },
      {
        title: t('projectsNoteShareTitle'),
        period: 'MAR 2025 — ONGOING',
        blurb: t('projectsNoteShareDesc'),
        tags: [
          'Next.js',
          'React',
          'Node.js',
          'Supabase',
          'PostgreSQL',
          'Vercel',
        ],
        href: 'https://noteshare.us/',
        span: 'span-4',
        bullets: [
          'Google + Discord OAuth w/ JWT-based session management',
          'Role-based access controls for premium content',
          'Vercel + GitHub Actions CI/CD, zero-downtime migrations',
        ],
      },
      {
        title: t('projectsGiftWhispererTitle'),
        period: 'MAY 2025 — JUL 2025',
        blurb: t('projectsGiftWhispererDesc'),
        tags: ['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL'],
        href: 'https://christmas-list-peach.vercel.app/',
        span: 'span-12',
        bullets: [
          'CRUD: groups, wishlists, gift claiming, participation tracking',
          'Encrypted-cookie sessions w/ invite-code-based auth',
          'Node.js / Express REST API backed by Prisma + PostgreSQL',
        ],
      },
    ],
    [t]
  );
};

const useServices = (): Service[] =>
  useMemo(
    () => [
      { name: 'userlaws.dev', port: ':443' },
      { name: 'discord-bot-01', port: ':3000' },
      { name: 'discord-bot-02', port: ':3001' },
      { name: 'noteshare-cron', port: ':4000' },
      { name: 'vc-tracker', port: ':5050' },
      { name: 'nginx-reverse', port: ':80' },
    ],
    []
  );

const useStack = () => {
  const { t } = useLanguage();
  return useMemo(
    () => [
      {
        title: t('languages'),
        items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL', 'HTML', 'CSS'],
      },
      {
        title: t('technologies'),
        items: ['Next.js', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
      },
      {
        title: t('tools'),
        items: ['Git', 'GitHub Actions', 'Docker', 'VS Code', 'Figma', 'Adobe Photoshop', 'Adobe Premiere'],
      },
      {
        title: t('security'),
        items: ['SSH', 'Metasploit', 'tcpdump', 'OpenSSL', 'Network Hardening', 'OAuth', 'MFA', 'Row Level Security'],
      },
    ],
    [t]
  );
};

const useStats = () => {
  const { t } = useLanguage();
  return useMemo(
    () => [
      { value: '3+', label: 'YEARS OF HELPDESK' },
      { value: '200+', label: 'DEVICES IMAGED' },
      { value: '95%', label: 'FIRST-CALL RESOLUTION' },
      { value: '0', label: t('rollbacks').toUpperCase() },
    ],
    [t]
  );
};

const MARQUEE_TAGS = [
  'FULL-STACK',
  'SYSADMIN',
  'HOMELAB',
  'NEXT.JS',
  'POSTGRES',
  'ARCH-LINUX',
  'TYPESCRIPT',
  'CI/CD',
  'DOCKER',
  'OAUTH',
  'PYTHON',
  'SUPABASE',
];
