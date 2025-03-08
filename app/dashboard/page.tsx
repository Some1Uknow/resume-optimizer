"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Pencil, Copy, Download, Trash2, Clock, Tag } from "lucide-react";

const resumes = [
  {
    id: 1,
    name: "RESUME #1",
    displayName: "New Resume (1)",
    lastEdited: "few seconds ago",
    createdAt: "2024-12-29",
    previewUrl: "/template-1.png",
  },
  {
    id: 2,
    name: "RESUME #2",
    displayName: "New Resume (2)",
    lastEdited: "2 minutes ago",
    createdAt: "2024-12-29",
    previewUrl: "/template-2.png",
  },
  {
    id: 3,
    name: "RESUME #3",
    displayName: "New Resume (3)",
    lastEdited: "1 hour ago",
    createdAt: "2024-12-28",
    previewUrl: "/template-4.png",
  },
];

export default function Dashboard() {
  const handleEdit = (id: number) => console.log("Edit resume:", id);
  const handleDuplicate = (id: number) => console.log("Duplicate resume:", id);
  const handleDownload = (id: number) => console.log("Download resume:", id);
  const handleDelete = (id: number) => console.log("Delete resume:", id);

  return (
    <div className="mx-auto p-8 bg-background">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          My Resumes
        </h2>
        <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            className="bg-card hover:shadow-lg transition-shadow overflow-hidden border border-border"
          >
            <div className="flex flex-col md:flex-row h-auto md:h-[460px]">
              <div className="w-full md:w-[55%] border-b md:border-b-0 md:border-r border-border">
                <img
                  src={resume.previewUrl}
                  alt={`Preview of ${resume.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-[45%] flex flex-col">
                <div className="p-8 border-b border-border">
                  <h3 className="text-sm font-medium text-blue-500 dark:text-blue-400 mb-3">
                    {resume.name}
                  </h3>
                  <p className="text-base font-medium text-foreground mb-4">
                    {resume.displayName}
                  </p>
                  <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Edited {resume.lastEdited}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    Add a label
                  </Button>
                </div>

                <div className="flex-1 flex flex-col py-4">
                  {[
                    { icon: Pencil, label: "Edit", handler: handleEdit },
                    {
                      icon: Copy,
                      label: "Duplicate",
                      handler: handleDuplicate,
                    },
                    {
                      icon: Download,
                      label: "Download",
                      handler: handleDownload,
                    },
                    {
                      icon: Trash2,
                      label: "Delete",
                      handler: handleDelete,
                      className: "text-red-600 dark:text-red-400",
                    },
                  ].map(({ icon: Icon, label, handler, className = "" }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      className={`flex items-center gap-3 justify-start px-8 py-3 text-sm text-foreground ${className}`}
                      onClick={() => handler(resume.id)}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
