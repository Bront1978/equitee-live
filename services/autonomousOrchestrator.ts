import { ceoBot, governanceAuditor, editorialChief } from './aiAgents';
import { supabase } from './database';
import Parser from 'rss-parser';

const parser = new Parser();

const ELITE_NODES = [
  // SOUTH EAST ASIA
  { name: 'DealStreetAsia', url: 'https://www.dealstreetasia.com/feed' },
  { name: 'Tech In Asia', url: 'https://www.techinasia.com/feed' },
  { name: 'e27', url: 'https://e27.co/feed' },
  // CHINA & HONG KONG
  { name: 'SCMP Tech', url: 'https://www.scmp.com/rss/91/feed' },
  { name: 'Caixin Global', url: 'https://www.caixinglobal.com/rss/all.xml' },
  // INDIA
  { name: 'YourStory', url: 'https://yourstory.com/feed' },
  { name: 'Inc42', url: 'https://inc42.com/feed' },
  // JAPAN & KOREA
  { name: 'Nikkei Asia', url: 'https://asia.nikkei.com/rss/feed/nar' },
  { name: 'Korea Herald Tech', url: 'https://www.koreaherald.com/common/rss_xml.php?ct=103' }
];

export async function runAutonomousCycle() {
  console.log("--- INITIATING PAN-ASIAN INTELLIGENCE SWEEP ---");
  try {
    let allNews: any[] = [];
    for (const node of ELITE_NODES) {
      try {
        const feed = await parser.parseURL(node.url);
        allNews = [...allNews, ...feed.items.map(i => ({ 
          title: i.title, link: i.link, content: i.contentSnippet || i.content, source_name: node.name 
        }))];
      } catch (e) { console.error(`Offline: ${node.name}`); }
    }

    const uniqueSignals = allNews.filter((item, index, self) =>
      index === self.findIndex((t) => (t.title?.slice(0, 30) === item.title?.slice(0, 30)))
    );

    for (const signal of uniqueSignals) {
      const triage = await ceoBot.evaluate(signal);
      
      // QUALITY GATES: 0.70 for Deep Dives, 0.40 for The Wire
      if (triage.reputationScore >= 0.70) {
        const audit = await governanceAuditor.audit(triage);
        const briefing = await editorialChief.synthesize(triage, audit);

        await supabase.from('articles').insert([{
          ...briefing,
          type: 'BESPOKE',
          sentiment: triage.sentiment,
          tag: triage.tag,
          author: "Equitee Editorial Desk",
          date: new Date().toISOString()
        }]);
      } else if (triage.reputationScore >= 0.40) {
        await supabase.from('articles').insert([{
          title: signal.title,
          summary: triage.summary,
          source_link: signal.link,
          type: 'WIRE',
          sentiment: triage.sentiment,
          tag: triage.tag,
          author: signal.source_name,
          date: new Date().toISOString()
        }]);
      }
    }
    console.log("--- SWEEP COMPLETE ---");
  } catch (error) { console.error("ORCHESTRATOR CRASH:", error); }
}
