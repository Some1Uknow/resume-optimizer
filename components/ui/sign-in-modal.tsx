"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { handleGoogleSignIn } from "@/actions/auth-actions";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ open, onOpenChange }: SignInModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await handleGoogleSignIn();
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Welcome to Resume Optimizer
          </DialogTitle>
          <DialogDescription className="text-lg">
            Sign in to start building your AI-powered resume
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full h-12 text-base font-medium bg-white hover:bg-gray-100 text-gray-900 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
            variant="outline"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Icons.google className="w-5 h-5" />
                Continue with Google
              </div>
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
