// src/actions/chat-actions.ts
"use server";

import db from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function editChatTitle(id: string, title: string) {
  if (!title) throw new Error("Invalid title");
  await db.chat.update({ where: { id }, data: { title } });
  revalidatePath("/builder");
}

export async function deleteChat(id: string) {
  await db.chat.delete({ where: { id } });
  revalidatePath("/builder");
}
