"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, User, Bot } from "lucide-react";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import { ResumeData } from "@/utils/types";
import { ResumeDisplay } from "@/components/resume/ResumeDisplay";

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
  // Use initialChatData to decide initial state
  const [showResume, setShowResume] = useState(() => !!initialChatData);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log("BuilderPage initialChatData: ", resumeData);

  useEffect(() => {
    // Use initialChatData here
    if (!initialChatData) {
      // Handle case where no initial data is provided (e.g., new chat, or error)
      // Reset state if necessary, or rely on default useState values
      setMessages([]);
      setResumeData(getEmptyResume());
      setShowResume(false); // Or true depending on desired behavior for non-existent chat ID
      return;
    }

    const { messages: chatMessages, resumeData: chatResumeData } =
      initialChatData;

    // Ensure messages is always an array, even if null/undefined in DB
    const flattenedMessages = Array.isArray(chatMessages)
      ? chatMessages.flat()
      : [];

    setMessages(flattenedMessages);
    setResumeData(chatResumeData || getEmptyResume());
    setShowResume(true);
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

    if (!showResume) setShowResume(true);
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // Update UI immediately
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

  const { theme } = useTheme();

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 w-full h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"
      } overflow-hidden`}
    >
    
      {/* Chat Section - Left Column */}
      <div
        className={`flex flex-col h-screen border-r ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
        }`}
      >
        {/* Messages area - scrollable */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea
            className={`h-full p-4 pl-0 ${
              theme === "dark"
                ? "scrollbar-thin scrollbar-thumb-gray-700"
                : "scrollbar-thin scrollbar-thumb-gray-300"
            }`}
          >
            <div className="space-y-4 pb-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`w-full max-w-[85%] flex items-center gap-2 ${
                    message.role === "user"
                      ? "ml-auto flex-row-reverse text-right"
                      : "mr-auto flex-row text-left"
                  }`}
                >
                  <div>
                    {message.role === "user" ? (
                      <User
                        className={`h-4 w-4 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      />
                    ) : (
                      <Bot
                        className={`h-4 w-4 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    {message.parts.map((part, i) => (
                      <p
                        key={i}
                        className={`whitespace-pre-wrap text-sm backdrop-blur-md ${
                          theme === "dark"
                            ? "bg-white/10 border-white/20"
                            : "bg-gray-200 border-white/10"
                        } p-4 rounded-2xl`}
                      >
                        {part.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-2 text-sm">
                  <Loader2
                    className={`h-4 w-4 animate-spin ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  />
                  Generating response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input area - fixed at bottom */}
        <div
          className={`p-4 border mr-6 mb-4 rounded-lg ${
            theme === "dark"
              ? "border-gray-700 bg-black"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Start chatting to create your resume"
              className={`min-h-[80px] ${
                theme === "dark"
                  ? "bg-white/5 text-white placeholder:text-white/50 border-white/10"
                  : "bg-white/80 text-black placeholder:text-black/50 border-black/10"
              }`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              onClick={handleSendMessage}
              disabled={isGenerating || !inputMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {/* Resume Preview Section - Right Column */}
      <div className="hidden md:block h-screen bg-neutral overflow-hidden">
        <ScrollArea className="h-full">
          {showResume ? (
            <ResumeDisplay
              data={resumeData}
              handleDataChange={(updater) =>
                setResumeData((prev) => {
                  const updated = { ...prev }; // Ensure `prev` is an object
                  updater(updated); // Apply the updater function
                  return updated; // Return the updated object
                })
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center p-10 dark:text-white text-black">
              <div className="space-y-6 ">
                <h1 className="text-4xl font-bold">Welcome to ResumeMax 👋</h1>
                <p className="text-lg max-w-xl mx-auto">
                  Start chatting with our AI assistant to begin building your
                  perfect resume. Just type your first message and let the magic
                  unfold.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
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
