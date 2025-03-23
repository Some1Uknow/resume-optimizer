import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

interface ResumeData {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    location: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    location: string
    year: string
  }>
  skills: string[]
}

interface ResumePreviewProps {
  data: ResumeData
  className?: string
}

export default function ResumePreview({ data, className }: ResumePreviewProps) {
  return (
    <div className={cn("font-sans text-sm", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-1">{data.title}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{data.contact.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{data.contact.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{data.contact.linkedin}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-slate-900 dark:text-white">
          Summary
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{data.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-slate-900 dark:text-white">
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{exp.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}, {exp.location}
                  </p>
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-slate-900 dark:text-white">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {edu.institution}, {edu.location}
                  </p>
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold border-b border-slate-200 dark:border-slate-700 pb-2 mb-3 text-slate-900 dark:text-white">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

