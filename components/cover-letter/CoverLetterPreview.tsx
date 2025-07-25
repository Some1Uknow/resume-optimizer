import { Button } from "@/components/ui/button";
import { EditorToolbar } from "@/components/editor-toolbar";
import { EditorContent } from "@tiptap/react";
import React from "react";
import jsPDF from "jspdf";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useRef, useState } from "react";

interface CoverLetterPreviewProps {
  editor: any;
  handleCopy: () => void;
  handleDownload: () => void;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  editor,
  handleCopy,
  handleDownload,
}) => {
  const htmlExportRef = useRef<HTMLDivElement>(null);
  const [htmlReady, setHtmlReady] = useState(false);

  // PDF export with formatting
  const handleDownloadPDF = async () => {
    if (!editor) return;
    setHtmlReady(true);
    // wait for DOM to paint
    await new Promise((r) => setTimeout(r, 150));
    if (!htmlExportRef.current) return;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    await doc.html(htmlExportRef.current, {
      margin: [40, 40, 40, 40],
      autoPaging: "text",
      x: 20, // ← nudge right to center
      y: 0,
      html2canvas: { scale: 0.7 },
      callback: function (doc) {
        doc.save("cover-letter.pdf");
        setHtmlReady(false);
      },
    });
  };

  // DOCX export
  const handleDownloadDocx = () => {
    if (!editor) return;
    const html = `<html><body>${editor.getHTML()}</body></html>`;
    const converted = htmlDocx.asBlob(html);
    const url = URL.createObjectURL(converted);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6 h-full flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-[18px] font-bold text-gray-900">Live Preview</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            Download as TXT
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>
          <Button variant="outline" onClick={handleDownloadDocx}>
            Download as DOCX
          </Button>
        </div>
      </div>
      <div className="bg-white h-full rounded-lg p-6 flex flex-col flex-1">
        <EditorToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className="max-h-[490px] border rounded-lg p-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500 overflow-x-scroll"
        />
        {/* Hidden HTML for PDF export */}
        {htmlReady && (
          <div
            ref={htmlExportRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 615, // ← slightly wider to avoid left clip
              minHeight: 842,
              background: "white",
              padding: 40,
              zIndex: -1,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center", // center children
            }}
            aria-hidden="true"
          >
            <div
              style={{
                maxWidth: 515, // actual content width
                width: "100%",
              }}
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
            />
          </div>
        )}
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
      )}
      */}
    </div>
  );
};
