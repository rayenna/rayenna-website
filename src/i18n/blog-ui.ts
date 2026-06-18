import type { Lang } from './ui';

export const blogUiEn = {
  updatedNoteSuffix:
    'Prices, subsidy rates, and regulatory references reviewed for current Kerala requirements.',
  endCalcHeading: '☀️ Calculate your solar savings',
  endCalcSub:
    'See system size, cost after subsidy, and payback — personalised for your home in under 5 minutes.',
  endCalcBtn: 'Calculate My Savings →',
  calcSecondary: '☀️ Calculate My Savings',
  contactSecondary: 'Book a Free Site Survey',
  resourceHeading: 'Plan your solar project in Kerala',
  resources: [
    { href: '/solar-calculator/', label: 'Free Solar Calculator' },
    { href: '/contact/', label: 'Book a Free Site Survey' },
    { href: '/services/', label: 'Installation Services' },
    { href: '/solar-panels-kochi/', label: 'Solar in Kochi' },
    { href: '/faqs/', label: 'Solar FAQs' },
  ],
} as const;

export const blogUiMlStrings = {
  updatedNoteSuffix:
    'വില, സബ്സിഡി നിരക്കുകൾ, നിയന്ത്രണ റഫറൻസുകൾ എന്നിവ കേരളത്തിലെ നിലവിലെ ആവശ്യകതകൾക്കനുസരിച്ച് പരിശോധിച്ചു.',
  endCalcHeading: '☀️ നിങ്ങളുടെ സോളാർ സമ്പാദ്യം കാണണോ?',
  endCalcSub:
    'സിസ്റ്റം വലുപ്പം, സബ്സിഡിക്ക് ശേഷമുള്ള ചെലവ്, പേയ്ബാക്ക് — 5 മിനിറ്റിനുള്ളിൽ വ്യക്തിഗത എസ്റ്റിമേറ്റ്.',
  endCalcBtn: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക →',
  calcSecondary: '☀️ സമ്പാദ്യം കണക്കാക്കുക',
  contactSecondary: 'സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക',
  resourceHeading: 'കേരളത്തിൽ സോളാർ പദ്ധതി ആസൂത്രണം ചെയ്യുക',
  resources: [
    { href: '/ml/solar-calculator/', label: 'സൗജന്യ സോളാർ കാൽക്കുലേറ്റർ' },
    { href: '/ml/contact/', label: 'സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യുക' },
    { href: '/ml/services/', label: 'ഇൻസ്റ്റാളേഷൻ സേവനങ്ങൾ' },
    { href: '/ml/solar-panels-kochi/', label: 'കൊച്ചിയിൽ സോളാർ' },
    { href: '/ml/faqs/', label: 'സോളാർ ചോദ്യോത്തരങ്ങൾ' },
  ],
} as const;

export function blogUiForLang(lang: Lang) {
  return lang === 'ml' ? blogUiMlStrings : blogUiEn;
}
