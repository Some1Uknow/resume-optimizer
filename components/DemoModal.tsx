"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black">
        <DialogHeader className="sr-only">
          <DialogTitle>ResumeMax Demo Video</DialogTitle>
        </DialogHeader>
        
        {/* Close button overlay */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* YouTube iframe */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://www.youtube.com/embed/Al0yKjtmJrw?autoplay=1&rel=0&modestbranding=1"
            title="ResumeMax Demo"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
