'use client';

import { useState, useRef, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { NoteCard } from '@/components/note-card';
import { Confetti } from '@/components/confetti';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, X } from 'lucide-react';

const notes = [
  // Backend & Data
  {
    title: 'Rate limiting 101: token bucket in 25 lines',
    description:
      'TS implementation + where to enforce (edge vs app). Token math, burst vs steady-state, global vs per-user keys, testing with fake timers.',
    slug: 'rate-limiting-token-bucket',
    category: 'Backend & Data',
  },
  {
    title: 'Idempotent POSTs: request keys + retries',
    description:
      'Make duplicate requests safe. Idempotency key schema, 201 vs 200 semantics, dedupe window + clean-up job.',
    slug: 'idempotent-posts',
    category: 'Backend & Data',
  },
  {
    title: 'Schema migrations: 5 guardrails I use',
    description:
      'How to ship DB changes without drama. Backward/forward compatibility, expand → backfill → contract, add indexes concurrently.',
    slug: 'schema-migrations',
    category: 'Backend & Data',
  },
  {
    title: "Writing import runbooks that don't wake you at 2am",
    description:
      'A practical checklist for safe data imports. Backup snapshot + restore test, 10-row dry run & reconciliation query.',
    slug: 'import-runbooks',
    category: 'Backend & Data',
  },
  {
    title: 'SQL patterns I reuse weekly',
    description:
      'Fast queries you actually need. "Top N per group" via window functions, de-dupe latest record, pagination with keyset vs offset.',
    slug: 'sql-patterns',
    category: 'Backend & Data',
  },
  {
    title: 'Logging/metrics for tiny services',
    description:
      'Minimal telemetry that punches above its weight. Request rate, p95 latency, error rate, structured logs with request id.',
    slug: 'logging-metrics',
    category: 'Backend & Data',
  },

  // Home Lab & Hosting
  {
    title: "My Arch Linux home server: what's running & how it's organized",
    description:
      'Overview of your box + services. Services: Discord bots, APIs, sites, (old) FiveM/Minecraft. Systemd units, folders, users, firewalls.',
    slug: 'arch-linux-server',
    category: 'Home Lab & Hosting',
  },
  {
    title: 'Hosting Discord bots "the right way" on Linux',
    description:
      'From "it runs on my laptop" to a service. Systemd service file + restart policies, secret management, rate limits & retries.',
    slug: 'discord-bots-hosting',
    category: 'Home Lab & Hosting',
  },
  {
    title: 'Minecraft server admin notes (paper/spigot)',
    description:
      'Stuff you wish you knew on day 1. Ports & JVM flags, view-distance, TPS basics, backups & world saves, simple anti-grief ops.',
    slug: 'minecraft-server-admin',
    category: 'Home Lab & Hosting',
  },
  {
    title: 'From zero to HTTPS: self-hosting a small site',
    description:
      "The shortest path to a safe public endpoint. Reverse proxy (Caddy/NGINX), Let's Encrypt certs, logs, fail2ban basics.",
    slug: 'self-hosting-https',
    category: 'Home Lab & Hosting',
  },
  {
    title: 'Backups I actually restore',
    description:
      'Proof, not vibes. DB dump + compressed artifact, restore rehearsal schedule, checksum + "how long would a restore take?"',
    slug: 'backups-restore',
    category: 'Home Lab & Hosting',
  },

  // Security & Systems
  {
    title: 'Telnet vs SSH: packet captures that finally convinced me',
    description:
      'What Wireshark shows and why it matters. Plaintext creds on Telnet, encrypted SSH session, simple hardening checklist.',
    slug: 'telnet-vs-ssh',
    category: 'Security & Systems',
  },
  {
    title: 'Why ECB leaks patterns (and why I pick GCM)',
    description:
      'The picture that sells authenticated encryption. ECB vs CBC/CFB/OFB, GCM for integrity + privacy, link to small code snippet.',
    slug: 'ecb-vs-gcm',
    category: 'Security & Systems',
  },
  {
    title: 'Exploit lab debrief: validating and mitigating common vulns',
    description:
      'What you learned running Metasploit against lab services. Distcc/unrealIRCd/vsftpd etc. findings, how to talk mitigation.',
    slug: 'exploit-lab-debrief',
    category: 'Security & Systems',
  },

  // Product & Process
  {
    title: 'How I scope a tiny feature',
    description:
      'Turning vague into shippable. Write goals, non-goals, risks, happy path + failure modes, tests/metrics/runbook before code.',
    slug: 'scoping-features',
    category: 'Product & Process',
  },
  {
    title: 'My CI/CD starter: GitHub Actions you can paste',
    description:
      'Reusable workflow for Next.js + API. Lint/test/build jobs, env gating (preview vs prod), "smoke ping" after deploy.',
    slug: 'cicd-github-actions',
    category: 'Product & Process',
  },
  {
    title: 'A tiny API doc that saves hours',
    description:
      'Make your endpoints discoverable. Curl examples, JSON shapes, error codes and idempotency behavior, versioning notes.',
    slug: 'api-documentation',
    category: 'Product & Process',
  },

  // Integrations & Platform
  {
    title: 'First steps with OIDC (Auth0/Okta) in Next.js',
    description:
      'What finally clicked about identity. OIDC vs SAML in one paragraph, NextAuth basics + session model, tenant isolation.',
    slug: 'oidc-nextjs',
    category: 'Integrations & Platform',
  },
  {
    title: 'Writing a small "adapter" service (webhooks → storage → callback)',
    description:
      'The pattern behind a lot of integrations. Verify webhook signatures, retries/backoff + idempotency key, status callback & metrics.',
    slug: 'adapter-service',
    category: 'Integrations & Platform',
  },

  // Learning Journal
  {
    title: 'Week 1: Mobile app learning log',
    description:
      'Keep it candid and short. Stack you picked and why, one screen you built + gif, 1 bug, 1 design note, 1 question for next week.',
    slug: 'mobile-app-week1',
    category: 'Learning Journal',
  },
  {
    title: 'Go in a weekend: building a tiny REST API',
    description:
      '"What surprised me coming from Python/TS." Handlers, context/timeouts, sqlx/gorm note, tests + Makefile + README.',
    slug: 'go-weekend-api',
    category: 'Learning Journal',
  },
];

