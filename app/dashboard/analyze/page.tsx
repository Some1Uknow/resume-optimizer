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
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowUpCircle,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

// Worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Dummy analysis data
const DUMMY_ANALYSIS = {
  summary:
    "Experienced software engineer with 5+ years of expertise in full-stack development. Strong background in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading engineering teams.",
    improvements: [
      {
        section: "Summary",
        current: "Experienced software engineer with 5+ years of expertise...",
        improved: "Dynamic full-stack engineer with proven track record of delivering high-impact solutions...",
        reason: "More impactful opening that emphasizes results over experience"
      },
      {
        section: "Technical Skills",
        current: "Listed without context",
        improved: "Technologies with project impact metrics",
        reason: "Quantify impact of technical skills with specific achievements"
      },
      {
        section: "Experience",
        current: "Led a team of 5 developers...",
        improved: "Spearheaded a team of 5 developers, delivering 40% performance improvement...",
        reason: "Emphasizes leadership impact with specific metrics"
      }
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
  const [file, setFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showImprovedVersion, setShowImprovedVersion] = useState(false);
  // File upload handler
  const handleFileUpload = async (event: { target: { files: any[]; }; }) => {
    const uploadedFile = event.target.files[0];
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
      setRawFile(uploadedFile);

      // Simulate API delay
      setTimeout(() => {
        setAnalysis(DUMMY_ANALYSIS);
        setAnalyzing(false);
      }, 2000);
    }
  };

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }, []);

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
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-500" />
          Suggested Improvements
        </h3>
        {analysis.improvements.map((improvement: { section: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; current: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; improved: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; reason: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
          <Alert key={index} className="relative">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <AlertTitle className="text-sm font-semibold">
              {improvement.section} Enhancement
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <div className="text-sm space-y-1">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{improvement.current}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="font-medium">{improvement.improved}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Why: {improvement.reason}
              </p>
            </AlertDescription>
          </Alert>
        ))}
        <Button 
          className="w-full"
          onClick={() => setShowImprovedVersion(true)}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Get Improved Resume
        </Button>
      </div>
    );
  };

  const ResumeAnalysis = () => {
    if (analyzing) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Analyzing resume...</p>
          </div>
        </div>
      );
    }

    if (!analysis) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Upload a resume to see analysis
        </div>
      );
    }


    return (
      <ScrollArea className="pr-4 h-[calc(100vh-250px)]">
        <div className="space-y-6">
        <ImprovementSection />
          {/* Summary Section */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Technical Skills
            </h3>
            <div className="space-y-3">
              {analysis.skills.technical.map((skill: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; level: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.soft.map((skill: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Professional Experience
            </h3>
            <div className="space-y-6">
              {analysis.experience.map((exp: { title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; duration: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; highlights: any[]; }, index: React.Key | null | undefined) => (
                <div key={index} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{exp.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.company} • {exp.location}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.highlights.map((highlight: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, idx: React.Key | null | undefined) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-4">
              {analysis.education.map((edu: { degree: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; year: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; school: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; achievements: any[]; }, index: React.Key | null | undefined) => (
                <div key={index} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <span className="text-sm text-muted-foreground">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {edu.school} • {edu.location}
                  </p>
                  <ul className="mt-1 text-sm text-muted-foreground">
                    {edu.achievements.map((achievement: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, idx: React.Key | null | undefined) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certifications
            </h3>
            <ul className="space-y-2">
              {analysis.certifications.map((cert: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            <div className="space-y-2">
              {analysis.languages.map((lang: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; level: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
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
        {/* Left Side: Upload and Analysis */}
        <Card className="h-[90%] overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-full mb-6">
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:bg-primary/5 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
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

        {/* Right Side: PDF Viewer */}
        <Card className="h-[90%] overflow-hidden bg-white dark:bg-slate-800">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Resume Preview
              </CardTitle>
              {file && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setScale((prev) => Math.max(0.5, prev - 0.1))
                    }
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm w-16 text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setScale((prev) => Math.min(2.0, prev + 0.1))
                    }
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
                        <Loader2 className="h-8 w-8 animate-spin" />
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
                      <p className="text-center text-muted-foreground mt-4">
                        Page {pageNumber} of {numPages}
                      </p>
                    )}
                  </Document>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
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
