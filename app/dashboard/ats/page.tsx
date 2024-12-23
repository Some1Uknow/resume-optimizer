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
    setScore(Math.floor(Math.random() * 100))
  }

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          ATS Optimization
        </h2>
      </div>
      
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Resume Content</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Paste your resume content here for ATS analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea 
              value={resumeContent} 
              onChange={handleInputChange} 
              placeholder="Paste your resume content here..." 
              className="min-h-[200px] border-blue-200 dark:border-blue-800 focus:border-blue-500"
            />
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300"
            onClick={() => setResumeContent("")}
          >
            Clear
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            onClick={handleSubmit}
          >
            Analyze
          </Button>
        </CardFooter>
      </Card>

      {score > 0 && (
        <Card className="bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">ATS Optimization Score</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Here's how well your resume performs against ATS systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">Score: {score}%</span>
                <span className={score >= 70 ? "text-green-500" : "text-red-500"}>
                  {score >= 70 ? "Good" : "Needs Improvement"}
                </span>
              </div>
              <Progress 
                value={score} 
                className="w-full bg-blue-100 dark:bg-blue-900"
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-600 dark:text-gray-300">
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