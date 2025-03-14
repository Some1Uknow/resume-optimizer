import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, PenTool, BarChart } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SignOut } from "./sign-out";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export async function Sidebar() {
  const session = await auth();
  if (!session) {
    redirect("/");
    toast.error("User is not signed in");
  }
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

        {/* User Card */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-border">
          <Avatar className="h-9 w-9">
            <AvatarImage src={session.user?.image ?? ""} />
            <AvatarFallback>
              {session.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sm">{session.user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-border">
          <SignOut />
        </div>
      </div>
    </div>
  );
}
