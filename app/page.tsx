import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Blob decorations */}
      <div className="fixed -z-10 top-0 left-0 w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-200/30 to-blue-200/30 dark:from-purple-900/20 dark:to-blue-900/20 blur-3xl"></div>
      <div className="fixed -z-10 bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-l from-indigo-200/30 to-sky-200/30 dark:from-indigo-900/20 dark:to-sky-900/20 blur-3xl"></div>

      {/* Centered oval navbar */}
      <header className="p-6 w-full flex justify-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text font-sans">
            ResumeMax
          </span>
        </Link>
        <div className="container w-max md:px-6">
          <div className="flex justify-center">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full py-2 px-4 md:px-8 shadow-lg flex items-center justify-between w-full max-w-4xl">
              <nav className="hidden md:flex p-2 items-center gap-8">
                <Link
                  href="#features"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Login
          </Link>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/builder">Get Started</Link>

          </Button>
          <ModeToggle/>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 px-4 py-1.5 text-sm shadow-inner">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-800 dark:text-blue-300 font-medium">
                      AI-Powered Resume Builder
                    </span>
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 text-transparent bg-clip-text">
                  Create Perfect Resumes with AI
                </h1>
                <p className="mx-auto max-w-[800px] text-xl text-slate-600 dark:text-slate-300 md:text-2xl/relaxed">
                  Type naturally, watch your resume build in real-time. Our AI
                  optimizes your content for ATS systems and hiring managers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg"
                >
                  <Link href="/builder">
                    Build Your Resume <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300 px-8 py-6 text-lg"
                >
                  <Link href="#demo">See Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mockup section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="relative mx-auto max-w-6xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-3xl -z-10 transform scale-105"></div>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="p-2">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-r border-slate-200 dark:border-slate-700/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            AI Assistant
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-700/50 rounded-2xl p-4 shadow-sm">
                          <p className="text-slate-800 dark:text-slate-200">
                            Tell me about your experience as a software engineer
                            at Google.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-sm ml-6">
                          <p className="text-slate-800 dark:text-slate-200">
                            I worked at Google from 2018-2022 as a Senior
                            Software Engineer on the Cloud Platform team. I led
                            a team of 5 engineers and implemented a new
                            authentication system that improved security by 40%.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-700/50 rounded-2xl p-4 shadow-sm">
                          <p className="text-slate-800 dark:text-slate-200">
                            Add Python and machine learning to my skills.
                          </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-sm ml-6">
                          <p className="text-slate-800 dark:text-slate-200">
                            I`&apos;`ve added Python and machine learning to
                            your skills section. Would you like to add any
                            specific ML frameworks like TensorFlow or PyTorch?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          Alex Johnson
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          Senior Software Engineer
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3.5 w-3.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2" />
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span>alex@example.com</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              className="h-3.5 w-3.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>(555) 123-4567</span>
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-700 pb-1 mb-2 text-slate-900 dark:text-white">
                            Experience
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-slate-900 dark:text-white">
                                    Senior Software Engineer
                                  </h4>
                                  <p className="text-slate-600 dark:text-slate-400">
                                    Google, Mountain View, CA
                                  </p>
                                </div>
                                <span className="text-slate-600 dark:text-slate-400 text-sm">
                                  2018 - 2022
                                </span>
                              </div>
                              <p className="mt-1 text-slate-700 dark:text-slate-300">
                                Led a team of 5 engineers on the Cloud Platform.
                                Implemented a new authentication system that
                                improved security by 40%.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold border-b border-slate-200 dark:border-slate-700 pb-1 mb-2 text-slate-900 dark:text-white">
                            Skills
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              "JavaScript",
                              "TypeScript",
                              "React",
                              "Node.js",
                              "Python",
                              "Machine Learning",
                            ].map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 px-4 py-1.5 text-sm shadow-inner mb-4">
                <span className="text-blue-800 dark:text-blue-300 font-medium">
                  Features
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 text-transparent bg-clip-text">
                Everything you need to create the perfect resume
              </h2>
              <p className="max-w-[85%] text-xl text-slate-600 dark:text-slate-300">
                Our AI-powered platform makes resume creation effortless and
                effective
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  title: "AI Chat Interface",
                  description:
                    "Describe your experience in natural language and watch your resume update instantly",
                  icon: (
                    <Sparkles className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  ),
                },
                {
                  title: "ATS Optimization",
                  description:
                    "Our AI ensures your resume passes through Applicant Tracking Systems with ease",
                  icon: (
                    <CheckCircle2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  ),
                },
                {
                  title: "Beautiful Templates",
                  description:
                    "Choose from professionally designed templates that stand out to recruiters",
                  icon: (
                    <Star className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  ),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center space-y-4 rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-300"></div>
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 px-4 py-1.5 text-sm shadow-inner mb-4">
                <span className="text-blue-800 dark:text-blue-300 font-medium">
                  Pricing
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 text-transparent bg-clip-text">
                Simple, transparent pricing
              </h2>
              <p className="max-w-[85%] text-xl text-slate-600 dark:text-slate-300">
                Choose the plan that works for you
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  title: "Free",
                  price: "$0",
                  description: "Basic resume creation",
                  features: ["1 resume", "Basic templates", "Export as PDF"],
                  popular: false,
                },
                {
                  title: "Pro",
                  price: "$9.99",
                  period: "/month",
                  description: "For serious job seekers",
                  features: [
                    "Unlimited resumes",
                    "All templates",
                    "AI optimization",
                    "ATS keyword analysis",
                    "Priority support",
                  ],
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "Contact us",
                  description: "For teams and organizations",
                  features: [
                    "Team management",
                    "Custom branding",
                    "API access",
                    "Dedicated account manager",
                    "Custom integrations",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col rounded-3xl ${
                    plan.popular
                      ? "bg-gradient-to-b from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  } p-8 shadow-xl`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="flex-1 space-y-6">
                    <h3
                      className={`text-2xl font-bold ${
                        plan.popular
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {plan.title}
                    </h3>
                    <div className="flex items-end gap-1">
                      <div
                        className={`text-4xl font-extrabold ${
                          plan.popular
                            ? "text-white"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {plan.price}
                      </div>
                      {plan.period && (
                        <div
                          className={`text-lg ${
                            plan.popular
                              ? "text-blue-100"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {plan.period}
                        </div>
                      )}
                    </div>
                    <p
                      className={`${
                        plan.popular
                          ? "text-blue-100"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`h-5 w-5 ${
                              plan.popular
                                ? "text-blue-200"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span
                            className={`${
                              plan.popular
                                ? "text-blue-50"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Button
                      className={`w-full rounded-full py-6 ${
                        plan.popular
                          ? "bg-white text-blue-700 hover:bg-blue-50"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      } shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Get Started
                    </Button>
                  
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 px-4 py-1.5 text-sm shadow-inner mb-4">
                <span className="text-blue-800 dark:text-blue-300 font-medium">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 text-transparent bg-clip-text">
                What our users are saying
              </h2>
              <p className="max-w-[85%] text-xl text-slate-600 dark:text-slate-300">
                Join thousands of satisfied job seekers who found their dream
                job with ResumeMax
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "ResumeMax helped me land interviews at 3 top tech companies. The AI suggestions made my resume stand out from the crowd.",
                  author: "Sarah K.",
                  role: "Software Engineer",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "I was struggling to highlight my skills effectively. ResumeMax transformed my resume and I got hired within 2 weeks!",
                  author: "Michael T.",
                  role: "Marketing Manager",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "The chat interface is so intuitive. I just described my experience and the AI created a perfect resume that got me multiple callbacks.",
                  author: "Jessica L.",
                  role: "Product Designer",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
                >
                  <div className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-300"></div>
                  <div className="flex-1">
                    <svg
                      className="h-8 w-8 text-blue-600/40 dark:text-blue-400/40 mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M11.9995 2C6.47773 2 2 6.47773 2 12.0005C2 17.5222 6.47773 22 11.9995 22C17.5222 22 22 17.5222 22 12.0005C22 6.47773 17.5222 2 11.9995 2ZM16.2995 9.99955C16.2995 9.44727 16.7473 8.99955 17.2995 8.99955C17.8518 8.99955 18.2995 9.44727 18.2995 9.99955C18.2995 10.5518 17.8518 10.9995 17.2995 10.9995C16.7473 10.9995 16.2995 10.5518 16.2995 9.99955ZM11.9995 7.00045C12.5518 7.00045 12.9995 7.44818 12.9995 8.00045C12.9995 8.55273 12.5518 9.00045 11.9995 9.00045C11.4473 9.00045 10.9995 8.55273 10.9995 8.00045C10.9995 7.44818 11.4473 7.00045 11.9995 7.00045ZM6.70045 9.99955C6.70045 9.44727 7.14818 8.99955 7.70045 8.99955C8.25273 8.99955 8.70045 9.44727 8.70045 9.99955C8.70045 10.5518 8.25273 10.9995 7.70045 10.9995C7.14818 10.9995 6.70045 10.5518 6.70045 9.99955ZM11.9995 18.0005C9.23773 18.0005 6.99955 15.7623 6.99955 13.0005C6.99955 12.4482 7.44727 12.0005 7.99955 12.0005H16.0005C16.5527 12.0005 17.0005 12.4482 17.0005 13.0005C17.0005 15.7623 14.7623 18.0005 11.9995 18.0005Z" />
                    </svg>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
                      height={120}
                      width={120}
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-blue-950">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 text-transparent bg-clip-text mb-6">
                Ready to create your perfect resume?
              </h2>
              <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
                Join thousands of job seekers who have already landed their
                dream jobs with ResumeMax.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg"
              >
                <Link href="/builder">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  ResumeMax
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Create perfect resumes with AI. Type naturally, watch your
                resume build in real-time.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} ResumeMax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
