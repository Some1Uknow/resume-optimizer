import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, PenTool, BarChart, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { icon: FileText, label: "My Resumes", href: "/dashboard" },
  { icon: PenTool, label: "Resume Builder", href: "/dashboard/builder" },
  {
    icon: FileText,
    label: "Cover Letter Generator",
    href: "/dashboard/cover-letter",
  },
  { icon: BarChart, label: "Analyze and Optimize", href: "/dashboard/analyze" },
];

export function Sidebar() {
  return (
    <div className="h-screen bg-card dark:bg-card lg:block w-72 shadow-lg rounded-lg border border-border">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between px-6 border-b border-border">
          <Link
            className="flex items-center gap-2 font-semibold"
            href="/dashboard"
          >
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-foreground">ResumeMax</span>
          </Link>
          <ModeToggle />
        </div>

        {/* Scrollable Menu Items */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-2 py-4 px-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                asChild
                className="w-full justify-start px-4 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
        <div className="mt-auto p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <LogOut
              onClick={() => signOut({ redirectTo: "/" })}
              className="mr-2 h-4 w-4"
            />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
