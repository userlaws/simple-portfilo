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
  metadataBase: new URL('https://userlaws.dev'),
  title:
    'Imanol Aracena | Associate Software Engineer | Junior Full-Stack | IT Support/Systems',
  description:
    'CS & InfoSec graduate in NYC. Full-stack engineering and IT systems/support. Builds iOS and web apps. Campus IT: SCCM, Active Directory, Microsoft 365. Next.js, React, Node.js, TypeScript, PostgreSQL.',
  generator: 'userlaws.dev',
  openGraph: {
    title:
      'Imanol Aracena | Associate Software Engineer | Junior Full-Stack | IT Support/Systems',
    description:
      'CS & InfoSec graduate in NYC. Full-stack engineering and IT systems/support. Builds iOS and web apps. Campus IT: SCCM, Active Directory, Microsoft 365. Next.js, React, Node.js, TypeScript, PostgreSQL.',
    images: ['/metadata.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Imanol Aracena | Associate Software Engineer | Junior Full-Stack | IT Support/Systems',
    description:
      'Full-stack engineer in NYC. CS & InfoSec graduate. Full-stack engineering and IT systems/support. Next.js, React, Node.js, TypeScript, PostgreSQL.',
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
