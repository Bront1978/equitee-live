import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * ROLE 1: THE CEO BOT (The Analyst)
 * Evaluates signals for Venture Logic, Policy Impact, and Governance Risk.
 */
export const ceoBot = {
  evaluate: async (signal: any) => {
    const prompt = `
      You are an elite Venture Capitalist and Independent Director. 
      Analyze this news signal for the Asian Power Corridor (KL, SG, JKT, HK, India, China, Japan, Korea).
      
      News: ${signal.title} - ${signal.content}
      
      Return ONLY a JSON object:
      {
        "reputationScore": 0.0 to 1.0,
        "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
        "tag": "POLICY" | "CAPITAL" | "GOVERNANCE" | "FOUNDER_BENCHMARK",
        "governanceRisk": 0.0 to 1.0,
        "summary": "1-sentence executive summary"
      }
    `;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text().replace(/```json|```/g, ""));
  }
};

/**
 * ROLE 2: THE GOVERNANCE AUDITOR
 * Identifies friction points and regulatory hurdles.
 */
export const governanceAuditor = {
  audit: async (triage: any) => {
    const prompt = `As an expert in Asian Corporate Governance (ICDM/MIT Sloan standards), identify the 
    hidden friction point or regulatory risk in this headline: ${triage.title}. 
    Focus on founder-investor alignment or regional policy shifts. 1 paragraph only.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
};

/**
 * ROLE 3: THE EDITORIAL CHIEF (The Bront Voice)
 * Synthesizes news into "Strategic Briefings" with automated monetization.
 */
export const editorialChief = {
  synthesize: async (triage: any, audit: string) => {
    const prompt = `
      Write an institutional briefing in the voice of Bront Palarae (charismatic, strategic, authoritative).
      Topic: ${triage.title}
      Audit Insight: ${audit}
      
      Structure:
      1. The Strategic Move (What happened)
      2. The Venture Logic (Why it matters to VCs/Founders)
      3. The Friction Point (The counter-intuitive governance take)
      
      Return JSON: { "title": "...", "content": "..." }
    `;
    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text().replace(/```json|```/g, ""));
    
    // AUTOMATED MONETIZATION: Injecting the Partner Slot
    const sponsorSlot = `\n\n--- \n**EQUITY INTELLIGENCE PARTNER**\nSeeking a deeper audit on ${triage.tag} in Asia? [Partner with Equitee](mailto:sales@equitee.io?subject=Inquiry_${triage.tag})`;
    data.content += sponsorSlot;
    
    return data;
  }
};
