import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

interface CoverLetterRequest {
  company_name: string;
  position: string;
  hiring_manager?: string;
  job_description: string;
  tone: string;
  template: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CoverLetterRequest = await request.json();

    if (!body.company_name?.trim() || !body.position?.trim()) {
      return NextResponse.json(
        { error: "Company name and position are required" },
        { status: 400 }
      );
    }

    const prompt = createCoverLetterPrompt(body);
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite-preview-06-17",
      contents: prompt,
    });

    const coverLetter = result.text;
    if (!coverLetter) {
      throw new Error("Empty response from AI model");
    }

    return NextResponse.json({ cover_letter: coverLetter });
  } catch (error: unknown) {
    console.error("Cover letter generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}

function createCoverLetterPrompt(body: CoverLetterRequest): string {
  return `Generate a professional cover letter with the following details:

Company: ${body.company_name}
Position: ${body.position}
Hiring Manager: ${body.hiring_manager || "Hiring Manager"}
Tone: ${body.tone}
Template Style: ${body.template}

Job Description:
${body.job_description}

Requirements:
- Use a ${body.tone} tone
- Follow the ${body.template} template style
- Keep it concise and impactful
- Include relevant skills and experience from the job description
- End with a strong call to action

Generate only the cover letter text, no additional formatting or comments.`;
}
