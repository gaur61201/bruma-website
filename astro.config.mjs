// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://brumakw.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline the (small) stylesheet so there's no render-blocking CSS request on mobile.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      // The thank-you pages are noindex; the 404 page isn't a real URL.
      filter: (page) => !/\/thank-you\/$/.test(page) && !/\/404\/?$/.test(page),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ar: 'ar' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
