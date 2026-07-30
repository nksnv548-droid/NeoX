import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/SmoothScrollProvider';
import { CursorReticle } from '@/components/layout/CursorReticle';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neo X — Vector Intelligence',
  description:
    'Neo X builds fine-tuned AI systems that ship on a plotted trajectory: precise, measured, and built for real infrastructure.',
  metadataBase: new URL('https://neox.example'),
  openGraph: {
    title: 'Neo X — Vector Intelligence',
    description:
      'Fine-tuned AI systems, plotted like a trajectory: precise, measured, production-grade.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0d12',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <CursorReticle />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
