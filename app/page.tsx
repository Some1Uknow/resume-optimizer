"use client";

import { useState, useEffect } from "react";
import {

  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
} from "lucide-react";
import { useTheme } from "next-themes";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { checkSession } from "@/actions/session-actions";
import { useRouter } from "next/navigation";

import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { LogosSection } from "@/components/home/LogosSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = async () => {
    try {
      setIsCheckingSession(true);
      const hasSession = await checkSession();

      if (hasSession) {
        router.push(`app/builder/new`); // Assuming 'new' is a valid chat ID for a new resume
      } else {
        setShowSignInModal(true);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setShowSignInModal(true);
    } finally {
      setIsCheckingSession(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "AI Resume Builder",
      description:
        "Seamlessly build your professional resume with AI automation.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Job Tracker",
      description:
        "Save jobs with single-click and track your applications effortlessly.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Cover Letter Generator",
      description:
        "Generate compelling cover letters from job descriptions instantly.",
      icon: <Users className="size-5" />,
    },
    {
      title: "ATS Optimizer",
      description:
        "Optimize resumes for ATS compatibility and higher selection rates.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Resume-to-Job Generate",
      description:
        "Craft compelling resumes from job descriptions, bringing your career aspirations to life.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Professional Templates",
      description: "Choose from 500+ professionally designed resume templates.",
      icon: <Star className="size-5" />,
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />

      {/* Sign In Modal */}
      <SignInModal
        open={showSignInModal}
        onOpenChange={setShowSignInModal}
      />
    </div>
  );
}
