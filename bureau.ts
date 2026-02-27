
import { GoogleGenAI } from "@google/genai";
import { IntelligenceReport } from "../types";
import { BUREAU_CHIEF_SYSTEM_PROMPT, APAC_MARKETS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const handleLocalization = async (report: IntelligenceReport): Promise<Record<string, string>> => {
  const model = 'gemini-1.5-pro-latest';
  const localizedDrafts: Record<string, string> = {};

  if (!report.publishedArticle) {
    return Promise.resolve({});
  }

  for (const market of APAC_MARKETS) {
    const response = await ai.models.generateContent({
        model,
        contents: `LOCALIZE FOR: ${market}

        MANUSCRIPT:
        ${report.publishedArticle}`,
        config: {
            systemInstruction: BUREAU_CHIEF_SYSTEM_PROMPT,
        }
    });
    localizedDrafts[market] = response.text || '';
  }

  return localizedDrafts;
};
