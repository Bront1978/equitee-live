import { editorialChief, creativeDirector, ceoBot, imageGenerator } from './aiAgents';
import { supabase } from './database';
import Parser from 'rss-parser';

const parser = new Parser();

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
  console.log("--- STARTING FULL SCALE COMPILATION ---");
  try {
    let allNews: any[] = [];
    for (const node of ELITE_NODES) {
      try {
        const feed = await parser.parseURL(node.url);
        // Mapping ensures we don't lose the source link or name
        allNews = [...allNews, ...feed.items.map(i => ({ 
          title: i.title,
          link: i.link,
          content: i.contentSnippet || i.content,
          source_name: node.name,
          isoDate: i.isoDate
        }))];
      } catch (e) { console.error(`Failed to reach ${node.name}`); }
    }

    // DEDUPLICATION: Ensures "Grab IPO" only appears once even if 5 sites report it
    const uniqueAlpha = allNews.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.title?.toLowerCase().split(' ').slice(0, 5).join(' ') === 
        item.title?.toLowerCase().split(' ').slice(0, 5).join(' ')
      ))
    );

    for (const signal of uniqueAlpha) {
      const triage = await ceoBot.evaluate(signal);
      const sentiment = triage.sentiment || 'NEUTRAL'; 

      if (triage.reputationScore >= 0.92) {
        // PRIORITY ANALYSIS: The high-end "Bront Voice" articles
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
        // THE WIRE: The high-frequency aggregation
        await supabase.from('articles').insert([{
          title: triage.title,
          summary: triage.summary,
          source_link: signal.link, // THIS MAKES THE SIDEBAR BUTTONS WORK
          type: 'WIRE',
          sentiment: sentiment,
          tag: 'MARKET_WIRE',
          author: signal.source_name,
          date: new Date().toISOString()
        }]);
      }
    }
    console.log("--- COMPILATION COMPLETE: VAULT UPDATED ---");
  } catch (error) { console.error("CRITICAL ORCHESTRATOR ERROR:", error); }
}
