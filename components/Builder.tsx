"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, User, Bot, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import { ResumeData } from "@/utils/types";
import { ResumeDisplay } from "@/components/resume/ResumeDisplay";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export default function BuilderPage({ session, params, initialChatData }) {
  if (!session) redirect("/signin");
  const { id } = params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>(
    initialChatData?.resumeData || getEmptyResume()
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [showResume, setShowResume] = useState(() => !!initialChatData);
  const [hasInteracted, setHasInteracted] = useState(() => !!initialChatData || messages.length > 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialChatData) {
      setMessages([]);
      setResumeData(getEmptyResume());
      setShowResume(false);
      setHasInteracted(false);
      return;
    }

    const { messages: chatMessages, resumeData: chatResumeData } = initialChatData;
    const flattenedMessages = Array.isArray(chatMessages) ? chatMessages.flat() : [];

    setMessages(flattenedMessages);
    setResumeData(chatResumeData || getEmptyResume());
    setShowResume(true);
    setHasInteracted(true);
  }, [initialChatData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cleanMessage = useCallback((text: string) => {
    return text.replace(/Resume Data: {.*}/s, "").trim();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const cleanedText = cleanMessage(inputMessage);

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: cleanedText }],
    };

    if (!hasInteracted) setHasInteracted(true);
    if (!showResume) setShowResume(true);
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedMessages,
          resumeData,
          chatId: id,
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen bg-gray-50 dark:bg-gray-950 text-black dark:text-white overflow-hidden">
      {/* Chat Section - Left Column */}
      <div 
        ref={chatContainerRef}
        className={`flex flex-col h-screen border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          hasInteracted ? "md:col-span-1" : "md:col-span-2"
        }`}
      >
        {/* Messages area - scrollable */}
        <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-gray-950">
          {/* Welcome overlay - shown when no messages */}
          <AnimatePresence>
            {!hasInteracted && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-gray-50 to-gray-50 dark:from-gray-950 dark:to-gray-950"
              >
                <div className="text-center space-y-6 max-w-lg p-8">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Welcome to ResumeMax
                    </h1>
                  </motion.div>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-700 dark:text-gray-300"
                  >
                    Start chatting with our AI assistant to begin building your
                    perfect resume. Just type your first message below and watch your resume take shape.
                  </motion.p>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex justify-center gap-2">
                      <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></div>
                      <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]"></div>
                      <div className="inline-flex h-2 w-2 animate-bounce rounded-full bg-blue-400"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ScrollArea className="h-full p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 bg-gray-50 dark:bg-gray-950">
            <div className="space-y-6 pb-4">
              {messages?.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full max-w-[85%] flex items-start gap-3 ${
                    message.role === "user"
                      ? "ml-auto flex-row-reverse text-right"
                      : "mr-auto flex-row text-left"
                  }`}
                >
                  <div className={`flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0 ${
                    message.role === "user" 
                      ? "bg-blue-100 dark:bg-blue-900" 
                      : "bg-purple-100 dark:bg-purple-900"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    ) : (
                      <Bot className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                    )}
                  </div>
                  <div>
                    {message.parts.map((part, i) => (
                      <div
                        key={i}
                        className={`whitespace-pre-wrap text-sm backdrop-blur-md p-4 rounded-2xl shadow-sm ${
                          message.role === "user"
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {part.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 shadow-sm p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-3 text-sm"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-300" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Generating response...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input area - fixed at bottom */}
        <div className="p-6 bg-gray-50 dark:bg-gray-950">
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
              disabled={isGenerating || !inputMessage.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Resume Preview Section - Right Column */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="hidden md:block h-screen overflow-hidden bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Resume Preview</h2>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-57px)]">
              {showResume ? (
                <div className="p-6">
                  <ResumeDisplay
                    data={resumeData}
                    handleDataChange={(updater) =>
                      setResumeData((prev) => {
                        const updated = { ...prev };
                        updater(updated);
                        return updated;
                      })
                    }
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-center p-10 text-gray-500 dark:text-gray-400">
                  <p>Your resume will appear here once generated</p>
                </div>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------
// Helpers
// ---------------------

function getEmptyResume() {
  return {
    name: "",
    title: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      blogs: "",
    },
    summary: "",
    experience: [
      { title: "", company: "", location: "", period: "", description: "" },
    ],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [],
    projects: [{ name: "", description: "", techStack: [] }],
    achievements: [],
  };
}