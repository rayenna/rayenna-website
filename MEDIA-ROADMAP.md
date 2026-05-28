# Media Page Roadmap

Last updated: 2026-05-26

## Goal

Turn `/media/` into a high-trust proof page that:

- shows real Kerala installations clearly
- makes videos easy to browse on mobile
- supports filtering without friction
- converts visitors into calculator and contact leads

## Current Page Structure

1. Hero
2. Installation gallery (40 projects, filterable)
3. Video library (19 videos, featured player + category tabs)
4. Visual slideshow (installation highlights)
5. Customer testimonials
6. CTA banner

Malayalam mirror: `/ml/media/`

## What Is Already Strong

- Large real installation library (40 projects)
- Useful metadata per project (location, kW, inverter, panels)
- Video library with categories
- Testimonials tied to real customers
- Strong end-of-page CTA block

## Highest-Impact Improvements

### Priority 1 — Conversion & navigation

- Add hero buttons:
  - Browse installations
  - Watch videos
- Add sticky in-page jump links on long scroll
- Strengthen CTA copy toward:
  - free site survey
  - calculator
  - WhatsApp / call

### Priority 2 — Gallery UX

- Open installation cards in a lightbox/modal
- Show large photo + full specs in lightbox
- Add prev/next inside lightbox on desktop
- Swipe between projects on mobile

### Priority 3 — Video performance

- Do not eagerly load full MP4 for featured player on page load
- Load video only when user selects/plays
- Keep poster thumbnails lazy-loaded
- Consider shorter web-optimized versions for promo clips later

### Priority 4 — Filters on mobile

- Collapse filter groups into accordions on small screens
- Show active filter summary chip row
- Add “Clear all filters” when any non-default filter is active

### Priority 5 — SEO & structured data

- Tighten title/description around “Kerala solar installations”
- Add `ImageGallery` / `ItemList` schema for installations
- Add `VideoObject` schema for featured videos where practical
- Use page-specific OG image (installation collage or hero still)

### Priority 6 — Maintainability

- Move installation + video data out of page files into shared data modules
- Keep English and Malayalam pages in sync automatically
- Single source of truth for:
  - installations array
  - videos array
  - slideshow slides
  - category labels

## Known Issues To Address

- English and Malayalam media pages duplicate large data blocks manually
- Featured video autoload may hurt mobile performance
- Gallery cards are not expandable (missed detail view)
- Filter bar is long on small phones
- Some filenames/labels have typos in source video titles (cosmetic/content cleanup later)

## Suggested Execution Order

### Phase A (done / in progress)

- Hero jump CTAs
- Installation lightbox
- Video `preload="metadata"` until user plays
- Mobile filter accordion UX
- This roadmap document

### Phase B

- Shared `src/data/media-content.ts`
- Refactor EN + ML pages to import shared data
- Filter count + active filter chips

### Phase C

- Media page structured data (ImageGallery, VideoObject)
- Page-specific OG image
- Internal linking from homepage/services/city pages to media gallery

### Phase D

- Video compression pass for web (smaller MP4/WebM)
- Optional location grouping (Kochi, Kollam, Thrissur, etc.)
- Map view or “near me” style grouping only if it adds real value

## Pages To Prioritize

- `/media/`
- `/ml/media/`
- Homepage link to media gallery
- City pages linking to relevant installations subset (future)

## Metrics To Watch

- Media page sessions
- Scroll depth to gallery vs video section
- Gallery filter usage
- Video play clicks
- Lightbox opens
- CTA clicks (contact, calculator, phone, WhatsApp)
- Bounce rate on mobile

## Notes

- Keep bilingual parity for all user-facing changes
- Do not add thin location pages that only exist for SEO
- Prefer proof + clarity over flashy effects on this page
