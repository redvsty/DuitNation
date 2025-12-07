import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Money Management',
  description: 'Modern money management dashboard'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}