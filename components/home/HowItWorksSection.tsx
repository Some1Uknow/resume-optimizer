"use client";

import { CheckCircle, MessageSquare, FileText, Download } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Chat with AI",
      description: "Tell our AI about your experience, skills, and career goals through natural conversation."
    },
    {
      icon: FileText,
      title: "AI Optimization",
      description: "Our AI analyzes your input and optimizes your resume for ATS systems and recruiters."
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download your polished resume in multiple formats and share it with confidence."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get your perfect resume in just three simple steps. Our AI handles the optimization while you focus on your career.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>
              )}
              
              {/* Step number and icon */}
              <div className="relative z-10 mb-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 border-2 border-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">ATS Optimized</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ensures your resume passes through applicant tracking systems
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Professional Format</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Clean, modern templates that impress recruiters
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Multiple Formats</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Export as PDF, Word, or HTML for maximum compatibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
