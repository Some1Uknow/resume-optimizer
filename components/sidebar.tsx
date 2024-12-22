import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Settings, User, PenTool, BarChart, History, HelpCircle, LogOut } from 'lucide-react'

const sidebarItems = [
  { icon: FileText, label: "My Resumes", href: "/dashboard" },
  { icon: PenTool, label: "Resume Builder", href: "/dashboard/builder" },
  { icon: FileText, label: "Cover Letter Generator", href: "/dashboard/cover-letter" },
  { icon: BarChart, label: "ATS Optimization", href: "/dashboard/ats" },
  { icon: History, label: "Version Control", href: "/dashboard/versions" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/support" },
]

export function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
            <FileText className="h-6 w-6" />
            <span className="">ResumeAI</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2 py-4">
            {sidebarItems.map((item) => (
              <Button key={item.label} asChild className="w-full justify-start px-4" variant="ghost">
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-auto p-4">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}

