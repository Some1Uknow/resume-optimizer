"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Upload,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Lightbulb,
  Download,
  Loader2,
} from "lucide-react"

interface AnalysisResult {
  score: number
  strengths: string[]
  weaknesses: string[]
  keywords: {
    missing: string[]
    present: string[]
  }
  recommendations: string[]
  industryTips: string[]
}

const mockAnalysis: AnalysisResult = {
  score: 87,
  strengths: [
    "Strong technical skills section with relevant programming languages",
    "Quantified achievements with specific metrics and results",
    "Clear professional experience with progressive responsibility",
    "Relevant education and certifications for the target role",
    "Good use of action verbs and industry terminology",
  ],
  weaknesses: [
    "Missing keywords related to cloud computing and DevOps",
    "Could benefit from more leadership and collaboration examples",
    "Skills section could be more comprehensive",
    "Missing soft skills that are important for senior roles",
    "Could use more specific project outcomes and business impact",
  ],
  keywords: {
    missing: ["AWS", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum", "Leadership", "Mentoring"],
    present: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "API", "Database"],
  },
  recommendations: [
    "Add cloud computing experience and certifications",
    "Include more leadership and team collaboration examples",
    "Quantify more achievements with specific numbers and percentages",
    "Add a professional summary section at the top",
    "Include relevant side projects or open source contributions",
  ],
  industryTips: [
    "Tech recruiters spend an average of 6 seconds scanning resumes",
    "Include keywords from the job description naturally throughout your resume",
    "Use a clean, ATS-friendly format with standard section headings",
    "Keep your resume to 1-2 pages maximum for most tech roles",
    "Include links to your GitHub, portfolio, or relevant online presence",
  ],
}

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      if (
        uploadedFile.type === "application/pdf" ||
        uploadedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(uploadedFile)
        toast({
          title: "File uploaded",
          description: `${uploadedFile.name} is ready for analysis`,
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file",
          variant: "destructive",
        })
      }
    }
  }

  const analyzeResume = async () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)

    toast({
      title: "Analysis complete",
      description: "Your resume has been analyzed successfully",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 75) return "Good"
    if (score >= 60) return "Fair"
    return "Needs Improvement"
  }

  return (
    <div className="space-y-6 m-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
        <p className="text-muted-foreground">Get AI-powered insights to optimize your resume for ATS systems</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Resume
            </CardTitle>
            <CardDescription>Upload your resume in PDF or DOCX format for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Click to upload your resume</p>
                    <p className="text-sm text-muted-foreground">PDF or DOCX files only</p>
                  </div>
                </div>
              </label>
            </div>

            {file && (
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => setFile(null)}>
                  Remove
                </Button>
              </div>
            )}

            <Button onClick={analyzeResume} disabled={!file || isAnalyzing} className="w-full">
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>AI-powered insights and recommendations for your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {!analysis ? (
              <div className="text-center py-8 text-muted-foreground">
                Upload and analyze your resume to see results here
              </div>
            ) : (
              <div className="space-y-6">
                {/* ATS Score */}
                <div className="text-center space-y-2">
                  <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}%</div>
                  <div className="text-lg font-medium">ATS Score - {getScoreLabel(analysis.score)}</div>
                  <Progress value={analysis.score} className="w-full" />
                </div>

                <Separator />

                {/* Score Breakdown */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strengths ({analysis.strengths.length})
                    </h4>
                    <ul className="text-sm space-y-1">
                      {analysis.strengths.slice(0, 3).map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-600 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Areas to Improve ({analysis.weaknesses.length})
                    </h4>
                    <ul className="text-sm space-y-1">
                      {analysis.weaknesses.slice(0, 3).map((weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Detailed Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      {analysis && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Keywords Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Keywords Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-green-600 mb-2">Present Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.present.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-red-600 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.missing.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Industry Tips */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Industry Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {analysis.industryTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
