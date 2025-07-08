"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { checkSession } from "@/actions/session-actions";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export function FinalCTASection2() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      setIsCheckingSession(true);
      const hasSession = await checkSession();
      
      if (hasSession) {
        const chatId = uuidv4();
        router.push(`/app/builder/${chatId}`);
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
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Start Your Success Story
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Transform your workflow with intelligent AI SaaS
          </h2>
          
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their careers with our AI-powered resume optimization. 
            Start building your perfect resume today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={handleGetStarted}
            disabled={isCheckingSession}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-4 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {isCheckingSession ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                Checking...
              </div>
            ) : (
              <>
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4 h-auto rounded-xl transition-all"
          >
            Watch Demo
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Bottom dashboard preview */}
        <div className="mt-16 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">60K+</div>
                <div className="text-blue-100 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-blue-100 text-sm">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">95%</div>
                <div className="text-blue-100 text-sm">Success Rate</div>
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
