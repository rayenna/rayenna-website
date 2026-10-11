# Accuracy & credibility audit — Rayenna Energy

**Branch:** `fix/accuracy-credibility`  
**Date:** 2026-10-11  
**Sources cited for fixes:** [pmsuryaghar.gov.in](https://pmsuryaghar.gov.in), [GST renewable devices → 5%](https://taxguru.in/goods-and-service-tax/gst-renewable-energy-devices-reduced-5-percent.html)

Phase 1 is audit only. Proposed replacements below are applied in Phase 2.

## Owner decisions (blockers / fallbacks used)

| # | Decision | Fallback used until answered |
|---|----------|------------------------------|
| 1 | Exact registration term matching national portal listing | **PM Surya Ghar registered vendor (MNRE)** / ML: **PM സൂര്യ ഘർ രജിസ്റ്റർ ചെയ്ത വെൻഡർ (MNRE)** |
| 2 | Source URL + date for “zero energy charges / over half” statistic | Softened to “Many Kerala homes with right-sized solar record near-zero electricity bills” — no “over half” figure |
| 3 | Verifiable replacement for “100% client satisfaction” | **25-year panel performance warranty** (homepage who-we-are stat) |
| 4 | Confirm scheme end date vs current MNRE guidance | Softened urgency; **no** asserted 31 Mar 2027 end date as fact; omit visible “last verified” date line until owner supplies `CLAIMS.lastVerified` |
| 5 | Whether 25-year headline warranty applies to all panel brands | Keep headline **25 years**; calculator model cards → “Up to 30-year manufacturer performance warranty (model-specific)” |

## Image files owner must replace (baked-in text)

| File | Issue |
|------|--------|
| `public/media/Artboard-2mnre.webp` | Likely contains “Govt of India” / channel-partner wording in the bitmap |
| `public/media/Artboard-2-copymnre.webp` | Same |
| `public/media/Artboard-1mnre.webp` | Same |

Alt text will be updated in code; bitmap text cannot be edited here.

## Calculator subsidy logic (checked)

| File | Finding |
|------|---------|
| `src/scripts/solar-calculator.ts` `pmSubsidy()` | **Already correct:** ≤1 kW → ₹30,000; ≤2 kW → ₹60,000; else → ₹78,000. No code change required for Issue 1. |

## Audit table

| File | Line (approx) | Current text (summary) | Issue | Proposed replacement | Owner input? |
|------|---------------|------------------------|-------|----------------------|--------------|
| `src/pages/solar-panels-kochi.astro` | 59–63 | “proportional support for larger systems”; row `3–10 kW` = `₹78,000 + 20% of excess cost` | 1 Subsidy formula | Slabs: 1 kW ₹30k; 2 kW ₹60k; **3 kW and above ₹78,000 (maximum)**. Remove excess %. Intro: up to ₹78,000 CFA for eligible residential systems. | No |
| `src/pages/solar-panels-thrissur.astro` | 59–63 | Same excess-cost row (`20% on balance cost`) | 1 | Same as Kochi | No |
| `src/pages/solar-panels-trivandrum.astro` | 59–63 | Same | 1 | Same | No |
| `src/pages/ml/solar-panels-kochi.astro` | 64 | `₹78,000 + അധിക ചെലവിന്റെ 20%` | 1 | `3 kW ഉം അതിന് മുകളിലും: ₹78,000 (പരമാവധി)` + matching rows | No |
| `src/pages/ml/solar-panels-thrissur.astro` | 64 | `₹78,000 + ബാലൻസ് ചെലവിന്റെ 20%` | 1 | Same ML slabs | No |
| `src/pages/ml/solar-panels-trivandrum.astro` | 64 | Same | 1 | Same | No |
| `src/pages/faqs.astro` | 52 | “Solar panels currently attract **12% GST**” | 2 GST | **5%** GST on solar cells/modules (effective 22 Sep 2025); invoice may mix equipment vs services; keep CA consult | No |
| `src/i18n/faqs-ml.ts` | 46 | `സോളാർ പാനലുകൾക്ക് നിലവിൽ 12% GST` | 2 | Mirror EN GST update in Malayalam | No |
| `src/pages/faqs.astro` | 24 | Cost FAQ — no GST cut mention | 2 | Add one short line on 12%→5% Sep 2025 | No |
| `src/i18n/faqs-ml.ts` | 18 | Cost FAQ ML | 2 | Same ML | No |
| `src/pages/faqs.astro` / `faqs-ml` | “best time to buy” answers | Timing favourable; no GST note | 2 | Add GST cut selling point | No |
| `src/pages/index.astro` / `ml/index.astro` | solar-intro / season | Cost discussion | 2 | Optional one-line GST cut near costs / “best time” copy via `ui.ts` or intro | No |
| `src/pages/solar-calculator.astro` | 776 | “including GST, are additional” | 2 Flag | **No change** — does not assert 12%. Flagged only. | No |
| `src/i18n/ui.ts` | 112, 428 | “only through MNRE partners like Rayenna” / ML equivalent | 3 Exclusivity | “Subsidy applies only with registered installers, and we handle it end to end.” | No |
| `src/pages/faqs.astro` | 40, 462, 470 | “only available through MNRE-empanelled”; “exclusively through”; “Available only via … like Rayenna” | 3 | Registered-installer wording; keep portal + registered vendor truth; remove Rayenna-only implication | No |
| `src/pages/ml/faqs.astro` | 175, 183 | Exclusive / Rayenna-only | 3 | Mirror | No |
| `src/i18n/faqs-ml.ts` | 34 | MNRE-empanelled only + channel partner | 3 | Soften Rayenna exclusivity; keep registered-vendor requirement | No |
| `src/i18n/calculator-en.ts` | 105 | “Every system we install qualifies for the **full** PM Surya Ghar subsidy.” | 4a Overclaim | Eligible residential systems can claim central subsidy up to scheme limits, subject to compliant equipment and portal approval. | No |
| `src/i18n/calculator-ml.ts` | 107 | “ഓരോ സിസ്റ്റവും … അർഹമാണ്” | 4a | Mirror cautious wording | No |
| `src/pages/index.astro` / `ml/index.astro` | who-stats `100` + Client satisfaction | “100% client satisfaction” | 4b | Replace with **25** + panel performance warranty label | Yes (3) — fallback applied |
| `src/i18n/ui.ts` | 111, 427 | “Over half of Kerala PM Surya Ghar homes…” | 4c | Near-zero bills fallback (no “over half”) | Yes (2) |
| `src/pages/faqs.astro` | 68 | “over half of the State’s rooftop applicants…” | 4c | Soften; remove over-half figure | Yes (2) |
| `src/i18n/faqs-ml.ts` | 62 | അർദ്ധത്തിലധികം | 4c | Soften | Yes (2) |
| `src/pages/blog/kerala-zero-bill-rooftop-solar-2026.astro` | meta, lead, sidebar | Over half / 50% claims | 4c | Soften lead + meta + sidebar; flag detailed 50%/3.64 lakh stats for owner source or remove figures | Yes (2) |
| `src/i18n/blog-articles-ml/kerala-zero-bill-rooftop-solar-2026.ts` | body | Same theme | 4c | Soften | Yes (2) |
| `src/pages/blog/index.astro` | excerpt zero-bill | Over half… | 4c | Soften excerpt | Yes (2) |
| `src/pages/about.astro` | 39–40, 58–60 | Company badge “Government of India Certified” | 5 Certification | Remove company-level Govt certified; keep registration term only | No |
| `src/pages/about.astro` | 19, 123, 148 | Master Mariner / Govt certified | 5 | Person-specific: “Government of India–certified Master Mariner” | No |
| `src/pages/ml/about.astro` | 40–41, 59–61, directorCreds | ഇന്ത്യാ സർക്കാർ സർട്ടിഫൈഡ് (company) | 5 | Remove company badge; person-specific Master Mariner | No |
| `src/pages/index.astro` | MNRE badge alt | “MNRE Approved Channel Partner — Govt of India” | 5 | Alt → registration term | No |
| `src/i18n/ui.ts` | mnreBadgeAlt, many “MNRE-approved / channel partner” | Mixed terms | 5 | Standardise company status to Claims Register term | Yes (1) — default applied |
| `src/pages/services.astro` | 39–41 | `3–4` Year ROI; `20` Year Panel Lifespan; `80%` Average Bill Reduction | 6 Numbers | Payback **3–5**; panel life **25+**; bill **up to 80%**; use “payback” not ROI | No |
| `src/pages/ml/services.astro` | 40–42 | `3–4` വർഷം ROI; `20` വർഷ പാനൽ ആയുസ് | 6 | Mirror | No |
| `src/pages/index.astro` | 70 | “70 to 80%” | 6 | “up to 80%” | No |
| `src/pages/ml/index.astro` | solar-intro equivalent | Same if present | 6 | Sync | No |
| `src/pages/faqs.astro` | 32 | “remaining 20+ years” | 6 | “remaining 25+ years” | No |
| `src/i18n/faqs-ml.ts` | payback answer | 20+ years residual | 6 | 25+ | No |
| `src/pages/solar-calculator.astro` / `ml/` | panel cards `30yr warranty` | Model warranty overclaim | 6 | “Up to 30-year manufacturer performance warranty (model-specific)” | Yes (5) |
| `src/pages/solar-panels-thrissur.astro` | 37 | payback 3–4 years; offset 80–90% | 6 | Payback 3–5; bill reduction up to 80% (flag 80–90% as overclaim → up to 80%) | No |
| `src/pages/ml/solar-panels-thrissur.astro` | 38 | 3–4 വർഷം; 80–90% | 6 | Mirror | No |
| `src/pages/blog/going-solar-kochi-guide-2025.astro` | 34, 71 | 3–4 Year ROI | 6 | 3–5 Year Payback | No |
| `src/i18n/blog-articles-ml/going-solar-kochi-guide-2025.ts` | if present | Same | 6 | Mirror | No |
| `src/i18n/ui.ts` | 247 seasonNote | “while 2026 PM Surya Ghar subsidy is open” | 7 Urgency | Soften; no hard end date | Yes (4) |
| `src/pages/faqs.astro` | 12, 44, 64, 72, 76, 223–224 | Mar 2027 / scheme window as fact | 7 | Soften to check current status; keep process facts without asserting end date | Yes (4) |
| `src/i18n/faqs-ml.ts` | multiple | 2027 മാർച്ച് 31 | 7 | Soften | Yes (4) |
| `src/pages/ml/faqs.astro` | popular chip | പദ്ധതി 2027 മാർച്ച് വരെ | 7 | Softer chip label | Yes (4) |
| `worker/chat-proxy.js` | 94, 119–120 | Govt. of India certified; ROI 5–6 years; Systems last 20+ years | Chatbot | Align registration term, payback 3–5, panel life 25+, GST/subsidy slabs; deploy Worker separately | No (repo has source) |

### Flagged absolute claims in edited areas (not auto-changed unless listed above)

| Location | Claim | Action |
|----------|-------|--------|
| About mission “Only the best-grade…” | Absolute quality | Listed only |
| Blog “exclusively installs Tier 1” | Brand exclusivity | Listed; not Issue 3 subsidy exclusivity |
| FAQ “guaranteed … 85%” warranty | Warranty language | Keep (standard warranty wording) |
| Testimonials “unbeatable” (media page) | Marketing | Listed only — outside primary issue list |
| City page “covers 40% of cost” (home intro bullet) | Rough CFA % | Fix when touching subsidy copy → slab language |

## Chatbot

Prompt lives in-repo at `worker/chat-proxy.js` (deployed Worker `rayenna-chat-proxy`). Fixes applied in Phase 2 to the source file; **owner must redeploy the Cloudflare Worker** for production chat to update. See also `docs/chatbot-text-fixes.md`.


## Phase 2 completion (2026-10-11)

All Issues 1–7 applied on branch `fix/accuracy-credibility`. `npm run build` passed. Re-grep cleared forbidden phrases listed in the brief. No `TODO_OWNER` in rendered `dist/` HTML.

| Issue | Status |
|-------|--------|
| 1 Subsidy slabs | Done (6 city pages); calculator `pmSubsidy()` already correct |
| 2 GST 5% | Done (FAQs EN/ML + homepage invest cards) |
| 3 Exclusivity | Done (ui, FAQs EN/ML banners) |
| 4 Overclaims | Done (calculator trust, 100%→25yr warranty, zero-bill soften EN/ML/blog) |
| 5 Certification / registration | Done (About EN/ML, sitewide term, founder Master Mariner) |
| 6 Numbers | Done (services, Thrissur, calculator warranties, Kochi guide) |
| 7 Scheme urgency | Done (softened; no asserted 31 Mar 2027) |
| Claims register | `docs/claims-register.md` + `src/data/claims.ts` |
| Chatbot | `worker/chat-proxy.js` + `docs/chatbot-text-fixes.md` (redeploy Worker) |

### Calculator GST note (flagged, not changed)

EN/ML calculator still say taxes/GST are **additional** on the invoice — correct; no stale “12% on panels” claim there. Invoice split (equipment vs services) covered in FAQ.

### Malayalam lines needing native-speaker review

Priority files touched for factual ML copy (tone preserved; verify grammar/naturalness):

- `src/i18n/faqs-ml.ts` — GST, exclusivity, zero-bill, scheme-window, registration wording
- `src/i18n/ui.ts` (`ml` section) — whyNow, invest cards, seasonNote, registration microcopy, who-stat
- `src/pages/ml/about.astro` — badges, director creds, founder spans, meta
- `src/pages/ml/faqs.astro` — subsidy banner / points
- `src/pages/ml/index.astro` — subsidy bullet slabs; who-stat 25yr
- `src/pages/ml/services.astro` — payback / panel life stats
- `src/pages/ml/solar-panels-{kochi,thrissur,trivandrum}.astro` — subsidy tables + Thrissur payback
- `src/pages/ml/solar-calculator.astro` — manufacturer warranty labels
- `src/i18n/calculator-ml.ts` — trust subsidy sentence + title
- `src/i18n/blog-articles-ml/kerala-zero-bill-rooftop-solar-2026.ts`
- `src/i18n/blog-articles-ml/going-solar-kochi-guide-2025.ts`
- `src/pages/ml/privacy.astro` — registration term in company description

### Absolute claims flagged (not changed)

See table above (best-grade, Tier-1 exclusive installs, warranty 85% guarantee language, media testimonials).
