'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What services does DiscTools offer?',
    answer: 'We are a full-service digital subscription hub. While we are leaders in Cheap Discord Nitro and Server Boosts, we also provide premium access for Spotify, YouTube, Disney+, Crunchyroll, and Discord Members. If you don\'t see a specific service on our site, join our Discord—our inventory is constantly expanding.',
  },
  {
    question: 'How are these subscriptions so much cheaper?',
    answer: "It's simple: Regional Pricing. Many platforms offer lower prices in different parts of the world. At DiscTools, we utilize legal, authorized methods to source these subscriptions globally, passing those massive savings directly to you. It is 100% legal and stable.",
  },
  {
    question: 'Do I need to provide my account login?',
    answer: "For most services, no. We prioritize your privacy and use 'no-login' delivery methods (like gifts or activation links) whenever possible. For specific services that require a manual setup, our professional staff handles your account with the highest security standards. Your credentials are never stored and remain completely private.",
  },
  {
    question: 'Is my account at risk of being banned?',
    answer: 'Absolutely not. We do not use \'carding\' or fraudulent payment methods that put accounts at risk. All our Cheap Subscriptions are sourced through legitimate channels, which is why we can confidently offer a Full Service Warranty on every single purchase.',
  },
  {
    question: 'What is the difference between Server Boosts and Discord Members?',
    answer: 'Server Boosts increase your server\'s level, unlocking features like better audio, more emoji slots, and custom banners. Discord Members are high-quality accounts that join your community to increase your member count and social proof. Both services feature high retention and fast delivery.',
  },
  {
    question: 'How do I pay with Revolut, PayPal, or Venmo?',
    answer: 'Currently, our website handles Crypto payments for instant processing. If you prefer to pay via Revolut, PayPal, Venmo, Credit Card, or CashApp, simply join our official Discord server. Our 24/7 staff will create a manual invoice for you and process your order immediately.',
  },
  {
    question: 'What happens if my subscription stops working?',
    answer: 'While revokes are extremely rare due to our legal methods, every product comes with a Full-Term Warranty. If your service is interrupted, just contact our support team on Discord, and we will restore or replace it immediately. We\'ve got you covered.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Got Questions? We Have Answers.
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-2xl font-normal">
            Everything you need to know about our premium services, security protocols, and payment methods.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 sm:px-8 sm:py-6 flex items-center justify-between cursor-pointer"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors text-left">
                  {item.question}
                </h3>
                <div className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-all ml-4">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 [stroke-width:1.5]" />
                  ) : (
                    <Plus className="w-5 h-5 [stroke-width:1.5]" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-6">
                  <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
