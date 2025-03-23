"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Edit, Wand, Upload } from "lucide-react";

export default function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const availableResumes = [
    { id: "1", name: "Software Engineer Resume" },
    { id: "2", name: "Data Analyst Resume" },
  ];

  const handleGenerateCoverLetter = async () => {
    const mockGeneratedLetter = `Dear Hiring Manager,

Based on the job description for ${
      jobDescription.split("\n")[0]
    }, I am excited to apply...

[Rest of the generated cover letter]`;

    setGeneratedCoverLetter(mockGeneratedLetter);
  };

  const handleDownloadCoverLetter = () => {
    const blob = new Blob([generatedCoverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cover_letter.txt";
    link.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-background">
      {/* Left Half: Cover Letter Generator */}
      <div className="space-y-6 bg-card p-6 rounded-lg border border-border shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Create a Tailored Cover Letter
          </h2>
          <p className="text-muted-foreground">
            Generate a personalized cover letter using AI
          </p>
        </div>

        {/* Job Description Input */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Job Description
          </Label>
          <Textarea
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px] resize-none bg-background border-border text-foreground"
          />
        </div>

        {/* Resume Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Select Resume
          </Label>
          <div className="flex gap-4">
            <Select onValueChange={setSelectedResume}>
              <SelectTrigger className="border-border bg-background text-foreground">
                <SelectValue placeholder="Choose a resume" />
              </SelectTrigger>
              <SelectContent>
                {availableResumes.map((resume) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2 border-border bg-background text-foreground">
              <Upload className="h-4 w-4" /> Upload Resume
            </Button>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerateCoverLetter}
          disabled={!jobDescription || !selectedResume}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Wand className="mr-2 h-5 w-5" /> Generate Cover Letter
        </Button>
      </div>

      {/* Right Half: Cover Letter Preview */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        {generatedCoverLetter ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              Generated Cover Letter
            </h3>

            {isEditing ? (
              <Textarea
                value={generatedCoverLetter}
                onChange={(e) => setGeneratedCoverLetter(e.target.value)}
                className="min-h-[500px] resize-none border-border bg-background text-foreground"
              />
            ) : (
              <div className="bg-background/50 dark:bg-background/20 p-4 rounded-md overflow-y-auto max-h-[500px]">
                <pre className="whitespace-pre-wrap text-foreground">
                  {generatedCoverLetter}
                </pre>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-100/50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
              >
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Edit Letter"}
              </Button>
              <Button
                onClick={handleDownloadCoverLetter}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Letter
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Your generated cover letter will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}