/** Malayalam blog UI strings and category styling. */
export const blogUiMl = {
  backToBlog: '← ബ്ലോഗിലേക്ക്',
  author: 'റയെന്ന എനർജി ടീം',
  authorLoc: 'റയെന്ന എനർജി, കൊച്ചി',
  freeQuote: 'സൗജന്യ ക്വോട്ട് നേടുക',
  freeQuoteSub: 'ഞങ്ങളുടെ സോളാർ വിദഗ്ധരോട് സംസാരിക്കുക. ബാധ്യതയില്ല, സമ്മർദ്ദമില്ല.',
  requestConsultation: 'കൺസൾട്ടേഷൻ അഭ്യർത്ഥിക്കുക',
  relatedArticles: 'ബന്ധപ്പെട്ട ലേഖനങ്ങൾ',
  calcHeading: '☀️ നിങ്ങളുടെ സോളാർ സമ്പാദ്യം കാണണോ?',
  calcSub: 'ഞങ്ങളുടെ സൗജന്യ കാൽക്കുലേറ്റർ ഉപയോഗിക്കുക — 5 മിനിറ്റിനുള്ളിൽ വ്യക്തിഗത ശുപാർശ.',
  calcBtn: 'എന്റെ സമ്പാദ്യം കണക്കാക്കുക →',
  pageTitleSuffix: '— റയെന്ന എനർജി ബ്ലോഗ്',
  filterAll: 'എല്ലാം',
};

export type BlogCategoryKey =
  | 'government'
  | 'analysis'
  | 'buying'
  | 'pricing'
  | 'maintenance'
  | 'education';

export const blogCategoriesMl: Record<
  BlogCategoryKey,
  { label: string; color: string }
> = {
  government: { label: 'സർക്കാർ പദ്ധതികൾ', color: '#3a6ea8' },
  analysis: { label: 'വിശകലനം', color: '#788bba' },
  buying: { label: 'വാങ്ങൽ ഗൈഡ്', color: '#4a8a6f' },
  pricing: { label: 'വിലയും ധനകാര്യവും', color: '#a83838' },
  maintenance: { label: 'പരിപാലനം', color: '#8a6f2c' },
  education: { label: 'വിദ്യാഭ്യാസം', color: '#6a3a8a' },
};

export type BlogArticleMl = {
  slug: string;
  title: string;
  description: string;
  date: string;
  categoryKey: BlogCategoryKey;
  readTime: string;
  related: { slug: string; title: string }[];
  sidebarHighlight?: { icon: string; title: string; text: string };
  postCta: { title: string; text: string; btn: string; href?: string };
  content: string;
};

export function categoryLabel(key: BlogCategoryKey): string {
  return blogCategoriesMl[key].label;
}
