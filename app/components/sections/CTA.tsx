'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CTA: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-zinc-950/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-[2.5rem] p-8 sm:p-16 overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl hover:border-pink-500/30 transition-colors duration-500 group"
        >
          {/* Inner Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-fuchsia-500/5 to-transparent pointer-events-none" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 blur-[80px] rounded-full pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="pulse" icon={Sparkles} className="mb-8">
                GET STARTED TODAY
              </Badge>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight group-hover:scale-[1.02] transition-transform duration-500"
            >
              Still Have Questions About
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-fuchsia-500">Your Upgrade?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl sm:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              Not everyone wants to pay with Crypto - and that&apos;s okay. Join our official Discord server to chat with our team and complete your order using your preferred payment method. We handle everything from single subscriptions to bulk server boosts.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <Button 
                icon={Rocket} 
                className="w-full sm:w-auto group/btn relative px-8 py-4 text-lg hover:scale-105 shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.6)]"
                href="https://disctools.net/discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="absolute inset-0 rounded-full border border-white/20 group-hover/btn:border-white/40 transition-colors" />
                Chat with Us on Discord
              </Button>
              <Button 
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto px-8 py-4 text-lg hover:-translate-y-1"
                href="#pricing"
              >
                Shop via Crypto
              </Button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 text-sm text-zinc-500 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              Fast response times. No bots, just experts.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
