'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, Scale, Gem, ShieldCheck, MessageCircle, Zap, Check, Users, Star, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

const paymentMethods = [
  { label: 'VISA', type: 'text' },
  { label: 'MC', type: 'circles' },
  { label: 'P', type: 'text' },
  { label: '₿', type: 'text' },
  { label: '$', type: 'text' },
];

const trustBadges = [
  { icon: Users, label: '50K+', sublabel: 'Happy Customers' },
  { icon: Star, label: '4.9/5', sublabel: 'Average Rating' },
  { icon: TrendingUp, label: '99.8%', sublabel: 'Success Rate' },
];

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />
            <span>Why Choose BoostMania</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Premium Features
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-2xl font-normal">
            Built for reliability, speed, and peace of mind — no compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="flex flex-col items-center text-center group h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-fuchsia-600/20 blur-[60px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
              
              <div className="text-[5rem] leading-none font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-400 to-pink-600 mb-6 drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                100%
              </div>
              
              <h3 className="text-3xl font-semibold tracking-tight text-white mb-4 relative z-10">Seamless Payment</h3>
              <p className="text-lg text-zinc-400 font-normal mb-8 relative z-10">Multiple payment options available</p>
              
              {/* Security Features */}
              <div className="relative z-10 w-full mb-8 space-y-3">
                {[
                  { icon: ShieldCheck, text: 'SSL Encrypted' },
                  { icon: Zap, text: 'Instant Processing' },
                  { icon: Check, text: 'No Hidden Fees' }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 justify-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                      <feature.icon className="w-3.5 h-3.5 text-fuchsia-400 [stroke-width:2]" />
                    </div>
                    <span className="text-sm text-zinc-400">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Transaction Stats */}
              <div className="relative z-10 w-full mb-8 grid grid-cols-2 gap-4 px-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-2xl font-semibold text-fuchsia-400 mb-1">
                    <AnimatedCounter end={99} duration={2} />%
                  </div>
                  <div className="text-xs text-zinc-500">Success Rate</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-2xl font-semibold text-fuchsia-400 mb-1">&lt;2s</div>
                  <div className="text-xs text-zinc-500">Avg. Time</div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 mt-auto">
                {paymentMethods.map((method, index) => (
                  method.type === 'circles' ? (
                    <motion.div 
                      whileHover={{ scale: 1.1, y: -2 }}
                      key={index} 
                      className="w-12 h-9 bg-white/10 rounded-lg flex items-center justify-center shadow-sm backdrop-blur-md cursor-pointer"
                    >
                      <div className="w-4 h-4 rounded-full bg-zinc-400/80 -mr-1 mix-blend-screen" />
                      <div className="w-4 h-4 rounded-full bg-zinc-300/80 -ml-1 mix-blend-screen" />
                    </motion.div>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.1, y: -2 }}
                      key={index} 
                      className={`${method.label === 'VISA' ? 'px-4 py-2' : 'w-10 h-9'} bg-white/10 rounded-lg flex items-center justify-center text-sm font-semibold text-zinc-300 tracking-wide shadow-sm backdrop-blur-md cursor-pointer ${method.label === 'P' ? 'font-serif italic' : ''}`}
                    >
                      {method.label}
                    </motion.div>
                  )
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Card 2 - Enhanced with Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="flex flex-col items-center text-center group h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[60px] rounded-full transition-opacity group-hover:opacity-100 opacity-50" />
              
              <div className="relative w-24 h-24 flex items-center justify-center mb-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/5"
                />
                <div className="absolute inset-2 rounded-full border border-white/5 transition-transform duration-500 delay-75 group-hover:scale-105" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/10 to-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_-5px_rgba(192,38,211,0.3)] group-hover:shadow-[0_0_40px_rgba(192,38,211,0.5)] transition-all">
                  <Gem className="w-8 h-8 text-fuchsia-400 fill-fuchsia-400/20 [stroke-width:1.5] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <h3 className="text-3xl font-semibold tracking-tight text-white mb-4">Affordable Pricing</h3>
              <p className="text-lg text-zinc-400 font-normal leading-relaxed mb-8">
                Get cheap Discord Nitro and affordable Discord server boosts without compromising quality. Competitive pricing designed to deliver the best Discord boost value in the market.
              </p>

              {/* Live Activity Indicator */}
              <div className="mt-auto w-full pt-6 border-t border-white/5">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-500"
                  />
                  <span className="text-zinc-400">
                    <AnimatedCounter end={127} duration={2} /> orders today
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3 - Enhanced with Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="flex flex-col items-center text-center group h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="relative w-24 h-24 flex items-center justify-center mb-10">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-white/5"
                />
                <div className="absolute inset-2 rounded-full border border-white/5 transition-transform duration-500 delay-75 group-hover:scale-105" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/10 to-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_-5px_rgba(192,38,211,0.3)] group-hover:shadow-[0_0_40px_rgba(192,38,211,0.5)] transition-all">
                  <ShieldCheck className="w-8 h-8 text-fuchsia-400 fill-fuchsia-400/10 [stroke-width:1.5] group-hover:scale-110 transition-transform" />
                </div>
              </div>
              
              <h3 className="text-3xl font-semibold tracking-tight text-white mb-4">Trusted Seller</h3>
              <p className="text-lg text-zinc-400 font-normal leading-relaxed mb-8">
                Thousands of satisfied customers trust Boostmania.gg for reliable Discord Nitro and Discord boost services. Consistent 5-star feedback since 2019.
              </p>

              {/* Trust Badges */}
              <div className="mt-auto w-full grid grid-cols-3 gap-3 pt-6 border-t border-white/5">
                {trustBadges.map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <badge.icon className="w-4 h-4 text-fuchsia-400 mb-1" />
                    <span className="text-sm font-semibold text-white">{badge.label}</span>
                    <span className="text-xs text-zinc-500">{badge.sublabel}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Wide Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card className="flex flex-col md:flex-row items-center gap-12 group h-full hover:border-fuchsia-500/30 transition-colors duration-500">
              <div className="flex-1 relative z-10 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-fuchsia-500/10 group-hover:border-fuchsia-500/30">
                  <Scale className="w-6 h-6 text-fuchsia-400 [stroke-width:1.5]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  Fully Legal<br />Methods
                </h3>
                <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-md mb-8">
                  All Discord Nitro and server boost services are delivered through secure, compliant systems. We prioritize safe processes and long-term stability for every Discord boost order.
                </p>

                {/* Compliance Checklist */}
                <div className="space-y-3 w-full max-w-md">
                  {[
                    'Terms of Service Compliant',
                    'Secure Payment Processing',
                    'Privacy Protected',
                    'Long-term Account Safety'
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400 [stroke-width:3]" />
                      </div>
                      <span className="text-sm text-zinc-400">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full flex justify-end relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fuchsia-600/10 blur-[80px] rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
                
                <div className="w-full max-w-[340px] bg-[#111113] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transform transition-all duration-500 group-hover:scale-[1.05] group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-12px_rgba(217,70,239,0.3)]">
                  <div className="h-8 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500/50" />
                  </div>
                  <div className="flex-1 p-8 flex items-center justify-center relative">
                    <div className="w-full aspect-video border border-fuchsia-500/30 rounded-lg flex flex-col p-5 gap-4 relative bg-zinc-900/50 backdrop-blur-sm">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="w-3.5 h-3.5 text-fuchsia-400 [stroke-width:3]" />
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: i === 1 ? '50%' : i === 2 ? '75%' : '66%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                            className="h-1.5 rounded-full bg-white/10" 
                          />
                        </div>
                      ))}
                      
                      <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 flex items-center">
                        <div className="w-8 h-px bg-fuchsia-500" />
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-8 h-8 rounded-full bg-[#111113] border border-fuchsia-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                        >
                          <ShieldCheck className="w-4 h-4 text-fuchsia-400 fill-fuchsia-400/20 [stroke-width:1.5]" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Vertical Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="flex flex-col gap-14 group h-full hover:border-fuchsia-500/30 transition-colors duration-500">
              <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-64 h-[120%] bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

              <div className="relative z-10 flex flex-col items-start text-left w-[85%]">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-fuchsia-500/10 group-hover:border-fuchsia-500/30">
                  <MessageCircle className="w-6 h-6 text-fuchsia-400 [stroke-width:1.5]" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-white mb-4">24/7 Support</h3>
                <p className="text-lg text-zinc-400 font-normal leading-relaxed">
                  Our team is available around the clock to assist with any Discord Nitro or Discord server boost inquiries. Fast, professional, and real human support.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-start text-left w-[85%] mt-auto">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-fuchsia-500/10 group-hover:border-fuchsia-500/30">
                  <Zap className="w-6 h-6 text-fuchsia-400 [stroke-width:1.5]" />
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-white mb-4">Instant Delivery</h3>
                <p className="text-lg text-zinc-400 font-normal leading-relaxed">
                  Every cheap Discord Nitro and Discord server boost order is processed automatically and activated in seconds after checkout — no delays, no waiting.
                </p>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none z-20 translate-x-[15%] transition-transform duration-700 group-hover:-translate-x-2">
                <motion.div 
                  whileInView={{ x: [-20, -16] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3 bg-[#111113]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 pr-4 shadow-2xl -translate-x-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-fuchsia-400 [stroke-width:1.5]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">Always Available</span>
                </motion.div>
                
                <motion.div 
                  whileInView={{ x: [20, 16] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-3 bg-[#111113]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 pl-4 shadow-2xl translate-x-4 flex-row-reverse"
                >
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-fuchsia-400 [stroke-width:1.5]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">~30 Seconds</span>
                </motion.div>
                
                <motion.div 
                  whileInView={{ x: [-10, -8] }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3 bg-[#111113]/90 backdrop-blur-md border border-white/10 rounded-xl p-2 pr-4 shadow-2xl -translate-x-2"
                >
                  <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-fuchsia-400 [stroke-width:1.5]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">Instant Access</span>
                </motion.div>

                <div className="absolute right-7 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-fuchsia-500/30 to-transparent -z-10" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
