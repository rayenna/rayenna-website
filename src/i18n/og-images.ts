/** Absolute URLs for Open Graph / Twitter card images (1200×630). */
const SITE = 'https://rayennaenergy.com';

export const OG = {
  default: `${SITE}/og/default.jpg`,
  home: `${SITE}/og/home.jpg`,
  about: `${SITE}/og/home.jpg`,
  services: `${SITE}/og/home.jpg`,
  faqs: `${SITE}/og/blog.jpg`,
  media: `${SITE}/og/home.jpg`,
  calculator: `${SITE}/og/calculator.jpg`,
  contact: `${SITE}/og/contact.jpg`,
  kochi: `${SITE}/og/kochi.jpg`,
  thrissur: `${SITE}/og/thrissur.jpg`,
  trivandrum: `${SITE}/og/trivandrum.jpg`,
  blog: `${SITE}/og/blog.jpg`,
} as const;

const BLOG_POST_OG: Record<string, string> = {
  'almm-made-in-india-solar-panels-2026': `${SITE}/og/blog-almm.jpg`,
  'pm-surya-ghar-one-crore-homes-2026': `${SITE}/og/blog-pm-surya-ghar.jpg`,
  'virtual-net-metering-kerala-2026': `${SITE}/og/blog-vnm.jpg`,
  'kseb-net-metering-rules-2026': `${SITE}/og/blog-kserc-2026.jpg`,
  'solar-trade-war-india-buyers-2026': `${SITE}/og/blog-trade-war.jpg`,
};

export function ogForBlogSlug(slug: string): string {
  return BLOG_POST_OG[slug] ?? OG.blog;
}
