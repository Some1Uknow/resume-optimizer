"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, CheckCircle, Target, Zap, FileText } from "lucide-react";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { checkSession } from "@/actions/session-actions";

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
        router.push(`/builder/${chatId}`);
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
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Resume Builder
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                AI Powered Resume
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Made for Success
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              A smart, conversational tool for building world-class resumes
              with AI optimization and seamless export. Built using the
              latest in machine learning.
            </p>

            {/* CTA Button */}
            <div className="mb-12">
              <Button
                onClick={handleGetStarted}
                disabled={isCheckingSession}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-4 h-auto rounded-xl"
              >
                {isCheckingSession ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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

            {/* Trust indicators */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Trusted by professionals at
              </p>
              <div className="flex items-center gap-6 opacity-60">
                <div className="text-muted-foreground font-semibold">Google</div>
                <div className="text-muted-foreground font-semibold">Microsoft</div>
                <div className="text-muted-foreground font-semibold">Amazon</div>
                <div className="text-muted-foreground font-semibold">Meta</div>
                <div className="text-muted-foreground font-semibold">Apple</div>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Demo */}
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
              {/* Resume Header */}
              <div className="border-b border-border pb-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">John Smith</h3>
                    <p className="text-muted-foreground">Senior Software Engineer</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  john.smith@email.com • +1 (555) 123-4567 • New York, NY
                </div>
              </div>

              {/* Resume Content Preview */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">EXPERIENCE</h4>
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded w-full"></div>
                    <div className="h-2 bg-muted rounded w-4/5"></div>
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">SKILLS</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">React</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Node.js</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">TypeScript</span>
                  </div>
                </div>
              </div>

              {/* Quality Indicators */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">ATS Optimized</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">No Errors Detected</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Keyword Optimized</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">AI Enhanced</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Professional Format</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Perfect Score
            </div>
          </div>
        </div>
      </div>
      
      {/* Sign In Modal */}
      <SignInModal 
        open={showSignInModal} 
        onOpenChange={setShowSignInModal} 
      />
    </section>
  );
}
