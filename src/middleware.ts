// Dev-only stress-test data switch (see bruma-stress-data in astro.config.mjs): applies the fixture
// named by ?data= to the page being rendered. In a production build import.meta.env.DEV is false, so
// the fixtures are never imported and every page renders the real data.
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
  if (import.meta.env.DEV) {
    const { applyFixture } = await import('./dev/fixtures');
    applyFixture((globalThis as { __brumaData?: string | null }).__brumaData ?? null);
  }
  return next();
});
