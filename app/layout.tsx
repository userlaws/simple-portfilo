import type React from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { themeScript } from './theme-script';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'Imanol Aracena | Associate Software Engineer | Junior Full-Stack Engineer',
  description:
    'CS & InfoSec student in NYC targeting Associate Software Engineer, Junior Full-Stack Engineer, and Software Engineer I roles. Built invite-code workflows for group creation, wishlists, gift claiming, and participation tracking. Stack: Next.js, React, Node.js, TypeScript, SQL/PostgreSQL, AWS/Vercel, Docker, GitHub Actions CI/CD.',
  generator: 'imanol-aracena.dev',
  openGraph: {
    title:
      'Imanol Aracena | Associate Software Engineer | Software Engineer I',
    description:
      'CS & InfoSec student in NYC targeting Associate Software Engineer and Junior Full-Stack Engineer roles for CUNY/public sector tech and product-focused startups. Built invite-code workflows with Next.js/React/Node.js, TypeScript, SQL/PostgreSQL, AWS/Vercel, Docker, GitHub Actions CI/CD.',
    images: ['/metadata.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Imanol Aracena | Associate Software Engineer | Junior Full-Stack Engineer',
    description:
      'CS & InfoSec student in NYC targeting Associate Software Engineer and Software Engineer I roles. Invite-code workflows, group creation, wishlists, gift claiming, participation tracking. Next.js/React/Node.js, TypeScript, SQL/PostgreSQL, AWS/Vercel, Docker, GitHub Actions CI/CD.',
    images: ['/metadata.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        data-theme='dark'
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
