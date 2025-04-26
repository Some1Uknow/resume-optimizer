import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";
import db from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { history, resumeData, chatId } = await req.json();

    if (!history || !Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { error: "Invalid or missing history" },
        { status: 400 }
      );
    }

    const latestUserMessage = history[history.length - 1]?.parts?.[0]?.text;
    if (!latestUserMessage || !resumeData || !chatId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `
        You are an AI resume assistant that helps users improve and build their resume.
        Always respond with a JSON object having exactly two keys:
        1. "acknowledgement"
        2. "updatedSection"
        Never return full resume or markdown.
        If no updates:
        {
          "acknowledgement": "No updates required.",
          "updatedSection": {}
        }
        If resume needs clearing, send full structure with empty values.
        Make sure that the JSON is valid and well-structured as it will be directly parsed by the frontend.
      `,
    });

    const chatSession = model.startChat({
      generationConfig: { temperature: 1, topP: 0.95 },
      history,
    });

    const prompt = `${latestUserMessage}\n\nResume Data: ${JSON.stringify(
      resumeData
    )}`;
    const result = await chatSession.sendMessage(prompt);
    const aiRawText = result.response.text();

    const cleanedText = aiRawText.replace(/```json|```/g, "").trim();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (err) {
      return NextResponse.json(
        { error: "AI response could not be parsed", details: err },
        { status: 500 }
      );
    }

    const acknowledgement =
      parsedResponse?.acknowledgement || "Resume updated.";
    const updatedSection = parsedResponse?.updatedSection || {};

    const updatedResumeData = deepMerge(resumeData, updatedSection);

    const userMsg = { role: "user", parts: [{ text: latestUserMessage }] };
    const modelMsg = { role: "model", parts: [{ text: acknowledgement }] };

    const existingChat = await db.chat.findUnique({ 
      where: { 
        id: chatId,
        userId: session.user.id // Added check to ensure user owns this chat
      } 
    });

    if (!existingChat) {
      await db.chat.create({
        data: {
          id: chatId,
          userId: session.user.id,
          title: latestUserMessage.slice(0, 30) || "New ResumeMax Chat",
          messages: [userMsg, modelMsg],
          resumeData: updatedResumeData,
          resumeTemplate: "classic",
        },
      });
    } else {
      await db.chat.update({
        where: { 
          id: chatId,
          userId: session.user.id // Added check to ensure user owns this chat
        },
        data: {
          messages: {
            push: [userMsg, modelMsg],
          },
          resumeData: updatedResumeData,
        },
      });
    }

    return NextResponse.json({ response: parsedResponse }, { status: 200 });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chats = await db.chat.findMany({
    where: { userId: session.user.id },
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ chats });
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId } = await req.json();

    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required." },
        { status: 400 }
      );
    }

    // Actually delete the chat, checking user ownership
    const deletedChat = await db.chat.deleteMany({
      where: {
        id: chatId,
        userId: session.user.id,
      },
    });

    if (!deletedChat.count) {
      return NextResponse.json(
        { error: "Chat not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Chat deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete chat error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chatId, newName } = await req.json();

    if (!chatId || !newName) {
      return NextResponse.json(
        { error: "Chat ID and new name are required." },
        { status: 400 }
      );
    }

    // Update chat name in the database, checking user ownership
    const updatedChat = await db.chat.updateMany({
      where: {
        id: chatId,
        userId: session.user.id,
      },
      data: {
        title: newName,
      },
    });

    if (!updatedChat.count) {
      return NextResponse.json(
        { error: "Chat not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Chat name updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update chat error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any): any {
  if (
    typeof target !== "object" ||
    typeof source !== "object" ||
    !target ||
    !source
  ) {
    return source;
  }

  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key])) {
      output[key] = source[key]; // Replace arrays directly
    } else if (typeof source[key] === "object") {
      output[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}