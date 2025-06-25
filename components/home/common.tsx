import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-20 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string | ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ badge, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8">
          <span className="text-sm font-medium text-muted-foreground">{badge}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        {typeof title === 'string' ? (
          <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </span>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function GradientCard({ 
  children, 
  className = "", 
  gradientFrom = "blue-500/10", 
  gradientTo = "purple-500/10" 
}: GradientCardProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
      <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full">
        {children}
      </div>
    </div>
  );
}
