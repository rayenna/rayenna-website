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

export function localizedPath(localeNeutralPath: string, lang: Lang): string {
  const p = localeNeutralPath === '/' ? '' : localeNeutralPath.replace(/\/$/, '');
  if (lang === 'ml') return p ? `/ml${p}` : '/ml/';
  return p || '/';
}

export function getAlternateUrls(pathname: string, site = 'https://rayennaenergy.com') {
  const neutral = stripLocale(pathname);
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
      copyright: '© 2026 Rayenna Energy, All Rights Reserved.',
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
    waTooltip: 'Chat with us!',
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
      contact: 'ബന്ധപ്പെടുക',
      calcMobile: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക',
    },
    footer: {
      aboutHeading: 'ഞങ്ങളെക്കുറിച്ച്',
      aboutText:
        'റയെന്ന എനർജി നവീന സോളാർ ഊർജ്ജ പരിഹാരങ്ങളുടെ മുൻനിര ദാതാക്കളാണ്. സുസ്ഥിരത, കാര്യക്ഷമത, സാമ്പത്തികത എന്നിവയ്ക്ക് മുൻഗണന നൽകുന്ന ഉയർന്ന നിലവാരമുള്ള സോളാർ ഇൻസ്റ്റാളേഷനുകൾ വാഗ്ദാനം ചെയ്യുന്നു — പച്ച ഭാവിയിലേക്ക്.',
      areasHeading: 'കേരളമെമ്പാടും ഇൻസ്റ്റാളേഷൻ',
      kochi: 'കൊച്ചിയിൽ സോളാർ',
      thrissur: 'തൃശ്ശൂരിൽ സോളാർ',
      trivandrum: 'തിരുവനന്തപുരത്ത് സോളാർ',
      contactHeading: 'ബന്ധപ്പെടുക',
      copyright: '© 2026 റയെന്ന എനർജി. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
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
    waTooltip: 'ഞങ്ങളോട് ചാറ്റ് ചെയ്യുക!',
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export function getNavLinks(lang: Lang) {
  const t = useTranslations(lang);
  const prefix = lang === 'ml' ? '/ml' : '';
  return [
    { href: `${prefix}/`, label: t.nav.home },
    { href: `${prefix}/about`, label: t.nav.about },
    { href: `${prefix}/services`, label: t.nav.services },
    { href: `${prefix}/solar-calculator`, label: t.nav.calculator, special: true },
    { href: `${prefix}/media`, label: t.nav.media },
    { href: `${prefix}/blog`, label: t.nav.blog },
    { href: `${prefix}/faqs`, label: t.nav.faqs },
    { href: `${prefix}/contact`, label: t.nav.contact },
  ];
}
