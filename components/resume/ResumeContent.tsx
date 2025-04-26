import React from "react";
import { ResumeData } from "@/utils/types";

interface ResumeContentProps {
  data: ResumeData;
  isEditable?: boolean;
  onContentEdit?: (key: "name" | "title", value: string) => void;
  template?: string;
}

const templateStyles = {
  modern: {
    container: "bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto",
    nameContainer: "text-center pb-4 border-b border-gray-200",
    name: "text-4xl font-bold text-gray-800 tracking-tight",
    title: "text-xl text-gray-500 mt-2 font-medium",
    sectionHeader: "text-2xl font-semibold text-gray-700 mb-3 flex items-center after:content-[''] after:flex-grow after:h-[1px] after:bg-gray-200 after:ml-4",
    skills: "flex flex-wrap gap-2",
    skillItem: "bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow",
    text: "text-gray-600",
    projectTitle: "text-xl font-semibold text-blue-700",
    projectTech: "text-sm text-gray-500 font-medium",
    expTitle: "text-xl font-semibold text-blue-700",
    expDetails: "text-sm text-gray-500 font-medium flex items-center gap-2",
    eduTitle: "text-xl font-semibold text-blue-700",
    contactList: "grid grid-cols-2 gap-3 text-gray-600",
  },
  
  classic: {
    container: "bg-gray-50 border border-gray-300 p-8 max-w-4xl mx-auto",
    nameContainer: "text-center pb-5 mb-5 border-b-2 border-gray-400",
    name: "text-3xl font-serif text-black uppercase tracking-wide",
    title: "text-lg text-gray-600 mt-1 font-serif italic",
    sectionHeader: "text-xl font-bold text-black mb-3 uppercase border-b border-gray-400 pb-1",
    skills: "text-gray-700 font-serif leading-relaxed",
    skillItem: "", // Not used, as skills are rendered as plain text
    text: "text-gray-700 font-serif",
    projectTitle: "text-xl font-bold text-black uppercase",
    projectTech: "text-sm italic text-gray-600",
    expTitle: "text-xl font-bold text-black uppercase",
    expDetails: "text-sm italic text-gray-600 mb-1",
    eduTitle: "text-xl font-bold text-black uppercase",
    contactList: "space-y-1 text-gray-700 font-serif",
  },
  
  minimal: {
    container: "bg-white p-8 border-t-4 border-blue-500 max-w-4xl mx-auto shadow-sm",
    nameContainer: "mb-6",
    name: "text-3xl font-sans font-bold text-gray-900",
    title: "text-lg text-gray-400 mt-1 font-light",
    sectionHeader: "text-xl font-medium text-gray-800 mb-3 border-b border-gray-200 pb-1",
    skills: "flex flex-wrap gap-2",
    skillItem: "bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded",
    text: "text-gray-500 text-sm leading-relaxed",
    projectTitle: "text-lg font-medium text-gray-900",
    projectTech: "text-xs text-blue-500 font-medium uppercase tracking-wider",
    expTitle: "text-lg font-medium text-gray-900",
    expDetails: "text-xs text-gray-400 uppercase tracking-wider mb-1",
    eduTitle: "text-lg font-medium text-gray-900",
    contactList: "flex flex-wrap justify-between gap-y-2 text-sm text-gray-500",
  },
  
  creative: {
    container: "bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg max-w-4xl mx-auto shadow-md",
    nameContainer: "text-center pb-6",
    name: "text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent",
    title: "text-xl text-gray-500 mt-2 font-light",
    sectionHeader: "text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent inline-block",
    skills: "flex flex-wrap gap-2",
    skillItem: "bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-purple-200 text-purple-700",
    text: "text-gray-600",
    projectTitle: "text-xl font-bold text-purple-700",
    projectTech: "text-sm text-blue-500",
    expTitle: "text-xl font-bold text-purple-700",
    expDetails: "text-sm text-blue-500",
    eduTitle: "text-xl font-bold text-purple-700",
    contactList: "grid grid-cols-2 gap-3 text-gray-600",
  },
  
  professional: {
    container: "bg-white p-8 border-l-8 border-gray-700 max-w-4xl mx-auto shadow-md",
    nameContainer: "border-b-2 border-gray-700 pb-4 mb-6",
    name: "text-3xl font-bold text-gray-800",
    title: "text-lg text-gray-600 mt-2 font-medium",
    sectionHeader: "text-xl font-bold text-gray-800 mb-3 uppercase border-b border-gray-300 pb-1",
    skills: "grid grid-cols-3 gap-2 sm:grid-cols-4",
    skillItem: "bg-gray-100 text-gray-800 px-3 py-2 text-center text-sm border-l-2 border-gray-700",
    text: "text-gray-700 leading-relaxed",
    projectTitle: "text-lg font-bold text-gray-800",
    projectTech: "text-sm font-medium text-gray-600 border-l-2 border-gray-400 pl-2",
    expTitle: "text-lg font-bold text-gray-800",
    expDetails: "text-sm font-medium text-gray-600 border-l-2 border-gray-400 pl-2",
    eduTitle: "text-lg font-bold text-gray-800",
    contactList: "grid grid-cols-2 gap-2 text-gray-700",
  }
};

