/**
 * Rayenna Solar News Ticker — Cloudflare Worker
 *
 * One-time setup (same as chat-proxy):
 * 1. Go to cloudflare.com → Workers & Pages → Create Worker
 * 2. Paste this entire file as the worker code
 * 3. Deploy, then note the worker URL (e.g. rayenna-news-ticker.rayennasolar.workers.dev)
 * 4. Add that URL as PUBLIC_NEWS_TICKER_URL in your .env file
 *
 * The worker fetches Google News RSS for India solar news,
 * parses the XML, assigns a category tag to each item,
 * and returns a clean JSON array.
 */

const ALLOWED_ORIGINS = [
  'https://rayennaenergy.com',
  'https://www.rayennaenergy.com',
  'http://localhost:4321',
  'http://127.0.0.1:4321',
];

const CORS_HEADERS = (origin) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
});

const RSS_FEEDS = [
  // Google News RSS — India solar
  'https://news.google.com/rss/search?q=solar+energy+india+Kerala&hl=en-IN&gl=IN&ceid=IN:en',
  // Google News RSS — solar policy/subsidy
  'https://news.google.com/rss/search?q=PM+Surya+Ghar+solar+subsidy+india&hl=en-IN&gl=IN&ceid=IN:en',
];

/** Assign a tag based on keywords in the headline */
function assignTag(title) {
  const t = title.toLowerCase();
  if (/subsid|policy|scheme|govern|mnre|ministry|surya ghar|regulation/.test(t)) return 'policy';
  if (/grid|meter|kseb|discom|transmission|net metering/.test(t)) return 'grid';
  if (/price|cost|market|invest|fund|crore|billion|mw|gw|capex|tariff/.test(t)) return 'market';
  if (/panel|technology|efficiency|battery|storage|ev|inverter|module/.test(t)) return 'tech';
  if (/farm|agri|rural|village|pump|irrigation|kisan/.test(t)) return 'agri';
  return 'market';
}

/** Parse RSS XML text and extract items */
function parseRss(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];

    const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                       block.match(/<title>(.*?)<\/title>/);
    const linkMatch  = block.match(/<link>(.*?)<\/link>/) ||
                       block.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/);

    const title = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'") : null;
    const url   = linkMatch  ? linkMatch[1].trim() : null;

    if (title && url && url.startsWith('http')) {
      // Strip " - Source Name" suffix that Google News adds
      const cleanTitle = title.replace(/\s[-–]\s[^-–]+$/, '').trim();
      items.push({ headline: cleanTitle, url, tag: assignTag(cleanTitle) });
    }
  }
  return items;
}

/** Fetch one RSS feed and return parsed items, or [] on failure */
async function fetchFeed(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RayennaBot/1.0)' },
      cf: { cacheTtl: 1800, cacheEverything: true },
    });
    if (!res.ok) return [];
    const text = await res.text();
    return parseRss(text);
  } catch {
    return [];
  }
}

/** De-duplicate by URL, keep first occurrence */
function dedup(items) {
  const seen = new Set();
  return items.filter(it => {
    if (seen.has(it.url)) return false;
    seen.add(it.url);
    return true;
  });
}

export default {
  async fetch(request, _env, _ctx) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = CORS_HEADERS(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    const results = await Promise.all(RSS_FEEDS.map(fetchFeed));
    const all = dedup(results.flat()).slice(0, 20);

    const payload = all.length > 0 ? all : [
      { headline: 'India\'s solar capacity crosses 90 GW milestone', url: 'https://rayennaenergy.com/blog', tag: 'market' },
      { headline: 'PM Surya Ghar scheme: 1 crore homes to get rooftop solar', url: 'https://rayennaenergy.com/blog', tag: 'policy' },
      { headline: 'Kerala leads southern states in rooftop solar adoption', url: 'https://rayennaenergy.com/blog', tag: 'market' },
      { headline: 'KSEB net metering: everything Kerala homeowners need to know', url: 'https://rayennaenergy.com/blog', tag: 'grid' },
      { headline: 'High-efficiency TOPCon panels now 20% cheaper than 2023', url: 'https://rayennaenergy.com/blog', tag: 'tech' },
    ];

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  },
};
