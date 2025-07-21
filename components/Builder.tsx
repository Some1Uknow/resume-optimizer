"use client";

import { useCallback, useMemo, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeDisplay } from "@/components/resume/ResumeDisplay";
import { ChatModal } from "@/components/chat-modal";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { ANIMATION_VARIANTS } from "@/constants/resume";

export default function BuilderPage({ session, params, initialChatData }) {
  if (!session) redirect("/signin");

  const { id } = params;
  const router = useRouter();
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const {
    messages,
    resumeData,
    isGenerating,
    showResume,
    hasInteracted,
    sendMessage,
    updateResumeData,
  } = useChat({ initialChatData });

  const handleNewChat = useCallback(() => {
    const newChatId = uuidv4();
    router.push(`/app/builder/${newChatId}`);
  }, [router]);

  const handleSendMessage = useCallback(
    (message: string) => {
      sendMessage(message, id);
      setInputValue(""); // Clear input after sending
    },
    [sendMessage, id]
  );

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
  }, []);

  const toggleChatModal = useCallback(() => {
    setIsChatModalOpen((prev) => !prev);
  }, []);

  const chatColumnClass = useMemo(
    () =>
      `flex flex-col h-full min-h-0 transition-all duration-300 ${
        hasInteracted ? "md:col-span-1" : "md:col-span-2"
      }`,
    [hasInteracted]
  );

  return (
    <div className="flex flex-col h-screen bg-[#e8e8e8] text-gray-900">
      <ChatHeader
        session={session}
        onNewChat={handleNewChat}
        onToggleChatModal={toggleChatModal}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-0">
        <div className={chatColumnClass}>
          <ChatMessages
            messages={messages}
            isGenerating={isGenerating}
            hasInteracted={hasInteracted}
            onSuggestionClick={handleSuggestionClick}
          />
          <ChatInput
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
            inputValue={inputValue}
            onInputChange={setInputValue}
          />
        </div>

        <AnimatePresence>
          {hasInteracted && (
            <motion.div
              {...ANIMATION_VARIANTS.resume}
              className="hidden md:flex flex-col h-full min-h-0 overflow-hidden bg-white border-l border-gray-200"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
                <h2 className="font-semibold text-lg text-gray-900">
                  Resume Preview
                </h2>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f59e42]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                </div>
              </div>

              <ScrollArea className="flex-1 min-h-0">
                {showResume ? (
                  <div className="p-6">
                    <ResumeDisplay
                      data={resumeData}
                      handleDataChange={updateResumeData}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-center p-10 text-gray-500">
                    <p className="text-[14px] leading-relaxed">Your resume will appear here once generated</p>
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChatModal isOpen={isChatModalOpen} onClose={toggleChatModal} />
    </div>
  );
}