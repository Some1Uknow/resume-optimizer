import { useState, useCallback, useMemo } from "react";
import { ChatMessage } from "@/types/chat";
import { ResumeData } from "@/utils/types";
import { EMPTY_RESUME } from "@/constants/resume";

interface UseChatProps {
  initialChatData?: any;
}

export const useChat = ({ initialChatData }: UseChatProps) => {
  const initialState = useMemo(() => {
    if (!initialChatData) {
      return {
        messages: [],
        resumeData: EMPTY_RESUME,
        showResume: false,
        hasInteracted: false,
      };
    }

    const { messages: chatMessages, resumeData: chatResumeData } = initialChatData;
    const flattenedMessages = Array.isArray(chatMessages) ? chatMessages.flat() : [];

    return {
      messages: flattenedMessages,
      resumeData: chatResumeData || EMPTY_RESUME,
      showResume: true,
      hasInteracted: true,
    };
  }, [initialChatData]);

  const [messages, setMessages] = useState<ChatMessage[]>(initialState.messages);
  const [resumeData, setResumeData] = useState<ResumeData>(initialState.resumeData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(initialState.showResume);
  const [hasInteracted, setHasInteracted] = useState(initialState.hasInteracted);

  const cleanMessage = useCallback((text: string) => {
    return text.replace(/Resume Data: {.*}/s, "").trim();
  }, []);

  const sendMessage = useCallback(async (message: string, chatId: string) => {
    if (!message.trim() || isGenerating) return;

    const cleanedText = cleanMessage(message);
    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: cleanedText }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    if (!hasInteracted) setHasInteracted(true);
    if (!showResume) setShowResume(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages, userMessage],
          resumeData,
          chatId,
        }),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const { response: botRaw } = await response.json();
      const parsed = botRaw;

      const botMessage: ChatMessage = {
        role: "model",
        parts: [{ text: parsed.acknowledgement }],
      };

      setMessages((prev) => [...prev, botMessage]);
      setResumeData((prev) => ({
        ...prev,
        ...parsed.updatedSection,
      }));
    } catch (error) {
      console.error("❌ AI message error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "⚠️ AI response parsing failed." }] },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, [messages, resumeData, isGenerating, hasInteracted, showResume, cleanMessage]);

  const updateResumeData = useCallback((updater: (data: ResumeData) => void) => {
    setResumeData((prev) => {
      const updated = { ...prev };
      updater(updated);
      return updated;
    });
  }, []);

  return {
    messages,
    resumeData,
    isGenerating,
    showResume,
    hasInteracted,
    sendMessage,
    updateResumeData,
  };
};
