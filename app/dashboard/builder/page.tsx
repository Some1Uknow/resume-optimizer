'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Briefcase, 
  Palette, 
  Minimize, 
  GraduationCap, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simplified and more descriptive templates
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
  const [selectedCategory, setSelectedCategory] = useState('professional');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 space-y-6">
      {/* Category Selector */}
      <div className="flex items-center space-x-4 border-b pb-4">
        {Object.entries(templateCategories).map(([category, { icon: Icon }]) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
              ${selectedCategory === category 
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-blue-300'}
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="capitalize font-medium">{category}</span>
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {templateCategories[selectedCategory].templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-xl overflow-hidden shadow-lg ${selectedTemplate?.id === template.id 
                ? 'ring-2 ring-blue-500' 
                : 'hover:shadow-xl'}
            `}
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Preview */}
            <div className="relative aspect-video">
              <Image 
                src={template.image} 
                alt={template.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Template Details */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{template.name}</h3>
              
                {selectedTemplate?.id === template.id && (
                  <CheckCircle className="text-green-500" />
                )}
              </div>

              <div className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                <p>Suitable for: {template.suitableFor}</p>
                <p>Complexity: {template.complexity}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button 
          className="px-4 py-2 border rounded-lg hover:bg-gray-400"
          onClick={() => setSelectedTemplate(null)}
        >
          Cancel
        </Button>
        <Button 
          className={`
            px-4 py-2 rounded-lg text-white
            ${selectedTemplate 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'}
          `}
          disabled={!selectedTemplate}
        >
          Create Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilder;