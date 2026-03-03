import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * AGENT 1: THE CEO BOT (Strategic Triage)
 */
export const ceoBot = {
  evaluate: async (signal: any) => {
    const prompt = `You are a Tier-1 VC Partner and Board Member. 
    Analyze this signal for the Asia Power Corridor (KL, SG, HK, Mumbai, Tokyo, Shanghai).
    News: ${signal.title} - ${signal.content}
    Return ONLY JSON: {
      "reputationScore": 0.0-1.0,
      "sentiment": "BULLISH"|"BEARISH"|"NEUTRAL",
      "tag": "CAPITAL"|"POLICY"|"GOVERNANCE"|"BENCHMARK",
      "summary": "1-sentence tactical summary"
    }`;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text().replace(/```json|```/g, ""));
  }
};

/**
 * AGENT 2: THE GOVERNANCE AUDITOR (Friction Analysis)
 */
export const governanceAuditor = {
  audit: async (triage: any) => {
    const prompt = `Identify one specific regulatory friction point or founder-investor alignment risk 
    for this news: ${triage.title}. Standards: ICDM & MIT Sloan. 1 sharp paragraph.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
};

/**
 * AGENT 3: THE EDITORIAL CHIEF (The Bront Voice & PDF Prep)
 */
export const editorialChief = {
  synthesize: async (triage: any, audit: string) => {
    const prompt = `Write a Sovereign Briefing in the voice of Bront Palarae (Strategic, Authoritative, Pan-Asian focus).
    Topic: ${triage.title} | Risk Audit: ${audit}
    Include: 1. Strategic Move, 2. Venture Logic, 3. The Governance Friction.
    Return JSON: { "title": "...", "content": "..." }`;
    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text().replace(/```json|```/g, ""));
    
    // AUTO-MONETIZATION: LEAD GEN INJECTION
    data.content += `\n\n--- \n**INSTITUTIONAL ACCESS**\nSeeking a private audit on ${triage.tag} trends? [Contact the Desk](mailto:intel@equitee.io?subject=Inquiry_${triage.tag})`;
    return data;
  }
};
