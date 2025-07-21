"use client";

import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      avatar: "SJ",
      content: "The AI optimization helped me land my dream job at Google. The resume was perfectly tailored for tech roles.",
      rating: 5,
      company: "Google"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      avatar: "MC",
      content: "Incredible results! My interview callback rate increased by 40% after using this platform.",
      rating: 5,
      company: "Microsoft"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Amazon",
      avatar: "ER",
      content: "The AI suggestions were spot-on. It highlighted skills I didn't even know were relevant to my target role.",
      rating: 5,
      company: "Amazon"
    },
    {
      name: "David Park",
      role: "UX Designer at Apple",
      avatar: "DP",
      content: "Clean, professional templates that really stand out. The ATS optimization is a game-changer.",
      rating: 5,
      company: "Apple"
    },
    {
      name: "Lisa Thompson",
      role: "Marketing Director at Meta",
      avatar: "LT",
      content: "I got three job offers within a week of updating my resume. The AI optimization really works!",
      rating: 5,
      company: "Meta"
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer at Netflix",
      avatar: "JW",
      content: "The platform made it so easy to create multiple versions of my resume for different roles.",
      rating: 5,
      company: "Netflix"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Things our users love about JobMax
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what professionals say about their experience 
            with our AI-powered resume builder.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-foreground to-muted-foreground rounded-full flex items-center justify-center text-background font-bold text-lg">
              {testimonials[0].avatar}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {testimonials[0].name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {testimonials[0].role}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <Quote className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            &quot;{testimonials[0].content}&quot;
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-foreground to-muted-foreground rounded-full flex items-center justify-center text-background font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
