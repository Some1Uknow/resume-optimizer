import {
  GoogleGenAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google Generative AI client
// Ensure GEMINI_KEY is set in your .env.local file
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

// Define the expected structure of the incoming request body, matching your original
interface AnalyzeResumeRequest {
  resume_text: string;
  role: string;
  seniority: string;
  industry?: string;
  job_description?: string;
  required_keywords?: string[];
}

/**
 * POST handler for the resume analysis API endpoint.
 * This version generates the detailed JSON structure you specified.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and Validate Incoming Request
    const body: AnalyzeResumeRequest = await request.json();
    const {
      resume_text,
      role,
      seniority,
      industry = "technology", // Default industry if not provided
      job_description,
      required_keywords,
    } = body;

    // Return a 400 error if any required fields are missing or empty
    if (!resume_text?.trim() || !role?.trim() || !seniority?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: resume_text, role, seniority" },
        { status: 400 }
      );
    }

    // 3. Create the Detailed Analysis Prompt
    const prompt = `
      You are an expert resume evaluation system. Analyze the provided resume against the job details.

      - Target Role: ${seniority} ${role}
      - Industry: ${industry}
      ${job_description ? `- Job Description: ${job_description}` : ""}
      ${
        required_keywords?.length
          ? `- Required Keywords: ${required_keywords.join(", ")}`
          : ""
      }

      Resume Text:
      """
      ${resume_text}
      """

      Carefully analyze the resume and return ONLY a raw JSON object with the following exact structure.
      Do not include any other text, explanations, or markdown.

      {
        "ats_analysis": {
          "keywords_found": ["array of strings of keywords found from the resume and job description"],
          "keywords_missing": ["array of strings of important keywords missing from the resume"],
          "format_compliance": <true if the resume seems well-formatted for an ATS, otherwise false>,
          "parsing_errors": ["array of strings describing any potential parsing issues"]
        },
        "structure": {
          "length_pages": <estimated number of pages, e.g., 1 or 2>,
          "sections_present": ["array of strings listing the sections found, e.g., 'Experience', 'Skills']",
          "section_order_score": <a score from 0.0 to 1.0 for logical section order>
        },
        "content_scores": {
          "summary_score": <a score from 0.0 to 1.0 for the quality of the professional summary/objective>,
          "skills_score": <a score from 0.0 to 1.0 for the relevance and breadth of skills>,
          "experience_score": <a score from 0.0 to 1.0 for the quality and relevance of work experience>,
          "education_score": <a score from 0.0 to 1.0 based on the education section>,
          "projects_score": <a score from 0.0 to 1.0 based on the projects section, if present>
        },
        "impact_metrics": {
          "total_bullets": <total number of bullet points in the experience/projects sections>,
          "quantified_bullets": <number of bullet points that contain specific numbers, percentages, or metrics>,
          "impact_density": <a score from 0.0 to 1.0, calculated as quantified_bullets / total_bullets>
        },
        "pedigree": {
          "company_prestige_score": <a score from 0.0 to 1.0 based on the perceived prestige of the companies listed>,
          "education_prestige_score": <a score from 0.0 to 1.0 based on the prestige of the educational institutions>
        },
        "flags": ["array of strings for any red flags, e.g., 'Job hopping', 'Large employment gap', 'Lacks quantified impact'"],
        "recommendations": [
          {"area": "Skills", "message": "A specific, actionable recommendation for the skills section."},
          {"area": "Experience", "message": "A specific, actionable recommendation for the experience section."}
        ]
      }
    `;

    // 4. Call the AI Model
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite-preview-06-17",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      },
    });

    // 5. Process the Response
    const responseText = result.text;
    if (!responseText) {
      throw new Error("Received an empty response from the AI model.");
    }
    console.log("AI Response:", responseText);
    // Parse the JSON provided by the AI
    const analysis = JSON.parse(responseText);
    console.log("Parsed Analysis:", analysis);
    // Create the final response object by adding the metadata you require
    const finalResponse = {
      metadata: {
        timestamp: new Date().toISOString(),
        role: role,
        seniority: seniority,
        industry: industry,
      },
      ...analysis, // Spread the AI-generated analysis
    };
    console.log("Final Response:", finalResponse);
    return NextResponse.json(finalResponse);
  } catch (error: unknown) {
    // 6. Handle Errors
    console.error("An error occurred during resume analysis:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please check the server logs." },
      { status: 500 }
    );
  }
}
