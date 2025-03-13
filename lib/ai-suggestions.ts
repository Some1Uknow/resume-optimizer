import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo, in production use server-side API calls
});

export async function getAISuggestion(field: string, currentContent: string, jobDescription?: string) {
  try {
    const prompt = jobDescription 
      ? `Given the job description: "${jobDescription}"\n\nImprove the following ${field} for a resume to better match the job requirements: "${currentContent}"`
      : `Improve the following ${field} for a resume to make it more impactful and professional: "${currentContent}"`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-chat",
    });

    return completion.choices[0].message.content || "";
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    throw new Error('Failed to get AI suggestion');
  }
}

export async function generateBulletPoints(description: string) {
  try {
    const prompt = `Convert the following job description into 3-4 impactful bullet points highlighting key achievements and responsibilities: "${description}"`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-chat",
    });

    const response = completion.choices[0].message.content || "";
    return response.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error('Error generating bullet points:', error);
    throw new Error('Failed to generate bullet points');
  }
}
