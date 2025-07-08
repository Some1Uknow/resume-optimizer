"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Award, Zap, Target } from "lucide-react";

export function UnlockPotentialSection() {
  const stats = [
    {
      value: "60000",
      label: "Happy Customers",
      description: "Professionals who landed their dream jobs",
      color: "text-foreground"
    },
    {
      value: "+1.38%",
      label: "Response Rate",
      description: "Higher callback rates vs traditional resumes",
      color: "text-green-600"
    },
    {
      value: "+2.02%",
      label: "Success Rate",
      description: "Better interview conversion rates",
      color: "text-foreground"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Visibility",
      description: "Get noticed by recruiters with ATS-optimized formatting"
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Polished, interview-ready resumes that impress hiring managers"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate optimized resumes in minutes, not hours"
    },
    {
      icon: Target,
      title: "Targeted Optimization",
      description: "Customize for specific roles and industries"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unlock the Full Potential
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with AI-powered resume optimization.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-muted rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-foreground to-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-foreground to-muted-foreground rounded-2xl p-8 md:p-12 text-center text-background">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-lg text-background/70 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs 
            with AI-optimized resumes. Start building your future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 font-semibold px-8 py-3"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background text-background hover:bg-background hover:text-foreground font-semibold px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground mb-6">
            Trusted by professionals at top companies
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-muted-foreground font-semibold">Google</div>
            <div className="text-muted-foreground font-semibold">Microsoft</div>
            <div className="text-muted-foreground font-semibold">Amazon</div>
            <div className="text-muted-foreground font-semibold">Apple</div>
            <div className="text-muted-foreground font-semibold">Meta</div>
          </div>
        </div>
      </div>
    </section>
  );
}
