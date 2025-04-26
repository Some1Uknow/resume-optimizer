import Image from "next/image";
import React from "react";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: string) => void;
}

const templates = [
  { id: "modern", name: "Modern", preview: "/templates/modern.png" },
  { id: "classic", name: "Classic", preview: "/templates/classic.png" },
  { id: "minimal", name: "Minimal", preview: "/templates/minimal.png" },
  { id: "creative", name: "Creative", preview: "/templates/creative.png" },
  {
    id: "professional",
    name: "Professional",
    preview: "/templates/professional.png",
  },
];

export const TemplateModal = ({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Choose Template</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:border-blue-500"
              onClick={() => {
                onSelectTemplate(template.id);
                onClose();
              }}
            >
              <Image
                height={1000}
                width={1000}
                src={template.preview}
                alt={template.name}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="text-center font-medium">{template.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
