import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, RotateCcw } from 'lucide-react'

export default function VersionControl() {
  return (
    <div className="space-y-6 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Version Control
        </h2>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Restore Version
        </Button>
      </div>

      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-gray- 900 dark:text-white">Resume Versions</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Manage and restore previous versions of your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {[
              { version: "Version 1", date: "December 1, 2024" },
              { version: "Version 2", date: "December 10, 2024" },
              { version: "Version 3", date: "December 15, 2024" },
            ].map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.version}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.date}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300"
                >
                  Restore
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}