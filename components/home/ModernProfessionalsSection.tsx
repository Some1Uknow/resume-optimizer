import { CheckCircle2, Star, Sparkles } from "lucide-react";

const professionalFeatures = [
  {
    title: "Staging Environment",
    description: "Preview your resume in real-time as you make changes. No surprises when you export.",
    icon: CheckCircle2,
    iconColor: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    title: "Production-Ready Files",
    description: "Export your resume as ATS-optimized PDF ready for any application.",
    icon: Star,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    title: "Fast QA Integration",
    description: "AI reviews your content for inconsistencies and optimization opportunities.",
    icon: Sparkles,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
];

export function ModernProfessionalsSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
              <span className="text-sm font-medium text-muted-foreground">Made for</span>
              <span className="text-sm font-bold text-green-400">Modern Professionals</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                Made for
                <br />
                Modern Professionals
              </span>
            </h2>

            <div className="space-y-6">
              {professionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-8 h-8 ${feature.bgColor} rounded-lg flex items-center justify-center mt-1`}>
                    <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">Production Ready</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your resume has been optimized and is ready for export.
                </p>
              </div>

              <div className="space-y-3">
                {["ATS Optimization", "Grammar Check", "Format Validation"].map((check) => (
                  <div key={check} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground text-sm">{check}</span>
                    <span className="text-green-400 text-sm">✓ Passed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
