const intelligenceFeatures = [
  {
    title: "Error Detection",
    description: "ResumeMax is smart enough that it can predict what you are about to write or change.",
  },
  {
    title: "Autocomplete Style",
    description: "Bring your style and change the page using the most intelligent style sheet.",
  },
  {
    title: "Code Highlighting",
    description: "ResumeMax knows the context of your project and highlights the differences.",
  },
];

export function IntelligenceFeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
            <span className="text-sm font-medium text-muted-foreground">Built with Intellisense</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Built with Intellisense
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent resume builder is powered by the same kind that
            <br />
            drives modern code editors. Get smart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {intelligenceFeatures.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
                {/* Mock code editor interface */}
                <div className="bg-muted/50 border-b border-border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="ml-4 text-sm text-muted-foreground">resume-builder.tsx</div>
                  </div>
                </div>
                <div className="p-6 min-h-[200px] flex flex-col justify-between">
                  {/* Mock code content */}
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-muted-foreground">
                      1 <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">experience</span> = {`{`}
                    </div>
                    <div className="text-muted-foreground">
                      2 <span className="text-green-400">company</span>:{" "}
                      <span className="text-yellow-400">&quot;Google&quot;</span>,
                    </div>
                    <div className="text-muted-foreground">
                      3 <span className="text-green-400">role</span>:{" "}
                      <span className="text-yellow-400">&quot;Senior Engineer&quot;</span>
                    </div>
                    <div className="text-muted-foreground">4 {`}`}</div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
