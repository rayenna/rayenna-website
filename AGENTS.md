# Rayenna website — agent & contributor guidelines

Ground rules for ongoing work on this repo (Astro static site, English + Malayalam, deployed to GitHub Pages).

## Bilingual parity (English + Malayalam)

**Any user-facing change must be applied to both locales** unless you explicitly agree an exception (e.g. legal name in English only).

| | English | Malayalam |
|---|---------|-----------|
| **URLs** | `/about/`, `/contact/`, … | `/ml/about/`, `/ml/contact/`, … |
| **Pages** | `src/pages/` | `src/pages/ml/` |
| **Shared UI** | `src/i18n/ui.ts` → `en` and `ml` sections |

Also keep in sync when relevant:

- FAQs: `src/i18n/faqs-ml.ts` + both FAQ pages  
- Blog: English articles under `src/pages/blog/`; Malayalam under `src/i18n/blog-articles-ml/` and `src/pages/ml/blog/`  
- New pages with a Malayalam version: register in `ML_ROUTES` in `src/i18n/ui.ts`  
- Layout chrome: `src/layouts/Layout.astro` (`lang` prop, hreflang, language switcher)

**Malayalam copy:** use **റയെന്ന** for the brand (not റയെന്ന്). Prefer **ഹരിത** over പച്ച for green/eco terms.

## Mobile-first + multi-device compatibility

- Build and review at **mobile width first** (~375px), then tablet/desktop.
- Use progressive enhancement (`min-width` breakpoints), adequate tap targets, and no horizontal overflow.
- Treat layout as “done” only when it works on **Android, iPhone, iPad, MacBook, and Windows laptops** (esp. HP EliteBook 1920×1200 @ 125–150% scale ≈ **1280–1536px CSS**).
- Malayalam is longer and clips more easily at laptop CSS widths — prefer stacking / wider breakpoints over overflow hacks.
- See `.cursor/rules/bilingual-mobile-first.mdc` for EliteBook / scaling details.

## Build & deploy

- Run `npm run build` before considering work complete.  
- Pushes to `main` deploy via GitHub Actions; allow a few minutes + hard refresh for CDN cache.

## Related Cursor rules

- `.cursor/rules/bilingual-mobile-first.mdc` — always applied  
- `.cursor/rules/media-references.mdc` — reference photos on the media page (EN; mirror in `src/pages/ml/media.astro` when changing gallery data)
