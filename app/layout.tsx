import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Dhananjay Verma | Full Stack & React Native Developer',
  description: 'Portfolio of Dhananjay Verma - Full Stack Developer with 3.5+ years of experience building scalable applications with React, Node.js, React Native, and cloud technologies.',
  keywords: ['Dhananjay Verma', 'Full Stack Developer', 'React Native Developer', 'React', 'Node.js', 'Bangalore', 'Gurgaon'],
  openGraph: {
    title: 'Dhananjay Verma | Full Stack Developer',
    description: 'Building scalable applications with React, Node.js, React Native, and cloud technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhananjay Verma | Full Stack Developer',
    description: '3.5+ years of experience. 20+ projects delivered. 50K+ users impacted.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
