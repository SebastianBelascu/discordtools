import React from 'react';
import Image from 'next/image';
import { Disc, ArrowRight, Star, Youtube } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Discord Nitro', href: '/#pricing' },
    { label: 'Server Boosts', href: '/#pricing' },
    { label: 'Spotify Premium', href: '/#pricing' },
    { label: 'YouTube Premium', href: '/#pricing' },
  ],
  company: [
    { label: 'About Us', href: '/#comparison' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Discord Server', href: 'https://disctools.net/discord', external: true },
  ],
  trust: [
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Support', href: 'https://disctools.net/discord', external: true },
    { label: 'Secure Checkout', href: '/#features' },
  ],
};

const socialLinks = [
  { icon: Disc, href: 'https://disctools.net/discord', label: 'Discord' },
  { icon: Star, href: 'https://www.trustpilot.com/review/discordtools.net', label: 'Trustpilot' },
  { icon: Youtube, href: 'https://www.youtube.com/@disctools-net', label: 'YouTube' },
];

function linkRel(external?: boolean) {
  return external ? 'noopener noreferrer' : undefined;
}

function linkTarget(external?: boolean) {
  return external ? '_blank' : undefined;
}

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-24 pb-12 lg:pt-32 overflow-hidden border-t border-white/5 bg-zinc-950 mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/img2.svg" alt="DiscTools" width={48} height={48} className="rounded-xl" />
              <span className="text-2xl font-semibold tracking-tight text-white">DiscTools</span>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
              The global standard for secure and optimized digital subscriptions. Providing premium access through legal, verified, and non-invasive methods since 2020.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 [stroke-width:1.5]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h4 className="text-white font-medium mb-6 tracking-wide">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
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
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={linkTarget(link.external)}
                      rel={linkRel(link.external)}
                      className="text-zinc-400 hover:text-pink-400 transition-colors text-sm sm:text-base inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <h4 className="text-white font-medium mb-6 tracking-wide">Trust</h4>
              <ul className="space-y-4">
                {footerLinks.trust.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={linkTarget(link.external)}
                      rel={linkRel(link.external)}
                      className="text-zinc-400 hover:text-pink-400 transition-colors text-sm sm:text-base inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} DiscTools. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};
