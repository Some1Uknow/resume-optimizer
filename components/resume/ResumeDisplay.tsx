import React, { useEffect, useState } from "react";
import { ResumeData } from "@/utils/types";
import { TemplateModal } from "./TemplateModal";
import { ResumeContent } from "./ResumeContent";
import { LoaderPinwheelIcon } from "lucide-react";

interface ResumeDisplayProps {
  data: ResumeData;
  handleDataChange: (updater: (draft: ResumeData) => void) => void;
}

export const ResumeDisplay = ({ data, handleDataChange }: ResumeDisplayProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>(data);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState("modern");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setResumeData(data);
  }, [data]);

  const handleContentEdit = (key: "name" | "title", value: string) => {
    handleDataChange((draft) => {
      draft[key] = value;
    });
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: resumeData, template: currentTemplate }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a); // Required for Firefox
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <nav className="sticky top-0 z-10 bg-gray-200 backdrop-blur-md rounded-[32px] shadow-sm my-4 p-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] text-white px-6 py-3 rounded-lg hover:from-[#2563eb] hover:to-[#3b82f6] transition-all shadow-md hover:shadow-lg font-medium text-[14px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              Templates
            </button>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg font-medium text-[14px] ${
              isDownloading 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white hover:from-[#16a34a] hover:to-[#15803d]"
            }`}
          >
            {isDownloading ? (
              <LoaderPinwheelIcon className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            )}
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </nav>

      <ResumeContent
        data={resumeData}
        isEditable={true}
        onContentEdit={handleContentEdit}
        template={currentTemplate}
      />

      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={setCurrentTemplate}
      />
    </div>
  );
};