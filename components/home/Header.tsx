"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";
import { SignInModal } from "@/components/ui/sign-in-modal";

export function Header() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-foreground to-muted-foreground rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Q8s
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Auth & Theme Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleSignInClick}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted border-0 flex items-center gap-2"
            >
              <Icons.google className="h-4 w-4" />
              Sign in
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg"
            >
              Try Free
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
      
      {/* Sign In Modal */}
      <SignInModal 
        open={showSignInModal} 
        onOpenChange={setShowSignInModal} 
      />
    </header>
  );
}
