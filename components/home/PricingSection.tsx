import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    period: "/mo",
    description: "For personal projects",
    features: [
      "1 resume",
      "Basic templates",
      "PDF export",
      "Community support",
    ],
    popular: false,
  },
  {
    title: "Pro",
    price: "$4",
    period: "/mo",
    description: "For professional use",
    features: [
      "Unlimited resumes",
      "Premium templates",
      "AI optimization",
      "Priority support",
      "Analytics",
    ],
    popular: true,
  },
  {
    title: "Team",
    price: "$7",
    period: "/mo",
    description: "For growing teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Brand customization",
      "API access",
      "Dedicated support",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Unleash ResumeMax&apos;s
              <br />
              Full Potential
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One ResumeMax for everything. Use ResumeMax for the way you
            <br />
            want to work. Take total control of your resume creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-primary/20 bg-primary/5 dark:border-white/20 dark:bg-white/5"
                  : "border-border bg-card"
              } backdrop-blur-sm p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 to-purple-400 text-white dark:text-black text-xs font-bold px-4 py-2 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.title}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-8">{plan.description}</p>

                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  } font-medium`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
