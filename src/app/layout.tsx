import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Upteky Hire — Candidate Management Dashboard',
  description:
    'A modern, full-featured candidate management dashboard for tracking internship applicants, managing their pipeline, and streamlining recruitment at Upteky.',
  keywords: ['recruitment', 'candidate management', 'HR dashboard', 'hiring', 'internship'],
  authors: [{ name: 'Upteky' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0a1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
