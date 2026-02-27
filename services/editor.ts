
import { GoogleGenAI } from "@google/genai";
import { IntelligenceReport } from "../types";
import { EDITOR_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const handleEditorialReview = async (report: IntelligenceReport): Promise<string> => {
  const model = 'gemini-1.5-pro-latest';

  // We only transform 'Lead Thesis' reports
  if (report.signalClassification?.category !== 'Lead Thesis') {
    return Promise.resolve("This report is not a 'Lead Thesis' and cannot be published.");
  }

  const response = await ai.models.generateContent({
    model,
    contents: `INTERNAL DRAFT:
    ${report.masterDraft}`,
    config: {
        systemInstruction: EDITOR_SYSTEM_PROMPT,
    }
  });

  return response.text || '';
};
