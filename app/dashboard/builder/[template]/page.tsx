"use client";

import { useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  Palette,
  Minimize,
  GraduationCap,
  Download,
  FileText,
  Wand2
} from "lucide-react";
import { ResumeForm, ResumeData } from '@/components/resume-builder/resume-form';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generatePDF } from '@/lib/pdf-generator';
import { getAISuggestion, generateBulletPoints } from '@/lib/ai-suggestions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      highlights: [""],
    },
  ],
  education: [
    {
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
      highlights: [""],
    },
  ],
  skills: [
    {
      category: "Technical Skills",
      items: [""],
    },
  ],
};

export default function TemplatePage({ params }: { params: { template: string } }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [jobDescription, setJobDescription] = useState('');
  const [scale, setScale] = useState(0.7);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const template = Object.values(templateCategories)
    .flatMap(category => category.templates)
    .find(t => t.id === params.template);

  if (!template) {
    return notFound();
  }

  const handleUploadResume = async (file: File) => {
    toast.info('Resume parsing will be implemented soon!');
  };

  const handleUploadLinkedIn = async (file: File) => {
    toast.info('LinkedIn PDF parsing will be implemented soon!');
  };

  const handleDownloadPDF = async () => {
    try {
      if (previewRef.current) {
        await generatePDF(previewRef.current, `${resumeData.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`);
        toast.success('Resume downloaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const handleAISuggestion = async (field: string, content: string) => {
    try {
      toast.loading('Generating AI suggestion...');
      const suggestion = await getAISuggestion(field, content, jobDescription);
      toast.success('AI suggestion generated!');
      return suggestion;
    } catch (error) {
      toast.error('Failed to get AI suggestion');
      return null;
    }
  };

  const handleGenerateBulletPoints = async (description: string) => {
    try {
      toast.loading('Generating bullet points...');
      const bullets = await generateBulletPoints(description);
      toast.success('Bullet points generated!');
      return bullets;
    } catch (error) {
      toast.error('Failed to generate bullet points');
      return null;
    }
  };

  const adjustScale = () => {
    if (previewRef.current) {
      const container = previewRef.current.parentElement;
      if (container) {
        const containerHeight = container.clientHeight;
        const contentHeight = previewRef.current.scrollHeight;
        const newScale = Math.min(containerHeight / contentHeight, 0.7);
        setScale(newScale);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{template.name}</h1>
            <p className="text-gray-500">Perfect for {template.suitableFor}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="jobDescription">Job Description (for AI optimization)</Label>
          <Input
            id="jobDescription"
            placeholder="Paste job description here to get AI-powered suggestions"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          {/* Left side - Form */}
          <div className="w-1/2 rounded-lg shadow-sm p-6 overflow-y-auto" style={{ height: 'calc(100vh - 250px)' }}>
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              onUploadResume={handleUploadResume}
              onUploadLinkedIn={handleUploadLinkedIn}
              onAISuggestion={handleAISuggestion}
              onGenerateBulletPoints={handleGenerateBulletPoints}
            />
          </div>

          {/* Right side - Preview */}
          <div className="w-1/2 rounded-lg p-6 overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
            <div ref={previewRef}>
              <ResumePreview
                data={resumeData}
                templateId={template.id}
                scale={scale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
