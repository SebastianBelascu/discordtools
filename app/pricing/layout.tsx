import type { Metadata } from 'next';
import { StructuredData } from '@/app/components/StructuredData';
import { absoluteUrl, routeMetadata, seo } from '@/app/lib/seo';

export const metadata: Metadata = routeMetadata({
  title: seo.pricingTitle,
  description: seo.pricingDescription,
  path: '/pricing',
});

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: absoluteUrl('/'),
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Pricing',
      item: absoluteUrl('/pricing'),
    },
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
