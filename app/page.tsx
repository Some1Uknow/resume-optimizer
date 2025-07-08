"use client";

import { v4 as uuidv4 } from "uuid";
import { HomeLayout } from "@/components/home/HomeLayout";
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ScalableDataSection } from "@/components/home/ScalableDataSection";
import { FeaturesControlSection } from "@/components/home/FeaturesControlSection";
import { ConnectToolsSection } from "@/components/home/ConnectToolsSection";
import { UnlockPotentialSection } from "@/components/home/UnlockPotentialSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SimplePricingSection } from "@/components/home/SimplePricingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTASection2 } from "@/components/home/FinalCTASection2";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  const chatId = uuidv4();

  return (
    <HomeLayout>
      <Header />
      <main className="flex-1">
        <HeroSection chatId={chatId} />
        <HowItWorksSection />
        <ScalableDataSection />
        <FeaturesControlSection />
        <ConnectToolsSection />
        <UnlockPotentialSection />
        <TestimonialsSection />
        <SimplePricingSection />
        <FAQSection />
        <FinalCTASection2 />
      </main>
      <Footer />
    </HomeLayout>
  );
}
