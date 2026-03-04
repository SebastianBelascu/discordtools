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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
