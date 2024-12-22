import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoverLetterGenerator() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Cover Letter Generator</h2>
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Cover Letter</CardTitle>
          <CardDescription>Create a compelling cover letter with AI assistance.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cover letter generator content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

