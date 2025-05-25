"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
}

export const ChatInput = ({ onSendMessage, isGenerating }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    if (!inputMessage.trim() || isGenerating) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  }, [inputMessage, isGenerating, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const isInputDisabled = isGenerating || !inputMessage.trim();

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <Textarea
          placeholder="Type your message here..."
          className="min-h-[80px] max-h-[200px] overflow-y-auto px-4 py-3 pr-12 bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 border-0 resize-none focus:ring-0 rounded-xl text-sm"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="absolute bottom-3 right-3 p-2 h-auto rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white transition-colors"
          onClick={handleSendMessage}
          disabled={isInputDisabled}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
