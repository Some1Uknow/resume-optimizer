"use client";

import { ResumeData } from "./resume-form";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
  scale?: number;
}

export function ResumePreview({ data, templateId, scale = 1 }: ResumePreviewProps) {
  return (
    <div 
      className="bg-white text-black p-8 shadow-lg rounded-lg"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
        height: `${100 / scale}%`
      }}
    >
      {/* Personal Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center gap-4 text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {data.personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-4 text-gray-600 mt-2">
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </a>
          )}
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600">
              <Globe className="h-4 w-4 mr-1" />
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 pb-1 border-b">Professional Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-1 border-b">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && exp.highlights[0] !== "" && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-1 border-b">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    {edu.location && (
                      <p className="text-gray-600 text-sm">{edu.location}</p>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {edu.graduationDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-1 border-b">Skills</h2>
          <div className="space-y-4">
            {data.skills.map((skillCat, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{skillCat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCat.items.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
