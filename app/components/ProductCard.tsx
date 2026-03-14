'use client';

import { SellAppProduct } from '@/lib/sellapp/types';
import { ShoppingCart } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(price, currency)}
            </span>
            <span className="text-sm text-gray-500">
              {isOutOfStock ? (
                <span className="text-red-600 font-medium">Out of Stock</span>
              ) : isInfiniteStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                `${stock} in stock`
              )}
            </span>
          </div>

          <button
            onClick={() => onPurchase(product)}
            disabled={isOutOfStock}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium
              transition-all duration-200
              ${isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }
            `}
          >
            <ShoppingCart size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
