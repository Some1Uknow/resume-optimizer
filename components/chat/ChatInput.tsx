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
  const handleValueChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value);
    } else {
      setInputMessage(value);
    }
  };

  const handleSendMessage = useCallback(() => {
    if (!currentValue.trim() || isGenerating) return;
    onSendMessage(currentValue);
    handleValueChange("");
  }, [currentValue, isGenerating, onSendMessage]);

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
    <div className="p-6 bg-background border-t border-border flex-shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-muted rounded-xl border border-border">
          <Textarea
            placeholder="Paste your resume or describe what you want to improve..."
            className="min-h-[80px] max-h-[200px] overflow-y-auto px-4 py-3 pr-12 bg-transparent text-foreground placeholder:text-muted-foreground border-0 resize-none focus:ring-0 rounded-xl text-sm"
            value={currentValue}
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button
              className="p-2 h-auto rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
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
