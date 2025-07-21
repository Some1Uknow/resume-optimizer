"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export const ChatInput = ({
  onSendMessage,
  isGenerating,
  inputValue,
  onInputChange,
}: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  // Use controlled input if inputValue and onInputChange are provided
  const currentValue = inputValue !== undefined ? inputValue : inputMessage;
  const handleValueChange = useCallback((value: string) => {
    if (onInputChange) {
      onInputChange(value);
    } else {
      setInputMessage(value);
    }
  }, [onInputChange]);

  const handleSendMessage = useCallback(() => {
    if (!currentValue.trim() || isGenerating) return;
    onSendMessage(currentValue);
    handleValueChange("");
  }, [currentValue, isGenerating, onSendMessage, handleValueChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const isInputDisabled = isGenerating || !currentValue.trim();

  return (
    <div className="p-6 border-t border-gray-200 flex-shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-white rounded-[32px] border border-gray-200 shadow-sm">
          <Textarea
            placeholder="Paste your resume or describe what you want to improve..."
            className="min-h-[80px] max-h-[200px] overflow-y-auto px-6 py-4 pr-16 bg-white text-gray-900 placeholder:text-gray-500 border-0 resize-none focus:ring-0 rounded-[32px] text-[14px] leading-relaxed"
            value={currentValue}
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <Button
              className={`p-3 h-auto rounded-lg transition-all shadow-md hover:shadow-lg ${
                isInputDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#a855f7] to-[#7c3aed] hover:from-[#9333ea] hover:to-[#6d28d9] text-white"
              }`}
              onClick={handleSendMessage}
              disabled={isInputDisabled}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};