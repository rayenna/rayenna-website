import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/i18n/blog-articles-ml');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
  const full = path.join(dir, file);
  let src = fs.readFileSync(full, 'utf8');
  if (src.includes('post-cta__actions')) continue;

  const next = src.replace(
    /(<div class="post-cta">[\s\S]*?<p>[\s\S]*?<\/p>)\s*<a href="\/ml\/contact\/" class="btn btn-primary">([^<]+)<\/a>\s*<\/div>/,
    `$1
  <div class="post-cta__actions">
    <a href="/ml/contact/" class="btn btn-primary">$2</a>
    <a href="/ml/solar-calculator/" class="btn btn-cta-secondary">☀️ സമ്പാദ്യം കണക്കാക്കുക</a>
  </div>
</div>`,
  );

  if (next !== src) {
    fs.writeFileSync(full, next);
    console.log('patched', file);
  }
}
