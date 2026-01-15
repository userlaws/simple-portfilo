import type React from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/contexts/theme-context';
import { LanguageProvider } from '@/contexts/language-context';
import { themeScript } from './theme-script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains-mono',
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
    <html lang='en'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
