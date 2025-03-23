"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { logout } from "@/components/sign-out";
import {
  Download,
  FileText,
  Settings,
  Sparkles,
  Send,
  Loader2,
  Menu,
  X,
  Home,
  History,
  BookOpen,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import ResumePreview from "@/components/resume-preview";
import Link from "next/link";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function BuilderPage({ session }) {
  if (!session) {
    toast("Login Please");
    redirect("/signin");
  }

  const isMobile = useMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
 // const [activeTab, setActiveTab] = useState("input");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Welcome to ResumeAI! I'll help you create a professional resume. Start by telling me about your experience, skills, or education.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [resumeData, setResumeData] = useState({
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    contact: {
      email: "alex@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
    },
    summary:
      "Experienced software engineer with 8+ years of expertise in building scalable web applications and leading development teams.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        period: "2020 - Present",
        description:
          "Led development of cloud-based SaaS platform serving 100K+ users. Improved system performance by 40% through architecture optimization.",
      },
      {
        title: "Software Engineer",
        company: "WebSolutions LLC",
        location: "San Francisco, CA",
        period: "2017 - 2020",
        description:
          "Developed and maintained RESTful APIs and microservices. Implemented CI/CD pipelines reducing deployment time by 60%.",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        year: "2017",
      },
      {
        degree: "B.S. Computer Science",
        institution: "UC Berkeley",
        location: "Berkeley, CA",
        year: "2015",
      },
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "CI/CD",
      "Agile",
    ],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Update sidebar state when switching between mobile and desktop
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      processUserInput(userMessage.content);
    }, 1000);
  };

  const processUserInput = async (input) => {
    try {
      // This is a simulation of AI processing
      // In a real implementation, you would use the AI SDK to process the input

      // For demo purposes, we'll just update based on some keywords
      const newResumeData = { ...resumeData };
      let aiResponse = "I've updated your resume based on your input.";

      if (input.toLowerCase().includes("software developer")) {
        newResumeData.title = "Software Developer";
        aiResponse = "I've updated your job title to Software Developer.";
      }

      if (input.toLowerCase().includes("add project")) {
        newResumeData.experience = [
          {
            title: "Project Lead",
            company: "Open Source Initiative",
            location: "Remote",
            period: "2021 - Present",
            description:
              "Leading development of an open-source project with 500+ stars on GitHub.",
          },
          ...newResumeData.experience,
        ];
        aiResponse =
          "I've added your open source project experience to your resume.";
      }

      if (input.toLowerCase().includes("python")) {
        newResumeData.skills = [
            // @ts-expect-error minor error
          ...new Set([...newResumeData.skills, "Python", "Django", "Flask"]),
        ];
        aiResponse =
          "I've added Python, Django, and Flask to your skills section.";
      }

      if (input.toLowerCase().includes("google")) {
        newResumeData.experience = [
          {
            title: "Senior Software Engineer",
            company: "Google",
            location: "Mountain View, CA",
            period: "2018 - 2022",
            description:
              "Led a team of 5 engineers on the Cloud Platform. Implemented a new authentication system that improved security by 40%.",
          },
          ...newResumeData.experience.slice(1),
        ];
        aiResponse =
          "I've updated your experience to include your role at Google from 2018-2022.";
      }

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "system", content: aiResponse }]);
      setResumeData(newResumeData);
      setIsGenerating(false);

      // On mobile, show the preview after updating
      if (isMobile) {
        setShowMobilePreview(true);
      }
    } catch (error) {
      console.error("Error processing input:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarLinks = [
    { icon: <Home className="h-5 w-5" />, text: "Dashboard", active: true },
    { icon: <History className="h-5 w-5" />, text: "History" },
    { icon: <BookOpen className="h-5 w-5" />, text: "Templates" },
    { icon: <HelpCircle className="h-5 w-5" />, text: "Help" },
  ];

  const renderMobileView = () => (
    <div className="flex-1 container px-4 py-6">
      <div className="flex flex-col h-full">
        {showMobilePreview ? (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                Resume Preview
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setShowMobilePreview(false)}
              >
                Back to Chat
              </Button>
            </div>
            <Card className="flex-1 p-6 overflow-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
              <ResumePreview data={resumeData} />
            </Card>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                AI Assistant
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setShowMobilePreview(true)}
              >
                View Resume
              </Button>
            </div>
            <Card className="flex-1 p-4 overflow-hidden flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-1">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex max-w-[80%] rounded-2xl p-4 shadow-sm",
                      message.role === "user"
                        ? "bg-blue-50 dark:bg-blue-900/20 ml-auto"
                        : "bg-white dark:bg-slate-800 mr-auto"
                    )}
                  >
                    <p className="text-slate-800 dark:text-slate-200">
                      {message.content}
                    </p>
                  </div>
                ))}
                {isGenerating && (
                  <div className="bg-white dark:bg-slate-800 max-w-[80%] rounded-2xl p-4 shadow-sm mr-auto">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Generating response...
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Describe your experience, skills, or education..."
                  className="min-h-[80px] resize-none rounded-2xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isGenerating || !inputMessage.trim()}
                  className="rounded-full h-10 w-10 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  const renderDesktopView = () => (
    <div className="flex-1 container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              AI Assistant
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Suggest Improvements
            </Button>
          </div>
        </div>
        <Card className="flex-1 p-4 overflow-hidden flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex max-w-[80%] rounded-2xl p-4 shadow-sm",
                  message.role === "user"
                    ? "bg-blue-50 dark:bg-blue-900/20 ml-auto"
                    : "bg-white dark:bg-slate-800 mr-auto"
                )}
              >
                <p className="text-slate-800 dark:text-slate-200">
                  {message.content}
                </p>
              </div>
            ))}
            {isGenerating && (
              <div className="bg-white dark:bg-slate-800 max-w-[80%] rounded-2xl p-4 shadow-sm mr-auto">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Generating response...
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Describe your experience, skills, or education..."
              className="min-h-[80px] resize-none rounded-2xl border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isGenerating || !inputMessage.trim()}
              className="rounded-full h-10 w-10 p-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
            Resume Preview
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
        <Card
          className={cn(
            "flex-1 p-6 overflow-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl h-[calc(100vh-180px)]",
            isGenerating && "opacity-70"
          )}
        >
          <ResumePreview data={resumeData} />
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Blob decorations */}
      <div className="fixed -z-10 top-0 left-0 w-[40%] h-[40%] rounded-full bg-gradient-to-r from-purple-200/30 to-blue-200/30 dark:from-purple-900/20 dark:to-blue-900/20 blur-3xl"></div>
      <div className="fixed -z-10 bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-l from-indigo-200/30 to-sky-200/30 dark:from-indigo-900/20 dark:to-sky-900/20 blur-3xl"></div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-20 transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 md:opacity-0 md:pointer-events-none" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      ></div>
      
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 shadow-lg z-30 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                  ResumeAI
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {sidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  href="#"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    link.active 
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
            <Button onClick={()=>logout()} variant="ghost" className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen && "md:ml-64"
      )}>
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>
    </div>
  );
}