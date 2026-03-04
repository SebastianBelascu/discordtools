'use client';

import React from 'react';
import { Box } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Why Us', href: '#comparison' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[850px] px-4 sm:px-0 pointer-events-none">
      <div className="pointer-events-auto bg-zinc-950/60 backdrop-blur-xl rounded-full shadow-lg shadow-black/50 ring-1 ring-white/10 p-2 flex items-center justify-between">
        <div className="flex items-center gap-4 pl-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center shadow-sm">
            <Box className="w-5 h-5 text-white [stroke-width:1.5]" />
          </div>
          <div className="hidden md:block w-px h-6 bg-white/10" />
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base text-zinc-400 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="pl-4 sm:pl-0">
          <Button href="#get-template" className="px-6 py-2.5">
            Get Template
          </Button>
        </div>
      </div>
    </nav>
  );
};
