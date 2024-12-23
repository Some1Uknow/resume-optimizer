import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Rocket, FileText, Edit3, Target, Star, File } from "lucide-react";
import {
  TypographyH1,
  TypographyLead,
  TypographyH2,
} from "@/components/ui/typography";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
      {/* Navbar */}
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
          <div>
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6 animate-pulse">
              <span className="text-blue-600 dark:text-blue-300 font-semibold">
                AI-Powered Resume Transformation 🚀
              </span>
            </div>

            <TypographyH1 className="py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6 leading-tight">
              Craft Your Perfect Resume with AI Intelligence
            </TypographyH1>

            <TypographyLead className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              Build, optimize, and tailor your resume for any job with our
              advanced AI-driven platform. From creation to job-specific
              enhancement, we've got you covered.
            </TypographyLead>

            <div className="flex space-x-4">
              <Button
                size="lg"
                className="rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Start Building
                <Rocket className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-blue-100/50 dark:bg-indigo-900/30 absolute inset-0 -m-12 rounded-3xl blur-2xl"></div>
            <Image
              src="/banner.jpeg"
              alt="ResumeAI Dashboard"
              width={600}
              height={400}
              className="rounded-3xl shadow-2xl relative z-10"
            />
          </div>
        </div>
      </header>

        {/* Template Showcase Section */}
        <section className="h-max flex items-center bg-gradient-to-br from-gray-100 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 py-6 mt-10">
            <TypographyH2 className="text-5xl py-2 font-bold mb-4 text-gray-900 dark:text-white">
              Professional Templates
            </TypographyH2>
            <TypographyLead className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from a wide range of industry-specific resume templates
            </TypographyLead>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4].map((template) => (
              <TemplateCard key={template} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="min-h-screen flex items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TypographyH2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Comprehensive Resume Solutions
            </TypographyH2>
            <TypographyLead className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Revolutionize your job application process with our AI-powered
              tools
            </TypographyLead>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Build from Scratch",
                description:
                  "Create professional resumes using our intuitive AI-assisted builder",
                features: [
                  "Multiple Templates",
                  "Drag-and-Drop Interface",
                  "AI Content Suggestions",
                ],
              },
              {
                icon: Edit3,
                title: "AI Optimization",
                description:
                  "Enhance your existing resume with intelligent recommendations",
                features: [
                  "ATS Compatibility",
                  "Skill Keyword Matching",
                  "Real-time Scoring",
                ],
              },
              {
                icon: Target,
                title: "Job-Specific Tailoring",
                description:
                  "Customize your resume for specific job applications",
                features: [
                  "Industry-Specific Optimization",
                  "Targeted Content Generation",
                  "Job Description Analysis",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="p-4 inline-block bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                  <feature.icon
                    className="text-blue-600 dark:text-blue-400"
                    size={40}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  {feature.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Star className="text-blue-500 w-5  h-5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2024 ResumeAI. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TemplateCard({ template }: { template: number }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all">
      {/* Image Container with Hover Effect */}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Image
          src={`/template-${template}.png`}
          alt={`Resume Template ${template}`}
          width={300}
          height={400}
          className="w-full h-[460px] object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-center text-white p-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2">
              Professional Template {template}
            </h3>
            <p className="text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Sleek design perfect for corporate and tech industries
            </p>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              Use This Template
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
