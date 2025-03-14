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
  Wand2,
  Trophy,
  PlusCircle
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
  },
  achievements: {
    icon: Trophy,
    templates: [
      { 
        id: 'accomplishments', 
        name: 'Accomplishments', 
        suitableFor: 'Highlighting Achievements',
        complexity: 'Simple',
        image: '/template-achievements.png'
      }
    ]
  },
  custom: {
    icon: PlusCircle,
    templates: [
      { 
        id: 'custom-section', 
        name: 'Custom Section', 
        suitableFor: 'Additional Information',
        complexity: 'Customizable',
        image: '/template-custom.png'
      }
    ]
  },
};

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
  },
  summary: "Full-stack software engineer with 5+ years of experience building scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Passionate about creating efficient, maintainable code and solving complex problems.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "Present",
      description: "Lead developer for multiple enterprise-level applications.",
      highlights: [
        "Developed and maintained a microservices architecture handling 1M+ daily requests",
        "Implemented CI/CD pipelines reducing deployment time by 40%",
        "Mentored junior developers and conducted code reviews"
      ],
    },
    {
      title: "Software Engineer",
      company: "InnovateTech",
      location: "New York, NY",
      startDate: "2017-09",
      endDate: "2020-05",
      description: "Contributed to the development of SaaS products.",
      highlights: [
        "Built REST APIs with Node.js and Express",
        "Developed React components for enterprise dashboard",
        "Optimized database queries reducing response time by 30%"
      ],
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationDate: "2017-05",
      gpa: "3.8",
      highlights: [
        "Dean's List for 6 consecutive semesters",
        "President of Computer Science Club"
      ],
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: [
        "JavaScript/TypeScript",
        "React & Node.js",
        "REST API Design",
        "AWS & Docker",
        "SQL & NoSQL Databases",
        "Git & CI/CD"
      ],
    }
  ],
  achievements: [
    {
      title: 'Employee of the Month',
      date: 'Jan 2024',
      description: 'Recognized for outstanding performance and team collaboration'
    },
    {
      title: 'Best Hackathon Project',
      date: 'Nov 2023',
      description: 'Won first place in company-wide hackathon for innovative AI solution'
    },
    {
      title: 'Certified Cloud Practitioner',
      date: 'Sep 2023',
      description: 'Achieved AWS certification demonstrating cloud computing expertise'
    }
  ],
  customSections: []
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

  const handleAddAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', date: '', description: '' }]
    }));
  };

  const handleUpdateAchievement = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map((a, i) => 
        i === index ? { ...a, [field]: value } : a
      )
    }));
  };

  const handleRemoveAchievement = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleAddCustomSection = () => {
    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { title: '', items: [] }]
    }));
  };

  const handleUpdateCustomSection = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map((s, i) => 
        i === index ? { ...s, [field]: value } : s
      )
    }));
  };

  const handleAddCustomSectionItem = (sectionIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map((s, i) => 
        i === sectionIndex ? { ...s, items: [...s.items, { title: '', description: '', date: '' }] } : s
      )
    }));
  };

  const handleUpdateCustomSectionItem = (sectionIndex: number, itemIndex: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map((s, i) => 
        i === sectionIndex ? { 
          ...s, 
          items: s.items.map((it, j) => 
            j === itemIndex ? { ...it, [field]: value } : it
          ) 
        } : s
      )
    }));
  };

  const handleRemoveCustomSectionItem = (sectionIndex: number, itemIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map((s, i) => 
        i === sectionIndex ? { 
          ...s, 
          items: s.items.filter((_, j) => j !== itemIndex) 
        } : s
      )
    }));
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
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{template.name}</h1>
              <p className="text-sm text-gray-500">
                {template.suitableFor} • {template.complexity}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="jobDescription">Job Description (for AI optimization)</Label>
            <Input
              id="jobDescription"
              placeholder="Paste job description here to get AI-powered suggestions"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <ResumeForm
            data={resumeData}
            onChange={setResumeData}
            onUploadResume={handleUploadResume}
            onUploadLinkedIn={handleUploadLinkedIn}
            onAISuggestion={handleAISuggestion}
            onGenerateBulletPoints={handleGenerateBulletPoints}
            onAddAchievement={handleAddAchievement}
            onUpdateAchievement={handleUpdateAchievement}
            onRemoveAchievement={handleRemoveAchievement}
            onAddCustomSection={handleAddCustomSection}
            onUpdateCustomSection={handleUpdateCustomSection}
            onAddCustomSectionItem={handleAddCustomSectionItem}
            onUpdateCustomSectionItem={handleUpdateCustomSectionItem}
            onRemoveCustomSectionItem={handleRemoveCustomSectionItem}
          />
        </div>
      </div>
      <div className="w-1/2 h-screen overflow-hidden">
        <div ref={previewRef} className="h-full p-4">
          <ResumePreview
            data={resumeData}
            templateId={template.id}
            scale={scale}
          />
        </div>
      </div>
    </div>
  );
}