export const ResumeContent = ({
  data,
  isEditable = false,
  onContentEdit,
  template = "modern",
}: ResumeContentProps) => {
  const styles = templateStyles[template as keyof typeof templateStyles] || templateStyles.modern;

  const handleEdit = (key: "name" | "title", e: React.ChangeEvent<HTMLDivElement>) => {
    if (onContentEdit) {
      onContentEdit(key, e.target.innerText.trim());
    }
  };

  return (
    <div className={`template-${template} ${styles.container} print:shadow-none`}>
      {/* Header Section */}
      {(data.name || "") && (
        <div className={styles.nameContainer}>
          {data.name && (
            <h1 className={styles.name}>
              {isEditable ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleEdit("name", e)}
                >
                  {data.name}
                </div>
              ) : (
                data.name
              )}
            </h1>
          )}
          {data.title && (
            <p className={styles.title}>
              {isEditable ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleEdit("title", e)}
                >
                  {data.title}
                </div>
              ) : (
                data.title
              )}
            </p>
          )}
        </div>
      )}

      {/* Summary Section */}
      {data.summary && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Summary</h2>
          <p className={`${styles.text} leading-relaxed whitespace-pre-line`}>{data.summary}</p>
        </section>
      )}

      {/* Skills Section */}
      {data.skills?.length > 0 && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Skills</h2>
          {template === "classic" ? (
            <p className={styles.skills}>{data.skills.join(" • ")}</p>
          ) : (
            <ul className={styles.skills}>
              {data.skills.map((skill, idx) => (
                <li key={idx} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Projects Section */}
      {data.projects?.some((p) => p.name) && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Projects</h2>
          {data.projects.map(
            (project, idx) =>
              project.name && (
                <div key={idx} className="mb-4">
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  {project.techStack?.length > 0 && (
                    <p className={styles.projectTech}>
                      {template === "creative" ? `// ${project.techStack?.join(" / ")}` : project.techStack?.join(", ")}
                    </p>
                  )}
                  <p className={`${styles.text} mt-1 whitespace-pre-line`}>{project.description}</p>
                </div>
              )
          )}
        </section>
      )}

      {/* Experience Section */}
      {data.experience?.some((exp) => exp.title) && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Experience</h2>
          {data.experience.map(
            (exp, idx) =>
              exp.title && (
                <div key={idx} className="mb-5">
                  <h3 className={styles.expTitle}>{exp.title}</h3>
                  <p className={styles.expDetails}>
                    {template === "professional" ? (
                      `${exp.company} | ${exp.location} | ${exp.period}`
                    ) : template === "creative" ? (
                      `${exp.company} // ${exp.location} // ${exp.period}`
                    ) : (
                      `${exp.company} - ${exp.location} (${exp.period})`
                    )}
                  </p>
                  <p className={`${styles.text} mt-2 whitespace-pre-line`}>{exp.description}</p>
                </div>
              )
          )}
        </section>
      )}

      {/* Education Section */}
      {data.education?.some((edu) => edu.degree) && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Education</h2>
          {data.education.map(
            (edu, idx) =>
              edu.degree && (
                <div key={idx} className="mb-3">
                  <h3 className={styles.eduTitle}>{edu.degree}</h3>
                  <p className={template === "professional" ? styles.expDetails : "text-sm text-gray-500"}>
                    {template === "professional" ? (
                      `${edu.institution} | ${edu.year}`
                    ) : template === "creative" ? (
                      `${edu.institution} // ${edu.year}`
                    ) : (
                      `${edu.institution} (${edu.year})`
                    )}
                  </p>
                </div>
              )
          )}
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements?.length > 0 && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Achievements</h2>
          <ul className={
            template === "professional" ? `${styles.text} list-none space-y-2` :
            template === "creative" ? `${styles.text} list-none space-y-2` :
            `${styles.text} list-disc list-inside`
          }>
            {data.achievements.map((ach, idx) => (
              <li key={idx} className={
                template === "professional" ? "border-l-2 border-gray-400 pl-3" :
                template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" :
                ""
              }>
                {ach}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact Section */}
      {Object.values(data.contact).some(Boolean) && (
        <section className="mt-6">
          <h2 className={styles.sectionHeader}>Contact</h2>
          <div className={styles.contactList}>
            {data.contact.email && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>Email:</strong> {data.contact.email}
              </div>
            )}
            {data.contact.phone && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>Phone:</strong> {data.contact.phone}
              </div>
            )}
            {data.contact.github && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>GitHub:</strong> {data.contact.github}
              </div>
            )}
            {data.contact.linkedin && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>LinkedIn:</strong> {data.contact.linkedin}
              </div>
            )}
            {data.contact.blogs && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>Blogs:</strong> {data.contact.blogs}
              </div>
            )}
            {data.contact.location && (
              <div className={template === "creative" ? "bg-white bg-opacity-30 p-2 rounded" : ""}>
                <strong>Location:</strong> {data.contact.location}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};