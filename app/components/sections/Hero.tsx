'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <main className="relative pt-28 pb-20 lg:pt-32 lg:pb-24 overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-pink-500/10 blur-[120px] rounded-[100%]" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <div className="flex flex-col items-start text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Secure Subscriptions Access.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-500">
                Optimized Pricing.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed font-normal"
            >
              Gain access to premium features for Discord, Spotify, YouTube & more through legal regional pricing with zero account risk - no credentials required, zero-risk delivery, and full-service warranty.
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-8 sm:gap-12 mb-10"
            >
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1">50K+</span>
                <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">ORDERS FULFILLED</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1">100%</span>
                <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">SECURE AND VERIFIED</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-white mb-1">24/7</span>
                <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">SUPPORT</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button 
                icon={ShoppingCart} 
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold group shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.6)]"
                href="/#pricing"
              >
                Explore Products
              </Button>
               <Button 
                variant="ghost"
                icon={Star}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold border-white/10 bg-white/5 hover:bg-white/10"
                href="/#testimonials"
              >
                Trustpilot Reviews
              </Button>
              
            </motion.div>
          </div>

          {/* Right Column - Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto"
          >
            {/* Background Blob */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 blur-[20px] opacity-80" 
            />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500" />
            
            {/* Sparkles */}
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 text-yellow-300"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-20 right-16 text-emerald-400"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 right-8 text-yellow-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>

            {/* Main Illustration Container */}
            <div className="absolute inset-x-8 bottom-8 top-24">
              {/* Fake UI Window */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute inset-x-0 bottom-0 h-[60%] bg-[#2B2D31] rounded-2xl border-4 border-[#1E1F22] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header Bar */}
                <div className="h-8 bg-[#1E1F22] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                {/* Voice Chat UI Mockup */}
                <div className="flex-1 p-4 relative overflow-hidden">
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#1E1F22] p-2 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-fuchsia-500 flex items-center justify-center border-2 border-fuchsia-400">
                        <ShieldCheck className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* The "Mascot/Boost" abstraction floating out */}
              <motion.div 
                initial={{ y: 20, opacity: 0, rotate: 0 }}
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [12, 16, 12]
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-pink-400 to-fuchsia-400 rounded-3xl shadow-2xl border-4 border-[#2B2D31] flex items-center justify-center group"
              >
                <div className="w-32 h-32 bg-[#2B2D31] rounded-2xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-all duration-300">
                   <Zap className="w-16 h-16 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </motion.div>
              
              {/* Clapperboard / Ticket abstract floating right */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-12, -8, -12]
                }}
                transition={{ 
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute bottom-[45%] right-0 w-28 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-xl shadow-xl border-4 border-[#2B2D31] flex flex-col overflow-hidden"
              >
                <div className="h-6 w-full flex">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 bg-black/80 h-full border-r border-black/20" />
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Star className="w-8 h-8 text-black/80 fill-black/80" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
