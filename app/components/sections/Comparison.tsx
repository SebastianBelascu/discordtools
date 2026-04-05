import React from 'react';
import { ArrowLeftRight, Box, Check, X, Layers } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';

const landerFeatures = [
  { title: 'No Password Needed', desc: 'We never ask for your login details. Your account stays 100% private and secure in your hands.' },
  { title: 'Lightning Fast Delivery', desc: "We don't make you wait. Server boosts are applied instantly, and other subscriptions are ready in under 24 hours." },
  { title: 'Real 24/7 Human Support', desc: 'Talk to a real person, not a bot. Our team is online around the clock (EU & USA) to help you in your own language.' },
  { title: 'Full Service Warranty', desc: 'We stand by our products. If anything goes wrong during your subscription, we fix it or replace it immediately.' },
  { title: 'Pay Your Way', desc: 'Use whatever you\'re comfortable with: Crypto, Revolut, PayPal, Venmo, or Credit Card.' },
];

const othersFeatures = [
  { title: 'They Ask for Your Login', desc: 'Giving your password to a stranger is a huge risk. They can steal your data or lock you out of your account.' },
  { title: 'Slow & Manual Setup', desc: "You're often left waiting for days with no updates because they handle everything manually." },
  { title: 'Useless Bot Support', desc: 'Good luck getting help. Most sellers use basic bots or just disappear after you pay them.' },
  { title: 'Risk of Account Bans', desc: 'Using "stolen" or "carded" methods can get your Discord or Spotify account permanently banned.' },
  { title: 'Limited Payment Options', desc: 'They usually force you to use sketchy payment methods that offer zero protection for your money.' },
];

export const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Market Comparison"
          badgeIcon={ArrowLeftRight}
          title="Why Choose Us?"
          description="We provide a transparent, high-speed infrastructure for global digital subscriptions. Eliminate the risk of account bans and slow delivery."
          withDividers
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center shadow-sm">
                <Box className="w-4 h-4 text-white [stroke-width:1.5]" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tight text-white">The DiscTools Way</h3>
            </div>

            <Card variant="highlighted" className="flex-1">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              
              <ul className="space-y-6 relative z-10">
                {landerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-fuchsia-400 mt-1 shrink-0 [stroke-width:1.5]" />
                    <div>
                      <span className="text-lg sm:text-xl text-zinc-200 font-semibold block mb-0.5">{feature.title}</span>
                      <span className="text-sm text-zinc-500 font-normal leading-relaxed">{feature.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <Layers className="w-8 h-8 text-zinc-500 [stroke-width:1.5]" />
              <h3 className="text-3xl font-semibold tracking-tight text-zinc-400">The Other Guys</h3>
            </div>

            <Card variant="muted" className="flex-1" hover={false}>
              <ul className="space-y-6">
                {othersFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <X className="w-5 h-5 text-zinc-600 mt-1 shrink-0 [stroke-width:1.5]" />
                    <div>
                      <span className="text-lg sm:text-xl text-zinc-400 font-semibold block mb-0.5">{feature.title}</span>
                      <span className="text-sm text-zinc-600 font-normal leading-relaxed">{feature.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
