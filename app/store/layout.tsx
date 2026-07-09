import type { Metadata } from 'next';
import { routeMetadata, seo } from '@/app/lib/seo';

export const metadata: Metadata = routeMetadata({
  title: seo.storeTitle,
  description: seo.storeDescription,
  path: '/store',
  noindex: true,
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
