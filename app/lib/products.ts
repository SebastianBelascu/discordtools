import { Rocket, Crown, Zap, ShieldCheck, Trophy, Sparkles, type LucideIcon } from 'lucide-react';
import { SellAppGroup, GroupProductFull, SellAppProduct, PaginatedResponse } from '@/lib/sellapp/types';

export const OTHER_SUBSCRIPTIONS_CATEGORY = 'other-subscriptions';

export type ProductCategory = 'all' | string;

export interface Product {
  id: string;
  sellappProductId: number;
  sellappVariantId: number | null;
  icon: LucideIcon;
  title: string;
  duration: string;
  groupTitle: string;
  category: string;
  price: string;
  priceValue: number;
  currency: string;
  description: string;
  features: {
    icon: LucideIcon;
    text: string;
  }[];
}

interface CategoryOption {
  label: string;
  category: string;
}

function pickIcon(groupTitle: string, index: number) {
  const title = groupTitle.toLowerCase();
  if (title.includes('3 month') || title.includes('3months')) return Crown;
  if (title.includes('nitro') || title.includes('spotify') || title.includes('steam')) return Sparkles;
  if (index % 2 === 0) return Rocket;
  return Crown;
}

function parseFeaturesFromDescription(description: string): { icon: LucideIcon; text: string }[] {
  if (!description) return [{ icon: Zap, text: 'Instant Delivery' }];

  const stripped = description.replace(/<[^>]*>/g, '').trim();
  const lines = stripped
    .split(/[\n,;|\u2022\-\u2013]+/)
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

function slugifyCategory(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferCategory(groupTitle: string, productTitle: string): string {
  const source = `${groupTitle} ${productTitle}`.toLowerCase();

  if (source.includes('nitro')) return 'discord-nitro';
  if (source.includes('server boost') || source.includes('boost')) return 'server-boosts';
  if (source.includes('spotify')) return 'spotify';
  if (source.includes('youtube')) return 'youtube-premium';
  if (source.includes('disney')) return 'disney-plus';
  if (source.includes('crunchyroll')) return 'crunchyroll';
  if (source.includes('member')) return 'discord-members';
  if (source.includes('steam')) return 'steam';

  return slugifyCategory(groupTitle) || 'other';
}

function categoryLabel(category: string, fallback: string): string {
  if (category === 'discord-nitro') return 'Discord Nitro';
  if (category === 'server-boosts') return 'Server Boosts';
  if (category === OTHER_SUBSCRIPTIONS_CATEGORY) return 'Other Subscriptions';

  return fallback;
}

function categoryPriority(category: string): number {
  if (category === 'all') return 0;
  if (category === 'discord-nitro') return 1;
  if (category === 'server-boosts') return 2;
  return 10;
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
            category: inferCategory(group.title, product.title),
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

export function getCategories(
  products: Product[],
  options?: { includeAll?: boolean }
): CategoryOption[] {
  const seen = new Set<string>();
  const cats: CategoryOption[] = [];

  if (options?.includeAll !== false) {
    cats.push({ label: 'All Products', category: 'all' });
  }

  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      cats.push({
        label: categoryLabel(p.category, p.groupTitle),
        category: p.category,
      });
    }
  }

  const head = cats.filter((cat) => cat.category === 'all');
  const tail = cats
    .filter((cat) => cat.category !== 'all')
    .sort((a, b) => {
      const priorityDiff = categoryPriority(a.category) - categoryPriority(b.category);
      if (priorityDiff !== 0) return priorityDiff;
      return a.label.localeCompare(b.label);
    });

  return [...head, ...tail];
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
