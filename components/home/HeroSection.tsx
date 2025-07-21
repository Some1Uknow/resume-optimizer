"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, CheckCircle, Zap, FileText } from "lucide-react";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { checkSession } from "@/actions/session-actions";
import { JobTrackerPreview } from "@/components/home/JobTrackerPreview";

interface HeroSectionProps {
  chatId: string;
}

export function HeroSection({ chatId }: HeroSectionProps) {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      setIsCheckingSession(true);
      const hasSession = await checkSession();

      if (hasSession) {
        router.push(`app/builder/${chatId}`);
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
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/50">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-muted/20 to-muted/30 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-muted/30 to-muted/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative m-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight mt-12">
            <span className="text-foreground">Transform your workflow</span>
            <br />
            <span className="text-foreground">with</span>
            <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
              {" "}
              intelligent AI SaaS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Streamline your resume creation process with cutting-edge AI
            technology that understands your career goals and optimizes for
            success.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Button
              onClick={handleGetStarted}
              disabled={isCheckingSession}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {isCheckingSession ? (
                <div className="flex items-center gap-2">
                  <div className=" border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Checking...
                </div>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Job Tracker Preview - Full width container */}
      <div className="w-[70%] mx-auto relative px-6 lg:px-8">
        <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
          <JobTrackerPreview />
        </div>

        {/* Floating elements */}
        <div className="absolute -top-4 -left-4 bg-card rounded-xl shadow-lg p-3 border border-border">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-foreground">
              Perfect Score
            </span>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-3 border border-border">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">
              AI Enhanced
            </span>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal open={showSignInModal} onOpenChange={setShowSignInModal} />
    </section>
  );
}
