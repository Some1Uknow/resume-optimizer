"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ATSOptimization() {
  const [resumeContent, setResumeContent] = useState("")
  const [score, setScore] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeContent(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This is where you'd typically send the content to your backend for analysis
    // For now, we'll just set a random score
    setScore(Math.floor(Math.random() * 100))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ATS Optimization</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resume Content</CardTitle>
          <CardDescription>Paste your resume content here for ATS analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <Textarea 
                value={resumeContent} 
                onChange={handleInputChange} 
                placeholder="Paste your resume content here..." 
                className="min-h-[200px]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setResumeContent("")}>Clear</Button>
          <Button onClick={handleSubmit}>Analyze</Button>
        </CardFooter>
      </Card>

      {score > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>ATS Optimization Score</CardTitle>
            <CardDescription>Here's how well your resume performs against ATS systems.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Score: {score}%</span>
                <span className={score >= 70 ? "text-green-500" : "text-red-500"}>
                  {score >= 70 ? "Good" : "Needs Improvement"}
                </span>
              </div>
              <Progress value={score} className="w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {score >= 70 
                ? "Great job! Your resume is well-optimized for ATS systems." 
                : "Consider revising your resume to improve its performance with ATS systems."}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

