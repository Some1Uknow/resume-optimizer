import Link from "next/link";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex flex-row items-center space-x-2">
          <File className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
          <TypographyH2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ResumeAI
          </TypographyH2>
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {[
            { label: "Build Resume", href: "/builder" },
            { label: "Templates", href: "/templates" },
            { label: "AI Optimization", href: "/optimize" },
            { label: "Pricing", href: "/pricing" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="lg" className="rounded-full">
            Get Started
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
