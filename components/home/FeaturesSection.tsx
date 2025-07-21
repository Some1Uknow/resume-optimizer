"use client";

import { MessageSquare, Target, FileText, BarChart3, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Resume Builder",
      description: "Chat with our AI to create tailored resumes that match your experience and target roles.",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Target,
      title: "ATS Optimizer",
      description: "Ensure your resume passes Applicant Tracking Systems with our intelligent optimization engine.",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      icon: FileText,
      title: "Cover Letter Generator",
      description: "Generate compelling cover letters that complement your resume for each application.",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      icon: BarChart3,
      title: "Application Tracker",
      description: "Track your job applications, interview schedules, and follow-ups in one organized dashboard.",
      color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Get instant feedback and suggestions as you build your resume for maximum impact.",
      color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. Export anytime and maintain full control of your information.",
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to land your dream job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered resume building to application tracking, we&apos;ve got every step of your job search covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
