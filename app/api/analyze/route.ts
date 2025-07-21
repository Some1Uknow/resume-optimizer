// @ts-nocheck
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google GenAI client
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

interface AnalyzeResumeRequest {
  resume_text: string;
  role: string;
  seniority: string;
  industry?: string;
  job_description?: string;
  required_keywords?: string[];
  anonymize?: boolean;
  focus_portfolio?: boolean;
}

interface AnalyzeResumeResponse {
  metadata: {
    timestamp: string;
    role: string;
    seniority: string;
    industry: string;
  };
  ats_analysis: {
    keywords_found: string[];
    keywords_missing: string[];
    format_compliance: boolean;
    parsing_errors: string[];
  };
  structure: {
    length_pages: number;
    sections_present: string[];
    section_order_score: number;
  };
  content_scores: {
    summary_score: number;
    skills_score: number;
    experience_score: number;
    education_score: number;
    projects_score: number;
  };
  impact_metrics: {
    total_bullets: number;
    quantified_bullets: number;
    impact_density: number;
  };
  pedigree: {
    company_prestige_score: number;
    education_prestige_score: number;
  };
  flags: string[];
  recommendations: Array<{
    area: string;
    message: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeResumeRequest = await request.json();

    if (
      !body.resume_text?.trim() ||
      !body.role?.trim() ||
      !body.seniority?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields: resume_text, role, and seniority" },
        { status: 400 }
      );
    }

    if (body.resume_text.length < 100 || body.resume_text.length > 50000) {
      return NextResponse.json(
        { error: "Resume text must be between 100 and 50,000 characters" },
        { status: 400 }
      );
    }

    console.log(
      `Analyzing resume for ${body.role} position at ${body.seniority} level`
    );

    // Create model instance

