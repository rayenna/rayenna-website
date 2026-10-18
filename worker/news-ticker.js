/**
 * Rayenna Solar News Ticker — Cloudflare Worker
 *
 * Same RSS sources as Rayenna CRM Zenith (`/api/solar-news`).
 * Returns: [{ headline, url, tag }, ...]  (website ticker shape)
 *
 * Deploy / update:
 * 1. Cloudflare Dashboard → Workers & Pages → open worker
 *    (yours is winter-bonus-58ad.rayennasolar.workers.dev)
 * 2. Edit code → paste this entire file → Deploy
 * 3. Site .env already has:
 *    PUBLIC_NEWS_TICKER_URL=https://winter-bonus-58ad.rayennasolar.workers.dev
 * 4. Restart `npm run dev` (Astro reads PUBLIC_* at startup)
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

/** Same feed list as rayenna_crm/src/routes/solarNews.ts */
const RSS_SOURCES = [
  { source: 'Mercom India', url: 'https://mercomindia.com/feed/', maxItems: 10 },
  { source: 'PV Tech', url: 'https://www.pv-tech.org/feed/', maxItems: 10 },
  { source: 'SolarQuarter', url: 'https://solarquarter.com/feed/', maxItems: 10 },
  { source: 'Re-Solve', url: 'https://re-solve.in/feed/', maxItems: 10 },
  { source: 'Solar Power World', url: 'https://www.solarpowerworldonline.com/feed/', maxItems: 10 },
  { source: 'Renewable Mirror', url: 'https://www.renewablemirror.com/feed/', maxItems: 10 },
  { source: 'CleanTechnica', url: 'https://cleantechnica.com/feed/', maxItems: 10 },
  { source: 'ET Energy', url: 'https://energy.economictimes.indiatimes.com/rss/topstories', maxItems: 10 },
  { source: 'EQ Mag Pro', url: 'https://www.eqmagpro.com/tag/kerala/feed/', maxItems: 10 },
  { source: 'Renewable Watch', url: 'https://renewablewatch.in/category/solar-power/feed/', maxItems: 10 },
  { source: 'SolarClue', url: 'https://blog.solarclue.com/feed/', maxItems: 10 },
  { source: 'PV Magazine India', url: 'https://www.pv-magazine-india.com/feed/', maxItems: 10 },
];

const ET_SOLAR_FILTER_TERMS = [
  'solar', 'renewable', 'wind', 'kseb', 'mnre', 'rooftop',
  'photovoltaic', ' pv', 'energy storage', 'bess',
];

const FALLBACK = [
  { headline: "India's solar capacity crosses 90 GW milestone", url: 'https://rayennaenergy.com/blog', tag: 'market' },
  { headline: 'PM Surya Ghar scheme: 1 crore homes to get rooftop solar', url: 'https://rayennaenergy.com/blog', tag: 'policy' },
  { headline: 'Kerala leads southern states in rooftop solar adoption', url: 'https://rayennaenergy.com/blog', tag: 'market' },
  { headline: 'KSEB net metering: everything Kerala homeowners need to know', url: 'https://rayennaenergy.com/blog', tag: 'grid' },
  { headline: 'High-efficiency TOPCon panels now 20% cheaper than 2023', url: 'https://rayennaenergy.com/blog', tag: 'tech' },
];

function isEtRelevant(title) {
  const t = title.toLowerCase();
  return ET_SOLAR_FILTER_TERMS.some((k) => t.includes(k));
}

function stripHtmlFromText(s) {
  let t = String(s ?? '').trim().replace(/<[^>]+>/g, ' ');
  t = t
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
  return t.replace(/\s+/g, ' ').trim();
}

