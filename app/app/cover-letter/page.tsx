"use client";

import { useState, useCallback } from "react";
import { useEditor } from "@tiptap/react";
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
import "../../styles/tiptap.css";
import { CoverLetterForm } from "@/components/cover-letter/CoverLetterForm";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { CoverLetterPageLayout } from "@/components/cover-letter/CoverLetterPageLayout";

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
     //   history: true,
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
    <CoverLetterPageLayout
      left={
        <CoverLetterForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      }
      right={
        <CoverLetterPreview
          editor={editor}
          handleCopy={handleCopy}
          handleDownload={handleDownload}
        />
      }
    />
  );
}
