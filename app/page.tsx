import React from "react";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import TemplatesSection from "@/components/TemplatesSection";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Header/>
      <Hero />
      <FeatureSection />
      <TemplatesSection />
    </>
  );
}
