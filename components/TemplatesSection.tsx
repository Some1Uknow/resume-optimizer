"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { ArrowRight, Star } from "lucide-react";

const TemplateCard = ({ src, index }: { src: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-all duration-500 ease-in-out mx-4 group"
      style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl -z-10 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-10"></div>
        {index % 3 === 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" /> Popular
          </div>
        )}
        <Image
          src={src}
          alt={`Resume template ${index + 1}`}
          width={300}
          height={400}
          className="rounded-xl transition-all duration-300 group-hover:brightness-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                     text-white z-10 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl w-full">
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
};

const TemplatesSection = () => {
  const templates = [
    "/template-1.png",
    "/template-2.png",
    "/template-3.png",
    "/template-4.png",
    "/template-5.png",
    "/template-7.png",
    "/template-8.png",
    "/template-10.png",
    "/template-11.png",
    "/template-12.png",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 -mr-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      <div className="absolute bottom-1/3 left-0 -ml-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      
      <div className="relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Professional Resume Templates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Choose from our expert-designed templates
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Each resume template is designed to follow the exact rules you need to
            get hired faster. Use our resume templates and get free access to 18
            more career tools!
          </p>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            Create My Resume <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent dark:from-gray-950 z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-950 z-10 pointer-events-none"></div>
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-8"
        >
          {templates.map((template, index) => (
            <TemplateCard key={index} src={template} index={index} />
          ))}
        </Marquee>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">ATS-Optimized</h3>
          <p className="text-gray-600 dark:text-gray-400">All templates are designed to pass through Applicant Tracking Systems.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Fully Customizable</h3>
          <p className="text-gray-600 dark:text-gray-400">Customize colors, fonts, layouts and sections to match your preferences.</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Instant Download</h3>
          <p className="text-gray-600 dark:text-gray-400">Download your resume in PDF, Word, or other formats with one click.</p>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;