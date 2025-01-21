"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import {
  FileText,
  ZoomIn,
  ZoomOut,
  Upload,
  Loader2,
  Star,
  GraduationCap,
  Briefcase,
  Award,
  AlertTriangle,
  CheckCircle2,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Analysis {
  summary: string;
  improvements: {
    section: string;
    current: string;
    improved: string;
    reason: string;
  }[];
  skills: {
    technical: { name: string; level: number }[];
    soft: string[];
  };
  experience: {
    title: string;
    company: string;
    location: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    school: string;
    location: string;
    year: string;
    achievements: string[];
  }[];
  certifications: string[];
  languages: { name: string; level: string }[];
}

// Dummy analysis data
const DUMMY_ANALYSIS: Analysis = {
  summary:
    "Experienced software engineer with 5+ years of expertise in full-stack development. Strong background in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading engineering teams.",
  improvements: [
    {
      section: "Summary",
      current: "Experienced software engineer with 5+ years of expertise...",
      improved:
        "Dynamic full-stack engineer with proven track record of delivering high-impact solutions...",
      reason: "More impactful opening that emphasizes results over experience",
    },
    {
      section: "Technical Skills",
      current: "Listed without context",
      improved: "Technologies with project impact metrics",
      reason: "Quantify impact of technical skills with specific achievements",
    },
    {
      section: "Experience",
      current: "Led a team of 5 developers...",
      improved:
        "Spearheaded a team of 5 developers, delivering 40% performance improvement...",
      reason: "Emphasizes leadership impact with specific metrics",
    },
  ],
  skills: {
    technical: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Docker", level: 70 },
    ],
    soft: [
      "Team Leadership",
      "Project Management",
      "Agile Methodologies",
      "Problem Solving",
      "Communication",
    ],
  },
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      duration: "2021 - Present",
      highlights: [
        "Led a team of 5 developers in rebuilding the company's main SaaS platform",
        "Implemented microservices architecture reducing system latency by 40%",
        "Mentored junior developers and established coding standards",
        "Managed sprint planning and technical debt reduction initiatives",
      ],
    },
    {
      title: "Software Engineer",
      company: "StartupHub",
      location: "New York, NY",
      duration: "2019 - 2021",
      highlights: [
        "Developed and maintained React-based front-end applications",
        "Implemented CI/CD pipelines using GitHub Actions",
        "Reduced page load time by 60% through optimization techniques",
        "Collaborated with UX team to improve user experience",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      location: "Stanford, CA",
      year: "2019",
      achievements: ["GPA: 3.8", "Research Focus: Machine Learning"],
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "MIT",
      location: "Cambridge, MA",
      year: "2017",
      achievements: ["Dean's List", "Senior Project Award"],
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Professional" },
    { name: "Mandarin", level: "Conversational" },
  ],
};

