import type { Metadata } from 'next';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Comparison } from './components/sections/Comparison';
import { Process } from './components/sections/Process';
import { Pricing } from './components/sections/Pricing';
import { Features } from './components/sections/Features';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/layout/Footer';
import { StructuredData } from './components/StructuredData';
import { FAQ_ITEMS } from './lib/faq';
import { SITE_NAME, absoluteUrl, routeMetadata, seo } from './lib/seo';

export const metadata: Metadata = {
  ...routeMetadata({
    title: seo.title,
    description: seo.description,
    path: '/',
  }),
  title: {
    absolute: seo.title,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/img2.svg'),
  sameAs: ['https://disctools.net/discord'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData data={[organizationJsonLd, websiteJsonLd, faqJsonLd]} />
      <Navbar />
      <Hero />
      <Comparison />
      <Process />
      <Pricing />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
