# Rayenna Energy — Site Overview

_Last updated: 28 April 2026_

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
| **Forms** | [Web3Forms](https://web3forms.com) for both contact forms |
| **Hosting** | GitHub Pages (deployed via GitHub Actions on push to `main`) |
| **Version Control** | Git / GitHub, auto-synced |
| **Images** | WebP + JPEG, served from `/public/media/` |
| **AI Chat** | `ChatWidget.astro` (Ray) — Cloudflare Worker proxy → Claude Haiku (Anthropic) |
| **Voice I/O** | Web Speech API — `SpeechRecognition` (mic input) + `SpeechSynthesis` (TTS) |
| **WhatsApp** | Floating button on all pages — pre-filled message, `+91 7907 369 304` |

---

## Site Architecture — 27 Pages

```
/ (Home)
├── /about
├── /services
├── /solar-calculator          ← residential solar sizing tool (added Apr 2026)
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

All 27 pages are **statically generated at build time** via `npm run build`.

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

### Forms (both powered by Web3Forms)
- **Homepage callback widget** — Name, Phone, City; tagged with "Homepage callback form" in email subject
- **Contact page full form** — Name, Phone, Email, Subject, Message; real fetch API with success/error states

### Google Maps
- Embedded on homepage above the footer
- Links to exact Rayenna Energy office location (Vyttila, Ernakulam)

### WhatsApp Floating Button
- Fixed button on all 27 pages (`Layout.astro`), bottom-right corner
- Green (#25D366), 52px mobile / 58px desktop, pulse animation
- Opens WhatsApp with pre-filled message: "Hi Rayenna Energy! I'm interested in solar installation."
- Number: `+91 7907 369 304`
- Hidden automatically on mobile when the Ray chat panel is open (JS toggle)
- Desktop: tooltip "Chat with us!" on hover

### Ray — AI Solar Chat Assistant
- Floating chat widget (`src/components/ChatWidget.astro`) embedded on all 27 pages
- **Character:** Ray, warm solar advisor; responds in English or Malayalam based on user language
- **Architecture:** Browser → Cloudflare Worker (`worker/chat-proxy.js`) → Anthropic Claude Haiku
- **Worker URL:** `https://rayenna-chat-proxy.rayennasolar.workers.dev` (hardcoded; survives GitHub Actions builds)
- **API key:** Stored as Cloudflare environment variable — never exposed to the client

**Chat UI features:**
- Floating button (navy, bottom-right), pulse animation, "Ask Ray" tooltip on desktop
- Mobile: slides up as a bottom sheet (85dvh); Desktop: floating card (380×560px)
- Header: Ray avatar, online dot, voice toggle (muted by default), close button
- Quick-reply chips on open: Home solar / Business solar / Subsidies / Talk to team (hidden after first message)
- Typing indicator (3-dot bounce animation)
- URL rendering: links auto-converted to styled pill buttons (WhatsApp → green, Calculator → blue)
- Markdown support: `**bold**` and `*italic*` in responses

**Voice Input (mic button):**
- Browser-native `SpeechRecognition` API — shown only if the browser supports it (Chrome Android, Safari iOS)
- Tap to start listening; interim transcript shown in real time; auto-sends when speech ends
- Language: `en-IN` — captures both English and Malayalam
- Permission denied → friendly in-chat error message

**Voice Output (TTS):**
- Browser-native `SpeechSynthesis` API — **off by default** for privacy
- Toggle speaker icon in chat header to enable; Ray's avatar pulses while speaking
- URLs cleaned before speech ("our WhatsApp", "our website")
- Prefers `en-IN` local voice if available

**Ray's knowledge & rules (system prompt in `worker/chat-proxy.js`):**
- MNRE approval, Kerala service area, office address, phone, email
- Services: residential, commercial, EV charging, monitoring, maintenance
- Solar facts, ROI, PM Surya Ghar subsidy, KSEB net metering
- Solar Calculator (`/solar-calculator`) — recommended to **home users only**; commercial users directed straight to WhatsApp
- Never quotes specific prices; always ends with WhatsApp link or Calculator link

---

## File Structure

```
rayenna/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Shared navbar + footer + WhatsApp button + Ray widget
│   ├── components/
│   │   └── ChatWidget.astro      # Ray AI chat widget (voice + text)
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── solar-calculator.astro # 4-step residential solar sizing tool
│   │   ├── media.astro
│   │   ├── faqs.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro       # Blog listing page
│   │       └── [18 post files]
│   └── styles/
│       └── global.css            # Design tokens + base styles
├── worker/
│   └── chat-proxy.js             # Cloudflare Worker — Ray's secure API proxy + system prompt
├── public/
│   └── media/                    # All images and video assets
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions — builds + deploys to GitHub Pages on push
├── astro.config.mjs
├── package.json
└── SITE-OVERVIEW.md              # This file
```

---

## Deployment

- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Host:** GitHub Pages
- **Primary Domain:** `rayennaenergy.com` (custom domain, CNAME in `public/CNAME`)
- **Secondary Domain:** `rayenna.energy` — redirects to `rayennaenergy.com` via GoDaddy URL forwarding
- **Domain Registrar:** GoDaddy (both domains)
- Auto-committed and pushed to `origin/main` after each session
