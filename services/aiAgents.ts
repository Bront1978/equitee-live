import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 1. CEO BOT: The Filter
export const ceoBot = {
  evaluate: async (signal: any) => {
    const prompt = `You are the CEO of an elite investment firm. Evaluate this news: "${signal.title}". 
    Return a JSON object with: 
    reputationScore (0.0 to 1.0), 
    sentiment (BULLISH, BEARISH, or NEUTRAL), 
    summary (1 sentence),
    title (clean title).`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Basic cleanup to ensure we get valid JSON
    return JSON.parse(text.replace(/```json|```/g, ""));
  }
};

// 2. EDITORIAL CHIEF: The Voice
export const editorialChief = {
  synthesize: async (triage: any) => {
    const prompt = `Write a 3-paragraph institutional analysis in the voice of Bront Palarae (authoritative, strategic, focusing on governance) for this topic: ${triage.title}. 
    Return JSON with: title, content.`;
    
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text().replace(/```json|```/g, ""));
  }
};

// 3. CREATIVE DIRECTOR: The Visualist
export const creativeDirector = {
  generatePrompt: async (content: string) => {
    return `Minimalist cinematic high-tech architectural photography, dark tones, highlighting AI infrastructure, 8k. Context: ${content.substring(0, 100)}`;
  }
};

// 4. IMAGE GENERATOR: The Artist (Placeholder for Nano Banana 2/DALL-E)
export const imageGenerator = {
  create: async (config: { prompt: string }) => {
    // For now, we use a high-quality tech placeholder to ensure no crashes
    return `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072`;
  }
};
