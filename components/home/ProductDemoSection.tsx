import { Sparkles } from "lucide-react";
import { GradientCard } from "./common";

const demoFeatures = [
  {
    title: "Error Detection",
    description: "AI catches grammar and formatting issues automatically",
    icon: "🔍",
  },
  {
    title: "Auto-complete Style",
    description: "Smart suggestions for professional language and structure",
    icon: "✨",
  },
  {
    title: "Code Highlighting",
    description: "Technical skills and projects are optimized for ATS",
    icon: "💻",
  },
  {
    title: "Built-in Git",
    description: "Version control for all your resume iterations",
    icon: "🔗",
  },
];

export function ProductDemoSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Better Resume Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our smart platform is designed to be the best out there. Just
            begin typing this and it makes a
            <span className="text-foreground font-medium"> better experience</span>{" "}
            for everyone.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* AI Assistant Demo */}
          <GradientCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-blue-400" />
              </div>
              <span className="font-semibold text-foreground">AI Assistant</span>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  Tell me about your experience as a software engineer at Google.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 ml-4">
                <p className="text-sm text-foreground">
                  I worked at Google from 2018-2022 as a Senior Software Engineer on the Cloud Platform team. I led a team of 5 engineers and implemented a new authentication system that improved security by 40%.
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  Add Python and machine learning to my skills.
                </p>
              </div>
            </div>
          </GradientCard>

          {/* Resume Preview Demo */}
          <GradientCard gradientFrom="purple-500/10" gradientTo="pink-500/10">
            <div className="relative bg-card/5 backdrop-blur-sm border border-border rounded-2xl p-6 h-full">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Alex Johnson</h3>
                <p className="text-muted-foreground">Senior Software Engineer</p>
                <div className="flex justify-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span>alex@example.com</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground border-b border-border pb-2 mb-3">
                    Experience
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-foreground">Senior Software Engineer</h5>
                        <p className="text-muted-foreground text-sm">Google, Mountain View, CA</p>
                      </div>
                      <span className="text-muted-foreground text-xs">2018 - 2022</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Led a team of 5 engineers on Cloud Platform. Implemented authentication system improving security by 40%.
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground border-b border-border pb-2 mb-3">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "TypeScript", "React", "Python", "ML"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoFeatures.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-muted/10 to-muted/5 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 text-center">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
