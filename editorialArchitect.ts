
import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceReport } from "../types";
import { EDITORIAL_ARCHITECT_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const handleEditorialArchitecture = async (report: IntelligenceReport) => {
  const model = 'gemini-1.5-pro-latest';

  const response = await ai.models.generateContent({
    model,
    contents: `RAW INTELLIGENCE REPORT:
    ${JSON.stringify(report)}`,
    config: {
        systemInstruction: EDITORIAL_ARCHITECT_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                headline: { type: Type.STRING },
                lede: { type: Type.STRING },
                categoryTag: { type: Type.STRING },
                terminalSummary: { type: Type.STRING }
            },
            required: ["headline", "lede", "categoryTag", "terminalSummary"]
        }
    }
  });

  return JSON.parse(response.text || '{}');
};
