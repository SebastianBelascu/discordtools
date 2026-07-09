'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Network, Rocket, Headphones } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';

const processSteps = [
  {
    icon: Network,
    step: 1,
    title: 'Select Your Upgrade',
    description: 'Choose the Discord, Spotify, YouTube or the service that fits your needs. Whether you\'re an individual user or a large server owner, we have the right plan for you.',
  },
  {
    icon: Rocket,
    step: 2,
    title: 'Checkout with Confidence',
    description: 'Complete your purchase through our secure, encrypted gateway. Pay using Crypto, Revolut, PayPal, or Credit Card.',
  },
  {
    icon: Headphones,
    step: 3,
    title: 'Instant Activation',
    description: 'Sit back and relax. Your server boosts are delivered instantly, while other subscriptions are activated in under 24 hours - all backed by our 24/7 global support team.',
  },
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            badge="HOW IT WORKS"
            badgeIcon={BarChart2}
            title="Simple. Fast. Secure."
            description="Getting your premium upgrades shouldn't be a hassle. Our process is designed to be completely non-invasive, easy to understand."
            withDividers
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="group flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-pink-500/20">
                      <item.icon className="w-7 h-7 text-pink-400 [stroke-width:1.5]" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-medium text-zinc-400 shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                  <p className="text-lg text-zinc-400 font-normal leading-relaxed mb-10 flex-1">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 group-hover:bg-white/10 transition-colors">
                      Step {item.step}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
