'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Plus, BarChart, Pencil, Copy, Download, Trash2, Clock, Tag } from 'lucide-react'

const resumes = [
  {
    id: 1,
    name: "RESUME #1",
    displayName: "New Resume (1)",
    lastEdited: "few seconds ago",
    createdAt: "2024-12-29",
    previewUrl: "/api/placeholder/300/400"
  },
  {
    id: 2,
    name: "RESUME #2",
    displayName: "New Resume (2)",
    lastEdited: "2 minutes ago",
    createdAt: "2024-12-29",
    previewUrl: "/api/placeholder/300/400"
  },
  {
    id: 3,
    name: "RESUME #3",
    displayName: "New Resume (3)",
    lastEdited: "1 hour ago",
    createdAt: "2024-12-28",
    previewUrl: "/api/placeholder/300/400"
  }
]

export default function Dashboard() {
  const handleEdit = (id: number) => console.log('Edit resume:', id)
  const handleDuplicate = (id: number) => console.log('Duplicate resume:', id)
  const handleDownload = (id: number) => console.log('Download resume:', id)
  const handleDelete = (id: number) => console.log('Delete resume:', id)

  return (
    <div className="mx-auto p-8 bg-gray-50 dark:bg-slate-900">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Resumes
        </h2>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" /> New Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {resumes.map((resume) => (
          <Card 
            key={resume.id} 
            className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="flex h-[460px]">
              {/* Left side - Preview */}
              <div className="w-[55%] border-r dark:border-slate-700">
                <img 
                  src={resume.previewUrl} 
                  alt={`Preview of ${resume.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Right side - Info and Actions */}
              <div className="w-[45%] flex flex-col">
                <div className="p-8 border-b dark:border-slate-700">
                  <h3 className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-3">
                    {resume.name}
                  </h3>
                  <p className="text-base font-medium text-gray-900 dark:text-white mb-4">
                    {resume.displayName}
                  </p>
                  <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Edited {resume.lastEdited}</span>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                  >
                    <Tag className="h-4 w-4" />
                    Add a label
                  </Button>
                </div>
                
                {/* Action buttons */}
                <div className="flex-1 flex flex-col py-4">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start px-8 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    onClick={() => handleEdit(resume.id)}
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start px-8 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    onClick={() => handleDuplicate(resume.id)}
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                    Duplicate
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start px-8 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    onClick={() => handleDownload(resume.id)}
                  >
                    <Download className="h-4 w-4 text-gray-500" />
                    Download
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start px-8 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                    onClick={() => handleDelete(resume.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}