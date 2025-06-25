export function JustPressTabSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
          <span className="text-sm font-medium text-muted-foreground">Just Press</span>
          <kbd className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-mono">
            Tab
          </kbd>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8">
            <div className="text-left max-w-2xl mx-auto">
              <p className="text-muted-foreground mb-4 font-mono text-sm leading-relaxed">
                ResumeMax is smart enough that it can predict what you are about to write.
              </p>
              <p className="text-muted-foreground mb-4 font-mono text-sm leading-relaxed">
                While you are typing, ResumeMax knows the context of your resume data and shows you relevant suggestions. Just press Tab if it predicted correctly.
              </p>
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                You can accept those suggestions by just pressing Tab. Like you just did.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
