"use client";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row bg-background h-screen">
      <div className="sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-6 px-4">{children}</div>
      </main>
    </div>
  );
}
