import React from 'react';
import { Box, Twitter, Github, Disc, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const footerLinks = {
  services: [
    { label: 'AI Workflows', href: '#' },
    { label: 'Custom Automation', href: '#' },
    { label: 'Data Analytics', href: '#' },
    { label: 'System Integration', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Disc, href: '#', label: 'Discord' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-24 pb-12 lg:pt-32 overflow-hidden border-t border-white/5 bg-zinc-950 mt-auto">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center shadow-sm">
                <Box className="w-5 h-5 text-white [stroke-width:1.5]" />
              </div>
              <span className="text-2xl font-semibold tracking-tight text-white">Lander OS</span>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
              Empowering businesses with intelligent automation and custom AI workflows to scale faster and work smarter.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 [stroke-width:1.5]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h4 className="text-white font-medium mb-6 tracking-wide">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-zinc-400 hover:text-pink-400 transition-colors text-sm sm:text-base inline-flex items-center gap-2 group">
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-medium mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-zinc-400 hover:text-pink-400 transition-colors text-sm sm:text-base inline-flex items-center gap-2 group">
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <h4 className="text-white font-medium mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-zinc-400 hover:text-pink-400 transition-colors text-sm sm:text-base inline-flex items-center gap-2 group">
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Lander OS. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span className="text-zinc-400 text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
