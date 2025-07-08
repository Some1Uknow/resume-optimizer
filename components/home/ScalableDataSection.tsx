"use client";

import { Database, BarChart3, Shield, Zap, TrendingUp, Globe } from "lucide-react";

export function ScalableDataSection() {
  const features = [
    {
      icon: Database,
      title: "Smart Data Processing",
      description: "Process thousands of resumes with intelligent parsing and optimization algorithms."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track resume performance with detailed analytics and success metrics."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with encrypted data storage and compliance certifications."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate optimized resumes in seconds, not hours, with our AI-powered engine."
    },
    {
      icon: TrendingUp,
      title: "Success Optimization",
      description: "Continuous learning from successful job placements to improve resume quality."
    },
    {
      icon: Globe,
      title: "Global Templates",
      description: "Region-specific resume formats for international job applications."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Scalable Data Operations
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Built for scale with enterprise-grade infrastructure that handles millions of resumes 
            while maintaining lightning-fast performance and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-foreground to-muted-foreground rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Resumes Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
