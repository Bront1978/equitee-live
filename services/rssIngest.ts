import Parser from 'rss-parser';

const parser = new Parser();

export async function getLatestAlpha() {
  const FEEDS = ['https://techcrunch.com/feed', 'https://www.theinformation.com/feed'];
  const allEntries = [];
  
  for (const url of FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      allEntries.push(...feed.items);
    } catch (e) {
      console.error(`Failed to fetch: ${url}`);
    }
  }
  return allEntries;
}
