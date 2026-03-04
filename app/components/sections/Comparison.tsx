import React from 'react';
import { ArrowLeftRight, Box, Check, X, Layers } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';

const landerFeatures = [
  'Fast setup with ready AI workflows',
  'Built to grow and adapt with you',
  'Real-time, AI-powered analytics',
  'Automates tasks, reducing overhead',
  'Expert support + AI guidance',
];

const othersFeatures = [
  'Slower execution and manual setup',
  'Requires manual updates as you scale',
  'Limited or delayed reporting',
  'Higher labor costs, less automation',
  'Generic support or none at all',
];

export const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Comparison"
          badgeIcon={ArrowLeftRight}
          title="Why Choose Us"
          description="We help businesses harness the power of AI to work smarter, scale faster, and innovate boldly using custom automation & solutions."
          withDividers
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-fuchsia-500 flex items-center justify-center shadow-sm">
                <Box className="w-4 h-4 text-white [stroke-width:1.5]" />
              </div>
              <h3 className="text-3xl font-semibold tracking-tight text-white">Lander OS</h3>
            </div>

            <Card variant="highlighted" className="flex-1">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              
              <ul className="space-y-6 relative z-10">
                {landerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-fuchsia-400 mt-0.5 shrink-0 [stroke-width:1.5]" />
                    <span className="text-lg sm:text-xl text-zinc-200 font-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
              <Layers className="w-8 h-8 text-zinc-500 [stroke-width:1.5]" />
              <h3 className="text-3xl font-semibold tracking-tight text-zinc-400">Others</h3>
            </div>

            <Card variant="muted" className="flex-1" hover={false}>
              <ul className="space-y-6">
                {othersFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <X className="w-5 h-5 text-zinc-600 mt-0.5 shrink-0 [stroke-width:1.5]" />
                    <span className="text-lg sm:text-xl text-zinc-400 font-normal">{feature}</span>
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
