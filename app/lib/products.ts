import { Rocket, Crown, Zap, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { SellAppGroup, GroupProductFull, SellAppProduct, PaginatedResponse } from '@/lib/sellapp/types';

export const OTHER_SUBSCRIPTIONS_CATEGORY = 'other-subscriptions';

export type ProductCategory = 'all' | string;

export interface Product {
  id: string;
  sellappProductId: number;
  sellappVariantId: number | null;
  icon: any;
  title: string;
  duration: string;
  groupTitle: string;
  category: string;
  price: string;
  priceValue: number;
  currency: string;
  description: string;
  features: {
    icon: any;
    text: string;
  }[];
}

function pickIcon(groupTitle: string, index: number) {
  const title = groupTitle.toLowerCase();
  if (title.includes('3 month') || title.includes('3months')) return Crown;
  if (title.includes('nitro') || title.includes('spotify') || title.includes('steam')) return Sparkles;
  if (index % 2 === 0) return Rocket;
  return Crown;
}

function parseFeaturesFromDescription(description: string): { icon: any; text: string }[] {
  if (!description) return [{ icon: Zap, text: 'Instant Delivery' }];

  const stripped = description.replace(/<[^>]*>/g, '').trim();
  const lines = stripped
    .split(/[\n,;|•\-–]+/)
    .map(l => l.trim())
    .filter(l => l.length > 2 && l.length < 80);

  if (lines.length === 0) return [{ icon: Zap, text: 'Instant Delivery' }];

  return lines.slice(0, 4).map((text) => {
    const lower = text.toLowerCase();
    if (lower.includes('warrant') || lower.includes('refund') || lower.includes('guarantee')) {
      return { icon: ShieldCheck, text };
    }
    if (lower.includes('level') || lower.includes('server')) {
      return { icon: Trophy, text };
    }
    return { icon: Zap, text };
  });
}

function groupTitleToCategory(groupTitle: string): string {
  const title = groupTitle.toLowerCase();
  if (title.includes('3 month') || title.includes('3months') || title.includes('3-month')) return '3-months';
  if (title.includes('1 month') || title.includes('1months') || title.includes('1-month') || title.includes('monthly')) return '1-month';
  return groupTitle;
}

function formatPrice(priceStr: string, currency: string): string {
  const priceNum = parseFloat(priceStr) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.toUpperCase() || 'USD',
    minimumFractionDigits: 2,
  }).format(priceNum);
}

export async function fetchProducts(): Promise<Product[]> {
  const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const [groupsRes, allProductsRes] = await Promise.all([
    fetch(`${baseUrl}/api/sellapp/groups`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/api/sellapp/products?page=1`, { next: { revalidate: 60 } }),
  ]);

  if (!groupsRes.ok) {
    throw new Error('Failed to fetch groups from Sell.app');
  }

  const groupsData: { data: SellAppGroup[] } = await groupsRes.json();
  const groups = groupsData.data ?? [];

  const groupedProductIds = new Set<number>();
  const allProducts: Product[] = [];

  await Promise.all(
    groups
      .filter(g => !g.unlisted)
      .map(async (group, groupIndex) => {
        const productsRes = await fetch(`${baseUrl}/api/sellapp/groups/${group.id}/products`, {
          next: { revalidate: 60 },
        });

        if (!productsRes.ok) return;

        const productsData: { data: GroupProductFull[] } = await productsRes.json();
        const groupProducts = productsData.data ?? [];

        groupProducts.forEach((product, productIndex) => {
          groupedProductIds.add(product.id);
          const priceValue = product.default_price
            ? parseFloat(product.default_price.price) / 100
            : 0;
          const currency = product.default_price?.currency || 'USD';

          allProducts.push({
            id: `${group.id}-${product.id}`,
            sellappProductId: product.id,
            sellappVariantId: null,
            icon: pickIcon(group.title, groupIndex + productIndex),
            title: product.title,
            duration: group.title,
            groupTitle: group.title,
            category: groupTitleToCategory(group.title),
            price: formatPrice(product.default_price?.price ?? '0', currency),
            priceValue,
            currency,
            description: product.description
              ? product.description.replace(/<[^>]*>/g, '').trim()
              : '',
            features: parseFeaturesFromDescription(product.description),
          });
        });
      })
  );

  if (allProductsRes.ok) {
    const allProductsData: PaginatedResponse<SellAppProduct> = await allProductsRes.json();
    const ungrouped = (allProductsData.data ?? []).filter(
      (p: SellAppProduct) => !groupedProductIds.has(p.id) && p.visibility === 'PUBLIC'
    );

    ungrouped.forEach((product: SellAppProduct, idx: number) => {
      const v = product.variants?.[0];
      const priceRaw = v?.pricing?.price?.price ?? 0;
      const currency = v?.pricing?.price?.currency ?? 'USD';
      const priceValue = priceRaw / 100;

      allProducts.push({
        id: `other-${product.id}`,
        sellappProductId: product.id,
        sellappVariantId: v?.id ?? null,
        icon: pickIcon('other', idx),
        title: product.title,
        duration: 'Other Subscriptions',
        groupTitle: 'Other Subscriptions',
        category: OTHER_SUBSCRIPTIONS_CATEGORY,
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.toUpperCase(),
          minimumFractionDigits: 2,
        }).format(priceValue),
        priceValue,
        currency,
        description: product.description
          ? product.description.replace(/<[^>]*>/g, '').trim()
          : '',
        features: parseFeaturesFromDescription(product.description ?? ''),
      });
    });
  }

  allProducts.sort((a, b) => a.priceValue - b.priceValue);

  return allProducts;
}

export function getCategories(products: Product[]): { label: string; category: string }[] {
  const seen = new Set<string>();
  const cats: { label: string; category: string }[] = [{ label: 'All Products', category: 'all' }];

  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      let label: string;
      if (p.category === '1-month') label = '1 Month Boosts';
      else if (p.category === '3-months') label = '3 Months Boosts';
      else if (p.category === OTHER_SUBSCRIPTIONS_CATEGORY) label = 'Other Subscriptions';
      else label = p.groupTitle;
      cats.push({ label, category: p.category });
    }
  }

  return cats;
}

export function filterProducts(
  products: Product[],
  searchQuery: string,
  category: ProductCategory
): Product[] {
  let filtered = products;

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.duration.toLowerCase().includes(query) ||
        p.price.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  return filtered;
}
