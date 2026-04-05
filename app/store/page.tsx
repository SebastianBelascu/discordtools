'use client';

import { useEffect, useState } from 'react';
import { SellAppProduct, PaginatedResponse } from '@/lib/sellapp/types';
import { ProductCard } from '@/app/components/ProductCard';
import { CheckoutModal } from '@/app/components/CheckoutModal';
import { Navbar } from '@/app/components/layout/Navbar';
import { ChevronLeft, ChevronRight, RefreshCw, ShoppingBag } from 'lucide-react';

export default function StorePage() {
  const [products, setProducts] = useState<SellAppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SellAppProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sellapp/products?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: PaginatedResponse<SellAppProduct> = await response.json();
      setProducts(data.data);
      setTotalPages(data.last_page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = (product: SellAppProduct) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />
      <div className="absolute right-[5%] top-[10%] w-[600px] h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] w-[500px] h-[500px] bg-pink-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-normal text-zinc-300 mb-8 backdrop-blur-sm uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-pink-400 [stroke-width:1.5]" />
            All Products
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Browse Our Store
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Premium subscriptions and Discord tools at unbeatable prices. Instant delivery, full warranty.
          </p>
        </div>

        {isLoading && products.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="inline-block w-10 h-10 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-32">
            <div className="relative rounded-[2rem] p-8 bg-zinc-900/40 backdrop-blur-xl border border-red-500/20 max-w-md text-center">
              <p className="text-red-400 font-medium mb-4">{error}</p>
              <button
                onClick={() => fetchProducts(currentPage)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white font-medium text-sm transition-all hover:opacity-90"
              >
                <RefreshCw className="w-4 h-4 [stroke-width:1.5]" />
                Retry
              </button>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-zinc-500 text-lg">No products available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/40 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4 [stroke-width:1.5]" />
                  Previous
                </button>

                <span className="text-zinc-500 text-sm">
                  Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/40 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4 [stroke-width:1.5]" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <CheckoutModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
