import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResumeBuilder() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Resume Builder</h2>
      <Card>
        <CardHeader>
          <CardTitle>Build Your Resume</CardTitle>
          <CardDescription>Create a professional resume with our easy-to-use builder.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Resume builder content will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