const categories = [
  'All',
  'Backend & Data',
  'Home Lab & Hosting',
  'Security & Systems',
  'Product & Process',
  'Integrations & Platform',
  'Learning Journal',
];

// Custom Dropdown Component
function CategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
  notes,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  notes: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-3 min-w-[200px] 
          bg-background border border-border rounded-lg
          hover:border-accent/50 hover:bg-accent/5 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
          transition-all duration-200 ease-in-out
          ${
            isOpen
              ? 'border-accent bg-accent/5 shadow-lg ring-1 ring-accent/20'
              : ''
          }
        `}
      >
        <Filter className='h-4 w-4 text-muted-foreground' />
        <span className='flex-1 text-left text-sm font-medium'>
          {selectedCategory} (
          {selectedCategory === 'All'
            ? notes.length
            : notes.filter((note) => note.category === selectedCategory).length}
          )
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute top-full left-0 right-0 mt-2 z-50
          bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-xl
          overflow-hidden
          transition-all duration-300 ease-out
          ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100 shadow-2xl ring-1 ring-accent/10'
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }
        `}
        style={{
          transformOrigin: 'top center',
        }}
      >
        <div className='py-1'>
          {categories.map((category, index) => {
            const count =
              category === 'All'
                ? notes.length
                : notes.filter((note) => note.category === category).length;

            const isSelected = category === selectedCategory;

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-sm
                  transition-all duration-200 ease-out
                  hover:bg-accent/10 hover:text-accent-foreground hover:scale-[1.02]
                  active:scale-[0.98]
                  ${
                    isSelected
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  }
                `}
                style={{
                  animationDelay: `${index * 30}ms`,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                  opacity: isOpen ? 1 : 0,
                  transition: `all 0.2s ease-out ${index * 30}ms`,
                }}
              >
                <span className='font-medium'>{category}</span>
                <span className='text-xs opacity-70'>({count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NotesPage() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredNotes =
    selectedCategory === 'All'
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

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
      <div className='container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-4xl'>
        <div className='space-y-6 sm:space-y-8'>
          <div className='text-center sm:text-left py-2'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight wrap-break-word min-h-[1.2em] overflow-visible pb-1'>
              {t('notesTitle')}
            </h1>
            <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl wrap-break-word leading-relaxed'>
              {t('notesSubtitle')}
            </p>
          </div>

          {/* Beautiful Animated Dropdown */}
          <div className='flex justify-center sm:justify-start gap-4'>
            <CategoryDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              notes={notes}
            />

            {/* Clear Filter Button */}
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className='px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 border border-border rounded-lg hover:border-accent/50 hover:bg-accent/5'
              >
                {t('clearFilter')}
              </button>
            )}
          </div>

          {/* Results Summary */}
          <div className='flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in duration-300'>
            <span>
              {t('showingNotes')} {filteredNotes.length}{' '}
              {filteredNotes.length === 1 ? t('note') : t('notePlural')}
            </span>
            {selectedCategory !== 'All' && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 animate-in slide-in-from-left-2 duration-300'>
                {selectedCategory}
              </span>
            )}
          </div>

          {/* Notes Grid */}
          <div className='space-y-6 sm:space-y-8'>
            {filteredNotes.map((note) => (
              <NoteCard key={note.slug} {...note} />
            ))}
          </div>

          {/* No results message */}
          {filteredNotes.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>{t('noNotesFound')}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
