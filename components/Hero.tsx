import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Perfect Resume with AI
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl">
            Build, optimize, and tailor your resume for any job with our
            advanced AI-driven platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                Create My Resume
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
              View Templates
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-5 rounded-xl shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">39%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                more likely to get hired
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-5 rounded-xl shadow-sm backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">8%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                better pay with your next job
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-5 rounded-xl shadow-sm backdrop-blur-sm col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2.5x</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                faster job application process
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Resume Preview */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl -z-10 blur-xl opacity-70"></div>
          <div className="relative h-[500px] md:h-[600px] w-full p-4">
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <Image
                src="/template-1.png"
                alt="Resume Preview"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
