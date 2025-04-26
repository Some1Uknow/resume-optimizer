import { NextApiRequest, NextApiResponse } from "next";
import db from "@/prisma/prisma";
import { auth } from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await auth();

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const chats = await db.chat.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
      },
    });

    return res.status(200).json(chats);
  }

  return res.status(405).json({ error: "Method not allowed" });
}