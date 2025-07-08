"use client";

import { Lock, Eye, Download, Edit3, Share2, Trash2, Users, Settings } from "lucide-react";

export function FeaturesControlSection() {
  const features = [
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your resume data is encrypted and never shared without your explicit permission.",
      highlight: "Enterprise-grade encryption"
    },
    {
      icon: Eye,
      title: "Full Transparency",
      description: "See exactly how AI optimizes your resume with detailed explanations for every change.",
      highlight: "Complete visibility"
    },
    {
      icon: Download,
      title: "Export Anywhere",
      description: "Download your resume in multiple formats and take it with you wherever you go.",
      highlight: "PDF, Word, HTML"
    },
    {
      icon: Edit3,
      title: "Easy Editing",
      description: "Make changes anytime with our intuitive editor that maintains AI optimizations.",
      highlight: "Real-time updates"
    },
    {
      icon: Share2,
      title: "Secure Sharing",
      description: "Share your resume with potential employers through secure, trackable links.",
      highlight: "View analytics"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Get feedback from mentors and peers with collaborative review features.",
      highlight: "Review & comment"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
              <Settings className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Complete Control</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Features that let you Control Your Data
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Take complete control of your resume data with enterprise-grade privacy, 
              transparency, and flexibility. Your career information stays secure and 
              accessible only to you.
            </p>

            <div className="space-y-6">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">
                      {feature.description}
                    </p>
                    <span className="text-xs text-blue-600 font-medium">
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Feature grid */}
          <div className="grid grid-cols-1 gap-6">
            {features.slice(3).map((feature, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {feature.description}
                    </p>
                    <span className="text-xs text-blue-600 font-medium">
                      {feature.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional feature card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Data Deletion
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Delete your data permanently with one click. We respect your right to be forgotten.
                  </p>
                  <span className="text-xs text-red-600 font-medium">
                    GDPR Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
