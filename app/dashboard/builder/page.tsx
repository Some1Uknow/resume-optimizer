import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PenTool, Plus } from 'lucide-react'

export default function ResumeBuilder() {
  return (
    <div className="space-y-6 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Resume Builder
        </h2>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>

      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Build Your Resume</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Create a professional resume with our easy-to-use builder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Professional", icon: PenTool },
              { title: "Creative", icon: PenTool },
              { title: "Minimal", icon: PenTool },
            ].map((template, index) => (
              <div 
                key={index} 
                className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <template.icon className="text-blue-600 dark:text-blue-400" />
                  <Button 
                    size="sm" 
                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
                  >
                    Select
                  </Button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {template.title} Template
                </h3>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}