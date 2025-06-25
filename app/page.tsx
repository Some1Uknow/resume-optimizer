"use client";

import { v4 as uuidv4 } from "uuid";
import { HomeLayout } from "@/components/home/HomeLayout";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { HeroVideoSection } from "@/components/home/HeroVideoSection";
import { ProductDemoSection } from "@/components/home/ProductDemoSection";
import { IntelligenceFeaturesSection } from "@/components/home/IntelligenceFeaturesSection";
import { JustPressTabSection } from "@/components/home/JustPressTabSection";
import { ModernProfessionalsSection } from "@/components/home/ModernProfessionalsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  const chatId = uuidv4();

  return (
    <HomeLayout>
      <Header chatId={chatId} />

      <main className="flex-1">
        <HeroSection chatId={chatId} />
        <HeroVideoSection />
        <ProductDemoSection />
        <IntelligenceFeaturesSection />
        <JustPressTabSection />
        <ModernProfessionalsSection />
        <PricingSection />
        <FinalCTASection chatId={chatId} />
      </main>

      <Footer />
    </HomeLayout>
  );
}
