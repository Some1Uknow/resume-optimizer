import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { chatId, newName } = req.body;

    if (!chatId || !newName) {
      return res.status(400).json({ error: "Chat ID and new name are required." });
    }

    // Simulate updating the chat name in the database
    // Replace this with actual database logic
    console.log(`Updating chat ${chatId} to new name: ${newName}`);

    return res.status(200).json({ message: "Chat name updated successfully." });
  }

  return res.status(405).json({ error: "Method not allowed." });
}