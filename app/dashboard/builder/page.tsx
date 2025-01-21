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
        image: '/templates/corporate-resume.png'
      },
      { 
        id: 'executive', 
        name: 'Executive Profile', 
        suitableFor: 'Senior Managers',
        complexity: 'Complex',
        image: '/templates/executive-resume.png'
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
        image: '/templates/creative-resume.png'
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
        image: '/templates/minimal-resume.png'
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
        image: '/templates/academic-resume.png'
      }
    ]
  }
};

const ResumeBuilder = () => {
  const [selectedCategory, setSelectedCategory] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="bg-white p-6 space-y-6">
      <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
        {Object.entries(templateCategories).map(([category, { icon: Icon }]) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant="ghost"
            className={`
              flex items-center space-x-2 px-4 py-2 bg-blue-500 rounded-lg transition-all
              ${
                selectedCategory === category
                  ? "bg-blue-50 text-blue-500"
                  : "hover:bg-blue-700"
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
            className={`border border-gray-100 rounded-xl overflow-hidden shadow-lg ${
              selectedTemplate?.id === template.id
                ? "ring-2 ring-blue-500"
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
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                {selectedTemplate?.id === template.id && (
                  <CheckCircle className="text-blue-500" />
                )}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
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
          className="border-gray-200 hover:bg-gray-50"
          onClick={() => setSelectedTemplate(null)}
        >
          Cancel
        </Button>
        <Button
          className={`bg-blue-500 hover:bg-blue-600 text-white ${
            !selectedTemplate && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!selectedTemplate}
        >
          Create Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilder;