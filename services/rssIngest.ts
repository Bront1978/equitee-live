import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = [
  'https://techcrunch.com/feed',
  'https://www.theinformation.com/feed',
  'https://www.dealstreetasia.com/feed', 
  'https://www.techinasia.com/feed',
  'https://news.ycombinator.com/rss'
];

export async function getLatestAlpha() {
  const allEntries = [];
  for (const url of FEEDS) {
    try {
      const feed = await parser.parseURL(url);
      allEntries.push(...feed.items.map(item => ({
        source: feed.title,
        title: item.title,
        link: item.link,
        content: item.contentSnippet || item.content,
        isoDate: item.isoDate
      })));
    } catch (e) {
      console.error(`Failed to fetch node: ${url}`);
    }
  }
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  return allEntries.filter(entry => {
    const entryDate = entry.isoDate ? new Date(entry.isoDate) : new Date();
    return entryDate > twoHoursAgo;
  });
}
