import { ceoBot, governanceAuditor, editorialChief } from './aiAgents';
import { supabase } from './database';
import Parser from 'rss-parser';

const parser = new Parser();

const PAN_ASIAN_NODES = [
  { name: 'DealStreetAsia', url: 'https://www.dealstreetasia.com/feed' },
  { name: 'Tech In Asia', url: 'https://www.techinasia.com/feed' },
  { name: 'Nikkei Asia', url: 'https://asia.nikkei.com/rss/feed/nar' },
  { name: 'SCMP Tech', url: 'https://www.scmp.com/rss/91/feed' },
  { name: 'Inc42 India', url: 'https://inc42.com/feed' },
  { name: 'The Ken', url: 'https://the-ken.com/feed/' },
  { name: 'e27', url: 'https://e27.co/feed' },
  { name: 'Caixin Global', url: 'https://www.caixinglobal.com/rss/all.xml' }
];

export async function runAutonomousCycle() {
  console.log("--- STARTING PAN-ASIAN INTELLIGENCE SWEEP ---");
  try {
    let rawSignals: any[] = [];
    for (const node of PAN_ASIAN_NODES) {
      try {
        const feed = await parser.parseURL(node.url);
        rawSignals = [...rawSignals, ...feed.items.map(i => ({ 
          title: i.title, link: i.link, content: i.contentSnippet, source: node.name 
        }))];
      } catch (e) { console.warn(`Skipping ${node.name}`); }
    }

    // DEDUPLICATION
    const uniqueSignals = rawSignals.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);

    for (const signal of uniqueSignals) {
      const triage = await ceoBot.evaluate(signal);
      
      // QUALITY GATE: 0.70 for Premium 'BESPOKE' Briefings
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
      } 
      // 0.40 for General 'WIRE' Dispatches
      else if (triage.reputationScore >= 0.40) {
        await supabase.from('articles').insert([{
          title: signal.title,
          summary: triage.summary,
          source_link: signal.link,
          type: 'WIRE',
          sentiment: triage.sentiment,
          tag: triage.tag,
          author: signal.source,
          date: new Date().toISOString()
        }]);
      }
    }
  } catch (err) { console.error("CRITICAL_ORCHESTRATOR_FAILURE", err); }
}
