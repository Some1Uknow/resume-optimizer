"use client";

import { ResumeData } from "./resume-form";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
  scale?: number;
}

// Template-specific styles configuration
const templateStyles = {
  corporate: {
    container: "bg-white text-black p-8",
    header: "text-center mb-8",
    name: "text-3xl font-bold mb-2 text-slate-800",
    sectionTitle: "text-xl font-semibold mb-2 pb-1 border-b border-slate-300 text-slate-700",
    contactInfo: "text-gray-600 flex justify-center gap-4",
    links: "flex justify-center gap-4 text-blue-600 mt-2",
    skillTag: "px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-700",
  },
  executive: {
    container: "bg-white text-black p-8",
    header: "border-b-2 border-gray-800 pb-6 mb-8",
    name: "text-4xl font-bold mb-2 text-gray-800",
    sectionTitle: "text-2xl font-bold mb-4 text-gray-800 uppercase tracking-wide",
    contactInfo: "text-gray-700 flex justify-start gap-6",
    links: "flex justify-start gap-6 text-gray-700 mt-2",
    skillTag: "px-4 py-1.5 bg-gray-800 text-white rounded-sm text-sm",
  },
  designer: {
    container: "bg-white text-black p-8",
    header: "mb-8 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-24 after:bg-purple-500",
    name: "text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text",
    sectionTitle: "text-xl font-bold mb-4 text-purple-600",
    contactInfo: "text-gray-600 flex flex-wrap gap-4",
    links: "flex gap-4 text-purple-600 mt-2",
    skillTag: "px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm",
  },
  clean: {
    container: "bg-white text-black p-8",
    header: "mb-8",
    name: "text-3xl font-light mb-2 text-gray-900",
    sectionTitle: "text-lg font-medium mb-4 text-gray-900",
    contactInfo: "text-gray-600 flex justify-center gap-4",
    links: "flex justify-center gap-4 text-gray-600 mt-2",
    skillTag: "px-2 py-0.5 border border-gray-200 rounded text-sm text-gray-600",
  },
  research: {
    container: "bg-white text-black p-8",
    header: "mb-8 border-b-2 border-blue-700",
    name: "text-3xl font-serif mb-2 text-blue-900",
    sectionTitle: "text-xl font-serif mb-4 text-blue-800 border-l-4 border-blue-700 pl-3",
    contactInfo: "text-gray-700 flex justify-start gap-6 font-serif",
    links: "flex justify-start gap-6 text-blue-700 mt-2",
    skillTag: "px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-serif",
  }
};

export function ResumePreview({ data, templateId, scale = 1 }: ResumePreviewProps) {
  const styles = templateStyles[templateId as keyof typeof templateStyles] || templateStyles.clean;

  return (
    <div 
      className={cn(styles.container, "shadow-lg rounded-lg")}
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
        height: `${100 / scale}%`
      }}
    >
      {/* Personal Info */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.personalInfo.fullName}</h1>
        <div className={styles.contactInfo}>
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
        <div className={styles.links}>
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </a>
          )}
          {data.personalInfo.website && (
            <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80">
              <Globe className="h-4 w-4 mr-1" />
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className={styles.sectionTitle}>Work Experience</h2>
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
          <h2 className={styles.sectionTitle}>Education</h2>
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

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <div className="space-y-4">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <span className="text-sm text-gray-600">{achievement.date}</span>
                </div>
                <p className="text-sm text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections.length > 0 && (
        <div className="space-y-6">
          {data.customSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.date && (
                        <span className="text-sm text-gray-600">{item.date}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className="space-y-4">
            {data.skills.map((skillCat, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{skillCat.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillCat.items.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className={styles.skillTag}
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
