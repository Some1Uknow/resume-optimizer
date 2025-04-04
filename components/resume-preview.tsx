import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

interface ResumeData {
  name: string
  title: string
  contact: {
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    blogs: string
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
    year: string
  }>
  skills: string[]
  projects: Array<{
    name: string
    description: string
    techStack: string[]
  }>
  achievements: string[]
}


interface ResumePreviewProps {
  data: ResumeData
  className?: string
}

export default function ResumePreview({ data, className }: ResumePreviewProps) {
  return (
     <ScrollArea className="h-full">
    <div className={cn("font-sans text-sm bg-white text-black p-8", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-xl mt-1">{data.title}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-blue-600" />
            <span>{data.contact.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>{data.contact.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Linkedin className="h-4 w-4 text-blue-600" />
            <span>{data.contact.linkedin}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">Summary</h2>
        <p className="leading-relaxed text-gray-800">{data.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="text-blue-600 font-medium">
                    {exp.company}, {exp.location}
                  </p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 text-gray-800 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
    </ScrollArea>
  )
}
