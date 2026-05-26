# SEO Roadmap

Last updated: 2026-05-26

## Goal

Grow qualified B2C traffic in Kerala and convert more visitors into:

- calculator completions
- contact form submissions
- phone calls
- WhatsApp enquiries
- site survey requests

## What Is Already Implemented

### Technical SEO baseline

- Shared page metadata via `src/layouts/Layout.astro`
- Canonical tags on public pages
- `hreflang` alternates for English and Malayalam pages
- Open Graph and Twitter card tags
- Shared favicon links, app icons, and `site.webmanifest`
- Shared structured data graph:
  - `WebSite`
  - `WebPage`
  - `BreadcrumbList`
  - `LocalBusiness`

### Page-type schema

- Blog article pages now get `BlogPosting` schema automatically
- English and Malayalam FAQ pages now include `FAQPage` schema

### Crawl/indexing improvements

- `404` page is now `noindex`
- Legacy `/calculator/` page is now `noindex`
- Legacy `/calculator/` canonical points to `/solar-calculator/`
- English blog article alternates now point to matching Malayalam article paths

## Current Status

The site now has a solid technical SEO foundation, but it is not yet fully optimized for maximum B2C traffic and conversion.

The biggest remaining opportunity is no longer "basic SEO setup". It is now:

1. increasing search CTR
2. improving commercial intent capture
3. strengthening trust/E-E-A-T
4. tightening conversion paths on high-traffic pages

## Highest-Impact Next Steps

### Priority 1: Conversion SEO

- Strengthen CTA hierarchy on homepage, service pages, city pages, and blog posts
- Ensure every high-traffic page drives users to one of:
  - `contact`
  - `solar-calculator`
  - phone
  - WhatsApp
- Reduce weak or generic CTA copy and replace with more intent-driven variants
- Add stronger above-the-fold trust signals near CTAs

### Priority 2: Page-specific OG images

- Create custom OG images for:
  - homepage
  - calculator
  - contact
  - Kochi / Thrissur / Trivandrum pages
  - top blog articles
- This should improve CTR from WhatsApp shares, social shares, and preview surfaces

### Priority 3: E-E-A-T improvements

- Add clear author/reviewer information on blog posts
- Add "last updated" dates where appropriate
- Show more visible company credibility:
  - MNRE approval
  - Kerala installation footprint
  - years/volume proof where accurate
  - testimonial credibility

### Priority 4: Internal linking for commercial intent

- Blog posts should link more deliberately to:
  - `solar-calculator`
  - relevant city/service pages
  - `contact`
- Use tighter anchor text based on page intent instead of generic "click here" style linking

### Priority 5: Location SEO expansion

- Add more Kerala city / locality landing pages where there is real demand
- Prioritize pages with search intent and sales relevance
- Keep these pages useful and specific, not thin doorway pages

### Priority 6: Redirect cleanup

- Add a hard redirect from `/calculator/` to `/solar-calculator/`
- Review any other legacy or duplicate routes that could split authority

## Important Improvement Areas Still Open

### 1. Search snippet CTR

Many pages have acceptable metadata, but not yet the strongest possible SERP messaging for clicks.

Work needed:

- refine titles for stronger user intent
- sharpen descriptions around subsidy, ROI, free survey, and Kerala relevance
- test more commercial phrasing on conversion pages

### 2. Calculator SEO + conversion

The calculator is one of the strongest lead magnets on the site and should become a major acquisition + conversion asset.

Improve further by:

- making the page even more link-worthy and share-worthy
- adding stronger FAQ/support content around the tool
- improving trust around assumptions and methodology
- ensuring the page is the primary target for "solar calculator Kerala" intent

### 3. Content clustering

The blog is useful, but it should function more like a structured funnel:

- awareness posts
- consideration posts
- comparison posts
- local intent posts
- calculator / contact conversion posts

Each cluster should feed commercial pages more intentionally.

### 4. Trust and proof density

For B2C solar, trust is a major conversion lever.

Opportunities:

- better proof near forms and CTA buttons
- more visible installation count / service coverage if accurate
- stronger testimonial presentation
- optional review schema if compliant and authentic

## Suggested Execution Order

### Phase A

- homepage CTA and trust optimization
- calculator conversion tuning
- service/city page CTA refinement

### Phase B

- OG image rollout
- author/reviewer improvements
- redirect cleanup

### Phase C

- internal-linking pass across blog
- location SEO expansion
- title/meta CTR optimization from real search data

## What To Monitor

Track these in Google Search Console and analytics:

- clicks and impressions by page
- CTR by page/query
- rankings for Kerala solar commercial terms
- calculator visits
- calculator completion rate
- contact form submissions
- phone click rate
- WhatsApp click rate
- top converting landing pages

## Pages To Prioritize First

- `/`
- `/solar-calculator/`
- `/contact/`
- `/services/`
- `/solar-panels-kochi/`
- `/solar-panels-thrissur/`
- `/solar-panels-trivandrum/`
- Malayalam equivalents under `/ml/`

## Notes

- This work is ongoing and should be treated as a continuous optimization stream, not a one-time task.
- Every meaningful SEO/conversion change should be checked for English + Malayalam parity where applicable.
- Avoid thin content or purely SEO-driven pages without real buyer value.
