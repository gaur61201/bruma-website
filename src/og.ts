// Open Graph images: one per page and language, generated at build time by src/pages/og/[image].png.ts.
// Each shows the page's own title (the meta title without "| BRUMA"), so it never drifts from the page.
import type { Dict } from './i18n/en';
import type { Lang } from './i18n';

export const ogPages = {
  home: (t: Dict) => t.meta.home.title,
  printer: (t: Dict) => t.printer.meta.title,
  gallery: (t: Dict) => t.galleryPage.meta.title,
  'ways-to-own': (t: Dict) => t.waysPage.meta.title,
  hygiene: (t: Dict) => t.hygienePage.meta.title,
  'book-a-demo': (t: Dict) => t.bookPage.meta.title,
  warranty: (t: Dict) => t.warrantyPage.meta.title,
  privacy: (t: Dict) => t.privacyPage.meta.title,
};
export type OgPage = keyof typeof ogPages;

/** A page title without the brand suffix: the headline on its image, and the image's alt text. */
export const ogHeadline = (title: string) => title.replace(/\s*\|\s*BRUMA\s*$/, '');

/** Which page's image a path uses (/ar/printer/ → printer). Pages without one (thank-you, 404) use home's. */
export function ogPageOf(pathname: string): OgPage {
  const slug = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\/+|\/+$/g, '') || 'home';
  return slug in ogPages ? (slug as OgPage) : 'home';
}
