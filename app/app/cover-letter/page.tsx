"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import HardBreak from "@tiptap/extension-hard-break";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EditorToolbar } from "@/components/editor-toolbar";
import "../../styles/tiptap.css";

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    hiring_manager: "",
    job_description: "",
    tone: "professional",
    template: "modern",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      Document,
      StarterKit.configure({
        history: true,
        bulletList: false,
        orderedList: false,
      }),
      Paragraph,
      Text,
      Heading,
      Bold,
      Italic,
      HardBreak,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Start typing your cover letter...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[500px] focus:outline-none p-4",
      },
    },
    onCreate({ editor }) {
      editor.commands.setContent("");
    },
    onUpdate({ editor }) {
      // Handle content updates if needed
      console.log("Content updated:", editor.getText());
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }

      const data = await response.json();
      if (data.cover_letter && editor) {
        // Format the content with proper line breaks
        const formattedContent = data.cover_letter
          .split("\n")
          .map((line) => `<p>${line}</p>`)
          .join("");

        editor.commands.setContent(formattedContent);
      } else {
        throw new Error("No cover letter content received");
      }
    } catch (err) {
      setError("Failed to generate cover letter. Please try again.");
      console.error("Cover letter generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = useCallback(() => {
    if (editor) {
      navigator.clipboard.writeText(editor.getText());
    }
  }, [editor]);

  // Handle download
  const handleDownload = useCallback(() => {
    if (editor) {
      const text = editor.getText();
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cover-letter.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [editor]);

  return (
     <div className="min-h-screen bg-[#e8e8e8] py-2 flex flex-col">
      <div className="w-full h-full bg-white p-4 shadow-sm rounded-md flex flex-col flex-1">
        {/* Header */}

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 gap-6 p-4">
          {/* Left Column - Form */}
          <div className="col-span-6">
            <ScrollArea className="h-full">
              <div className="space-y-6 pr-4">
                {/* Job Details */}
                <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-4">
                    Job Details
                  </h3>
                  <p className="text-gray-600 text-[13px] mb-4">
                    Provide job information to generate a personalized cover
                    letter
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                          Company Name *
                        </Label>
                        <Input
                          type="text"
                          placeholder="e.g. Google"
                          value={formData.company_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company_name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                      <div>
                        <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                          Position *
                        </Label>
                        <Input
                          type="text"
                          placeholder="e.g. Software Engineer"
                          value={formData.position}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              position: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                        Hiring Manager (Optional)
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={formData.hiring_manager}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hiring_manager: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
                      />
                    </div>

                    <div>
                      <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                        Job Description
                      </Label>
                      <Textarea
                        rows={4}
                        placeholder="Paste the job description here..."
                        value={formData.job_description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            job_description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                          Tone
                        </Label>
                        <Select
                          value={formData.tone}
                          onValueChange={(value) =>
                            setFormData({ ...formData, tone: value })
                          }
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]">
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">
                              Professional
                            </SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="enthusiastic">
                              Enthusiastic
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                          Template
                        </Label>
                        <Select
                          value={formData.template}
                          onValueChange={(value) =>
                            setFormData({ ...formData, template: value })
                          }
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]">
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-white py-3 rounded-lg text-[14px] font-medium"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Generating..." : "Generate Cover Letter"}
                    </Button>

                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-[12px] text-red-800">{error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Preview */}
          <div className="col-span-6">
            <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[18px] font-bold text-gray-900">
                  Live Preview
                  <div className="flex gap-4 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCopy}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button className="flex-1" onClick={handleDownload}>
                      Download as TXT
                    </Button>
                  </div>
                </h3>
              </div>

              <div className="bg-white h-full rounded-lg p-6 flex flex-col flex-1">
                <EditorToolbar editor={editor} />

                <EditorContent
                  editor={editor}
                  className="max-h-[490px] border rounded-lg p-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 overflow-x-scroll"
                />
              </div>
{/* 
              {editor?.getText().length > 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-[12px] text-green-800 font-medium">
                    Cover Letter Generated
                  </p>
                  <p className="text-[11px] text-green-600">
                    Your personalized cover letter is ready
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
