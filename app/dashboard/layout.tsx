import { Sidebar } from "@/components/sidebar";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
/**
 * A layout component for the dashboard.
 *
 * Checks if the user is signed in, and redirects to the signin page if not.
 * Otherwise, renders the sidebar and the children within a flexbox row.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element} The rendered layout component.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
    return toast("User is not signed in");
  }

  return (
    <div
      className="flex flex-row bg-background h-screen"
      suppressHydrationWarning
    >
      <div className="sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-3 h-screen">{children}</div>
        <Toaster />
      </main>
    </div>
  );
}
