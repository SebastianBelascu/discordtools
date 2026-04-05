'use client';

import { SellAppProduct } from '@/lib/sellapp/types';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: SellAppProduct;
  onPurchase: (product: SellAppProduct) => void;
}

export function ProductCard({ product, onPurchase }: ProductCardProps) {
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.pricing?.price?.price || 0;
  const currency = firstVariant?.pricing?.price?.currency || 'USD';
  const stock = firstVariant?.stock;
  const imageUrl = product.images?.[0]?.path;

  const formatPrice = (priceInCents: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr?.toUpperCase() || 'USD',
    }).format(priceInCents / 100);
  };

  const isOutOfStock = stock === 0;
  const isInfiniteStock = stock === null || stock === undefined;

  return (
    <div className="group relative rounded-[2rem] p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 hover:bg-zinc-900/60 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {imageUrl && (
        <div className="relative z-10 aspect-video w-full overflow-hidden rounded-xl mb-6 bg-zinc-800/50">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
      )}

      {!imageUrl && (
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-fuchsia-500/10 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 group-hover:border-pink-500/40 transition-all duration-500">
          <ShoppingCart className="w-7 h-7 text-pink-400 [stroke-width:1.5]" />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold tracking-tight text-white mb-2 group-hover:text-pink-400 transition-colors">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3 font-normal">
            {product.description}
          </p>
        )}

        <div className="text-[2.25rem] font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-400 to-fuchsia-400 mb-2 leading-none">
          {formatPrice(price, currency)}
        </div>

        <div className="mb-6">
          {isOutOfStock ? (
            <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">Out of Stock</span>
          ) : isInfiniteStock ? (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">In Stock</span>
          ) : (
            <span className="text-xs font-medium text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{stock} in stock</span>
          )}
        </div>

        <button
          onClick={() => onPurchase(product)}
          disabled={isOutOfStock}
          className={`mt-auto w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-base transition-all duration-300 active:scale-95 ${
            isOutOfStock
              ? 'bg-zinc-800/40 border border-white/5 text-zinc-600 cursor-not-allowed'
              : 'bg-zinc-800/40 border border-white/10 text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-fuchsia-500 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] group/btn'
          }`}
        >
          <span className="text-pink-400 group-hover/btn:text-white transition-colors font-mono font-semibold">&gt;</span>
          <span>Buy Now</span>
          <ArrowRight className="w-4 h-4 ml-1 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all [stroke-width:1.5]" />
        </button>
      </div>
    </div>
  );
}
