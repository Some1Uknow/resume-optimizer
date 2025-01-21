import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, PenTool, BarChart, LogOut } from "lucide-react";

const sidebarItems = [
  { icon: FileText, label: "My Resumes", href: "/dashboard" },
  { icon: PenTool, label: "Resume Builder", href: "/dashboard/builder" },
  { icon: FileText, label: "Cover Letter Generator", href: "/dashboard/cover-letter" },
  { icon: BarChart, label: "Analyze and Optimize", href: "/dashboard/analyze" },
];

export function Sidebar() {
  return (
    <div className="hidden max-h-screen bg-white lg:block w-72 shadow-lg rounded-lg mx-4 my-4">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-[60px] items-center  px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-gray-800">ResumeAI</span>
          </Link>
        </div>

        {/* Scrollable Menu Items */}
        <ScrollArea className="flex-1">
          <div className="space-y-2 py-4 px-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                asChild
                className="w-full justify-start px-4 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                variant="ghost"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}