function isCssOrMarkupNoise(s) {
  const t = s.toLowerCase();
  if (/<\s*(img|svg|video|iframe|script|style)\b/i.test(s)) return true;
  if (/(object-fit|border-box|box-sizing|loading\s*=\s*['"]?lazy)/i.test(t)) return true;
  const semi = (t.match(/;/g) || []).length;
  const colons = (t.match(/:/g) || []).length;
  return semi >= 5 && colons >= 5;
}

function normalizeHeadline(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function assignTag(headline) {
  const h = headline.toLowerCase();
  if (/(policy|scheme|subsidy|mnre|kseb|regulation|surya ghar)/i.test(h)) return 'policy';
  if (/(grid|discom|transmission|storage|bess|net metering)/i.test(h)) return 'grid';
  if (/(price|tariff|tender|bid|import|duty|\bmw\b|\bgw\b|capacity|crore)/i.test(h)) return 'market';
  if (/(panel|efficiency|floating|technology|innovation|bifacial|photovoltaic|\bpv\b|inverter)/i.test(h)) return 'tech';
  if (/(farm|pump|kusum|agri|irrigation)/i.test(h)) return 'agri';
  return 'market';
}

function absoluteUrl(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return href;
  }
}

/** Lightweight RSS/Atom parse (no XML library in Workers) */
function parseFeed(xml, source, feedUrl, maxItems) {
  const out = [];
  const itemBlocks = [];
  const itemRe = /<item[\s>]([\s\S]*?)<\/item>/gi;
  const entryRe = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
  let m;
  while ((m = itemRe.exec(xml)) !== null) itemBlocks.push(m[1]);
  if (!itemBlocks.length) {
    while ((m = entryRe.exec(xml)) !== null) itemBlocks.push(m[1]);
  }

  for (const block of itemBlocks.slice(0, maxItems)) {
    const titleMatch =
      block.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
      block.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1] : '';
    const headline = stripHtmlFromText(rawTitle);
    if (!headline || isCssOrMarkupNoise(headline)) continue;
    if (source === 'ET Energy' && !isEtRelevant(headline)) continue;

    const linkHref = block.match(/<link[^>]+href=["']([^"']+)["']/i);
    const linkText =
      block.match(/<link[^>]*>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/link>/i) ||
      block.match(/<link[^>]*>\s*([^<\s][^<]*)\s*<\/link>/i);
    const guid =
      block.match(/<guid[^>]*>\s*<!\[CDATA\[(https?:\/\/[\s\S]*?)\]\]>\s*<\/guid>/i) ||
      block.match(/<guid[^>]*>\s*(https?:\/\/[^<\s]+)\s*<\/guid>/i);

    let link = (linkHref && linkHref[1]) || (linkText && linkText[1]) || (guid && guid[1]) || '';
    link = stripHtmlFromText(link).trim();
    if (!link) continue;
    const urlOut = absoluteUrl(feedUrl, link);
    if (!/^https?:\/\//i.test(urlOut)) continue;

    const pubMatch =
      block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
      block.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
      block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
    const pubRaw = pubMatch ? stripHtmlFromText(pubMatch[1]) : '';
    const d = pubRaw ? new Date(pubRaw) : null;
    const publishedAt = d && !Number.isNaN(d.getTime()) ? d.toISOString() : new Date().toISOString();

    out.push({
      source,
      headline,
      url: urlOut,
      tag: assignTag(headline),
      publishedAt,
    });
  }
  return out;
}

async function fetchRss(source, url, maxItems) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'RayennaSite/1.0 (+Solar News Ticker)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      cf: { cacheTtl: 1800, cacheEverything: true },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, source, url, maxItems);
  } catch {
    return [];
  }
}

function enforcePerSourceLimit(items, maxPerSource) {
  const used = {};
  const out = [];
  for (const it of items) {
    const n = used[it.source] ?? 0;
    if (n >= maxPerSource) continue;
    used[it.source] = n + 1;
    out.push(it);
  }
  return out;
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

    const results = await Promise.all(
      RSS_SOURCES.map((s) => fetchRss(s.source, s.url, s.maxItems)),
    );
    const flat = results.flat();

    const seen = new Set();
    const deduped = [];
    for (const it of flat) {
      const k = normalizeHeadline(it.headline);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      deduped.push(it);
    }

    deduped.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    const mixed = enforcePerSourceLimit(deduped, 5).slice(0, 20);

    // Website ticker only needs headline / url / tag
    const payload = (mixed.length > 0 ? mixed : FALLBACK).map((it) => ({
      headline: it.headline,
      url: it.url,
      tag: it.tag,
    }));

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
