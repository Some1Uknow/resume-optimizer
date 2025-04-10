import React, { useEffect, useState } from "react";
import { ResumeData } from "@/utils/types";

// Utility type to extract keys of ResumeData that are strings
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface ResumeDisplayProps {
  data: ResumeData;
  handleDataChange: (updater: (draft: ResumeData) => void) => void;
}

export const ResumeDisplay = ({
  data,
  handleDataChange,
}: ResumeDisplayProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>(data);
  const handleContentEdit = (
    key: StringKeys<ResumeData>,
    e: React.ChangeEvent<HTMLDivElement>
  ) => {
    handleDataChange((draft) => {
      draft[key] = e.target.innerText.trim(); // Modify the draft object
    });
  };

  useEffect(() => {
    setResumeData(data);
  }, [data, handleDataChange]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl space-y-6">
      {(resumeData.name || "") && (
        <div className="text-center">
          {resumeData.name && (
            <h1 className="text-4xl font-bold text-gray-800">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleContentEdit("name", e)}
              >
                {resumeData.name}
              </div>
            </h1>
          )}
          {resumeData.title && (
            <p className="text-xl text-gray-500 mt-2">
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleContentEdit("title", e)}
              >
                {resumeData.title}
              </div>
            </p>
          )}
        </div>
      )}

      {resumeData.summary && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Summary</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {resumeData.summary}
          </p>
        </section>
      )}

      {resumeData.skills?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {resumeData.projects?.some((p) => p.name) && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Projects
          </h2>
          {resumeData.projects.map(
            (project, idx) =>
              project.name && (
                <div key={idx} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {project.techStack?.join(", ")}
                  </p>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )
          )}
        </section>
      )}

      {resumeData.experience?.some((exp) => exp.title) && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Experience
          </h2>
          {resumeData.experience.map(
            (exp, idx) =>
              exp.title && (
                <div key={idx} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {exp.company} - {exp.location} ({exp.period})
                  </p>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              )
          )}
        </section>
      )}

      {resumeData.education?.some((edu) => edu.degree) && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Education
          </h2>
          {resumeData.education.map(
            (edu, idx) =>
              edu.degree && (
                <div key={idx} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {edu.institution} ({edu.year})
                  </p>
                </div>
              )
          )}
        </section>
      )}

      {resumeData.achievements?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            {resumeData.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        </section>
      )}

      {Object.values(resumeData.contact).some(Boolean) && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Contact</h2>
          <ul className="text-gray-600 space-y-1">
            {resumeData.contact.email && (
              <li>
                <strong>Email:</strong> {resumeData.contact.email}
              </li>
            )}
            {resumeData.contact.phone && (
              <li>
                <strong>Phone:</strong> {resumeData.contact.phone}
              </li>
            )}
            {resumeData.contact.github && (
              <li>
                <strong>GitHub:</strong> {resumeData.contact.github}
              </li>
            )}
            {resumeData.contact.linkedin && (
              <li>
                <strong>LinkedIn:</strong> {resumeData.contact.linkedin}
              </li>
            )}
            {resumeData.contact.blogs && (
              <li>
                <strong>Blogs:</strong> {resumeData.contact.blogs}
              </li>
            )}
            {resumeData.contact.location && (
              <li>
                <strong>Location:</strong> {resumeData.contact.location}
              </li>
            )}
          </ul>
        </section>
      )}
    </div>
  );
};
