"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus, CheckCircle } from "lucide-react";

export function ConnectToolsSection() {
  const [selectedTool, setSelectedTool] = useState("linkedin");

  const tools = [
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Import your LinkedIn profile data instantly",
      icon: "💼",
      color: "bg-blue-600",
      connected: true
    },
    {
      id: "github",
      name: "GitHub",
      description: "Showcase your coding projects and contributions",
      icon: "🔧",
      color: "bg-gray-800",
      connected: true
    },
    {
      id: "google",
      name: "Google Drive",
      description: "Sync and backup your resumes automatically",
      icon: "📁",
      color: "bg-green-600",
      connected: false
    },
    {
      id: "dropbox",
      name: "Dropbox",
      description: "Store and share your resume files",
      icon: "📦",
      color: "bg-blue-500",
      connected: false
    },
    {
      id: "notion",
      name: "Notion",
      description: "Organize your career development workflow",
      icon: "📝",
      color: "bg-black",
      connected: false
    },
    {
      id: "slack",
      name: "Slack",
      description: "Share resume updates with your team",
      icon: "💬",
      color: "bg-purple-600",
      connected: false
    }
  ];

  const integrationSteps = [
    "Connect your favorite tools",
    "Sync data automatically",
    "Build better resumes faster"
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Connect with the tools you love
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Integrate with your existing workflow and import data from platforms you already use.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Integration preview */}
          <div className="relative">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Connected Tools
                </h3>
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tool
                </Button>
              </div>

              {/* Tools grid */}
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTool === tool.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{tool.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                          {tool.name}
                        </h4>
                        {tool.connected && (
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">Connected</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Integration steps */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-medium text-slate-900 dark:text-white mb-4">
                  How it works:
                </h4>
                <div className="space-y-3">
                  {integrationSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating connection indicators */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white dark:bg-slate-900 border-2 border-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Benefits */}
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Save time with auto-import
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Import your professional data from LinkedIn, GitHub, and other platforms 
                    in seconds instead of typing everything manually.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Stay synced automatically
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Keep your resume updated with the latest information from your 
                    connected accounts without manual updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Better data, better results
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    More comprehensive data means better AI optimization and 
                    higher-quality resume recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                View All Integrations
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
