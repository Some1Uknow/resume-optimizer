"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Copy, Wand2, Loader2, RefreshCw, Eye } from "lucide-react"

interface CoverLetterForm {
  companyName: string
  position: string
  hiringManager: string
  jobDescription: string
  tone: string
  template: string
}

const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at Google. With over 5 years of experience in full-stack development and a passion for building scalable web applications, I am excited about the opportunity to contribute to Google's innovative engineering team.

In my current role at TechCorp, I have successfully led the development of multiple high-traffic applications serving over 1 million users. My expertise in JavaScript, React, and Node.js aligns perfectly with the requirements outlined in your job posting. I have consistently delivered projects on time while maintaining high code quality standards and mentoring junior developers.

What particularly excites me about this opportunity is Google's commitment to pushing the boundaries of technology. Your recent work in AI and machine learning resonates with my own interests and side projects in these areas. I am eager to bring my problem-solving skills and collaborative approach to help drive Google's mission forward.

I have attached my resume for your review and would welcome the opportunity to discuss how my experience and enthusiasm can contribute to your team's success. Thank you for considering my application.

Sincerely,
John Doe`

export default function CoverLetterPage() {
  const [form, setForm] = useState<CoverLetterForm>({
    companyName: "",
    position: "",
    hiringManager: "",
    jobDescription: "",
    tone: "professional",
    template: "modern",
  })
  const [coverLetter, setCoverLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof CoverLetterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const generateCoverLetter = async () => {
    if (!form.companyName || !form.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in company name and position",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCoverLetter(
      mockCoverLetter.replace("Google", form.companyName).replace("Senior Software Engineer", form.position),
    )
    setIsGenerating(false)

    toast({
      title: "Cover Letter Generated",
      description: "Your personalized cover letter is ready",
    })
  }

  const copyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter)
    toast({
      title: "Copied to Clipboard",
      description: "Cover letter has been copied to your clipboard",
    })
  }

  const downloadCoverLetter = () => {
    const element = document.createElement("a")
    const file = new Blob([coverLetter], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `cover-letter-${form.companyName.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Download Started",
      description: "Your cover letter is being downloaded",
    })
  }

  return (
    <div className="space-y-6 m-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cover Letter Generator</h1>
        <p className="text-muted-foreground">Create personalized cover letters tailored to specific job applications</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Job Details
            </CardTitle>
            <CardDescription>Provide job information to generate a personalized cover letter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={form.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={form.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hiring-manager">Hiring Manager (Optional)</Label>
              <Input
                id="hiring-manager"
                value={form.hiringManager}
                onChange={(e) => handleInputChange("hiringManager", e.target.value)}
                placeholder="Jane Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                value={form.jobDescription}
                onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                placeholder="Paste the job description here to get better personalization..."
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={form.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    <SelectItem value="confident">Confident</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select value={form.template} onValueChange={(value) => handleInputChange("template", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateCoverLetter} disabled={isGenerating} className="flex-1">
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Cover Letter"}
              </Button>
              {coverLetter && (
                <Button variant="outline" onClick={generateCoverLetter} disabled={isGenerating}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview/Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{form.tone}</Badge>
                <Badge variant="outline">{form.template}</Badge>
              </div>
            </CardTitle>
            <CardDescription>Your generated cover letter will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {!coverLetter ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Fill in the job details and click &quot;Generate Cover Letter&quot; to see your personalized letter here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900 border rounded-lg p-6 min-h-[400px]">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{coverLetter}</div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyCoverLetter} variant="outline" className="flex-1 bg-transparent">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                  <Button onClick={downloadCoverLetter} variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download as TXT
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      {coverLetter && (
        <Card>
          <CardHeader>
            <CardTitle>Tips for Your Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Personalization</h4>
                <p className="text-sm text-muted-foreground">
                  Always customize your cover letter for each specific job and company
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Length</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your cover letter to one page, typically 3-4 paragraphs
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Keywords</h4>
                <p className="text-sm text-muted-foreground">
                  Include relevant keywords from the job description naturally
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
