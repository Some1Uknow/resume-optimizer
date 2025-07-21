import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    // Handle PDF files
    if (file.type === 'application/pdf') {
      try {
        const pdfData = await pdf(buffer);
        extractedText = pdfData.text;
      } catch (error) {
        console.error('PDF extraction error:', error);
        return NextResponse.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
      }
    }
    // Handle DOCX files
    else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
             file.type === 'application/msword') {
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } catch (error) {
        console.error('DOCX extraction error:', error);
        return NextResponse.json({ error: 'Failed to extract text from DOCX' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    if (!extractedText) {
      return NextResponse.json({ error: 'No text could be extracted from the file' }, { status: 400 });
    }

    return NextResponse.json({ text: extractedText });

  } catch (error) {
    console.error('Text extraction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
