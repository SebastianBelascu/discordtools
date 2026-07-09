import type { Metadata } from 'next';

export const SITE_URL = 'https://www.disctools.net';
export const SITE_NAME = 'DiscTools';

export const seo = {
  title: 'DiscTools - Cheap Discord Nitro, Server Boosts & Premium Subscriptions',
  description:
    'Buy Cheap Discord Nitro, Server Boosts, Spotify Premium, YouTube Premium and more. Secure checkout, instant delivery, 24/7 human support, and a full-service warranty. Legal regional pricing with zero account risk.',
  pricingTitle: 'Pricing - Cheap Discord Nitro, Server Boosts & Premium Subscriptions',
  pricingDescription:
    'Compare DiscTools pricing for Discord Nitro, server boosts, Spotify Premium, YouTube Premium and other premium subscriptions with secure checkout and fast delivery.',
  storeTitle: 'Store - DiscTools Premium Subscriptions',
  storeDescription:
    'Browse DiscTools premium subscriptions and Discord tools with secure checkout, fast delivery and full-service warranty.',
  keywords: [
    'cheap discord nitro',
    'discord server boosts',
    'spotify premium cheap',
    'youtube premium cheap',
    'discord members',
    'crunchyroll cheap',
    'buy discord nitro',
    'cheap subscriptions',
  ],
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function routeMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
