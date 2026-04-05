import { Rocket, Crown, Zap, ShieldCheck, Trophy } from 'lucide-react';

export type ProductCategory = 'all' | '1-month' | '3-months';

export interface Product {
  id: string;
  icon: any;
  title: string;
  duration: string;
  category: ProductCategory;
  price: string;
  priceValue: number;
  features: {
    icon: any;
    text: string;
  }[];
}

export const products: Product[] = [
  {
    id: '1',
    icon: Rocket,
    title: '2 Server Boosts',
    duration: '1 Month',
    category: '1-month',
    price: '$1.99',
    priceValue: 1.99,
    features: [
      { icon: ShieldCheck, text: '30 Days Warranty' },
      { icon: Zap, text: 'Instant Delivery' },
    ],
  },
  {
    id: '2',
    icon: Crown,
    title: '14 Server Boosts',
    duration: '3 Months',
    category: '3-months',
    price: '$12.99',
    priceValue: 12.99,
    features: [
      { icon: ShieldCheck, text: '90 Days Warranty' },
      { icon: Zap, text: 'Instant Delivery' },
      { icon: Trophy, text: 'Server Level 3' },
    ],
  },
  {
    id: '3',
    icon: Rocket,
    title: '4 Server Boosts',
    duration: '1 Month',
    category: '1-month',
    price: '$3.49',
    priceValue: 3.49,
    features: [
      { icon: ShieldCheck, text: '30 Days Warranty' },
      { icon: Zap, text: 'Instant Delivery' },
    ],
  },
  {
    id: '4',
    icon: Crown,
    title: '28 Server Boosts',
    duration: '3 Months',
    category: '3-months',
    price: '$24.99',
    priceValue: 24.99,
    features: [
      { icon: ShieldCheck, text: '90 Days Warranty' },
      { icon: Zap, text: 'Instant Delivery' },
      { icon: Trophy, text: 'Server Level 3' },
    ],
  },
];

export async function fetchProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return products;
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
        p.price.toLowerCase().includes(query)
    );
  }

  return filtered;
}
