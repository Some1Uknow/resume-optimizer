import { Check, X, Rocket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";

const PRICING_TIERS = [
  {
    name: "Free",
    price: 0,
    features: [
      "1 Resume Creation",
      "Basic ATS Scan",
      "Limited Templates",
      "Email Support",
    ],
    unavailableFeatures: [
      "AI Optimization",
      "Unlimited Versions",
      "Priority Support",
    ],
  },
  {
    name: "Pro",
    price: 9.99,
    features: [
      "Unlimited Resumes",
      "Advanced ATS Scan",
      "All Templates",
      "AI Optimization",
      "Priority Email Support",
    ],
    unavailableFeatures: ["Personal Career Coach", "Enterprise Features"],
  },
  {
    name: "Enterprise",
    price: 49.99,
    features: [
      "Unlimited Team Resumes",
      "Advanced ATS Scan",
      "All Templates",
      "AI Optimization",
      "Personal Career Coach",
      "Priority & Phone Support",
      "Custom Branding",
    ],
    unavailableFeatures: [],
  },
];

export default function PricingPage() {
  return (
    <div className=" bg-white dark:bg-slate-900 py-4 px-4">
      <div className=" mx-auto text-center mb-8">
        <TypographyH1 className="text-6xl font-bold py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Unlock Your Career Potential
        </TypographyH1>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your dream job is just one perfect resume away. Our AI-powered
            platform transforms ordinary resumes into powerful career catalysts
            that get you noticed.
          </p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <div className="flex items-center">
              <Star className="text-yellow-500 w-6 h-6 mr-2" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                95% Success Rate
              </span>
            </div>
            <div className="flex items-center">
              <Rocket className="text-blue-600 w-6 h-6 mr-2" />
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Instant AI Optimization
              </span>
            </div>
          </div>
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-6 py-3 rounded-full mt-4 animate-pulse">
            <span className="text-blue-600 dark:text-blue-300 font-bold">
              Limited Time: Save 30% on Annual Plans
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_TIERS.map((tier, index) => (
          <Card
            key={tier.name}
            className={`
                bg-white dark:bg-slate-800 
                border-2 
                ${
                  index === 1
                    ? "border-blue-500 dark:border-blue-400 shadow-xl"
                    : "border-gray-200 dark:border-slate-700"
                }
                hover:shadow-2xl transition-all
              `}
          >
            <CardHeader className="text-center">
              <CardTitle
                className={`
                  text-3xl font-bold mb-4 
                  ${
                    index === 1
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-white"
                  }
                `}
              >
                {tier.name}
              </CardTitle>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                ${tier.price}
                <span className="text-base text-gray-600 dark:text-gray-300">
                  /month
                </span>
              </div>
              {index === 1 && (
                <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-1 rounded-full mb-4">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      <Check className="text-green-500 w-5 h-5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tier.unavailableFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 text-gray-400 dark:text-gray-600 line-through"
                    >
                      <X className="text-red-500 w-5 h-5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className={`
                      w-full rounded-full mt-6 
                      ${
                        index === 1
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                      }
                    `}
                >
                  {index === 1 ? "Get Started" : "Choose Plan"}
                  <Rocket className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
