
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Fiscal Safety: Budget Tracking
let dailySpend = 0;
const BUDGET_THRESHOLD = 15.00; // Yellow flag threshold

export const getDailySpend = () => dailySpend;

const getOptimalModel = (isEssential: boolean = true) => {
  if (dailySpend >= BUDGET_THRESHOLD && !isEssential) {
    return 'gemini-1.5-flash-latest'; // Switch to Flash for non-essential tasks
  }
  return 'gemini-1.5-pro-latest';
};

export const handleCyborgIngest = async (rawData: string) => {
  const model = getOptimalModel(true); // Ingest is essential
  
  // Mock spend increment for demo purposes
  dailySpend += 0.05;

  const response = await ai.models.generateContent({
    model,
    contents: `INGEST DATA: ${rawData}`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dispatchSummary: {
            type: Type.OBJECT,
            properties: {
              alphaScore: { type: Type.NUMBER, description: "Predictive ROI (1-10)" },
              b2bRelevance: { type: Type.STRING, description: "Strategic impact on Vertical AI or Fintech" },
              exitPotential: { type: Type.STRING, description: "Categorize as IPO, Secondary, or M&A candidate" },
            },
            required: ["alphaScore", "b2bRelevance", "exitPotential"]
          },
          defensibleEvidenceLog: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Log of why certain signals were triaged as High-Impact."
          },
          masterDraft: { type: Type.STRING, description: "WIRED-style strategic thesis." },
          localizedDrafts: {
            type: Type.OBJECT,
            properties: {
              MY: { type: Type.STRING },
              SG: { type: Type.STRING },
              ID: { type: Type.STRING },
              VN: { type: Type.STRING }
            }
          },
          blueprint: {
            type: Type.OBJECT,
            properties: {
              thesis: { type: Type.STRING },
              sectorTrends: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sector: { type: Type.STRING },
                    momentum: { type: Type.STRING },
                    benchmark: { type: Type.STRING }
                  }
                }
              },
              regionalInsights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    market: { type: Type.STRING },
                    strategy: { type: Type.STRING }
                  }
                }
              }
            }
          },
          governance: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              legalCompliance: { type: Type.STRING },
              esgStatus: { type: Type.STRING },
              riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          revenueStrategy: { type: Type.STRING },
          seoForensic: { type: Type.STRING }
        },
        required: ["dispatchSummary", "masterDraft", "blueprint", "governance", "defensibleEvidenceLog"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
