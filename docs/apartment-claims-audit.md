# Apartment / housing-society claims audit

**Branch:** `feat/apartments-societies-page`  
**Date:** 2026-10-11  
**Context:** Rayenna has **no** completed housing-society or apartment-complex installations. Site copy must not imply a track record.

## Findings and actions

| File | Issue | Action |
|------|-------|--------|
| `src/pages/solar-panels-kochi.astro` | FAQ claimed completed apartment rooftop installs in Kakkanad, Edapally, Fort Kochi | Replaced with free survey / feasibility study wording; points to apartments page |
| `src/pages/solar-panels-kochi.astro` | Intro “understands local building types — from high-rise apartments…” | Softened to “works across homes, villas and apartment buildings in Kerala” |
| `src/pages/ml/solar-panels-kochi.astro` | Same claims in Malayalam | Mirrored |
| `src/pages/solar-panels-trivandrum.astro` | FAQ “Many flat owners in Kazhakkoottam and Pattom have successfully installed…” | Softened to survey / feasibility language |
| `src/pages/ml/solar-panels-trivandrum.astro` | Same success claim in Malayalam | Removed false success sentence; kept shade/structural survey wording |
| `src/pages/faqs.astro` | VNM answer: “Rayenna advises societies… from common-area pilots…” | Softened; points to apartments page |
| `src/i18n/faqs-ml.ts` | Parallel VNM / contact endings | Softened; points to apartments page |
| `src/pages/blog/virtual-net-metering-kerala-2026.astro` | “advises housing societies… common-area pilots” | Softened; CTA to apartments page |
| `src/pages/blog/apartments-solar-kerala.astro` | Invented 20-flat / ₹80,000 savings example + sidebar; outdated “subsidy only for individuals” | Replaced with feasibility framing; GHS/RWA note; CTA to apartments page |
| `src/i18n/blog-articles-ml/apartments-solar-kerala.ts` | Parallel ₹80,000 story + subsidy-only claim | Mirrored |
| `src/i18n/blog-articles-ml/virtual-net-metering-kerala-2026.ts` | CTA / discovery | Linked to `/ml/apartments-housing-societies/` |

## Safe replacement (EN)

> We assess apartment and society rooftops through a free site survey and feasibility study, including roof access, shade, structure and your building's rules.

## Malayalam lines changed (native-speaker review)

### `src/pages/ml/solar-panels-kochi.astro`

1. **Intro:**  
   `കൊച്ചി ആസ്ഥാനമായ കമ്പനി എന്ന നിലയിൽ റയെന്ന കേരളത്തിലെ വീടുകൾ, വില്ലകൾ, അപ്പാർട്ട്മെന്റ് കെട്ടിടങ്ങൾ എന്നിവയിലുടനീളം പ്രവർത്തിക്കുന്നു. ജില്ലയിൽ ഞങ്ങൾ പൂർത്തിയാക്കുന്ന ഓരോ വസതി ഇൻസ്റ്റാളേഷനിലും KSEB നെറ്റ് മീറ്റർ അപേക്ഷ, ഘടനാപരമായ പരിശോധന, സബ്സിഡി പേപ്പർവർക്ക് — എല്ലാം ഞങ്ങൾ കൈകാര്യം ചെയ്യുന്നു.`

2. **Apartment FAQ answer:**  
   `അതെ, നിങ്ങൾക്ക് പ്രത്യേക മേൽക്കൂര പ്രദേശം (സാധാരണയായി kW-ന് 50–100 sq ft) ലഭിക്കുകയും ഹൗസിംഗ് സൊസൈറ്റി അനു�ുകയും ഹൗസിംഗ് സൊസൈറ്റി അനുവദിക്കുകയും ചെയ്താൽ. ഞങ്ങൾ അപ്പാർട്ട്മെന്റ് മേൽക്കൂര സാധ്യത സൗജന്യ സൈറ്റ് പരിശോധനയിൽ വിലയിരുത്തുന്നു (മേൽക്കൂര പ്രദേശം, ഘടനാപരമായ പരിശോധന).`

### `src/pages/ml/solar-panels-trivandrum.astro`

3. **Flat/apartment size FAQ:** removed  
   `കഴക്കൂട്ടം, പട്ടം എന്നിവിടങ്ങളിലെ പല ഫ്ലാറ്റ് ഉടമകളും 1.5–2 kW സിസ്റ്റങ്ങൾ വി��യകരമായി ഇൻസ്റ്റാൾ ചെയ്തിട്ടു�ളും 1.5–2 kW സിസ്റ്റങ്ങൾ വിജയകരമായി ഇൻസ്റ്റാൾ ചെയ്തിട്ടുണ്ട്.`  
   Retained survey/shade/structure sentence only.

### `src/i18n/faqs-ml.ts`

4. Special-situations apartment answer ending now points to apartments & societies page (feasibility study).  
5. VNM answer ending: no “പൈലറ്റ് / ഉപദേശിക്കുന്നു” track-record wording; feasibility + page reference.

### `src/i18n/blog-articles-ml/apartments-solar-kerala.ts`

6. Callout, sidebar, subsidy bullet, and CTAs rewritten away from ₹80,000 case study.  
7. **Native review especially for:** chillu forms, tone of “സൊസൈറ്റി തല പ്ലാന്റ് ഇതു�ല പ്ലാന്റ് ഇതുവരെ ഇല്ല” honesty line if added later on the landing page.

### `src/i18n/blog-articles-ml/virtual-net-metering-kerala-2026.ts`

8. Links / CTA to `/ml/apartments-housing-societies/`.

## Owner confirmation

Default applied: **no apartment or society installation claims remain** as Rayenna completed work.
