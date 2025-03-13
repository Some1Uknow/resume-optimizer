import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center text-black">
            <span className="text-xl font-bold">ResumeMax</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Build Resume
            </Link>
            <Link 
              href="/dashboard/builder" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Templates
            </Link>
            <Link 
              href="/dashboard/cover-letter" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cover Letters
            </Link>
            <Link 
              href="/dashboard/analyze" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
             Optimizer
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Get Started Button */}
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white hover:underline transition-all"
          >
            Get Started
          </Button>
        </div>
      </div>
      <ModeToggle/>
    </nav>
  );
};

export default Navbar;