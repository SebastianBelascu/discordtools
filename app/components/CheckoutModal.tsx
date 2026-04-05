'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/app/lib/products';
import { SellAppProduct, AdditionalInformationField, ProductVariant } from '@/lib/sellapp/types';
import { X, Loader2, ExternalLink, ShoppingBag } from 'lucide-react';

export interface CheckoutProductInput {
  sellappProductId: number;
  sellappVariantId?: number | null;
  title: string;
  description?: string;
  price: string;
  priceValue: number;
  currency: string;
}

function fromProduct(p: Product): CheckoutProductInput {
  return {
    sellappProductId: p.sellappProductId,
    sellappVariantId: p.sellappVariantId,
    title: p.title,
    description: p.description,
    price: p.price,
    priceValue: p.priceValue,
    currency: p.currency,
  };
}

function fromSellAppProduct(p: SellAppProduct): CheckoutProductInput {
  const v = p.variants?.[0];
  const priceRaw = v?.pricing?.price?.price ?? 0;
  const currency = v?.pricing?.price?.currency ?? 'USD';
  const priceValue = priceRaw / 100;
  return {
    sellappProductId: p.id,
    sellappVariantId: v?.id ?? null,
    title: p.title,
    description: p.description,
    price: new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(priceValue),
    priceValue,
    currency,
  };
}

interface CheckoutModalProps {
  product: Product | SellAppProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

function isProduct(p: Product | SellAppProduct): p is Product {
  return 'sellappProductId' in p;
}

const inputClass = 'w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all text-sm';

export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingVariant, setIsFetchingVariant] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variantId, setVariantId] = useState<number | null>(null);
  const [additionalFields, setAdditionalFields] = useState<AdditionalInformationField[]>([]);
  const [additionalValues, setAdditionalValues] = useState<Record<string, string>>({});

  const input: CheckoutProductInput | null = product
    ? isProduct(product) ? fromProduct(product) : fromSellAppProduct(product)
    : null;

  useEffect(() => {
    if (!isOpen || !input) return;

    setEmail('');
    setQuantity(1);
    setError(null);
    setAdditionalFields([]);
    setAdditionalValues({});

    setIsFetchingVariant(true);
    fetch(`/api/sellapp/products/${input.sellappProductId}`)
      .then(r => r.json())
      .then((data: any) => {
        const prod: SellAppProduct = data.data ?? data;
        console.log('[CheckoutModal] Full product data:', JSON.stringify(prod, null, 2));
        const v: ProductVariant | undefined = prod.variants?.[0];
        if (v) {
          setVariantId(v.id);
          console.log('[CheckoutModal] Variant ID:', v.id);
          console.log('[CheckoutModal] additional_information fields:', JSON.stringify(v.additional_information, null, 2));
          const fields = Array.isArray(v.additional_information) ? v.additional_information : [];
          setAdditionalFields(fields);
          const defaults: Record<string, string> = {};
          fields.forEach(f => { defaults[f.id] = ''; });
          setAdditionalValues(defaults);
        }
      })
      .catch((err) => {
        console.error('[CheckoutModal] Failed to fetch product:', err);
      })
      .finally(() => setIsFetchingVariant(false));
  }, [isOpen, product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !input) return null;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: input.currency?.toUpperCase() || 'USD',
    }).format(val);

  const totalPrice = input.priceValue * quantity;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!variantId) {
      setError('Could not determine product variant. Please try again.');
      setIsLoading(false);
      return;
    }

    const requiredMissing = additionalFields
      .filter(f => f.required && !additionalValues[f.id]?.trim())
      .map(f => f.name);

    if (requiredMissing.length > 0) {
      setError(`Please fill in: ${requiredMissing.join(', ')}`);
      setIsLoading(false);
      return;
    }

    const additional_information: Record<string, string> = {};
    additionalFields.forEach(f => {
      if (additionalValues[f.id]?.trim()) {
        additional_information[f.id] = additionalValues[f.id].trim();
      }
    });

    const payload = {
      customer_email: email,
      payment_method: 'LTC',
      product_variants: {
        [variantId]: {
          quantity,
          ...(Object.keys(additional_information).length > 0 ? { additional_information } : {}),
        },
      },
    };

    console.log('[CheckoutModal] Sending payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('/api/sellapp/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('[CheckoutModal] Checkout response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.error || data.details?.message || 'Failed to create checkout');
      }

      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget && !isLoading) onClose(); }}
    >
      <div className="bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-950 border-b border-white/10 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 border border-pink-500/30 flex items-center justify-center">
              <ShoppingBag size={16} className="text-pink-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            disabled={isLoading}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="font-semibold text-base text-white mb-1">{input.title}</h3>
            {input.description && (
              <p className="text-zinc-400 text-sm leading-relaxed">{input.description}</p>
            )}
          </div>

          {isFetchingVariant ? (
            <div className="flex items-center justify-center py-8 gap-3 text-zinc-400">
              <Loader2 size={20} className="animate-spin text-pink-400" />
              <span className="text-sm">Loading product details...</span>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-zinc-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  required
                  className={inputClass}
                  disabled={isLoading}
                />
              </div>

              {additionalFields.length > 0 && (
                <div className="space-y-4 pt-1">
                  <div className="h-px bg-white/5" />
                  {additionalFields.map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-zinc-300 mb-2">
                        {field.name}
                        {field.required && <span className="text-pink-400 ml-1">*</span>}
                      </label>
                      {field.type === 'DROPDOWN' && field.options ? (
                        <select
                          id={field.id}
                          value={additionalValues[field.id] ?? ''}
                          onChange={(e) => setAdditionalValues(v => ({ ...v, [field.id]: e.target.value }))}
                          required={field.required}
                          className={inputClass}
                          disabled={isLoading}
                        >
                          <option value="">Select...</option>
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'CHECKBOX' ? (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            id={field.id}
                            checked={additionalValues[field.id] === 'true'}
                            onChange={(e) => setAdditionalValues(v => ({ ...v, [field.id]: e.target.checked ? 'true' : 'false' }))}
                            className="w-4 h-4 accent-pink-500"
                            disabled={isLoading}
                          />
                          <span className="text-zinc-300 text-sm">{field.placeholder || field.name}</span>
                        </label>
                      ) : (
                        <input
                          type="text"
                          id={field.id}
                          value={additionalValues[field.id] ?? ''}
                          onChange={(e) => setAdditionalValues(v => ({ ...v, [field.id]: e.target.value }))}
                          required={field.required}
                          placeholder={field.placeholder || field.name}
                          className={inputClass}
                          disabled={isLoading}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Payment Method
                </label>
                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
                  <span className="text-zinc-200 text-sm font-medium">LTC (Litecoin)</span>
                  <span className="ml-auto text-xs text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">Only</span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-400 text-sm">Subtotal</span>
                  <span className="font-semibold text-white text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !variantId}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white py-3.5 rounded-xl font-medium hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ExternalLink size={18} />
                    Proceed to Payment
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
