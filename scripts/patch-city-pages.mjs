import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/pages/solar-panels-thrissur.astro',
  'src/pages/solar-panels-trivandrum.astro',
  'src/pages/ml/solar-panels-kochi.astro',
  'src/pages/ml/solar-panels-thrissur.astro',
  'src/pages/ml/solar-panels-trivandrum.astro',
];

const importEn = `import { useTranslations } from '../i18n/ui';
`;
const importMl = `import { useTranslations } from '../../i18n/ui';
`;

for (const rel of files) {
  const file = path.join(process.cwd(), rel);
  let src = fs.readFileSync(file, 'utf8');
  const isMl = rel.includes('/ml/');
  const importLine = isMl ? importMl : importEn;
  const lang = isMl ? 'ml' : 'en';

  if (!src.includes('useTranslations')) {
    src = src.replace(
      /import \{ OG \}[^\n]+\n/,
      (m) => `${m}${importLine}`,
    );
    src = src.replace(
      /const base = [^\n]+\n/,
      (m) => `${m}const t = useTranslations('${lang}');\nconst pc = t.pageConvert.city;\n`,
    );
  }

  if (!src.includes('area-hero__micro')) {
    src = src.replace(
      /(<div class="area-hero__ctas">[\s\S]*?<\/div>)\s*(<\/div>\s*<\/section>)/,
      `$1
      <p class="area-hero__micro">{pc.heroMicro}</p>
      <p class="area-hero__phone">{pc.heroPhone} <a href="tel:+917907369304" data-analytics-location="city_hero">+91 7907 369 304</a></p>
    $2`,
    );
  }

  src = src.replace(
    /<a href=\{`\$\{base\}\/contact`\} class="btn btn-primary">[^<]+<\/a>\s*<a href=\{`\$\{base\}\/solar-calculator`\} class="btn btn-outline">[^<]+<\/a>/,
    `<a href={\`\${base}/contact\`} class="btn btn-primary">{pc.ctaContact}</a>
        <a href={\`\${base}/solar-calculator\`} class="btn btn-outline">{pc.ctaCalc}</a>`,
  );

  if (isMl) {
    src = src.replace(
      /<a href=\{`\$\{mlPrefix\}\/contact\/`\} class="btn btn-primary">[^<]+<\/a>\s*<a href=\{`\$\{mlPrefix\}\/solar-calculator\/`\} class="btn btn-outline">[^<]+<\/a>/,
      `<a href={\`\${mlPrefix}/contact/\`} class="btn btn-primary">{pc.ctaContact}</a>
        <a href={\`\${mlPrefix}/solar-calculator/\`} class="btn btn-outline">{pc.ctaCalc}</a>`,
    );
  }

  if (!src.includes('area-hero__micro')) {
    src = src.replace(
      /\.area-hero__ctas \{ display: flex; flex-wrap: wrap; gap: 14px; \}/,
      `.area-hero__ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 12px; }
.area-hero__micro {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.78);
  margin: 0 0 8px;
}
.area-hero__phone {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.85);
  margin: 0;
}
.area-hero__phone a {
  color: #fff;
  font-weight: 700;
  text-decoration: underline;
}`,
    );
  }

  fs.writeFileSync(file, src);
  console.log('patched', rel);
}
