'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card } from '../ui/Card';

const testimonials = [
  {
    name: 'Anne James',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Lorem ipsum viverra massa eget facilisis dignissim amet facilisis molestie at netus ante mauris suspendisse in neque sem bibendum lorem consectetur ultrices et eget odio tortor eleifend malesuada in leo mauris ipsum non.',
  },
  {
    name: 'Louis Johnson',
    avatar: 'https://i.pravatar.cc/150?img=11',
    rating: 5,
    text: 'Lorem ipsum leo morbi amet vitae adipiscing luctus volutpat viverra facilisi massa proin enim morbi adipiscing augue ornare enim enim morbi donec mauris pretium est vel gravida enim habitant amet et scelerisque neque sit facilisis sit in sagittis quis consectetur quisque nam nisl placerat in tellus netus neque condimentum nec sapien consectetur neque vitae ornare aliquet enim risus praesent amet etiam urna in facilisi aliquam tellus eleifend et in feugiat semper quis aliquet morbi feugiat ultricies ut id non dignissim non nisi sapien lacus feugiat elit pellentesque est purus dui accumsan mi turpis sit ut mi et cum mattis lectus dignissim at semper nam sit arcu eleifend ligula et vivamus ultricies sem risus iaculis adipiscing urna at facilisi natoque et.',
  },
  {
    name: 'Alex Volks',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'Lorem ipsum nisi vel pulvinar rutrum enim nulla at id tellus porttitor duis purus aliquet et pharetra enim eget quis viverra enim pharetra lorem eu quam id sed metus lacus morbi arcu quam pellentesque sed donec felis quam arcu et faucibus nulla augue enim eget nunc varius ullamcorper massa pharetra ultricies fermentum nunc id convallis sagittis adipiscing cursus sit etiam eu suscipit consectetur quam mi arcu dapibus fringilla blandit magna non vulputate elit arcu adipiscing molestie morbi maecenas nisl accumsan tristique fames massa duis enim viverra dictum quis aliquam libero augue donec massa egestas lobortis et morbi sed nulla quis.',
  },
  {
    name: 'George Clide',
    avatar: 'https://i.pravatar.cc/150?img=52',
    rating: 5,
    text: 'Lorem ipsum auctor suspendisse ullamcorper fringilla sem orci etiam cras ut ullamcorper ullamcorper risus nam sed amet amet tortor sodales eu mattis viverra velit ullamcorper facilisis porttitor massa habitant metus facilisi habitant lectus malesuada dictumst.',
  },
  {
    name: 'Mary James',
    avatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    text: 'Lorem ipsum donec elementum tortor amet nullam eros est nibh proin maecenas scelerisque et tellus enim aliquet malesuada fames tristique sed enim nec lectus in.',
  },
  {
    name: 'Kristin Johns',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    text: 'Lorem ipsum donec elementum tortor amet nullam eros est nibh proin maecenas scelerisque et tellus enim aliquet malesuada fames tristique sed enim nec lectus in.',
  },
  {
    name: 'Mark Tompson',
    avatar: 'https://i.pravatar.cc/150?img=60',
    rating: 5,
    text: 'Lorem ipsum donec elementum tortor amet nullam eros est nibh proin maecenas scelerisque et tellus enim aliquet malesuada fames tristique sed enim nec lectus in.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="absolute right-[5%] top-[15%] w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
            <Star className="w-4 h-4 text-zinc-400 [stroke-width:1.5]" />
            <span>Reviews</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            What our clients say
          </h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="group shadow-xl shadow-black/20 hover:-translate-y-1 transition-transform duration-300 hover:border-pink-500/30">
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-pink-400 to-fuchsia-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover border-2 border-zinc-900"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-white font-medium text-base group-hover:text-pink-400 transition-colors">{testimonial.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="relative z-10 text-zinc-400 text-base sm:text-lg leading-relaxed font-normal group-hover:text-zinc-300 transition-colors">
                  {testimonial.text}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
