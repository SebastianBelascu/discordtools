'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';

const testimonials = [
  {
    name: 'Jeffrey Dogge',
    country: 'Belgium',
    date: 'Aug 17, 2025',
    service: 'Discord Nitro',
    rating: 5,
    text: "I've bought Nitro for 1 year again for the 3rd year in a row with DiscTools. Was delivered within 24h. Best support for your Discord needs.",
  },
  {
    name: 'Blaze Z',
    country: 'United States',
    date: 'Aug 20, 2025',
    service: 'YouTube Premium',
    rating: 5,
    text: 'Fast as always buying YouTube premium for another year.',
  },
  {
    name: 'SSRG',
    country: 'United States',
    date: 'Mar 26, 2025',
    service: 'Multiple Services',
    rating: 5,
    text: 'Smooth transactions each and every single time. Nice staff. Been using these services for about 3 years now and never been disappointed!',
  },
  {
    name: 'Scott Brouard',
    country: 'Jersey',
    date: 'Jul 21, 2025',
    service: 'Spotify Premium',
    rating: 5,
    text: 'Used them for Spotify premium and friends have used for YouTube premium. Easy and efficient server, I recommend.',
  },
  {
    name: 'Sven - interwebexploder',
    country: 'Netherlands',
    date: 'Feb 27, 2025',
    service: 'Discord Nitro',
    rating: 5,
    text: 'Very fast with tickets in Discord, and very fast delivery for 1y Discord Nitro. Would def do it a third time.',
  },
  {
    name: 'ENZO A',
    country: 'United States',
    date: 'Feb 15, 2025',
    service: 'Spotify & Discord',
    rating: 5,
    text: 'I bought Spotify premium duo for a year and it works perfectly. I have also bought Discord Nitro in the past - all works perfectly and great customer service.',
  },
  {
    name: 'T H',
    country: 'United Kingdom',
    date: 'Jun 7, 2025',
    service: 'YouTube Premium',
    rating: 5,
    text: 'I got 1y YT premium invite in a few seconds. A++',
  },
  {
    name: 'ELiTeZ',
    country: 'United Kingdom',
    date: 'Aug 28, 2025',
    service: 'Discord Nitro',
    rating: 4,
    text: "I've ordered 3 yearly Discord Nitros from their Discord server. It is worth the wait considering the cheap prices. They not only do Discord Nitro but also Spotify, Disney+ and more. They are patient with you, so be patient with them.",
  },
  {
    name: 'Hugues-Pacome Stock',
    country: 'France',
    date: 'Feb 1, 2025',
    service: 'YouTube & Crunchyroll',
    rating: 5,
    text: 'YouTube Premium and Crunchyroll for 3 years now. Recommend.',
  },
  {
    name: 'GC',
    country: 'Greece',
    date: 'Feb 9, 2025',
    service: 'Multiple Services',
    rating: 5,
    text: 'Solid service, using it for years now. They never disappoint.',
  },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const avatarGradients = [
  'from-pink-500 to-fuchsia-600',
  'from-fuchsia-500 to-purple-600',
  'from-violet-500 to-pink-500',
  'from-rose-500 to-pink-600',
  'from-purple-500 to-fuchsia-500',
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0]; gradientIndex: number }> = ({ testimonial, gradientIndex }) => (
  <Card className="group shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform duration-300 hover:border-pink-500/30 w-[350px] sm:w-[420px] shrink-0 flex flex-col" style={{ height: '220px' }}>
    <div className="relative z-10 flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradients[gradientIndex % avatarGradients.length]} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
          <span className="text-white font-semibold text-sm leading-none">{getInitials(testimonial.name)}</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors leading-tight">{testimonial.name}</h4>
          <span className="text-zinc-500 text-xs mt-0.5">{testimonial.country}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'text-[#00b67a] fill-[#00b67a]' : 'text-zinc-700 fill-zinc-700'}`} />
          ))}
        </div>
        <span className="text-zinc-600 text-xs">{testimonial.date}</span>
      </div>
    </div>
    <p className="relative z-10 text-zinc-300 text-sm leading-relaxed font-normal group-hover:text-zinc-200 transition-colors line-clamp-4 flex-1">
      {testimonial.text}
    </p>
    <div className="relative z-10 mt-4 pt-3 border-t border-white/5">
      <span className="text-xs text-zinc-600 bg-white/5 px-2 py-0.5 rounded-full">{testimonial.service}</span>
    </div>
  </Card>
);

export const Testimonials: React.FC = () => {
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="absolute right-[5%] top-[15%] w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 lg:mb-24 px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
            <Star className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />
            <span>Trustpilot Reviews</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            What our clients say
          </h2>
          <a
            href="https://www.trustpilot.com/review/discordtools.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#00b67a]/10 border border-[#00b67a]/20 hover:bg-[#00b67a]/20 hover:border-[#00b67a]/40 transition-all group/tp"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center rounded-sm">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-semibold text-sm leading-tight">4.9 out of 5</span>
              <span className="text-zinc-400 text-xs">Based on Trustpilot reviews</span>
            </div>
            <svg className="w-20 h-5 ml-1 opacity-80 group-hover/tp:opacity-100 transition-opacity" viewBox="0 0 126 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0L19.8 11.7H32L22.1 18.9L25.9 30.6L16 23.4L6.1 30.6L9.9 18.9L0 11.7H12.2L16 0Z" fill="#00b67a"/>
              <text x="38" y="22" fill="white" fontSize="16" fontWeight="700" fontFamily="sans-serif">Trustpilot</text>
            </svg>
          </a>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

          <div className="flex flex-col gap-8">
            <div className="overflow-visible py-2 -my-2">
              <motion.div
                className="flex gap-6 items-stretch"
                animate={{ x: [0, -1600] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...firstRow, ...firstRow, ...firstRow].map((testimonial, index) => (
                  <div key={index} className="h-full">
                    <TestimonialCard testimonial={testimonial} gradientIndex={index % firstRow.length} />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="overflow-visible py-2 -my-2">
              <motion.div
                className="flex gap-6 items-stretch"
                animate={{ x: [-1600, 0] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...secondRow, ...secondRow, ...secondRow].map((testimonial, index) => (
                  <div key={index} className="h-full">
                    <TestimonialCard testimonial={testimonial} gradientIndex={(index % secondRow.length) + 2} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
