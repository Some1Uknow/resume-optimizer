"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";

interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export default function BuilderPage({ session, params, chats }) {
  if (!session) redirect("/signin");
  const { id } = params;
  // console.log(chats)
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [resumeData, setResumeData] = useState(getEmptyResume());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(() => chats && chats.length > 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chats) return;
  
    const { messages: chatMessages, resumeData: initialResumeData } = chats;
  
    setMessages(chatMessages);
    setResumeData(initialResumeData || getEmptyResume());
    setShowResume(true);
  }, [chats]);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: inputMessage }],
    };

    if (!showResume) setShowResume(true);
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages, userMessage],
          resumeData,
          chatId: id,
        }),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const { response: botRaw } = await response.json();
      console.log("AI response:", botRaw);
      console.log(botRaw.acknowledgement);
      console.log("Resume data:", botRaw.updatedSection);
   //   const cleanedText = cleanJSON(botRaw[0]);
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
    <div className="flex flex-col w-full bg-black text-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Chat Section */}
        <div className="flex flex-col h-screen border-r border-gray-800">
          <ScrollArea className="flex-1 p-4 h-[calc(100vh-150px)] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-2xl max-w-[80%]",
                    message.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
                  )}
                >
                  {message.parts.map((part, i) => (
                    <p key={i} className="whitespace-pre-wrap text-sm">
                      {part.text}
                    </p>
                  ))}
                </div>
              ))}
              {isGenerating && (
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-gray-800 bg-black">
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Start chatting to create your resume"
                className="min-h-[80px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                className="bg-white text-black hover:bg-gray-300"
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="hidden md:flex flex-col h-full relative bg-zinc-950">
          {showResume ? (
            <ResumePreview data={resumeData} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center p-10">
              <div className="space-y-6 text-white">
                <h1 className="text-4xl font-bold">Welcome to ResumeMax 👋</h1>
                <p className="text-lg text-white/70 max-w-xl mx-auto">
                  Start chatting with our AI assistant to begin building your perfect resume.
                  Just type your first message and let the magic unfold.
                </p>
              </div>
            </div>
          )}
        </div>
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
    experience: [{ title: "", company: "", location: "", period: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [],
    projects: [{ name: "", description: "", techStack: [] }],
    achievements: [],
  };
}

function cleanJSON(text: string) {
  return text.replace(/```json|```/g, "").trim();
}

function isParsableJSON(text: string) {
  try {
    const cleaned = cleanJSON(text);
    JSON.parse(cleaned);
    return true;
  } catch {
    return false;
  }
}
