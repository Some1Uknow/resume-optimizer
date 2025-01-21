import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-7xl text-black font-bold mb-6">
            Perfect Resume with AI
          </h1>
          <p className="text-lg text-black mb-8">
            Build, optimize, and tailor your resume for any job with our advanced AI-driven platform.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6">
            Create My Resume
          </Button>

          {/* Statistics */}
          <div className="flex gap-8 mt-12">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">39%</div>
              <div className="text-sm text-gray-600">more likely to get hired</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">8%</div>
              <div className="text-sm text-gray-600">better pay with your next job</div>
            </div>
          </div>
        </div>

        {/* Right Content - Resume Preview */}
        <div className="relative h-[600px] w-full">
          <Image
            src="/template-1.png"
            alt="Resume Preview"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;