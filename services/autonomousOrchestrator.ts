// services/autonomousOrchestrator.ts

import { sentinel, editorialChief, creativeDirector, ceoBot, imageGenerator } from './aiAgents';
import { supabase } from './database';
import { getLatestAlpha } from './rssIngest';

/**
 * EQUITEE AUTONOMOUS CYCLE v3.0
 * The Strategic Intelligence Engine
 */
export async function runAutonomousCycle() {
  console.log("--- STARTING_AUTONOMOUS_CYCLE: NODE_KL ---");

  try {
    // 1. INGEST: Fetch raw data from elite nodes
    const rawAlpha = await getLatestAlpha();
    
    if (!rawAlpha || rawAlpha.length === 0) {
      console.log("TERMINATE: NO_NEW_ALPHA_FOUND_IN_WINDOW");
      return { status: "idle", reason: "no_new_data" };
    }

    // 2. REPUTATION FILTER: CEO Bot evaluates for "Institutional Grade"
    // We send all raw items to the CEO to pick the top signal
    const triageNote = await ceoBot.evaluate(rawAlpha);

    // If the CEO gives a score below 0.85, we kill the cycle to protect reputation
    if (!triageNote || triageNote.reputationScore < 0.85) {
      console.log(`REJECTED: SIGNAL_STRENGTH_TOO_LOW (${triageNote?.reputationScore || 0})`);
      return { status: "rejected", reason: "low_reputation_score" };
    }

    console.log(`SIGNAL_APPROVED: ${triageNote.title}`);

    // 3. SYNTHESIS: Editorial Chief (Bront Voice) & Creative Director visuals
    // Running in parallel to save execution time
    const [articleDraft, imagePrompt] = await Promise.all([
      editorialChief.synthesize(triageNote),
      creativeDirector.generatePrompt(triageNote.content)
    ]);

    // 4. VISUAL ASSET: Generate the high-end architectural cover
    const generatedImgUrl = await imageGenerator.create({
      prompt: imagePrompt,
      aspect_ratio: "21:9",
      style: "Architectural, Minimalist, High-Contrast, Brand_Color_#ccff00"
    });

    // 5. ASSEMBLY: Final Intelligence Object
    const finalIntel = {
      title: articleDraft.title,
      summary: articleDraft.summary,
      content: articleDraft.content,
      tag: articleDraft.tag || "SOVEREIGN_INTELLIGENCE",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      img: generatedImgUrl,
      source_link: triageNote.link,
      reputation_score: triageNote.reputationScore,
      status: "PUBLISHED_AUTONOMOUS"
    };

    // 6. PERSISTENCE: Save to Supabase Vault
    const { data, error } = await supabase
      .from('articles')
      .insert([finalIntel])
      .select();

    if (error) throw error;

    console.log("--- CYCLE_COMPLETE: ASSET_DEPLOYED_TO_VAULT ---");
    return { status: "success", data: data[0] };

  } catch (error) {
    console.error("CRITICAL_CYCLE_FAILURE:", error);
    return { status: "error", message: error.message };
  }
}
