/**
 * Single source of truth for public claims on rayennaenergy.com.
 * Keep in sync with docs/claims-register.md.
 */

export const CLAIMS = {
  registrationTermEn: 'PM Surya Ghar registered vendor (MNRE)',
  registrationTermMl: 'PM സൂര്യ ഘർ രജിസ്റ്റർ ചെയ്ത വെൻഡർ (MNRE)',
  registrationShortEn: 'PM Surya Ghar registered',
  registrationShortMl: 'PM സൂര്യ ഘർ രജിസ്റ്റർഡ്',

  subsidy: {
    slab1KwInr: 30_000,
    slab2KwInr: 60_000,
    maxInr: 78_000,
    labelEn: 'Up to ₹78,000 (maximum for 3 kW and above)',
    labelMl: 'പരമാവധി ₹78,000 (3 kW ഉം അതിന് മുകളിലും)',
    sourceUrl: 'https://pmsuryaghar.gov.in',
  },

  gst: {
    modulesPercent: 5,
    previousPercent: 12,
    effectiveDateEn: '22 September 2025',
    effectiveDateMl: '2025 സെപ്റ്റംബർ 22',
    noteEn: 'GST on solar modules was cut from 12% to 5% in September 2025, lowering system costs.',
    noteMl: 'സോളാർ മോഡ്യൂളുകളുടെ GST 2025 സെപ്റ്റംബറിൽ 12%-ൽ നിന്ന് 5%-ലേക്ക് കുറഞ്ഞു — സിസ്റ്റം ചെലവ് കുറയുന്നു.',
    sourceUrl: 'https://taxguru.in/goods-and-service-tax/gst-renewable-energy-devices-reduced-5-percent.html',
  },

  paybackEn: '3–5 years',
  paybackMl: '3–5 വർഷം',
  billReductionEn: 'up to 80%',
  billReductionMl: '80% വരെ',
  panelLifeEn: '25+ years',
  panelLifeMl: '25+ വർഷം',
  panelPerformanceWarrantyEn: '25 years',
  panelPerformanceWarrantyMl: '25 വർഷം',
  manufacturerWarrantyNoteEn: 'Up to 30-year manufacturer performance warranty (model-specific)',
  manufacturerWarrantyNoteMl: 'പരമാവധി 30 വർഷം നിർമ്മാതാവിന്റെ പ്രകടന വാറന്റി (മോഡൽ അനുസരിച്ച്)',
  inverterWarrantyEn: '5–10 years',
  inverterWarrantyMl: '5–10 വർഷം',
  workmanshipWarrantyEn: '5 years',
  workmanshipWarrantyMl: '5 വർഷം',

  schemeWindowEn: 'PM Surya Ghar residential CFA remains available under current scheme guidelines — check pmsuryaghar.gov.in for the latest status.',
  schemeWindowMl: 'PM സൂര്യ ഘർ രെസിഡൻഷ്യൽ CFA നിലവിലെ പദ്ധതി മാർഗനിർദ്ദേശങ്ങള്ക്ക് കീഴിൽ ലഭ്യമാണ് — ഏറ്റവും പുതിയ നില pmsuryaghar.gov.in-ൽ പരിശോധിക്കുക.',
  seasonNoteEn: 'Post-monsoon roofs dry faster — book a free survey while PM Surya Ghar subsidy remains available under current guidelines.',
  seasonNoteMl: 'മൺസൂണിന് ശേഷം റൂഫുകൾ വേഗം ഉണങ്ങും — നിലവിലെ മാർഗനിർദ്ദേശങ്ങള്ക്ക് കീഴിൽ PM സൂര്യ ഘർ സബ്സിഡി ലഭ്യമായിരിക്കുമ്പോൾ സൗജന്യ സർവേ ബുക്ക് ചെയ്യുക.',

  zeroBillEn: 'Many Kerala homes with right-sized solar record near-zero electricity bills',
  zeroBillMl: 'ശരിയായി സൈസ് ചെയ്ത സോളാറുള്ള പല കേരള വീടുകളും ഏതാണ്ട് ശൂന്യ വൈദ്യുതി ബിൽ രേഖപ്പെടുത്തുന്നു',

  exclusivitySafeEn: 'Subsidy applies only with registered installers, and we handle it end to end.',
  exclusivitySafeMl: 'സബ്സിഡി രജിസ്റ്റർ ചെയ്ത ഇൻസ്റ്റാളർമാർ വഴി മാത്രം ബാധകം — ഞങ്ങൾ അത് എൻഡ്-ടു-എൻഡ് കൈകാര്യം ചെയ്യുന്നു.',

  calculatorSubsidyTrustEn: 'Eligible residential systems can claim the central subsidy up to scheme limits, subject to compliant equipment and portal approval.',
  calculatorSubsidyTrustMl: 'യോഗ്യമായ രെസിഡൻഷ്യൽ സിസ്റ്റങ്ങൾക്ക് അനുയോജ്യമായ ഉപകരണവും പോർട്ടൽ അംഗീകാരവും ഉണ്ടെങ്കിൽ പദ്ധതി പരിധി വരെ കേന്ദ്ര സബ്സിഡി ക്ലെയിം ചെയ്യാം.',

  /** Empty until owner sets a date; pages omit last-verified when blank. */
  lastVerified: '',
  lastVerifiedNeedsOwner: true,
} as const;

export type Claims = typeof CLAIMS;
