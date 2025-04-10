import { auth } from "@/auth";
import BuilderPage from "../../../components/Builder"; // Adjust path if necessary
import db from "@/prisma/prisma";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth(); // Still needed for auth check and potentially BuilderPage

  // It's good practice to double-check auth even if layout does
  if (!session?.user?.id) {
    redirect("/signin");
  }

  // --- Fetch ONLY the specific chat data here ---
  const chat = await db.chat.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      messages: true,
      resumeData: true,
      resumeTemplate: true,
    },
  });

  return (
    <BuilderPage session={session} params={params} initialChatData={chat} />
  );
}