    // Create the analysis prompt
    const prompt = createAnalysisPrompt(body);
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite-preview-06-17",
      contents: prompt,
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("Empty response from AI model");
    }

    // Clean response text before parsing
    let cleaned = responseText.trim();
    cleaned = cleaned
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "");

    let analysis: AnalyzeResumeResponse;
    try {
      analysis = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      analysis = generateFallbackAnalysis(body);
    }

    // Ensure the response has the correct structure
    analysis = validateAndFixResponse(analysis, body);
    console.log("Resume analysis completed successfully", analysis);
    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Resume analysis error:", error);

    // Return appropriate error response
    const errorMessage = getErrorMessage(error);
    const statusCode = getErrorStatusCode(error);

    return NextResponse.json(
      {
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}

function createAnalysisPrompt(body: AnalyzeResumeRequest): string {
  return `You are an expert resume evaluator. Analyze this resume and return ONLY a valid JSON object with the exact structure specified below.

TARGET ROLE: ${body.role}
SENIORITY: ${body.seniority}
INDUSTRY: ${body.industry || "technology"}

ANONYMIZE RESUME: ${body.anonymize ? "yes" : "no"}
FOCUS ON PORTFOLIO: ${body.focus_portfolio ? "yes" : "no"}

${
  body.required_keywords?.length
    ? `REQUIRED KEYWORDS (must match or flag missing): ${body.required_keywords.join(
        ", "
      )}\n`
    : ""
}

RESUME TEXT:
${body.resume_text}

${body.job_description ? `JOB DESCRIPTION:\n${body.job_description}\n` : ""}

Return a JSON object with this exact structure (no additional text, no markdown formatting):

{
  "metadata": {
    "timestamp": "${new Date().toISOString()}",
    "role": "${body.role}",
    "seniority": "${body.seniority}",
    "industry": "${body.industry || "technology"}"
  },
  "ats_analysis": {
    "keywords_found": ["keyword1", "keyword2"],
    "keywords_missing": ["missing1", "missing2"],
    "format_compliance": true,
    "parsing_errors": []
  },
  "structure": {
    "length_pages": 1,
    "sections_present": ["Contact", "Experience", "Skills"],
    "section_order_score": 0.8
  },
  "content_scores": {
    "summary_score": 0.7,
    "skills_score": 0.8,
    "experience_score": 0.9,
    "education_score": 0.6,
    "projects_score": 0.5
  },
  "impact_metrics": {
    "total_bullets": 10,
    "quantified_bullets": 5,
    "impact_density": 0.5
  },
  "pedigree": {
    "company_prestige_score": 0.7,
    "education_prestige_score": 0.6
  },
  "flags": ["flag1", "flag2"],
  "recommendations": [
    {"area": "Skills", "message": "Add more technical skills"},
    {"area": "Experience", "message": "Quantify achievements with numbers"}
  ]

IMPORTANT: 
- All scores must be between 0 and 1
- Keywords should be relevant to the target role
- Recommendations should be specific and actionable
- Return ONLY the JSON object, no other text`;
}

function validateAndFixResponse(
  analysis: any,
  body: AnalyzeResumeRequest
): AnalyzeResumeResponse {
  // Ensure all required fields exist with proper defaults
  const validated: AnalyzeResumeResponse = {
    metadata: {
      timestamp: new Date().toISOString(),
      role: body.role,
      seniority: body.seniority,
      industry: body.industry || "technology",
    },
    ats_analysis: {
      keywords_found: Array.isArray(analysis?.ats_analysis?.keywords_found)
        ? analysis.ats_analysis.keywords_found.slice(0, 10)
        : [],
      keywords_missing: Array.isArray(analysis?.ats_analysis?.keywords_missing)
        ? analysis.ats_analysis.keywords_missing.slice(0, 10)
        : [],
      format_compliance: analysis?.ats_analysis?.format_compliance ?? true,
      parsing_errors: Array.isArray(analysis?.ats_analysis?.parsing_errors)
        ? analysis.ats_analysis.parsing_errors
        : [],
    },
    structure: {
      length_pages: Math.max(
        1,
        Math.min(5, analysis?.structure?.length_pages ?? 1)
      ),
      sections_present: Array.isArray(analysis?.structure?.sections_present)
        ? analysis.structure.sections_present
        : ["Contact Information", "Experience"],
      section_order_score: clampScore(
        analysis?.structure?.section_order_score ?? 0.7
      ),
    },
    content_scores: {
      summary_score: clampScore(analysis?.content_scores?.summary_score ?? 0.5),
      skills_score: clampScore(analysis?.content_scores?.skills_score ?? 0.5),
      experience_score: clampScore(
        analysis?.content_scores?.experience_score ?? 0.5
      ),
      education_score: clampScore(
        analysis?.content_scores?.education_score ?? 0.5
      ),
      projects_score: clampScore(
        analysis?.content_scores?.projects_score ?? 0.3
      ),
    },
    impact_metrics: {
      total_bullets: Math.max(0, analysis?.impact_metrics?.total_bullets ?? 0),
      quantified_bullets: Math.max(
        0,
        analysis?.impact_metrics?.quantified_bullets ?? 0
      ),
      impact_density: clampScore(analysis?.impact_metrics?.impact_density ?? 0),
    },
    pedigree: {
      company_prestige_score: clampScore(
        analysis?.pedigree?.company_prestige_score ?? 0.5
      ),
      education_prestige_score: clampScore(
        analysis?.pedigree?.education_prestige_score ?? 0.5
      ),
    },
    flags: Array.isArray(analysis?.flags) ? analysis.flags : [],
    recommendations: Array.isArray(analysis?.recommendations)
      ? analysis.recommendations
          .filter((rec: any) => rec?.area && rec?.message)
          .slice(0, 10)
      : [],
  };

  // Fix impact density calculation
  if (validated.impact_metrics.total_bullets > 0) {
    validated.impact_metrics.impact_density = Math.min(
      1,
      validated.impact_metrics.quantified_bullets /
        validated.impact_metrics.total_bullets
    );
  }

  return validated;
}

function clampScore(score: any): number {
  const num = typeof score === "number" ? score : 0;
  return Math.max(0, Math.min(1, num));
}

function generateFallbackAnalysis(
  body: AnalyzeResumeRequest
): AnalyzeResumeResponse {
  const text = body.resume_text.replace(/```/g, "").toLowerCase();

  return {
    metadata: {
      timestamp: new Date().toISOString(),
      role: body.role,
      seniority: body.seniority,
      industry: body.industry || "technology",
    },
    ats_analysis: {
      keywords_found: extractBasicKeywords(text, body.role),
      keywords_missing: getCommonMissingKeywords(body.role),
      format_compliance: !text.includes("<") && !text.includes("{"),
      parsing_errors: [],
    },
    structure: {
      length_pages: Math.ceil(body.resume_text.length / 2000),
      sections_present: identifyBasicSections(text),
      section_order_score: 0.7,
    },
    content_scores: {
      summary_score:
        text.includes("summary") || text.includes("objective") ? 0.6 : 0.3,
      skills_score: text.includes("skill") ? 0.7 : 0.4,
      experience_score:
        text.includes("experience") || text.includes("work") ? 0.8 : 0.3,
      education_score:
        text.includes("education") || text.includes("degree") ? 0.6 : 0.3,
      projects_score: text.includes("project") ? 0.6 : 0.2,
    },
    impact_metrics: calculateBasicImpactMetrics(body.resume_text),
    pedigree: {
      company_prestige_score: 0.5,
      education_prestige_score: 0.5,
    },
    flags: generateBasicFlags(body.resume_text),
    recommendations: generateBasicRecommendations(body.role, text),
  };
}

function extractBasicKeywords(text: string, role: string): string[] {
  const roleKeywords = {
    "software engineer": [
      "javascript",
      "python",
      "react",
      "node",
      "sql",
      "git",
      "api",
    ],
    "product manager": [
      "analytics",
      "roadmap",
      "stakeholder",
      "agile",
      "scrum",
      "metrics",
    ],
    "data scientist": [
      "python",
      "sql",
      "machine learning",
      "analytics",
      "statistics",
    ],
    designer: [
      "figma",
      "sketch",
      "adobe",
      "wireframe",
      "prototype",
      "user experience",
    ],
  };

  const keywords =
    roleKeywords[role.toLowerCase() as keyof typeof roleKeywords] ||
    roleKeywords["software engineer"];
  return keywords.filter((keyword) => text.includes(keyword));
}

function getCommonMissingKeywords(role: string): string[] {
  const missingKeywords = {
    "software engineer": [
      "kubernetes",
      "docker",
      "microservices",
      "testing",
      "ci/cd",
    ],
    "product manager": [
      "product strategy",
      "user research",
      "a/b testing",
      "go-to-market",
    ],
    "data scientist": ["tensorflow", "pytorch", "big data", "cloud platforms"],
    designer: [
      "accessibility",
      "design systems",
      "user testing",
      "interaction design",
    ],
  };

  return (
    missingKeywords[role.toLowerCase() as keyof typeof missingKeywords] ||
    missingKeywords["software engineer"]
  );
}

function identifyBasicSections(text: string): string[] {
  const sections = [];
  if (text.includes("contact") || text.includes("email"))
    sections.push("Contact Information");
  if (text.includes("summary") || text.includes("objective"))
    sections.push("Professional Summary");
  if (text.includes("experience") || text.includes("work"))
    sections.push("Work Experience");
  if (text.includes("skill")) sections.push("Skills");
  if (text.includes("education") || text.includes("degree"))
    sections.push("Education");
  if (text.includes("project")) sections.push("Projects");

  return sections.length > 0
    ? sections
    : ["Contact Information", "Work Experience"];
}

function calculateBasicImpactMetrics(text: string): {
  total_bullets: number;
  quantified_bullets: number;
  impact_density: number;
} {
  const bullets = text.match(/[•\-\*]\s|^\s*\d+\./gm) || [];
  const quantified =
    text.match(/\d+%|\$[\d,]+|\d+\+|\d+k|\d+m|increased.*\d+|reduced.*\d+/gi) ||
    [];

  const totalBullets = Math.max(
    bullets.length,
    Math.floor(text.split("\n").length * 0.2)
  );
  const quantifiedBullets = Math.min(quantified.length, totalBullets);

  return {
    total_bullets: totalBullets,
    quantified_bullets: quantifiedBullets,
    impact_density: totalBullets > 0 ? quantifiedBullets / totalBullets : 0,
  };
}

function generateBasicFlags(text: string): string[] {
  const flags = [];
  if (text.length < 500) flags.push("Resume appears too short");
  if (text.length > 10000) flags.push("Resume may be too long");
  if (!/\d+%|\$\d+|\d+\+/.test(text))
    flags.push("Lacks quantified achievements");
  if (!text.toLowerCase().includes("email"))
    flags.push("Missing contact information");
  return flags;
}

function generateBasicRecommendations(
  role: string,
  text: string
): Array<{ area: string; message: string }> {
  const recommendations = [];

  if (!text.includes("summary") && !text.includes("objective")) {
    recommendations.push({
      area: "Professional Summary",
      message:
        "Add a compelling professional summary highlighting your key qualifications",
    });
  }

  if (!/\d+%|\$\d+|\d+\+/.test(text)) {
    recommendations.push({
      area: "Quantified Impact",
      message:
        "Include specific metrics and numbers to demonstrate your impact",
    });
  }

  if (role.toLowerCase().includes("software") && !text.includes("github")) {
    recommendations.push({
      area: "Technical Portfolio",
      message: "Include links to your GitHub profile and key projects",
    });
  }

  return recommendations;
}

function getErrorMessage(error: any): string {
  if (error.message?.toLowerCase().includes("api key")) {
    return "API authentication failed. Please check configuration.";
  }
  if (
    error.message?.toLowerCase().includes("quota") ||
    error.message?.toLowerCase().includes("limit")
  ) {
    return "Service temporarily unavailable. Please try again in a few minutes.";
  }
  if (
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("timeout")
  ) {
    return "Network error. Please check your connection and try again.";
  }
  return "Analysis failed. Please try again.";
}

function getErrorStatusCode(error: any): number {
  if (error.message?.toLowerCase().includes("api key")) return 401;
  if (
    error.message?.toLowerCase().includes("quota") ||
    error.message?.toLowerCase().includes("limit")
  )
    return 429;
  if (
    error.message?.toLowerCase().includes("network") ||
    error.message?.toLowerCase().includes("timeout")
  )
    return 503;
  if (error.status === 400) return 400;
  return 500;
}
