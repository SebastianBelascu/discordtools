'use client';

import { useState } from 'react';
import { SellAppProduct } from '@/lib/sellapp/types';
import { X, Loader2, ExternalLink } from 'lucide-react';

interface CheckoutModalProps {
  product: SellAppProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('LTC');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstVariant = product?.variants?.[0];
  const price = firstVariant?.pricing?.price?.price || 0;
  const currency = firstVariant?.pricing?.price?.currency || 'USD';
  const stock = firstVariant?.stock;
  const isInfiniteStock = stock === null || stock === undefined;
  const availablePaymentMethods = firstVariant?.payment_methods || ['LTC'];

  if (!isOpen || !product) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!firstVariant) {
      setError('Product variant not found');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/sellapp/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_email: email,
          payment_method: paymentMethod,
          product_variants: {
            [firstVariant.id]: {
              quantity,
            },
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout');
      }

      const data = await response.json();
      
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  const totalPrice = (price / 100) * quantity;
  const formatPrice = (priceValue: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD',
    }).format(priceValue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {product.description}
            </p>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={isInfiniteStock ? undefined : stock || undefined}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {isInfiniteStock ? 'Unlimited' : stock}
              </p>
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              >
                {availablePaymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ExternalLink size={20} />
                  Proceed to Payment
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
