// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import brandNoTranslate from './scripts/brand-no-translate.mjs';

/**
 * Dev-only stress-test data switch for the break-ui pass: under `astro dev`, open any page with
 * ?data=worst or ?data=empty to render it with the fixtures in src/dev/fixtures.ts. Astro strips the
 * query string from static pages, so this dev-server hook records it before Astro renders, and
 * src/middleware.ts applies the fixture. The hook only exists on the dev server.
 */
/** @type {import('astro').AstroIntegration} */
const stressData = {
  name: 'bruma-stress-data',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, _res, next) => {
        if (req.headers.accept?.includes('text/html')) {
          /** @type {{ __brumaData?: string | null }} */ (globalThis).__brumaData = new URL(req.url ?? '/', 'http://localhost').searchParams.get('data');
        }
        next();
      });
    },
  },
};

export default defineConfig({
  site: 'https://brumakw.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline the (small) stylesheet so there's no render-blocking CSS request on mobile.
    inlineStylesheets: 'always',
  },
  integrations: [
    stressData,
    brandNoTranslate(),
    sitemap({
      // The thank-you pages are noindex; the 404 page isn't a real URL.
      filter: (page) => !/\/thank-you\/$/.test(page) && !/\/404\/?$/.test(page),
      // Every URL carries the build time as its last modification date.
      lastmod: new Date(),
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
