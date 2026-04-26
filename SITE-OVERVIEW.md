# Rayenna Energy — Site Overview

_Last updated: 26 April 2026_

---

## What the Site Is

A professional marketing and lead-generation website for **Rayenna Energy Private Limited**, an MNRE-empanelled solar energy company based in Vyttila, Kochi, Kerala. The site positions Rayenna as a premium solar installer for domestic, commercial, and consultation clients across Kerala, and serves as the primary channel for inbound enquiries and brand credibility.

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Astro](https://astro.build) v4 — static site generator |
| **Language** | TypeScript / HTML / CSS (no client-side framework like React) |
| **Styling** | Scoped component CSS + a global design system (`global.css`) |
| **Fonts** | Poppins (body) + Oswald (headings) via Google Fonts |
| **Forms** | [Formspree](https://formspree.io) (`xwvazrnw`) for both contact forms |
| **Hosting** | GitHub Pages (deployed via `gh-pages` branch) |
| **Version Control** | Git / GitHub, auto-synced |
| **Images** | WebP + JPEG, served from `/public/media/` |

---

## Site Architecture — 25 Pages

```
/ (Home)
├── /about
├── /services
├── /media
├── /blog
│   ├── /blog/how-much-does-solar-cost-in-kerala
│   ├── /blog/pm-surya-ghar-subsidy-guide
│   ├── /blog/solar-vs-electricity-bill-comparison
│   ├── /blog/best-solar-panels-brands-india-2024
│   ├── /blog/solar-maintenance-tips
│   ├── /blog/net-metering-explained
│   ├── /blog/on-grid-vs-off-grid-solar-kerala
│   ├── /blog/kseb-net-metering-guide-2025
│   ├── /blog/apartments-solar-kerala
│   ├── /blog/monocrystalline-vs-polycrystalline-kerala
│   ├── /blog/what-to-ask-solar-contract-kerala
│   ├── /blog/string-inverter-vs-microinverter-hybrid
│   ├── /blog/monsoon-solar-system-kerala
│   ├── /blog/solar-panel-warranty-explained
│   ├── /blog/carbon-math-solar-co2-savings
│   ├── /blog/solar-performance-ratio-explained
│   ├── /blog/solar-loan-vs-subsidy-kerala
│   └── /blog/going-solar-kochi-guide-2025
├── /faqs
└── /contact
```

All 25 pages are **statically generated at build time** via `npm run build`.

---

## Design System

A single shared **`src/layouts/Layout.astro`** wraps every page and provides:

- Fixed navbar — transparent with animated fade-to-white on scroll (homepage only); solid white on all inner pages
- Consistent 4-column footer: logo, MNRE badge, About text, Contact details + social links
- Global CSS variables defined in `src/styles/global.css`:

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#a83838` | Maroon — buttons, accents, highlights |
| `--color-navy` | `#27324f` | Dark navy — headings, hero backgrounds |
| `--color-secondary` | `#788bba` | Blue-grey — subheadings, table headers |
| `--color-text` | `#363636` | Body text |
| `--color-text-muted` | `#616161` | Secondary body text |
| `--font-heading` | Oswald | Section titles, nav links |
| `--font-body` | Poppins | All body copy |

---

## Page Structure Pattern

Every inner page follows the same **3-zone structure**:

1. **Page Hero** — full-bleed photo with dark gradient overlay, eyebrow tag, H1, subtitle
2. **Content sections** — alternating white / light-grey backgrounds, CSS Grid layouts
3. **CTA Banner or Map** — drives visitors to the contact page

### Hero Images (unique per page)

| Page | Image |
|---|---|
| Home | `hero (1).webp` — aerial solar installation |
| About | `hero-copy.jpg` — rooftop workers |
| Services | `services-hero-opt3.jpg` — commercial rooftop at golden hour |
| Media | Full-bleed media gallery |
| Blog | `blog.webp` |
| FAQs | `federico-beccari-ahi73ZN5P0Y-unsplash.jpg` — light trails at twilight |
| Contact | `Plan-solar.webp` — solar planning |

---

## Key Features

### Navigation
- Transparent navbar exclusive to the homepage — fades to frosted white (`rgba(255,255,255,0.97)`) on scroll past 20px
- All inner pages: solid white navbar from the top
- Mobile hamburger menu with smooth open/close animation

### Blog (18 articles)
- 6 original articles (Oct–Nov 2024)
- 12 new articles published Jan–Mar 2025 across 6 categories:
  - Pricing & Finance
  - Government Schemes
  - Buying Guide
  - Maintenance
  - Education
  - Analysis
- Each post: article + sticky sidebar with CTA and related links

### Media Page
- Auto-playing cross-fade slideshow with installation photos
- Navigation dots, prev/next buttons, hover-pause, touch swipe support
- Featured video section with MP4 player

### FAQs Page
- Live search filter across all questions
- Accordion expand/collapse with auto-close siblings
- Category pills with scroll-spy highlighting
- Subsidy highlight section with Unsplash photo

### Forms (both powered by Formspree `xwvazrnw`)
- **Homepage callback widget** — Name, Phone, City; tagged with "Homepage callback form" in email subject
- **Contact page full form** — Name, Phone, Email, Subject, Message; real fetch API with success/error states

### Google Maps
- Embedded on homepage above the footer
- Links to exact Rayenna Energy office location (Vyttila, Ernakulam)

---

## File Structure

```
rayenna/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Shared navbar + footer wrapper
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── media.astro
│   │   ├── faqs.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro       # Blog listing page
│   │       └── [18 post files]
│   └── styles/
│       └── global.css            # Design tokens + base styles
├── public/
│   └── media/                    # All images and video assets
├── astro.config.mjs
├── package.json
└── SITE-OVERVIEW.md              # This file
```

---

## Deployment

- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Host:** GitHub Pages
- **Base URL:** `/rayenna-website/`
- Auto-committed and pushed to `origin/main` after each session
