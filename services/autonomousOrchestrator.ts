import { editorialChief, creativeDirector, ceoBot, imageGenerator } from './aiAgents';
import { supabase } from './database';
import Parser from 'rss-parser';

const parser = new Parser();

// STEP 1: EXPANDED ELITE SOURCE LIST
const ELITE_NODES = [
  { name: 'The Information', url: 'https://www.theinformation.com/feed' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed' },
  { name: 'StrictlyVC', url: 'https://www.strictlyvc.com/feed' },
  { name: 'DealStreetAsia', url: 'https://www.dealstreetasia.com/feed' },
  { name: 'e27', url: 'https://e27.co/feed' },
  { name: 'Tech In Asia', url: 'https://www.techinasia.com/feed' },
  { name: 'VentureBeat', url: 'https://venturebeat.com/feed' }
];

export async function runAutonomousCycle() {
  console.log("--- INITIALIZING_V6_COMPILATION_SESSION ---");

  try {
    let allNews: any[] = [];
    for (const node of ELITE_NODES) {
      try {
        const feed = await parser.parseURL(node.url);
        allNews = [...allNews, ...feed.items.map(i => ({ ...i, source_name: node.name }))];
      } catch (e) { console.error(`OFFLINE: ${node.name}`); }
    }

    // STEP 3: DEDUPLICATION (First 5 Words)
    const uniqueAlpha = allNews.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.title?.toLowerCase().split(' ').slice(0, 5).join(' ') === 
        item.title?.toLowerCase().split(' ').slice(0, 5).join(' ')
      ))
    );

    for (const signal of uniqueAlpha) {
      // CEO BOT EVALUATES QUALITY AND SENTIMENT (THE HOT SWITCH)
      const triage = await ceoBot.evaluate(signal);
      const sentiment = triage.sentiment || 'NEUTRAL'; 

      if (triage.reputationScore >= 0.92) {
        // BESPOKE: Deep Dive Analysis
        const [articleDraft, imagePrompt] = await Promise.all([
          editorialChief.synthesize(triage),
          creativeDirector.generatePrompt(triage.content)
        ]);
        const imgUrl = await imageGenerator.create({ prompt: imagePrompt });

        await supabase.from('articles').insert([{
          ...articleDraft,
          type: 'BESPOKE',
          sentiment: sentiment,
          tag: 'PRIORITY_ANALYSIS',
          img: imgUrl,
          author: "Equitee Editorial Desk",
          date: new Date().toISOString()
        }]);
      } else if (triage.reputationScore >= 0.75) {
        // WIRE: Market Aggregation
        await supabase.from('articles').insert([{
          title: triage.title,
          summary: triage.summary,
          source_link: signal.link,
          type: 'WIRE',
          sentiment: sentiment,
          tag: 'MARKET_WIRE',
          author: signal.source_name,
          date: new Date().toISOString()
        }]);
      }
    }
    console.log("--- SESSION_SUCCESS ---");
  } catch (error) { console.error("SESSION_CRITICAL_FAILURE", error); }
}
