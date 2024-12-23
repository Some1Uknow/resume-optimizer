import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Plus, BarChart, PenTool } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" /> New Resume
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Resumes
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        {/* Similar modifications for other cards */}
        <Card className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Average ATS Score
            </CardTitle>
            <BarChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">78%</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight mt-10 mb-6 text-gray-900 dark:text-white">
        Recent Resumes
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Software Engineer Resume", score: 85 },
          { title: "Product Manager Resume", score: 78 },
          { title: "Data Analyst Resume", score: 92 },
        ].map((resume, i) => (
          <Card 
            key={i} 
            className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {resume.title}
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {resume.score}%
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                ATS Optimization Score
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}