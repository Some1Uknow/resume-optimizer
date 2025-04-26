// app/api/generate-pdf/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium"; // Ensure this is installed

// Import React and ReactDOMServer with require() instead of import
const React = require("react");
const ReactDOMServer = require("react-dom/server");
// Need to import createElement specifically
const { createElement } = React;
// Import the component using require
const { ResumeContent } = require("@/components/resume/ResumeContent");

const getChromePath = async () => {
  if (process.env.NODE_ENV === "development") {
    // Local dev paths (adjust for your OS)
    const paths = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // macOS
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Windows
      "/usr/bin/google-chrome-stable", // Linux
    ];
    return paths.find((path) => require("fs").existsSync(path));
  }
  return chromium.executablePath(); // Production (Vercel)
};

export async function POST(request: Request) {
  try {
    const { data, template } = await request.json();

    if (!data) {
      return new NextResponse("Resume data is required", { status: 400 });
    }

    // Render without JSX syntax, using createElement instead
    const resumeHtml = ReactDOMServer.renderToString(
      createElement(ResumeContent, {
        data: data,
        isEditable: false,
        template: template,
      })
    );

    const browser = await puppeteer.launch({
      executablePath: await getChromePath(),
      args:
        process.env.NODE_ENV === "production"
          ? chromium.args
          : ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    // Create a full HTML document with Tailwind CSS
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>
        ${resumeHtml}
      </body>
      </html>
    `;

    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle0"],
    });
    await page.emulateMediaType("screen");

    // Add network idle wait
    await page.waitForNetworkIdle();
    // Set the HTML content and wait for it to load
    //  await page.setContent(html, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    // Close the browser
    await browser.close();

    // Send the PDF as a response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}

export const runtime = "nodejs"; // Ensure Node.js runtime for Puppeteer
export const dynamic = "force-dynamic"; // Force dynamic rendering for this route
