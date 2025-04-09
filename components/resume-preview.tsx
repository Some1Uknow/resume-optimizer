"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Download,
  ZoomIn,
  ZoomOut,
  Layout,
  Check,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    blogs: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    techStack: string[];
  }>;
  achievements: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
  className?: string;
  onChange?: (newData: ResumeData) => void; // Add this line
}

export default function ResumePreview({
  data: initialData,
  className,
  onChange,
}: ResumePreviewProps) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [zoom, setZoom] = useState<number>(1);
  const [template, setTemplate] = useState<string>("modern");
  const [editing, setEditing] = useState<{
    path: string[];
    value: string;
  } | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update the data state when initialData changes
    setData(initialData);
  }, [initialData]);

  // Template options
  const templates = [
    {
      id: "modern",
      name: "Modern",
      preview: "/api/placeholder/200/100",
    },
    {
      id: "classic",
      name: "Classic",
      preview: "/api/placeholder/200/100",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "/api/placeholder/200/100",
    },
  ];

  // Handle download PDF functionality
  const handleDownloadPDF = () => {
    toast.success("PDF Download", {
      description: "Your resume PDF is being prepared for download.",
    });
    // In an actual implementation, you'd integrate with a PDF generation library
  };

  // Handle zoom functionality
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  // Handle editing functionality
  const handleEditStart = (path: string[], value: string) => {
    setEditing({ path, value });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editing) {
      setEditing({ ...editing, value: e.target.value });
    }
  };

  const handleEditSave = () => {
    if (editing) {
      // Create a deep copy of the data
      const newData = JSON.parse(JSON.stringify(data));

      // Use a safer approach to update nested properties
      let current = newData;
      const lastIndex = editing.path.length - 1;

      for (let i = 0; i < lastIndex; i++) {
        const key = editing.path[i];

        // Handle array notation like "experience[0]"
        if (key.includes("[")) {
          const [arrayName, indexPart] = key.split("[");
          const index = parseInt(indexPart.replace("]", ""));

          // Ensure the array exists
          if (!current[arrayName]) {
            current[arrayName] = [];
          }

          // Ensure the array item exists
          if (!current[arrayName][index]) {
            current[arrayName][index] = {};
          }

          current = current[arrayName][index];
        } else {
          // Handle regular object properties
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      }

      // Set the final value
      const lastKey = editing.path[lastIndex];

      if (lastKey.includes("[")) {
        const [arrayName, indexPart] = lastKey.split("[");
        const index = parseInt(indexPart.replace("]", ""));
        current[arrayName][index] = editing.value;
      } else {
        current[lastKey] = editing.value;
      }

      setData(newData);
      if (onchange) onChange(newData);
      setEditing(null);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (editing && e.target !== e.currentTarget) {
      handleEditSave();
    }
  };

  // Apply template styles
  const getTemplateStyles = () => {
    switch (template) {
      case "classic":
        return "font-serif bg-gray-50";
      case "minimal":
        return "font-mono bg-white";
      default: // modern
        return "font-sans bg-white";
    }
  };

  // Editable component
  const Editable = ({
    path,
    value,
    type = "input",
    className = "",
  }: {
    path: string[];
    value: string;
    type?: "input" | "textarea";
    className?: string;
  }) => {
    const isEditing =
      editing && JSON.stringify(path) === JSON.stringify(editing.path);

    return (
      <div
        className={cn(
          "relative group cursor-text",
          !isEditing &&
            "hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-offset-2",
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (!isEditing) {
            handleEditStart(path, value);
          }
        }}
      >
        {isEditing ? (
          type === "textarea" ? (
            <textarea
              value={editing.value}
              onChange={handleEditChange}
              className="w-full p-1 border border-blue-400 rounded bg-gray-200"
              autoFocus
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={editing.value}
              onChange={handleEditChange}
              className="w-full p-1 border border-blue-400 rounded bg-gray-200"
              autoFocus
            />
          )
        ) : (
          value
        )}
        {isEditing && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute -top-4 -right-4 h-8 w-8 p-0 rounded-full bg-blue-100"
            onClick={(e) => {
              e.stopPropagation();
              handleEditSave();
            }}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navbar */}
      <div className="bg-white border-b py-2 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={zoom >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 ml-4"
              >
                <Layout className="h-4 w-4" />
                Change Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Choose Template</DialogTitle>
                <DialogDescription>
                  Select a template for your resume design.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {templates.map((t) => (
                  <Card
                    key={t.id}
                    className={cn(
                      "cursor-pointer p-2 transition-all",
                      template === t.id && "ring-2 ring-blue-600"
                    )}
                    onClick={() => setTemplate(t.id)}
                  >
                    <Image
                      width={100}
                      height={200}
                      src={t.preview}
                      alt={t.name}
                      className="w-full rounded-sm"
                    />
                    <p className="text-center mt-2 font-medium">{t.name}</p>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resume Preview */}
      <ScrollArea className="flex-1 bg-gray-100" onClick={handleClickOutside}>
        <div
          ref={resumeRef}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          className="mx-auto max-w-[210mm] min-h-[297mm] transition-transform duration-200 shadow-lg"
        >
          <div
            className={cn(
              "font-sans text-sm text-black p-8 min-h-[297mm]",
              getTemplateStyles(),
              className
            )}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">
                <Editable path={["name"]} value={data.name} />
              </h1>
              <p className="text-xl mt-1">
                <Editable path={["title"]} value={data.title} />
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-700">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <Editable
                    path={["contact", "email"]}
                    value={data.contact.email}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <Editable
                    path={["contact", "phone"]}
                    value={data.contact.phone}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <Editable
                    path={["contact", "location"]}
                    value={data.contact.location}
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  <Editable
                    path={["contact", "linkedin"]}
                    value={data.contact.linkedin}
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
                Summary
              </h2>
              <Editable
                path={["summary"]}
                value={data.summary}
                type="textarea"
                className="leading-relaxed text-gray-800"
              />
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          <Editable
                            path={["experience", `${index}`, "title"]}
                            value={exp.title}
                          />
                        </h3>
                        <p className="text-blue-600 font-medium">
                          <Editable
                            path={["experience", `${index}`, "company"]}
                            value={exp.company}
                          />
                          ,{" "}
                          <Editable
                            path={["experience", `${index}`, "location"]}
                            value={exp.location}
                          />
                        </p>
                      </div>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Editable
                          path={["experience", `${index}`, "period"]}
                          value={exp.period}
                        />
                      </span>
                    </div>
                    <Editable
                      path={["experience", `${index}`, "description"]}
                      value={exp.description}
                      type="textarea"
                      className="mt-2 text-gray-800 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          <Editable
                            path={["education", `${index}`, "degree"]}
                            value={edu.degree}
                          />
                        </h3>
                        <p className="text-blue-600 font-medium">
                          <Editable
                            path={["education", `${index}`, "institution"]}
                            value={edu.institution}
                          />
                        </p>
                      </div>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <Editable
                          path={["education", `${index}`, "year"]}
                          value={edu.year}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium group cursor-text"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStart(["skills", `${index}`], skill);
                    }}
                  >
                    {editing &&
                    JSON.stringify(["skills", `${index}`]) ===
                      JSON.stringify(editing.path) ? (
                      <input
                        type="text"
                        value={editing.value}
                        onChange={handleEditChange}
                        className="w-full bg-transparent border-none focus:outline-none text-blue-800 p-0"
                        autoFocus
                        onBlur={handleEditSave}
                      />
                    ) : (
                      skill
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
