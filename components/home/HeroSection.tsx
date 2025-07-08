"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, CheckCircle, Zap, FileText } from "lucide-react";
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Resume Builder
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            <span className="text-foreground">
              Transform your workflow
            </span>
            <br />
            <span className="text-foreground">
              with 
            </span>
            <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
              {" "}intelligent AI SaaS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Streamline your resume creation process with cutting-edge AI technology 
            that understands your career goals and optimizes for success.
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

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl shadow-2xl border border-border p-6 md:p-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-foreground to-muted-foreground rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-background" />
                  </div>
                  <span className="font-semibold text-foreground">Resume Builder</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-accent-foreground">AI Optimized</span>
                  </div>
                  <div className="h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-accent-foreground">ATS Ready</span>
                  </div>
                  <div className="h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-accent-foreground">Professional</span>
                  </div>
                </div>
              </div>

              {/* Mock Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-muted rounded-lg border border-border p-4">
                  <div className="h-3 bg-muted-foreground/30 rounded w-1/3 mb-4"></div>
                  <div className="flex items-end gap-2 h-16">
                    <div className="w-4 bg-foreground rounded-t h-8"></div>
                    <div className="w-4 bg-foreground rounded-t h-12"></div>
                    <div className="w-4 bg-foreground rounded-t h-6"></div>
                    <div className="w-4 bg-foreground rounded-t h-16"></div>
                    <div className="w-4 bg-foreground rounded-t h-10"></div>
                  </div>
                </div>
                <div className="h-32 bg-muted rounded-lg border border-border p-4">
                  <div className="h-3 bg-muted-foreground/30 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-center items-center h-16">
                    <div className="w-16 h-16 border-4 border-foreground border-t-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-card rounded-xl shadow-lg p-3 border border-border">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-foreground">Perfect Score</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-3 border border-border">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-foreground">AI Enhanced</span>
              </div>
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
