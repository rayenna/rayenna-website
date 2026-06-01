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
      about: 'About us',
      services: 'Our Services',
      calculator: 'Solar Calculator',
      media: 'Media',
      blog: 'Blog',
      faqs: 'FAQs',
      contact: 'Contact us',
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
    },
    waTooltip: 'Chat with us!',
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
      nudge: '👋 What would solar save you?',
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
      calculator: 'സോളാർ കാൽക്കുലേറ്റർ',
      media: 'മീഡിയ',
      blog: 'ബ്ലോഗ്',
      faqs: 'ചോദ്യോത്തരങ്ങൾ',
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
    },
    waTooltip: 'ഞങ്ങളോട് ചാറ്റ് ചെയ്യുക!',
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
      nudge: '👋 സോളാർ എത്ര സമ്പാദ്യം നൽകും?',
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
