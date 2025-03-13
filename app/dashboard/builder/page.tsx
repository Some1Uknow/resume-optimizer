"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Briefcase,
  Palette,
  Minimize,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

// ... templateCategories stays the same
const templateCategories = {
  professional: {
    icon: Briefcase,
    templates: [
      { 
        id: 'corporate', 
        name: 'Corporate Standard', 
        suitableFor: 'Business Professionals',
        complexity: 'Medium',
        image: '/template-1.png'
      },
      { 
        id: 'executive', 
        name: 'Executive Profile', 
        suitableFor: 'Senior Managers',
        complexity: 'Complex',
        image: '/template-2.png'
      }
    ]
  },
  creative: {
    icon: Palette,
    templates: [
      { 
        id: 'designer', 
        name: 'Creative Showcase', 
        suitableFor: 'Designers & Artists',
        complexity: 'High',
        image: '/template-3.png'
      }
    ]
  },
  minimal: {
    icon: Minimize,
    templates: [
      { 
        id: 'clean', 
        name: 'Minimalist Approach', 
        suitableFor: 'Tech & Startup',
        complexity: 'Simple',
        image: '/template-4.png'
      }
    ]
  },
  academic: {
    icon: GraduationCap,
    templates: [
      { 
        id: 'research', 
        name: 'Academic Credentials', 
        suitableFor: 'Researchers & Scholars',
        complexity: 'Detailed',
        image: '/template-5.png'
      }
    ]
  }
};

const ResumeBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();

  return (
    <div className="bg-background p-6 space-y-6">
      <div className="flex items-center space-x-4 border-b border-border pb-4 overflow-x-auto">
        {Object.entries(templateCategories).map(([category, { icon: Icon }]) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant="ghost"
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap
              ${
                selectedCategory === category
                  ? "bg-blue-50 text-blue-500 dark:bg-blue-950/50 dark:text-blue-400"
                  : "hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="capitalize font-medium">{category}</span>
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templateCategories[selectedCategory].templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`border border-border rounded-xl overflow-hidden shadow-lg bg-card ${
              selectedTemplate?.id === template.id
                ? "ring-2 ring-blue-500 dark:ring-blue-400"
                : "hover:shadow-xl"
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="relative aspect-video">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {template.name}
                </h3>
                {selectedTemplate?.id === template.id && (
                  <CheckCircle className="text-blue-500 dark:text-blue-400" />
                )}
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Suitable for: {template.suitableFor}</p>
                <p>Complexity: {template.complexity}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          variant="outline"
          className="border-border hover:bg-accent hover:text-accent-foreground"
          onClick={() => setSelectedTemplate(null)}
        >
          Cancel
        </Button>
        <Button
          className={`bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white ${
            !selectedTemplate && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!selectedTemplate}
          onClick={() => {
            if (selectedTemplate) {
              router.push(`/dashboard/builder/${selectedTemplate.id}`);
            }
          }}
        >
          Create Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilder;