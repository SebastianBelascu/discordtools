'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Calendar, CalendarDays, ArrowRight, Info, Plus, Layers } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, filterProducts, getCategories, type ProductCategory, type Product, OTHER_SUBSCRIPTIONS_CATEGORY } from '@/app/lib/products';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CheckoutModal } from '../components/CheckoutModal';

const CATEGORY_ICONS: Record<string, any> = {
  'all': Globe,
  '1-month': Calendar,
  '3-months': CalendarDays,
  [OTHER_SUBSCRIPTIONS_CATEGORY]: Layers,
};

const MAX_VISIBLE_CATEGORIES = 3;

export default function PricingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tooltipProduct, setTooltipProduct] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categories = useMemo(() => getCategories(allProducts), [allProducts]);
  const visibleCategories = showAllCategories ? categories : categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const hiddenCategoryCount = Math.max(0, categories.length - MAX_VISIBLE_CATEGORIES);

  const filteredProducts = useMemo(
    () => filterProducts(allProducts, searchQuery, selectedCategory),
    [allProducts, searchQuery, selectedCategory]
  );

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

          <div className="absolute right-[5%] top-[15%] w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6">
                Choose Your Perfect Plan
              </h1>
              <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal mb-12">
                Boost your server with our premium services. Fast delivery, reliable support, and unbeatable prices.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative max-w-md mx-auto mb-10"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-zinc-500 [stroke-width:1.5]" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-base shadow-inner font-normal hover:bg-zinc-900/80"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-16"
            >
              {(isLoading ? [{ label: 'All Products', category: 'all' }] : visibleCategories).map((cat) => {
                const IconComp = CATEGORY_ICONS[cat.category] || Globe;
                return (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-sm transition-all ${
                      selectedCategory === cat.category
                        ? 'bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white shadow-[0_0_20px_-5px_rgba(236,72,153,0.4)]'
                        : 'bg-zinc-900/40 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20'
                    }`}
                  >
                    <IconComp className="w-4 h-4 [stroke-width:1.5]" />
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
              {!isLoading && hiddenCategoryCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllCategories(v => !v)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm bg-zinc-900/40 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-pink-500/30 transition-all"
                >
                  {showAllCategories ? (
                    <span>Show Less</span>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 [stroke-width:2.5]" />
                      <span>{hiddenCategoryCount} more</span>
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-zinc-400">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left max-w-6xl mx-auto">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(0.1 + index * 0.05, 0.5) }}
                    className="flex justify-center"
                  >
                    <Card className="group flex flex-col w-full max-w-sm h-full hover:-translate-y-2 transition-transform duration-300 hover:border-pink-500/30">
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-pink-500/20 group-hover:border-pink-500/40">
                            <product.icon className="w-7 h-7 text-pink-400 [stroke-width:1.5]" />
                          </div>

                          {product.description && (
                            <div className="relative">
                              <button
                                onMouseEnter={() => setTooltipProduct(product.id)}
                                onMouseLeave={() => setTooltipProduct(null)}
                                onClick={() => setTooltipProduct(tooltipProduct === product.id ? null : product.id)}
                                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 transition-colors"
                              >
                                <Info className="w-4 h-4 [stroke-width:1.5]" />
                              </button>

                              <AnimatePresence>
                                {tooltipProduct === product.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-10 z-50 w-64 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/40 text-left"
                                  >
                                    <div className="absolute -top-1.5 right-3 w-3 h-3 bg-zinc-900 border-l border-t border-white/10 rotate-45" />
                                    <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                                      {product.description}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-3xl font-semibold tracking-tight text-white mb-1 group-hover:text-pink-400 transition-colors">{product.title}</h3>
                        <p className="text-lg text-zinc-400 mb-6 font-medium">{product.duration}</p>
                        
                        <div className="text-[2.75rem] font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-fuchsia-400 mb-8 leading-none">
                          {product.price}
                        </div>
                        
                        <ul className="space-y-4 mb-10 flex-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3.5">
                              <feature.icon className="w-5 h-5 text-pink-400 shrink-0 [stroke-width:1.5]" />
                              <span className="text-lg text-zinc-300 font-normal">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-full flex items-center justify-center gap-2 bg-zinc-800/40 border border-white/10 hover:border-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-fuchsia-500 text-white px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 group/btn hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] mt-auto active:scale-95"
                        >
                          <span className="text-pink-400 group-hover/btn:text-white transition-colors font-mono font-semibold">&gt;</span>
                          <span>Buy Now</span>
                          <ArrowRight className="w-4 h-4 ml-1 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all [stroke-width:1.5]" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <CheckoutModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
