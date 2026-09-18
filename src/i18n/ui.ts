export type Lang = 'en' | 'ml';

export const defaultLang: Lang = 'en';

export const languages: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ml', label: 'ML' },
];

export function getLangFromPath(pathname: string): Lang {
  return pathname === '/ml' || pathname.startsWith('/ml/') ? 'ml' : 'en';
}

/** Strip /ml prefix to get locale-neutral path (always starts with /). */
export function stripLocale(pathname: string): string {
  if (pathname === '/ml' || pathname === '/ml/') return '/';
  if (pathname.startsWith('/ml/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

/** English routes that have a Malayalam counterpart under /ml/ */
const ML_ROUTES = new Set([
  '/',
  '/about',
  '/services',
  '/faqs',
  '/contact',
  '/solar-calculator',
  '/media',
  '/blog',
  '/solar-panels-kochi',
  '/solar-panels-thrissur',
  '/solar-panels-trivandrum',
  '/privacy',
]);

function normalizePath(path: string): string {
  const p = path.replace(/\/$/, '') || '/';
  return p;
}

export function localizedPath(localeNeutralPath: string, lang: Lang): string {
  const p = normalizePath(localeNeutralPath);
  if (lang === 'ml') {
    const resolved = resolveMlPath(p);
    return resolved === '/' ? '/ml/' : `/ml${resolved}/`;
  }
  return p === '/' ? '/' : `${p}/`;
}

/** Map English path to best available Malayalam URL (avoids 404 on language switch). */
function resolveMlPath(neutralPath: string): string {
  const p = normalizePath(neutralPath);
  if (ML_ROUTES.has(p)) return p;
  if (p.startsWith('/blog/')) return p;
  return '/';
}

export function getAlternateUrls(pathname: string, site = 'https://rayennaenergy.com') {
  const neutral = normalizePath(stripLocale(pathname));
  const enPath = localizedPath(neutral, 'en');
  const mlPath = localizedPath(neutral, 'ml');
  return {
    en: new URL(enPath, site).href,
    ml: new URL(mlPath, site).href,
  };
}

const ui = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      calculator: 'Calculator',
      media: 'Media',
      blog: 'Blog',
      faqs: 'FAQs',
      contact: 'Contact',
      calcMobile: 'Calculate My Savings',
    },
    footer: {
      aboutHeading: 'About Us',
      aboutText:
        'Rayenna Energy is a leading provider of innovative solar energy solutions dedicated to transforming the way you harness and use energy. With a deep commitment to delivering high-quality solar installations that prioritise sustainability, efficiency, and affordability, we believe in creating a greener future.',
      areasHeading: 'We Install Across Kerala',
      kochi: 'Solar in Kochi',
      thrissur: 'Solar in Thrissur',
      trivandrum: 'Solar in Trivandrum',
      contactHeading: 'Contact us',
      copyright: '© 2026 Rayenna Energy Pvt. Ltd. All Rights Reserved.',
      privacy: 'Privacy Policy',
    },
    cta: {
      calculateSavings: 'Calculate My Savings',
      getQuote: 'Get a Free Quote',
      getCallback: 'Get a call back',
      readMore: 'Read more',
      contactUs: 'Contact us',
    },
    langSwitcherAria: 'Choose language',
    homeConvert: {
      heroMicro: 'Free site survey · Subsidy paperwork handled · MNRE-approved',
      heroPhone: 'Or call',
      heroPrimary: 'Get Free Installation Quote',
      heroSecondary: '☀️ Calculate My Savings',
      heroSubtitle:
        "Kerala's MNRE-approved solar installer. Up to ₹78,000 PM Surya Ghar subsidy. Free site survey. Many homes now hit near-zero KSEB bills — payback in 3–5 years, then 25+ years of low-cost power.",
      whyNowLabel: 'Why Kerala homeowners are going solar in 2026',
      whyNow: [
        { icon: '₹0', text: 'Over half of Kerala PM Surya Ghar homes recorded zero energy charges' },
        { icon: '₹78k', text: 'Central subsidy up to ₹78,000 — only through MNRE partners like Rayenna' },
        { icon: '📋', text: '2026 KSEB net metering rules — we handle ekiran, subsidy & approvals' },
        { icon: '🏠', text: 'Free site survey with honest sizing before you sign anything' },
      ],
      investTitle: 'The best time to go solar is',
      investTitleLines: ['The best time to go solar is'],
      investUrgency: 'today',
      testimonialsCalc: '☀️ Calculate My Savings',
      testimonialsSurvey: 'Get Free Installation Quote',
      installStripTag: 'Ready to install?',
      installStripTitle: 'Get a free site survey & installation quote',
      installStripSub:
        'MNRE-approved equipment, subsidy paperwork handled, and typical install in 1–2 days once approvals are in place.',
      installStripBtn: 'Request Installation Quote →',
      resourceHeading: 'Plan your solar project',
      resources: [
        { href: '/solar-calculator/', label: 'Free Solar Calculator' },
        { href: '/faqs/', label: '60 Solar FAQs' },
        { href: '/blog/', label: 'Expert Guides & News' },
        { href: '/contact/', label: 'Book a Free Site Survey' },
      ],
      connectTrust: [
        'MNRE-approved installer in Kerala',
        'Free site survey & fixed quote',
        'No spam — we call you back once',
      ],
      connectTitle: 'Ready for your free installation quote?',
      connectSub:
        'Tell us your city and phone number — our solar team will call back with next steps. Subsidy, sizing, and timeline explained in plain language.',
      connectSubmit: 'Get Free Installation Quote',
      connectSubmitSending: 'Sending…',
      connectSubmitDone: "✓ We'll call you soon!",
      calcCtaTitle: 'See your savings before you commit',
      calcCtaSub:
        'Enter your bill and home details — get system size, subsidy estimate, and payback in under 5 minutes. Free, no obligation.',
      calcCtaContact: 'Get Free Installation Quote',
      installsSub:
        'Real rooftops across Kerala — designed, installed, and commissioned by Rayenna. Tap any photo to open the gallery.',
      installsViewAll: 'View all installations →',
      installsQuote: '“After going solar, my electricity bill dropped — and so did my LPG costs.” — Arun, Kollam',
      installsQuoteLink: 'Browse the full gallery →',
      midLinkQuote: 'Get a free quote →',
      midLinkCalc: 'Calculate my savings →',
      testimonialsMore: 'See installations & more stories →',
      whoTitle: 'Who We Are',
      whoBody:
        "Rayenna Energy is Kerala's MNRE-approved rooftop solar partner — a local team that designs, installs, and stands behind every system. We size for your KSEB bill, handle ekiran and subsidy paperwork, and commission ALMM-listed kits so net metering goes live without drama.",
      whoPoints: [
        {
          title: 'MNRE channel partner',
          text: 'PM Surya Ghar subsidy filing and approvals handled end to end — not left to you.',
        },
        {
          title: 'Honest sizing first',
          text: 'Free site survey before you sign. We recommend the kW your roof and bill actually need.',
        },
        {
          title: 'Support after switch-on',
          text: 'App monitoring, 25-year panel performance warranty, and a team that picks up the phone.',
        },
      ],
      whoReadMore: 'More about Rayenna →',
      whoStatsCta: 'See how much you could save →',
      whoStatBrands: 'Brands',
      whoStatBills: 'Less bills',
      whoStatSatisfied: 'Client satisfaction',
      investCards: [
        {
          title: 'More affordable',
          text: 'Panel prices have fallen over 80% in two decades — and PM Surya Ghar can cut up to ₹78,000 more for eligible homes.',
        },
        {
          title: 'More efficient',
          text: 'Modern modules near 22% efficiency turn Kerala sun into more units per square metre of roof.',
        },
        {
          title: 'Built for 300 sunny days',
          text: 'Clear days often mean 6–8 hours of generation — power you already pay KSEB for every month.',
        },
        {
          title: 'Subsidy + net metering',
          text: 'Central subsidy through MNRE partners; surplus units credited on your KSEB bill.',
        },
      ],
      wayTitle: 'The Rayenna Way',
      wayLead:
        "Solar in Kerala isn't only panels on a roof — it's KSEB net metering, ANERT timelines, and monsoon-ready hardware. We keep the paperwork and the install in one place.",
      wayPoints: [
        {
          title: 'ALMM panels & trusted inverters',
          text: 'Brands that clear subsidy checks — including Adani, Waaree, Solis, and peers we install every week.',
        },
        {
          title: 'Install when clearances land',
          text: 'Typical rooftop install in 1–2 days once KSEB / ANERT approvals are in place.',
        },
        {
          title: 'You see generation live',
          text: 'Online monitoring so you know what your roof produces — and we stay reachable after commissioning.',
        },
      ],
      processTitle: 'From first call to commissioning',
      processSub: 'Clear steps. Kerala timelines. No mystery middlemen.',
      processSteps: [
        {
          num: '01',
          title: 'Call or quote',
          desc: 'Share your bill and city. We explain subsidy eligibility and sizing in plain language.',
        },
        {
          num: '02',
          title: 'Free site survey',
          desc: 'Roof, shade, and load check — honest kW recommendation before any deposit.',
        },
        {
          num: '03',
          title: 'Design & paperwork',
          desc: 'Custom layout plus ekiran, ANERT, and PM Surya Ghar filing handled by our team.',
        },
        {
          num: '04',
          title: 'Installation',
          desc: 'Trained crew, neat cabling — typically 1–2 days on site once approvals are ready.',
        },
        {
          num: '05',
          title: 'Commissioning & support',
          desc: 'Net metering go-live, handover, monitoring setup, and ongoing help when you need it.',
        },
      ],
      installsTitle: 'Solar — Beautifully Done',
      testimonialsTitle: 'What Kerala Homeowners Say',
      testimonialsIntro:
        'Real results from real installations across Kerala. Every Rayenna system includes a 25-year panel performance warranty and end-to-end support.',
      seasonNote:
        'Post-monsoon roofs dry faster — book a free survey while 2026 PM Surya Ghar subsidy is open.',
      billStoryEyebrow: 'Featured result',
      billStoryTitle: 'One roof. Two bills cut.',
      billStoryMeta: 'Arun · Kollam · 5 kW',
      billStoryBeforeLabel: 'Before',
      billStoryBefore: 'Rising KSEB bill + LPG kitchen costs every month',
      billStoryAfterLabel: 'After Rayenna',
      billStoryAfter: 'Lower electricity bill + induction cooking — double savings',
      billStoryQuote:
        '“After going solar, I switched my kitchen to induction — my electricity bill dropped, and so did my LPG costs.”',
      billStoryCta: 'See more installations →',
    },
    pageConvert: {
      services: {
        heroMicro: 'MNRE-approved · ₹78,000 subsidy · Free site survey',
        heroCalc: '☀️ Calculate My Savings',
        heroContact: 'Book a Free Site Survey',
        heroPhone: 'Or call',
        ctaTitle: 'Not sure which service is right for you?',
        ctaSub:
          '🏠 Homeowners — Start with our free calculator and get your system size, subsidy, and 25-year savings in 5 minutes.',
        ctaSub2:
          '🏢 Businesses & Consultations — Talk to our team directly. We\'ll understand your needs and recommend the right solution.',
        ctaCalc: '☀️ Try the Calculator',
        ctaContact: 'Book a Free Site Survey',
      },
      city: {
        heroMicro: 'Free site survey · PM Surya Ghar subsidy up to ₹78,000',
        heroPhone: 'Or call',
        ctaCalc: '☀️ Calculate Savings First',
        ctaContact: 'Book a Free Site Survey',
      },
      contact: {
        responseTime: 'We typically respond within 24 hours on business days.',
        calcPrompt: 'Want numbers first?',
        calcLink: 'Try the free solar calculator →',
        formTrust: [
          'MNRE-approved installer across Kerala',
          'Free site survey with fixed quote',
          'Subsidy paperwork handled end to end',
        ],
      },
    },
    schema: {
      localBusinessDescription:
        'MNRE-approved solar panel installer in Kerala. Domestic & commercial solar systems, PM Surya Ghar subsidy up to ₹78,000, free site survey.',
    },
    images: {
      logoAlt: 'Rayenna Energy',
      mnreBadgeAlt: 'MNRE Approved Channel Partner — Govt of India',
    },
    corporateVideo: {
      eyebrow: 'Our Story',
      title: 'One Minute with Rayenna',
      sub: 'Installations, our people, and the promise behind every rooftop we touch.',
      aboutLink: 'Learn more about us →',
      playLabel: 'Play corporate video',
      thumbLabel: 'Corporate film',
      duration: '1 min',
    },
    mediaFeatured: {
      defaultTitle: 'Rayenna Energy',
      defaultBadge: 'Video Library',
      thumbLabel: 'Films & stories',
      hint: 'Select any video below to play it here',
      heroUnmute: 'Unmute',
      heroMute: 'Mute',
      heroVideoAria: 'Rayenna Energy corporate film — looping background',
    },
    mediaGallery: {
      filter: 'Filter',
      filters: 'Filters',
      done: 'Done',
      clearAll: 'Clear all',
      closeAria: 'Close filters',
      systemSize: 'System Size',
      inverter: 'Inverter',
      panels: 'Panels',
      all: 'All',
      showingAll: 'Showing all {n} installations',
      showingFiltered: 'Showing {v} of {n} installations',
      empty: 'No installations match the selected filters.',
      reset: 'Reset filters',
      removeFilterAria: 'Remove {label} filter',
    },
    waTooltip: 'Chat with us!',
    officeMap: {
      eyebrow: 'Our Location',
      title: "Come. Let's Meet.",
      sub: 'Drop by for a free consultation — our office is on NH Bypass near Thykoodam, about 5 km from Kochi city centre.',
      directions: 'Get Directions on Google Maps',
      iframeTitle: 'Rayenna Energy office location on Google Maps',
    },
    mobileBar: {
      ariaLabel: 'Quick contact actions',
      call: 'Call',
      whatsapp: 'WhatsApp',
      calculate: 'Calculate',
      whatsappAria: 'Chat with Rayenna on WhatsApp',
      calculateAria: 'Open the solar savings calculator',
    },
    chat: {
      tooltip: 'Ask Ray ☀️',
      btnAria: 'Chat with Ray, our solar assistant',
      panelAria: 'Chat with Ray',
      subtitle: 'Rayenna Solar Assistant',
      voiceMute: "Mute Ray's voice",
      voiceUnmute: "Unmute Ray's voice",
      voiceTitle: 'Toggle voice',
      close: 'Close chat',
      quickRepliesAria: 'Quick questions',
      chips: [
        { label: '🏠 Home solar', msg: "I'm interested in home solar" },
        { label: '🏢 Business solar', msg: "I'm interested in business solar" },
        { label: '💰 Subsidies', msg: 'Tell me about government subsidies' },
        { label: '📞 Talk to team', msg: "I'd like to talk to your team" },
      ],
      inputPlaceholder: 'Type your question...',
      inputAria: 'Type your message to Ray',
      micSpeak: 'Speak your message',
      micTap: 'Tap to speak',
      micListening: 'Listening… tap to stop',
      listeningPlaceholder: 'Listening...',
      send: 'Send message',
      opening:
        "Hi there! I'm Ray, your solar guide from Rayenna Energy ☀️ Whether you're curious about going solar at home or for your business, I'm here to help. What can I help you with today?",
      linkCalculator: '☀️ Try the Solar Calculator',
      linkWhatsApp: '💬 Chat with us on WhatsApp',
      errorMic:
        "I couldn't access your microphone. Please check your browser permissions and try again, or just type your question below ☀️",
      errorReply:
        "I'm sorry, I had a little trouble responding. You can reach our team directly on WhatsApp: https://api.whatsapp.com/send?phone=917907369304&text=Hi%20Rayenna%20Energy!%20I%27m%20interested%20in%20solar%20installation. ☀️",
      errorNetwork:
        "I'm having a little trouble right now. You can reach our team directly on WhatsApp: https://api.whatsapp.com/send?phone=917907369304&text=Hi%20Rayenna%20Energy!%20I%27m%20interested%20in%20solar%20installation. ☀️",
      calculatorUrl: 'https://rayennaenergy.com/solar-calculator/',
      speechLang: 'en-IN',
      ttsLang: 'en-IN',
    },
  },
  ml: {
    nav: {
      home: 'ഹോം',
      about: 'ഞങ്ങളെക്കുറിച്ച്',
      services: 'സേവനങ്ങൾ',
      calculator: 'കാൽക്കുലേറ്റർ',
      media: 'മീഡിയ',
      blog: 'ബ്ലോഗ്',
      faqs: 'ചോദ്യങ്ങൾ',
      contact: 'കോൺടാക്റ്റ്',
      calcMobile: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
    },
    footer: {
      aboutHeading: 'ഞങ്ങളെക്കുറിച്ച്',
      aboutText:
        'റയെന്ന എനർജി, നിങ്ങൾ ഊർജ്ജം ഉപയോഗിക്കുന്ന രീതി തന്നെ മാറ്റിയെഴുതാൻ പ്രതിജ്ഞാബദ്ധമായ ഒരു സോളാർ ഊർജ്ജ കമ്പനിയാണ്. ഗുണനിലവാരമുള്ള ഇൻസ്റ്റാളേഷനുകളിലൂടെ സുസ്ഥിരതയും കാര്യക്ഷമതയും താങ്ങാനാവുന്ന വിലയും ഉറപ്പാക്കിക്കൊണ്ട്, ഒരു ഹരിത ഭാവി കെട്ടിപ്പടുക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം.',
      areasHeading: 'കേരളമെമ്പാടും ഇൻസ്റ്റാളേഷൻ',
      kochi: 'കൊച്ചിയിൽ സോളാർ',
      thrissur: 'തൃശ്ശൂരിൽ സോളാർ',
      trivandrum: 'തിരുവനന്തപുരത്ത് സോളാർ',
      contactHeading: 'കോൺടാക്റ്റ്',
      copyright: '© 2026 റയെന്ന എനർജി പ്രൈവറ്റ് ലിമിറ്റഡ്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
      privacy: 'സ്വകാര്യതാ നയം',
    },
    cta: {
      calculateSavings: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
      getQuote: 'സൗജന്യ ക്വോട്ട് നേടുക',
      getCallback: 'കോൾ ബാക്ക് നേടുക',
      readMore: 'കൂടുതൽ വായിക്കുക',
      contactUs: 'ബന്ധപ്പെടുക',
    },
    langSwitcherAria: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    homeConvert: {
      heroMicro: 'സൗജന്യ സൈറ്റ് സർവേ · സബ്സിഡി രേഖകൾ കൈകാര്യം · MNRE അംഗീകൃത',
      heroPhone: 'അല്ലെങ്കിൽ വിളിക്കുക',
      heroPrimary: 'സൗജന്യ ഇൻസ്റ്റാളേഷൻ ക്വോട്ട്',
      heroSecondary: '☀️ എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
      heroSubtitle:
        'കേരളത്തിലെ MNRE അംഗീകൃത സോളാർ ഇൻസ്റ്റാളർ. PM സൂര്യ ഘർ സബ്സിഡി ₹78,000 വരെ. സൗജന്യ സൈറ്റ് സർവേ. പല വീടുകളും ഇപ്പോൾ KSEB ബിൽ ശൂന്യത്തോട് അടുക്കുന്നു — 3–5 വർഷത്തിൽ നിക്ഷേപം തിരിച്ചെടുക്കാം, അതിനുശേഷം 25+ വർഷം കുറഞ്ഞ ചെലവിൽ വൈദ്യുതി.',
      whyNowLabel: '2026-ൽ കേരള വീട്ടുടമകൾ എന്തുകൊണ്ട് സോളാറിലേക്ക് പോകുന്നു',
      whyNow: [
        { icon: '₹0', text: 'PM സൂര്യ ഘർ വീടുകളിൽ അർദ്ധത്തിലധികം പേർക്ക് ശൂന്യ ഊർജ ചാർജ്' },
        { icon: '₹78k', text: '₹78,000 വരെ കേന്ദ്ര സബ്സിഡി — റയെന്ന പോലുള്ള MNRE പാർട്ണർമാർ വഴി മാത്രം' },
        { icon: '📋', text: '2026 KSEB നെറ്റ് മീറ്ററിംഗ് — ekiran, സബ്സിഡി, അനുമതി ഞങ്ങൾ കൈകാര്യം ചെയ്യുന്നു' },
        { icon: '🏠', text: 'ഒപ്പിടുന്നതിന് മുമ്പ് സൗജന്യ സൈറ്റ് സർവേയും സത്യസന്ധമായ സൈസിംഗും' },
      ],
      investTitle: 'സോളാർ തിരഞ്ഞെടുക്കാനുള്ള ഏറ്റവും നല്ല സമയം',
      investTitleLines: ['സോളാർ', 'തിരഞ്ഞെടുക്കാനുള്ള', 'ഏറ്റവും നല്ല സമയം'],
      investUrgency: 'ഇന്നാണ്',
      testimonialsCalc: '☀️ എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
      testimonialsSurvey: 'സൗജന്യ ഇൻസ്റ്റാളേഷൻ ക്വോട്ട്',
      installStripTag: 'ഇൻസ്റ്റാൾ ചെയ്യാൻ തയ്യാറാണോ?',
      installStripTitle: 'സൗജന്യ സൈറ്റ് സർവേ & ഇൻസ്റ്റാളേഷൻ ക്വോട്ട്',
      installStripSub:
        'MNRE-അംഗീകൃത ഉപകരണം, സബ്സിഡി രേഖകൾ കൈകാര്യം ചെയ്യൽ, അനുമതികൾ ലഭിച്ചാൽ സാധാരണയായി 1–2 ദിവസം ഇൻസ്റ്റാൾ.',
      installStripBtn: 'ഇൻസ്റ്റാളേഷൻ ക്വോട്ട് അഭ്യർത്ഥിക്കുക →',
      resourceHeading: 'നിങ്ങളുടെ സോളാർ പദ്ധതി ആസൂത്രണം ചെയ്യുക',
      resources: [
        { href: '/ml/solar-calculator/', label: 'സൗജന്യ സോളാർ കാൽക്കുലേറ്റർ' },
        { href: '/ml/faqs/', label: '60 സോളാർ ചോദ്യോത്തരങ്ങൾ' },
        { href: '/ml/blog/', label: 'വിദഗ്ധ ഗൈഡുകൾ' },
        { href: '/ml/contact/', label: 'സൗജന്യ സൈറ്റ് സർവേ' },
      ],
      connectTrust: [
        'കേരളത്തിലെ MNRE അംഗീകൃത ഇൻസ്റ്റാളർ',
        'സൗജന്യ സൈറ്റ് സർവേയും ഫിക്സഡ് ക്വോട്ടും',
        'സ്പാം ഇല്ല — ഒരു തവണ മാത്രം കോൾ ബാക്ക്',
      ],
      connectTitle: 'സൗജന്യ ഇൻസ്റ്റാളേഷൻ ക്വോട്ട് തയ്യാറാണോ?',
      connectSub:
        'നിങ്ങളുടെ നഗരവും ഫോൺ നമ്പറും പറയൂ — ഞങ്ങളുടെ സോളാർ ടീം അടുത്ത ഘട്ടങ്ങൾ വിളിച്ച് വിശദീകരിക്കും. സബ്സിഡി, സൈസിംഗ്, സമയക്രമം — ലളിതമായ ഭാഷയിൽ.',
      connectSubmit: 'സൗജന്യ ഇൻസ്റ്റാളേഷൻ ക്വോട്ട്',
      connectSubmitSending: 'അയയ്ക്കുന്നു…',
      connectSubmitDone: '✓ ഉടൻ വിളിക്കാം!',
      calcCtaTitle: 'നിങ്ങളുടെ മേൽക്കൂര എത്ര സമ്പാദിക്കും? ഇപ്പോൾ കണ്ടെത്തൂ.',
      calcCtaSub:
        'ബിൽ തുകയും വീടിന്റെ വിവരങ്ങളും നൽകൂ — 5 മിനിറ്റിൽ സിസ്റ്റം വലുപ്പം, സബ്സിഡി, 25 വർഷ ലാഭം. സൗജന്യം. ഒരു ബാധ്യതയുമില്ല.',
      calcCtaContact: 'സൗജന്യ ഇൻസ്റ്റാളേഷൻ ക്വോട്ട്',
      installsSub:
        'കേരളമെമ്പാടുമുള്ള യഥാർത്ഥ റൂഫ്ടോപ്പുകൾ — റയെന്ന ടീം ഡിസൈൻ ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്തവ. ഗാലറി തുറക്കാൻ ഒരു ഫോട്ടോ ടാപ്പ് ചെയ്യൂ.',
      installsViewAll: 'എല്ലാ ഇൻസ്റ്റാളേഷനുകളും കാണുക →',
      installsQuote: '“സോളാർ വന്നതിനുശേഷം വൈദ്യുതി ബിൽ കുറഞ്ഞു — LPG ചെലവും കുറഞ്ഞു.” — Arun, കൊല്ലം',
      installsQuoteLink: 'മുഴുവൻ ഗാലറി കാണുക →',
      midLinkQuote: 'സൗജന്യ ക്വോട്ട് നേടുക →',
      midLinkCalc: 'സമ്പാദ്യം കണക്കാക്കുക →',
      testimonialsMore: 'ഇൻസ്റ്റാളേഷനുകളും കൂടുതൽ കഥകളും കാണുക →',
      whoTitle: 'ആരാണ് ഞങ്ങൾ',
      whoBody:
        'റയെന്ന എനർജി കേരളത്തിലെ MNRE അംഗീകൃത റൂഫ്ടോപ്പ് സോളാർ പങ്കാളിയാണ് — ഡിസൈൻ മുതൽ ഇൻസ്റ്റാൾ വരെ ഒരേ ടീം. നിങ്ങളുടെ KSEB ബില്ലിനനുസരിച്ച് സൈസ് ചെയ്യുന്നു; ekiran, സബ്സിഡി രേഖകൾ കൈകാര്യം ചെയ്യുന്നു; ALMM ലിസ്റ്റ് ചെയ്ത കിറ്റുകൾ കൊണ്ട് നെറ്റ് മീറ്ററിംഗ് ലളിതമാക്കുന്നു.',
      whoPoints: [
        {
          title: 'MNRE ചാനൽ പാർട്ണർ',
          text: 'PM സൂര്യ ഘർ സബ്സിഡി ഫയലിംഗും അനുമതിയും അറ്റം മുതൽ അറ്റം വരെ — നിങ്ങൾക്ക് മാത്രം വിട്ടുകൊടുക്കില്ല.',
        },
        {
          title: 'ആദ്യം സത്യസന്ധമായ സൈസിംഗ്',
          text: 'ഒപ്പിടുന്നതിന് മുമ്പ് സൗജന്യ സൈറ്റ് സർവേ. മേൽക്കൂരയ്ക്കും ബില്ലിനും വേണ്ട kW മാത്രം നിർദ്ദേശിക്കുന്നു.',
        },
        {
          title: 'സ്വിച്ച്-ഓണിന് ശേഷവും പിന്തുണ',
          text: 'ആപ്പ് മോണിറ്ററിംഗ്, 25 വർഷ പാനൽ പെർഫോർമൻസ് വാറന്റി, വിളിച്ചാൽ മറുപടി തരുന്ന ടീം.',
        },
      ],
      whoReadMore: 'റയെന്നയെക്കുറിച്ച് കൂടുതൽ →',
      whoStatsCta: 'എത്ര സമ്പാദിക്കാം എന്ന് കാണുക →',
      whoStatBrands: 'ബ്രാൻഡുകൾ',
      whoStatBills: 'കുറഞ്ഞ ബിൽ',
      whoStatSatisfied: 'ഉപഭോക്തൃ സംതൃപ്തി',
      investCards: [
        {
          title: 'ഇന്ന് ഏറ്റവും താങ്ങാനാവുന്നത്',
          text: 'ഇരുപത് വർഷത്തിൽ പാനൽ വില 80%-ലധികം കുറഞ്ഞു — യോഗ്യമായ വീടുകൾക്ക് PM സൂര്യ ഘർ ₹78,000 വരെ കൂടി കുറയ്ക്കും.',
        },
        {
          title: 'ഇന്ന് ഏറ്റവും കാര്യക്ഷമം',
          text: 'ആധുനിക മോഡ്യൂളുകൾ ~22% കാര്യക്ഷമത — കേരള വെയിൽ ചതുരശ്ര മീറ്ററിൽ കൂടുതൽ യൂണിറ്റാക്കി മാറ്റുന്നു.',
        },
        {
          title: '300 സൂര്യദിനങ്ങൾക്ക് വേണ്ടി',
          text: 'തെളിഞ്ഞ ദിവസങ്ങളിൽ പലപ്പോഴും 6–8 മണിക്കൂർ ജനറേഷൻ — ഇപ്പോൾ KSEB-ക്ക് നൽകുന്ന അതേ വൈദ്യുതി.',
        },
        {
          title: 'സബ്സിഡി + നെറ്റ് മീറ്ററിംഗ്',
          text: 'MNRE പാർട്ണർമാർ വഴി കേന്ദ്ര സബ്സിഡി; അധിക യൂണിറ്റുകൾ KSEB ബില്ലിൽ ക്രെഡിറ്റ്.',
        },
      ],
      wayTitle: 'റയെന്നയുടെ വഴി',
      wayLead:
        'കേരളത്തിലെ സോളാർ പാനലുകൾ മാത്രമല്ല — KSEB നെറ്റ് മീറ്ററിംഗ്, ANERT സമയക്രമം, മഴക്കാലത്തിന് തയ്യാറായ ഹാർഡ്‌വെയർ. രേഖകളും ഇൻസ്റ്റാളും ഒരിടത്ത്.',
      wayPoints: [
        {
          title: 'ALMM പാനലുകളും വിശ്വസ്ത ഇൻവർട്ടറുകളും',
          text: 'സബ്സിഡി പരിശോധനകൾ കടക്കുന്ന ബ്രാൻഡുകൾ — Adani, Waaree, Solis ഉൾപ്പെടെ ഞങ്ങൾ ആഴ്ചയിൽ ഇൻസ്റ്റാൾ ചെയ്യുന്നവ.',
        },
        {
          title: 'അനുമതി വന്നാൽ ഇൻസ്റ്റാൾ',
          text: 'KSEB / ANERT അനുമതി ലഭിച്ചാൽ സാധാരണയായി 1–2 ദിവസം മേൽക്കൂര ഇൻസ്റ്റാൾ.',
        },
        {
          title: 'ജനറേഷൻ തത്സമയം കാണാം',
          text: 'ഓൺലൈൻ മോണിറ്ററിംഗ് — മേൽക്കൂര എന്ത് ഉൽപ്പാദിപ്പിക്കുന്നു എന്ന് അറിയാം; കമ്മീഷനിങ്ങിന് ശേഷവും ഞങ്ങൾ എത്താം.',
        },
      ],
      processTitle: 'ആദ്യ കോൾ മുതൽ കമ്മീഷനിങ് വരെ',
      processSub: 'വ്യക്തമായ ഘട്ടങ്ങൾ. കേരള സമയക്രമം. രഹസ്യ മധ്യവർത്തികളില്ല.',
      processSteps: [
        {
          num: '01',
          title: 'കോൾ അല്ലെങ്കിൽ ക്വോട്ട്',
          desc: 'ബില്ലും നഗരവും പറയൂ. സബ്സിഡി യോഗ്യതയും സൈസിംഗും ലളിതമായ ഭാഷയിൽ വിശദീകരിക്കാം.',
        },
        {
          num: '02',
          title: 'സൗജന്യ സൈറ്റ് സർവേ',
          desc: 'മേൽക്കൂര, ഷേഡ്, ലോഡ് — ഡിപ്പോസിറ്റിന് മുമ്പ് സത്യസന്ധമായ kW നിർദ്ദേശം.',
        },
        {
          num: '03',
          title: 'ഡിസൈനും രേഖകളും',
          desc: 'കസ്റ്റം ലേഔട്ട്; ekiran, ANERT, PM സൂര്യ ഘർ ഫയലിംഗ് ഞങ്ങളുടെ ടീം കൈകാര്യം ചെയ്യുന്നു.',
        },
        {
          num: '04',
          title: 'ഇൻസ്റ്റാളേഷൻ',
          desc: 'പരിശീലനം നേടിയ ക്രൂ, വൃത്തിയുള്ള കേബ്ലിങ് — അനുമതി ലഭിച്ചാൽ സാധാരണയായി 1–2 ദിവസം.',
        },
        {
          num: '05',
          title: 'കമ്മീഷനിങും പിന്തുണയും',
          desc: 'നെറ്റ് മീറ്ററിംഗ് ഗോ-ലൈവ്, ഹാൻഡോവർ, മോണിറ്ററിംഗ് സെറ്റപ്പ്, ആവശ്യം വരുമ്പോൾ തുടർ സഹായം.',
        },
      ],
      installsTitle: 'സോളാർ — മനോഹരമായി',
      testimonialsTitle: 'കേരളത്തിലെ വീട്ടുടമസ്ഥർ പറയുന്നത്',
      testimonialsIntro:
        'കേരളമെമ്പാടുള്ള യഥാർത്ഥ ഇൻസ്റ്റാളേഷനുകളുടെ ഫലങ്ങൾ. റയെന്ന ഇൻസ്റ്റാൾ ചെയ്യുന്ന ഓരോ സിസ്റ്റത്തിനും 25 വർഷ പാനൽ പെർഫോർമൻസ് വാറന്റിയും പൂർണ്ണ പിന്തുണയും.',
      seasonNote:
        'മഴക്കാലം കഴിഞ്ഞ് മേൽക്കൂരകൾ വേഗം ഉണങ്ങുന്നു — 2026 PM സൂര്യ ഘർ സബ്സിഡി തുറന്നിരിക്കുമ്പോൾ സൗജന്യ സർവേ ബുക്ക് ചെയ്യൂ.',
      billStoryEyebrow: 'ഫീച്ചർ ചെയ്ത ഫലം',
      billStoryTitle: 'ഒരു മേൽക്കൂര. രണ്ട് ബിൽ കുറഞ്ഞു.',
      billStoryMeta: 'Arun · കൊല്ലം · 5 kW',
      billStoryBeforeLabel: 'മുമ്പ്',
      billStoryBefore: 'കയറുന്ന KSEB ബിൽ + ഓരോ മാസവും LPG അടുക്കള ചെലവ്',
      billStoryAfterLabel: 'റയെന്നയ്ക്ക് ശേഷം',
      billStoryAfter: 'കുറഞ്ഞ വൈദ്യുതി ബിൽ + ഇൻഡക്ഷൻ പാചകം — ഇരട്ട സമ്പാദ്യം',
      billStoryQuote:
        '“സോളാർ വന്നതിനുശേഷം ഞാൻ സ്റ്റൗ ഇൻഡക്ഷനിലേക്ക് മാറ്റി — KSEB ബിൽ കുറഞ്ഞു, LPG ഉപഭോഗവും കുറഞ്ഞു.”',
      billStoryCta: 'കൂടുതൽ ഇൻസ്റ്റാളേഷനുകൾ കാണുക →',
    },
    pageConvert: {
      services: {
        heroMicro: 'MNRE അംഗീകൃത · ₹78,000 സബ്സിഡി · സൗജന്യ സൈറ്റ് സർവേ',
        heroCalc: '☀️ എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
        heroContact: 'സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക',
        heroPhone: 'അല്ലെങ്കിൽ വിളിക്കുക',
        ctaTitle: 'ഏത് ആവശ്യത്തിനും — ഞങ്ങൾ ഒരുക്കമാണ്.',
        ctaSub:
          '🏠 ഗാർഹിക ഉപഭോക്താക്കൾ — സൗജന്യ കാൽക്കുലേറ്റർ ഉപയോഗിച്ച് 5 മിനിറ്റിൽ നിങ്ങളുടെ സിസ്റ്റം വലുപ്പം, സബ്സിഡി, 25 വർഷ ലാഭം കണ്ടെത്തൂ.',
        ctaSub2:
          '🏢 ബിസിനസ്സ് & കൺസൾട്ടേഷൻ — നിങ്ങളുടെ ആവശ്യം നേരിൽ മനസ്സിലാക്കി ശരിയായ പരിഹാരം നൽകാൻ ഞങ്ങളുടെ ടീം തയ്യാർ. ഇന്ന് തന്നെ വിളിക്കൂ.',
        ctaCalc: '☀️ കാൽക്കുലേറ്റർ പരീക്ഷിക്കുക',
        ctaContact: 'സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക',
      },
      city: {
        heroMicro: 'സൗജന്യ സൈറ്റ് സർവേ · PM സൂര്യ ഘർ സബ്സിഡി ₹78,000 വരെ',
        heroPhone: 'അല്ലെങ്കിൽ വിളിക്കുക',
        ctaCalc: '☀️ ആദ്യം സമ്പാദ്യം കണക്കാക്കുക',
        ctaContact: 'സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക',
      },
      contact: {
        responseTime: 'പ്രവൃത്തി ദിവസങ്ങളിൽ 24 മണിക്കൂറിനുള്ളിൽ മറുപടി നൽകുന്നു.',
        calcPrompt: 'ആദ്യം സംഖ്യകൾ കാണണോ?',
        calcLink: 'സൗജന്യ സോളാർ കാൽക്കുലേറ്റർ പരീക്ഷിക്കുക →',
        formTrust: [
          'കേരളമെമ്പാടും MNRE അംഗീകൃത ഇൻസ്റ്റാളർ',
          'നിശ്ചിത ക്വോട്ടേഷനോടെ സൗജന്യ സൈറ്റ് പരിശോധന',
          'സബ്സിഡി രേഖകൾ പൂർണ്ണമായി കൈകാര്യം ചെയ്യുന്നു',
        ],
      },
    },
    schema: {
      localBusinessDescription:
        'കേരളത്തിലെ MNRE അംഗീകൃത സോളാർ ഇൻസ്റ്റാളർ. വീട്ടുപയോഗ, കമർഷ്യൽ സോളാർ സിസ്റ്റങ്ങൾ, PM സൂര്യ ഘർ സബ്സിഡി ₹78,000 വരെ, സൗജന്യ സൈറ്റ് സർവേ.',
    },
    images: {
      logoAlt: 'റയെന്ന എനർജി',
      mnreBadgeAlt: 'ഇന്ത്യാ ഗവൺമെന്റിന്റെ MNRE അംഗീകൃത ചാനൽ പങ്കാളി',
    },
    corporateVideo: {
      eyebrow: 'ഞങ്ങളുടെ കഥ',
      title: 'ഞങ്ങളെക്കുറിച്ച് ഒരു മിനിറ്റിൽ',
      sub: 'ഇൻസ്റ്റാളേഷനുകൾ, ഞങ്ങളുടെ ആളുകൾ, ഓരോ മേൽക്കൂരക്ക് പിന്നിലെ വാഗ്ദാനം.',
      aboutLink: 'ഞങ്ങളെക്കുറിച്ച് കൂടുതൽ →',
      playLabel: 'കോർപ്പറേറ്റ് വീഡിയോ പ്ലേ ചെയ്യുക',
      thumbLabel: 'കോർപ്പറേറ്റ് ഫിലിം',
      duration: '1 മിനിറ്റ്',
    },
    mediaFeatured: {
      defaultTitle: 'റയെന്ന എനർജി',
      defaultBadge: 'വീഡിയോ ലൈബ്രറി',
      thumbLabel: 'ചലച്ചിത്രങ്ങളും കഥകളും',
      hint: 'താഴെയുള്ള ഏതെങ്കിലും വീഡിയോ തിരഞ്ഞെടുത്ത് ഇവിടെ പ്ലേ ചെയ്യുക',
      heroUnmute: 'ശബ്ദം ഓൺ',
      heroMute: 'നിശബ്ദം',
      heroVideoAria: 'റയെന്ന എനർജി കോർപ്പറേറ്റ് ഫിലിം — ലൂപ്പ് ബാക്ക്ഗ്രൗണ്ട്',
    },
    mediaGallery: {
      filter: 'ഫിൽട്ടർ',
      filters: 'ഫിൽട്ടറുകൾ',
      done: 'പൂർത്തിയായി',
      clearAll: 'എല്ലാം മായ്ക്കുക',
      closeAria: 'ഫിൽട്ടറുകൾ അടയ്ക്കുക',
      systemSize: 'സിസ്റ്റം വലിപ്പം',
      inverter: 'ഇൻവർട്ടർ',
      panels: 'പാനലുകൾ',
      all: 'എല്ലാം',
      showingAll: 'എല്ലാ {n} ഇൻസ്റ്റാളേഷനുകളും കാണിക്കുന്നു',
      showingFiltered: '{n}-ൽ നിന്ന് {v} ഇൻസ്റ്റാളേഷനുകൾ കാണിക്കുന്നു',
      empty: 'തിരഞ്ഞെടുത്ത ഫിൽട്ടറുകളുമായി പൊരുത്തപ്പെടുന്ന ഇൻസ്റ്റാളേഷനുകളില്ല.',
      reset: 'ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക',
      removeFilterAria: '{label} ഫിൽട്ടർ നീക്കം ചെയ്യുക',
    },
    waTooltip: 'ഞങ്ങളോട് ചാറ്റ് ചെയ്യുക!',
    officeMap: {
      eyebrow: 'ഞങ്ങളുടെ മേൽവിലാസം',
      title: 'വരൂ. നമുക്ക് നേരിൽ കാണാം.',
      sub: 'സൗജന്യ കൺസൾട്ടേഷനായി ഞങ്ങളുടെ ഓഫീസ് സന്ദർശിക്കൂ — തൈക്കൂടം NH Bypass, വൈറ്റില. കൊച്ചി നഗരഹൃദയത്തിൽ നിന്ന് വെറും 5 km.',
      directions: '📍 Google Maps-ൽ വഴി കാണൂ',
      iframeTitle: 'Google Maps-ൽ റയെന്ന എനർജി ഓഫീസ്',
    },
    mobileBar: {
      ariaLabel: 'വേഗത്തിലുള്ള ബന്ധം',
      call: 'കോൾ',
      whatsapp: 'WhatsApp',
      calculate: 'കണക്കാക്കുക',
      whatsappAria: 'WhatsApp-ൽ റയെന്ന എനർജിയോട് ചാറ്റ് ചെയ്യുക',
      calculateAria: 'സോളാർ സമ്പാദ്യ കാൽക്കുലേറ്റർ തുറക്കുക',
    },
    chat: {
      tooltip: 'റെയിനോട് ചോദിക്കുക ☀️',
      btnAria: 'റയെന്ന സോളാർ അസിസ്റ്റന്റ് റെയിനോട് ചാറ്റ് ചെയ്യുക',
      panelAria: 'റെയിനോട് ചാറ്റ് ചെയ്യുക',
      subtitle: 'റയെന്ന സോളാർ അസിസ്റ്റന്റ്',
      voiceMute: 'റെയിന്റെ ശബ്ദം നിശബ്ദമാക്കുക',
      voiceUnmute: 'റെയിന്റെ ശബ്ദം ഓണാക്കുക',
      voiceTitle: 'ശബ്ദം ടോഗിൾ ചെയ്യുക',
      close: 'ചാറ്റ് അടയ്ക്കുക',
      quickRepliesAria: 'പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ',
      chips: [
        { label: '🏠 വീട്ടുപയോഗ സോളാർ', msg: 'എനിക്ക് വീട്ടുപയോഗ സോളാറിൽ താൽപ്പര്യമുണ്ട്' },
        { label: '🏢 കമർഷ്യൽ സോളാർ', msg: 'എനിക്ക് കമർഷ്യൽ സോളാറിൽ താൽപ്പര്യമുണ്ട്' },
        { label: '💰 സബ്സിഡി', msg: 'സർക്കാർ സബ്സിഡികളെക്കുറിച്ച് പറയുക' },
        { label: '📞 ടീമിനോട് സംസാരിക്കാം', msg: 'ഞാൻ നിങ്ങളുടെ ടീമിനോട് സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നു' },
      ],
      inputPlaceholder: 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
      inputAria: 'റെയിന് സന്ദേശം ടൈപ്പ് ചെയ്യുക',
      micSpeak: 'സന്ദേശം സംസാരിക്കുക',
      micTap: 'സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക',
      micListening: 'കേൾക്കുന്നു… നിർത്താൻ ടാപ്പ് ചെയ്യുക',
      listeningPlaceholder: 'കേൾക്കുന്നു...',
      send: 'സന്ദേശം അയയ്ക്കുക',
      opening:
        'നമസ്കാരം! ഞാൻ റയ്, റയെന്ന എനർജിയുടെ സോളാർ ഗൈഡ് ☀️ വീട്ടിലോ ബിസിനസിലോ സോളാറിലേക്ക് മാറാൻ ആഗ്രഹിക്കുന്നുണ്ടോ എന്ന് അറിയാൻ ഞാൻ ഇവിടെയുണ്ട്. ഇന്ന് എന്താണ് സഹായിക്കേണ്ടത്?',
      linkCalculator: '☀️ സോളാർ കാൽക്കുലേറ്റർ പരീക്ഷിക്കുക',
      linkWhatsApp: '💬 WhatsApp-ൽ ഞങ്ങളോട് ചാറ്റ് ചെയ്യുക',
      errorMic:
        'മൈക്രോഫോൺ ആക്സസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ബ്രൗസർ അനുമതികൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക, അല്ലെങ്കിൽ ചോദ്യം താഴെ ടൈപ്പ് ചെയ്യുക ☀️',
      errorReply:
        'ക്ഷമിക്കുക, പ്രതികരിക്കാൻ കുറച്ച് ബുദ്ധിമുട്ടുണ്ടായി. ഞങ്ങളുടെ ടീമിനെ നേരിട്ട് WhatsApp-ൽ ബന്ധപ്പെടാം: https://api.whatsapp.com/send?phone=917907369304&text=Hi%20Rayenna%20Energy!%20I%27m%20interested%20in%20solar%20installation. ☀️',
      errorNetwork:
        'ഇപ്പോൾ കുറച്ച് ബുദ്ധിമുട്ടുണ്ട്. ഞങ്ങളുടെ ടീമിനെ നേരിട്ട് WhatsApp-ൽ ബന്ധപ്പെടാം: https://api.whatsapp.com/send?phone=917907369304&text=Hi%20Rayenna%20Energy!%20I%27m%20interested%20in%20solar%20installation. ☀️',
      calculatorUrl: 'https://rayennaenergy.com/ml/solar-calculator/',
      speechLang: 'ml-IN',
      ttsLang: 'ml-IN',
    },
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export function getNavLinks(lang: Lang) {
  const t = useTranslations(lang);
  const paths = [
    '/',
    '/about',
    '/services',
    '/solar-calculator',
    '/media',
    '/blog',
    '/faqs',
    '/contact',
  ];
  const labels = [
    t.nav.home,
    t.nav.about,
    t.nav.services,
    t.nav.calculator,
    t.nav.media,
    t.nav.blog,
    t.nav.faqs,
    t.nav.contact,
  ];
  return paths.map((path, i) => ({
    href: localizedPath(path, lang),
    label: labels[i],
    special: path === '/solar-calculator',
  }));
}
