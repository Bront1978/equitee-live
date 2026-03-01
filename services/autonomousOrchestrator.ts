import { editorialChief, creativeDirector, ceoBot, imageGenerator } from './aiAgents';
import { supabase } from './database';
import Parser from 'rss-parser';

const parser = new Parser();

// STEP 1: EXPANDED SENTINEL SOURCE LIST
const ELITE_NODES = [
  { name: 'The Information', url: 'https://www.theinformation.com/feed' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed' },
  { name: 'StrictlyVC', url: 'https://www.strictlyvc.com/feed' },
  { name: 'DealStreetAsia', url: 'https://www.dealstreetasia.com/feed' },
  { name: 'e27', url: 'https://e27.co/feed' },
  { name: 'Tech In Asia', url: 'https://www.techinasia.com/feed' }
];

export async function runAutonomousCycle() {
  console.log("--- INITIALIZING_COMPILATION_SESSION: KL ---");

  try {
    // INGESTION: Fetch from all nodes
    let allNews: any[] = [];
    for (const node of ELITE_NODES) {
      try {
        const feed = await parser.parseURL(node.url);
        const items = feed.items.map(item => ({ ...item, source_name: node.name }));
        allNews = [...allNews, ...items];
      } catch (e) { console.error(`Failed node: ${node.name}`); }
    }

    // STEP 3: DEDUPLICATION LOGIC
    // Clusters similar stories by comparing the first 5 words of the title
    const uniqueAlpha = allNews.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.title?.toLowerCase().split(' ').slice(0, 5).join(' ') === 
        item.title?.toLowerCase().split(' ').slice(0, 5).join(' ')
      ))
    );

    for (const signal of uniqueAlpha) {
      const triage = await ceoBot.evaluate(signal);

      // ROUTING LOGIC
      if (triage.reputationScore >= 0.92) {
        // BESPOKE: Full Editorial Deep Dive
        const [articleDraft, imagePrompt] = await Promise.all([
          editorialChief.synthesize(triage),
          creativeDirector.generatePrompt(triage.content)
        ]);
        const imgUrl = await imageGenerator.create({ prompt: imagePrompt });

        await supabase.from('articles').insert([{
          ...articleDraft,
          type: 'BESPOKE',
          tag: 'PRIORITY_ANALYSIS',
          img: imgUrl,
          author: "Equitee Editorial Desk",
          date: new Date().toISOString()
        }]);
      } else if (triage.reputationScore >= 0.75) {
        // WIRE: Aggregated Compilation (No Image/Full Text)
        await supabase.from('articles').insert([{
          title: triage.title,
          summary: triage.summary,
          source_link: signal.link,
          type: 'WIRE',
          tag: 'MARKET_WIRE',
          author: signal.source_name,
          date: new Date().toISOString()
        }]);
      }
    }
    console.log("--- COMPILATION_COMPLETE ---");
  } catch (error) { console.error("SESSION_FAILURE:", error); }
}
