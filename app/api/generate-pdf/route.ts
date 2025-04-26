import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { createElement } = React;
const { ResumeContent } = require("@/components/resume/ResumeContent");

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v119.0.2/chromium-v119.0.2-pack.tar";

// Replace the browser launch config with this:
async function getBrowser() {
  if (process.env.VERCEL) {
    // More reliable than NEXT_PUBLIC_VERCEL_ENVIRONMENT
    return puppeteerCore.launch({
      args: [
        ...chromium.args,
        "--disable-web-security",
        "--font-render-hinting=none",
      ],
      executablePath: await chromium.executablePath(
        process.env.CHROMIUM_URL || CHROMIUM_URL
      ),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  }
  return puppeteer.launch({
    executablePath:
      process.env.CHROME_PATH || // Allow custom local paths
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // Default Mac path
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true, // Better headless mode
  });
}

export async function POST(request: Request) {
  try {
    const { data, template } = await request.json();

    if (!data) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    const resumeHtml = ReactDOMServer.renderToString(
      createElement(ResumeContent, { data, isEditable: false, template })
    );

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setContent(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        </head>
        <body>${resumeHtml}</body>
      </html>
    `,
      {
        waitUntil: ["domcontentloaded", "networkidle0"],
        timeout: 30000, // 30s timeout
      }
    );

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
