'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';

const navLinks = [
  { label: 'Why Us', anchor: 'comparison' },
  { label: 'Process', anchor: 'process' },
  { label: 'Pricing', anchor: 'pricing' },
  { label: 'Features', anchor: 'features' },
  { label: 'Reviews', anchor: 'testimonials' },
  { label: 'FAQ', anchor: 'faq' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[900px] px-4 sm:px-0 pointer-events-none">
      <div className="pointer-events-auto bg-zinc-950/60 backdrop-blur-xl rounded-full shadow-lg shadow-black/50 ring-1 ring-white/10 p-2 flex items-center justify-between">
        <div className="flex items-center gap-4 pl-1">
          <a href="/#" aria-label="Go to home" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <Image src="/img2.svg" alt="DiscTools" width={56} height={56} className="rounded-xl" />
          </a>
          <div className="hidden md:block w-px h-6 bg-white/10" />
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`/#${link.anchor}`}
              onClick={(e) => handleNavClick(e, link.anchor)}
              className="text-base text-zinc-400 hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="pl-4 sm:pl-0">
          <Button href="https://disctools.net/discord" onClick={handleShopClick} className="px-6 py-2.5">
            Join Discord
          </Button>
        </div>
      </div>
    </nav>
  );
};
