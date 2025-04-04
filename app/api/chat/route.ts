import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { history, resumeData } = await req.json();

    if (!history || !Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { error: "Invalid or missing history" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
      systemInstruction: `
          You are an AI resume assistant that helps users improve and build their resume.
      
          Always respond with a JSON object having exactly two keys:
          1. "acknowledgement" – short friendly confirmation
          2. "updatedSection" – object with only changed section (like "summary", "skills", etc.)
      
          Never return full resume or markdown. Only valid JSON that can be parsed with JSON.parse().
          Follow the format strictly given by the user.
        
          If no action is needed, send:
          {
            "acknowledgement": "No updates required.",
            "updatedSection": {}
          }

         If the user wants to remove a section or the entire resume, respond with the empty JSON object of that section or the entire resume's empty JSON object.
        `,
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
    };

    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const latestUserMessage = history[history.length - 1]?.parts?.[0]?.text;

    if (!latestUserMessage || !resumeData) {
      return NextResponse.json(
        {
          error: "Missing user message or resumeData",
          latestUserMessage,
          resumeData,
        },
        { status: 400 }
      );
    }

    const userMessage =
      latestUserMessage + `\n\nResume Data: ${JSON.stringify(resumeData)}`;

    const result = await chatSession.sendMessage(userMessage);

    const text = result.response.text();
    const formattedResponse = {
      role: "model",
      parts: [{ text }],
    };
    console.log("AI Response:", formattedResponse);
    return NextResponse.json({ response: formattedResponse }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
