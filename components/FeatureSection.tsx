import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const FeatureItem = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
      <CheckCircle2 className="h-6 w-6 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 -ml-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      <div className="absolute bottom-1/4 right-0 -mr-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-70 z-0"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left - Illustration */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-[500px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl -z-10 blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <Image
                src="/template-7.png"
                alt="Person working at desk"
                height={800}
                width={450}
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full backdrop-blur-sm mb-4">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered Resume Builder</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Create a resume to land your next job
            </h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We have developed a resume builder based on feedback from thousands
            of users, recruiter expertise, stellar template design and the best
            hiring practices. The goal is simple: help you land that dream job
            interview! Get an advantage in the modern professional environment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <FeatureItem 
              title="AI Content Generation" 
              description="Generate professional content tailored to your target job with AI" 
            />
            <FeatureItem 
              title="ATS-Optimized" 
              description="Ensure your resume passes through Applicant Tracking Systems" 
            />
            <FeatureItem 
              title="Expert Templates" 
              description="Choose from professionally designed templates for any industry" 
            />
            <FeatureItem 
              title="Easy Customization" 
              description="Customize every aspect of your resume with our intuitive editor" 
            />
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              Build Your Resume
            </Button>
            <Button variant="outline" className="px-8 py-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
              View Templates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
