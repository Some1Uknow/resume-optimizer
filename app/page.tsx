import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import TemplatesSection from '@/components/TemplatesSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSection />
      <TemplatesSection />
    </main>
  );
}