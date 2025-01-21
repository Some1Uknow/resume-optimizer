import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-16 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - Illustration */}
        <div className="relative h-[400px]">
          <Image
            src="/template-7.png"
            alt="Person working at desk"
            height={800}
            width={450}
          />
        </div>

        {/* Right - Content */}
        <div>
          <h2 className="text-5xl text-black font-bold mb-6">
            Create a resume to land your next job
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We have developed a resume builder based on feedback from thousands
            of users, recruiter expertise, stellar template design and the best
            hiring practices. The goal is simple: help you land that dream job
            interview! Get an advantage in the modern professional environment.
          </p>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Build Your Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
