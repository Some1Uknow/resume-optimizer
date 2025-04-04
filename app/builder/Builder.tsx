"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, LoaderIcon } from "lucide-react";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>; // ✅ Corrected type
}

export default function BuilderPage({ session }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputMessage, setInputMessage] = useState("");
  const [resumeData, setResumeData] = useState({
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
      {
        title: "",
        company: "",
        location: "",
        period: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        year: "",
      },
    ],
    skills: [],
    projects: [
      {
        name: "",
        description: "",
        techStack: [],
      },
    ],
    achievements: [],
  });
  

  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: inputMessage }],
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: [...messages, userMessage], resumeData }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { response: botRaw } = await response.json();
      console.log("AI Response:", botRaw);
  
      let parsed;
      const rawText = botRaw.parts[0].text;
      const cleanedText = rawText.replace(/```json|```/g, "").trim();
  
      try {
        parsed = JSON.parse(cleanedText);
      } catch (err) {
        console.error("❌ Failed to parse AI JSON:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: "⚠️ There was an error parsing the AI response." }],
          },
        ]);
        return;
      }
  
      const { acknowledgement, updatedSection } = parsed;
  
      // 👇 Step 2: Add acknowledgement to chat
      const botMessage: ChatMessage = {
        role: "model",
        parts: [{ text: acknowledgement }],
      };
      setMessages((prev) => [...prev, botMessage]);
  
      // 👇 Step 3: Merge updated section to resume state
      setResumeData((prev) => ({
        ...prev,
        ...updatedSection,
      }));
    } catch (error) {
      console.error("❌ Error sending message:", error);
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
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Chat Section */}
        <div className="flex flex-col h-screen border-r">
          <ScrollArea className="flex-1 p-4 h-[calc(100vh-150px)] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-2xl p-4",
                    message.role === "user"
                      ? "bg-blue-50 ml-auto text-right text-black"
                      : "bg-gray-200 mr-auto text-left text-black"
                  )}
                >
                  {/* ✅ Correctly rendering message parts */}
                  {message.parts.map((part, i) => (
                    <p key={i} className="break-words">
                      {part.text}
                    </p>
                  ))}
                </div>
              ))}

              {isGenerating && (
                <div className="bg-gray-100 max-w-[80%] rounded-2xl p-4 mr-auto">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p>
                      <LoaderIcon />
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Start chatting to create your resume"
                className="min-h-[80px]"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="hidden md:flex flex-col h-full">
         
            <ResumePreview data={resumeData} />
        
        </div>
      </div>
    </div>
  );
}
