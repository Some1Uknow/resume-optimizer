"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI resume optimization work?",
      answer: "Our AI analyzes your resume content, job descriptions, and successful patterns from our database to optimize your resume for ATS systems and human recruiters. It suggests improvements for keywords, formatting, and content structure."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we use enterprise-grade encryption and security measures to protect your data. Your resume information is never shared with third parties, and you have full control over your data with the ability to delete it at any time."
    },
    {
      question: "Can I export my resume to different formats?",
      answer: "Absolutely! You can export your resume in PDF, Word (DOCX), and HTML formats. Our Pro plan also includes additional formatting options and custom templates."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, you can request a full refund within 30 days of your purchase."
    },
    {
      question: "How many resumes can I create?",
      answer: "Free users can create 1 resume, while Pro users get unlimited resumes. You can create different versions for different job applications or industries."
    },
    {
      question: "What makes your AI different from other resume builders?",
      answer: "Our AI is trained on millions of successful resumes and job postings. It doesn't just format your resume - it understands context, industry requirements, and ATS optimization to provide intelligent suggestions that actually improve your chances of getting interviews."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Your question, our answer
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about our AI-powered resume builder.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@resumeoptimizer.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
            <a
              href="/help"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
