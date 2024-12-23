// components/ui/typography.tsx
import React from 'react';
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function TypographyH1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLead({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-xl text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLarge({ children, className, ...props }: TypographyProps) {
  return (
    <div 
      className={cn(
        "text-lg font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TypographySmall({ children, className, ...props }: TypographyProps) {
  return (
    <small 
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({ children, className, ...props }: TypographyProps) {
  return (
    <p 
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyList({ children, className, ...props }: TypographyProps) {
  return (
    <ul 
      className={cn(
        "my-6 ml-6 list-disc [&>li]:mt-2",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export function TypographyInlineCode({ children, className, ...props }: TypographyProps) {
  return (
    <code 
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export function TypographyBlockquote({ children, className, ...props }: TypographyProps) {
  return (
    <blockquote 
      className={cn(
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

// Optional: Typography Component for more flexible usage
export function Typography({ 
  variant = 'p', 
  children, 
  className, 
  ...props 
}: TypographyProps & { variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'lead' | 'large' | 'small' | 'muted' }) {
  const variantMap = {
    h1: TypographyH1,
    h2: TypographyH2,
    h3: TypographyH3,
    h4: TypographyH4,
    p: TypographyP,
    lead: TypographyLead,
    large: TypographyLarge,
    small: TypographySmall,
    muted: TypographyMuted
  };

  const Component = variantMap[variant];

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}