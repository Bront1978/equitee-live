
import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceReport, SignalClassification } from "../types";
import { ANALYST_SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const handleAnalystReview = async (report: IntelligenceReport): Promise<SignalClassification> => {
  const model = 'gemini-1.5-pro-latest';

  const reportSummary = `
    Alpha Score: ${report.dispatchSummary.alphaScore}
    B2B Relevance: ${report.dispatchSummary.b2bRelevance}
    Exit Potential: ${report.dispatchSummary.exitPotential}
    Master Draft: ${report.masterDraft}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: `ANALYZE THIS REPORT:
    ${reportSummary}`,
    config: {
        systemInstruction: ANALYST_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                category: { type: Type.STRING, description: "'Market Pulse', 'Lead Thesis', or 'Governance Brief'" },
                requiresBenchmarkSynthesis: { type: Type.BOOLEAN, description: "True if a Malaysian startup is involved" }
            },
            required: ["category", "requiresBenchmarkSynthesis"]
        }
    }
  });

  return JSON.parse(response.text || '{}');
};
