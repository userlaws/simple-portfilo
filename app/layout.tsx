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
  title: 'I see you ( i dont :)',
  description:
    'Building reliable software with Python/Java, SQL, and React. CS & InfoSec student available FT Jan 2026.',
  generator: 'imanol-aracena.dev',
  openGraph: {
    title: 'Backend & Full-Stack Engineer | NYC',
    description:
      'Building reliable software with Python/Java, SQL, and React. CS & InfoSec student available FT Jan 2026.',
    images: ['/metadata.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backend & Full-Stack Engineer | NYC',
    description:
      'Building reliable software with Python/Java, SQL, and React. CS & InfoSec student available FT Jan 2026.',
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
