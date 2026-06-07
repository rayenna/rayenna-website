/**
 * Generate branded 1200×630 Open Graph images into public/og/
 * Run: npm run og:generate
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public/og');

const BRAND = '#a83838';
const NAVY = '#27324f';

/** Escape text for SVG. */
function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Wrap long titles into lines (~38 chars per line). */
function wrapTitle(title, maxLen = 38) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function overlaySvg(title, subtitle, badge = 'Rayenna Energy · Kerala') {
  const lines = wrapTitle(title);
  const titleY = lines.length === 1 ? 340 : lines.length === 2 ? 310 : 285;
  const titleSpans = lines
    .map((line, i) => {
      const y = titleY + i * 58;
      return `<tspan x="72" y="${y}">${esc(line)}</tspan>`;
    })
    .join('');

  return Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${NAVY}" stop-opacity="0.15"/>
      <stop offset="45%" stop-color="${NAVY}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="8" height="630" fill="${BRAND}"/>
  <text x="72" y="88" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="${BRAND}" letter-spacing="1">${esc(badge.toUpperCase())}</text>
  <text font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#ffffff" letter-spacing="-0.5">${titleSpans}</text>
  <text x="72" y="480" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="rgba(255,255,255,0.88)">${esc(subtitle)}</text>
  <text x="72" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="rgba(255,255,255,0.65)">rayennaenergy.com · MNRE Approved · PM Surya Ghar Subsidy</text>
</svg>`);
}

const images = [
  {
    file: 'default.jpg',
    title: 'Solar Panel Installation in Kerala',
    subtitle: 'MNRE-approved installer · Free site survey',
    bg: 'public/media/solar-panel-installation.jpg',
  },
  {
    file: 'home.jpg',
    title: 'Your KSEB Bill Could Be ₹0',
    subtitle: 'Government subsidy up to ₹78,000 · Free site survey',
    bg: 'public/media/hero (1).webp',
  },
  {
    file: 'calculator.jpg',
    title: 'Free Solar Calculator for Kerala',
    subtitle: 'System size, subsidy estimate & payback in 5 minutes',
    bg: 'public/media/solar-calculator-intro.jpg',
  },
  {
    file: 'contact.jpg',
    title: 'Free Solar Consultation',
    subtitle: 'Call +91 7907 369 304 · Response within 24 hours',
    bg: 'public/media/Plan-solar.webp',
  },
  {
    file: 'kochi.jpg',
    title: 'Solar Panel Installation in Kochi',
    subtitle: 'Vyttila-based · Ernakulam & Kochi metro coverage',
    bg: 'public/media/Solar-Kochi-workers.jpg',
  },
  {
    file: 'thrissur.jpg',
    title: 'Solar Panel Installation in Thrissur',
    subtitle: 'MNRE approved · PM Surya Ghar subsidy assistance',
    bg: 'public/media/solar-rooftop-home.jpg',
  },
  {
    file: 'trivandrum.jpg',
    title: 'Solar Panel Installation in Trivandrum',
    subtitle: 'KSEB net metering · 25-year panel warranty',
    bg: 'public/media/services-hero-opt3.jpg',
  },
  {
    file: 'blog.jpg',
    title: 'Solar Energy Blog — Kerala',
    subtitle: 'Subsidy guides, costs, KSEB rules & buying tips',
    bg: 'public/media/blog.webp',
  },
  {
    file: 'blog-almm.jpg',
    title: 'ALMM & Made in India Solar Panels 2026',
    subtitle: 'What Kerala buyers must know before you buy',
    bg: 'public/media/solar-panel-installation.jpg',
  },
  {
    file: 'blog-pm-surya-ghar.jpg',
    title: 'PM Surya Ghar — One Crore Homes Target',
    subtitle: 'Why 2026 may be your best year for ₹78,000 subsidy',
    bg: 'public/media/hero-copy.jpg',
  },
  {
    file: 'blog-vnm.jpg',
    title: 'Virtual Net Metering in Kerala',
    subtitle: 'Can apartments share one solar system?',
    bg: 'public/media/Hardshell-solar.webp',
  },
  {
    file: 'blog-kserc-2026.jpg',
    title: 'Kerala Net Metering Rules 2026',
    subtitle: 'KSERC 2025 changes every solar owner should know',
    bg: 'public/media/glass-BG.jpg',
  },
  {
    file: 'blog-trade-war.jpg',
    title: 'Good News for Kerala Solar Buyers',
    subtitle: 'Why 2026 is an optimal window to go solar',
    bg: 'public/media/solar-rooftop-home.jpg',
  },
];

async function renderOne({ file, title, subtitle, bg }) {
  const bgPath = path.join(root, bg);
  if (!fs.existsSync(bgPath)) {
    throw new Error(`Background not found: ${bg}`);
  }

  const overlay = overlaySvg(title, subtitle);
  await sharp(bgPath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, file));

  console.log(`✓ ${file}`);
}

fs.mkdirSync(outDir, { recursive: true });

for (const img of images) {
  await renderOne(img);
}

console.log(`\nGenerated ${images.length} OG images in public/og/`);
