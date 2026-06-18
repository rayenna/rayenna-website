import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rayennaenergy.com',
  trailingSlash: 'always',
  redirects: {
    '/calculator': '/solar-calculator/',
    '/calculator/': '/solar-calculator/',
  },
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ml'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
