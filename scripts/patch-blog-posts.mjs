import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src/pages/blog');
const files = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith('.astro') && f !== 'index.astro')
  .map((f) => path.join(blogDir, f));

const imports = `import BlogPostEndCta from '../../components/BlogPostEndCta.astro';
import BlogPostResourceLinks from '../../components/BlogPostResourceLinks.astro';
import BlogUpdatedNote from '../../components/BlogUpdatedNote.astro';
import { blogUiEn } from '../../i18n/blog-ui';
`;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (!src.includes('BlogPostEndCta')) {
    src = src.replace(
      /import Layout from '\.\.\/\.\.\/layouts\/Layout\.astro';\n/,
      `import Layout from '../../layouts/Layout.astro';\n${imports}`,
    );
    changed = true;
  }

  if (!src.includes('<BlogUpdatedNote')) {
    if (src.includes('class="post-updated-note"')) {
      src = src.replace(
        /<p class="post-updated-note">[\s\S]*?<\/p>\s*/,
        '<BlogUpdatedNote date={post.date} />\n        ',
      );
    } else {
      src = src.replace(
        /<article class="post-content">\s*/,
        `<article class="post-content">\n        <BlogUpdatedNote date={post.date} />\n        `,
      );
    }
    changed = true;
  }

  if (!src.includes('<BlogPostResourceLinks')) {
    src = src.replace(
      /(\s*)<\/article>\s*\n\s*<aside class="post-sidebar">/,
      `$1<BlogPostResourceLinks />\n$1</article>\n\n      <aside class="post-sidebar">`,
    );
    changed = true;
  }

  if (!src.includes('post-cta__actions')) {
    src = src.replace(
      /(<div class="post-cta">[\s\S]*?<p>[^<]*<\/p>)\s*<a href=\{`\$\{base\}\/contact`\} class="btn btn-primary">([^<]*)<\/a>\s*<\/div>/,
      `$1
          <div class="post-cta__actions">
            <a href={\`\${base}/contact\`} class="btn btn-primary">$2</a>
            <a href={\`\${base}/solar-calculator\`} class="btn btn-cta-secondary">{blogUiEn.calcSecondary}</a>
          </div>
        </div>`,
    );
    changed = true;
  }

  const calcSection = /\s*<section style="padding:0 0 56px; background:var\(--color-light\)">\s*<div class="container">\s*<div class="calc-cta-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
  if (calcSection.test(src)) {
    src = src.replace(calcSection, '\n\n  <BlogPostEndCta />\n');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, src);
    console.log('patched', path.basename(file));
  }
}
