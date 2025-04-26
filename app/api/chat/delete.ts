import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: "Chat ID is required." });
    }

    // Simulate deleting the chat from the database
    // Replace this with actual database logic
    console.log(`Deleting chat with ID: ${chatId}`);

    return res.status(200).json({ message: "Chat deleted successfully." });
  }

  return res.status(405).json({ error: "Method not allowed." });
}