
import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceReport } from "../types";
import { AUDITOR_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const handleAudit = async (report: IntelligenceReport): Promise<boolean> => {
  const model = 'gemini-1.5-pro-latest';

  if (!report.publishedArticle) {
    return Promise.resolve(false);
  }

  const response = await ai.models.generateContent({
    model,
    contents: `ARTICLE FOR AUDIT:
    ${report.publishedArticle}`,
    config: {
        systemInstruction: AUDITOR_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                passed_audit: { type: Type.BOOLEAN }
            },
            required: ["passed_audit"]
        }
    }
  });

  const result = JSON.parse(response.text || '{"passed_audit": false}');
  return result.passed_audit;
};