export default function ResumePreviewer() {
  const [file, setFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (!uploadedFile.type.includes("pdf")) {
        alert("Please upload a PDF file");
        return;
      }
      if (uploadedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setLoading(true);
      setAnalyzing(true);

      // Create object URL for the PDF viewer
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);

      // Simulate API delay
      setTimeout(() => {
        setAnalysis(DUMMY_ANALYSIS);
        setAnalyzing(false);
      }, 2000);
    }
  };

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setPageNumber(1);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [file]);

  const ImprovementSection = () => {
    return (
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
          <Wand2 className="h-5 w-5 text-blue-600" />
          Suggested Improvements
        </h3>
        {analysis?.improvements.map((improvement, index) => (
          <Alert key={index} className="shadow-lg bg-gray-100 border-none">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <AlertTitle className="text-black">
              {improvement.section} Enhancement
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">
                    {improvement.current}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="font-medium text-black">{improvement.improved}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                Why: {improvement.reason}
              </p>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    );
  };
  
  const ResumeAnalysis = () => {
    if (analyzing) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Analyzing resume...</p>
          </div>
        </div>
      );
    }
  
    if (!analysis) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Upload a resume to see analysis
        </div>
      );
    }
  
    return (
      <ScrollArea className="pr-4 h-[calc(100vh-250px)]">
        <div className="space-y-6">
          <ImprovementSection />
          
          {/* Summary Section */}
          <div className="bg-blue-50/50 p-4 rounded-lg shadow-sm">
            <p className="text-sm leading-relaxed text-gray-800">{analysis.summary}</p>
          </div>
  
          {/* Technical Skills */}
          <div className="shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
              <Star className="h-5 w-5 text-blue-600" />
              Technical Skills
            </h3>
            <div className="space-y-3">
              {analysis.skills.technical.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-black">{skill.name}</span>
                    <span className="text-blue-600">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-blue-100" />
                </div>
              ))}
            </div>
          </div>
  
          {/* Soft Skills */}
          <div className="shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-3 text-black">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.soft.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100/50 text-blue-600 rounded-full text-sm shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
  
          {/* Experience */}
          <div className="shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {analysis.experience.map((exp) => (
                <div key={exp.title} className="pl-4 shadow-sm rounded-lg p-4 bg-blue-50/30">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-black">{exp.title}</h4>
                    <span className="text-sm text-gray-600">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.company} • {exp.location}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm text-gray-600">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
  
          {/* Education */}
          <div className="shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Education
            </h3>
            <div className="space-y-4">
              {analysis.education.map((edu) => (
                <div key={edu.degree} className="pl-4 shadow-sm rounded-lg p-4 bg-blue-50/30">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-black">{edu.degree}</h4>
                    <span className="text-sm text-gray-600">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {edu.school} • {edu.location}
                  </p>
                  <ul className="mt-1 text-sm text-gray-600">
                    {edu.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
  
          {/* Certifications */}
          <div className="shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black">
              <Award className="h-5 w-5 text-blue-600" />
              Certifications
            </h3>
            <ul className="space-y-2">
              {analysis.certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-center gap-2 text-sm text-gray-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
  
          {/* Languages */}
          <div className="pb-6 shadow-sm rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold mb-3 text-black">Languages</h3>
            <div className="space-y-2">
              {analysis.languages.map((lang) => (
                <div key={lang.name} className="flex justify-between text-sm">
                  <span className="text-black">{lang.name}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="grid grid-cols-2 gap-8 h-full">
      <Card className="h-[90%] overflow-hidden bg-white shadow-md">
  <CardHeader className="border-b">
    <CardTitle className="flex items-center gap-2 text-black">
      <FileText className="h-6 w-6 text-blue-600" />
      Resume Analysis
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    <div className="flex items-center justify-center w-full mb-6">
      <label
        htmlFor="resume-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 transition"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="h-8 w-8 text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500">
            PDF files only (MAX. 5MB)
          </p>
        </div>
        <input
          id="resume-upload"
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileUpload}
        />
      </label>
    </div>
    <ResumeAnalysis />
  </CardContent>
</Card>

<Card className="h-[90%] overflow-hidden bg-white shadow-md">
  <CardHeader className="border-b">
    <div className="flex justify-between items-center">
      <CardTitle className="flex items-center gap-2 text-black">
        <FileText className="h-6 w-6 text-blue-600" />
        Resume Preview
      </CardTitle>
      {file && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm w-16 text-center text-blue-600">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => setScale((prev) => Math.min(2.0, prev + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  </CardHeader>
  <CardContent className="p-0 h-[calc(100vh-180px)]">
    <ScrollArea className="h-full">
      {file ? (
        <div className="flex justify-center p-4">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            }
            error={
              <div className="text-red-500 text-center">
                Error loading document. Please try again.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg"
            />
            {numPages && (
              <p className="text-center text-gray-600 mt-4">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </Document>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 mt-4">
          Upload a resume to preview
        </div>
      )}
    </ScrollArea>
  </CardContent>
</Card>
      </div>
    </div>
  );
}