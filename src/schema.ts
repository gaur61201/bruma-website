// Structured data (JSON-LD), built from config.ts and the dictionaries so it never drifts from what the page
// shows. Organization, WebSite and (except on the homepage) BreadcrumbList go on every page through
// Base.astro; pages add Service, Product and FAQPage. No prices, offers, ratings or reviews: the site
// doesn't show any.
import { config, visiblePrinterSpecs } from './config';
import { localizedPath, type Dict, type Lang } from './i18n';
import { ogHeadline } from './og';

const site = config.siteUrl;
const abs = (p: string) => new URL(p, site).href;
const ORG = `${site}/#organization`;
const kuwait = { '@type': 'Country', name: 'Kuwait' };

export function organizationSchema(t: Dict) {
  const telephone = config.phoneDisplay.replace(/\s+/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG,
    name: 'BRUMA',
    url: `${site}/`,
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    description: t.identity,
    ...(config.email ? { email: config.email } : {}),
    telephone,
    areaServed: [
      kuwait,
      ...t.governorates.map((g) => ({ '@type': 'AdministrativeArea', name: t.schema.governorate(g.label), containedInPlace: kuwait })),
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'sales',
      areaServed: 'KW',
      availableLanguage: ['English', 'Arabic'],
    },
    knowsLanguage: ['en', 'ar'],
    ...(config.instagramUrl ? { sameAs: [config.instagramUrl] } : {}),
  };
}

export const websiteSchema = (lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  name: 'BRUMA',
  url: `${site}/`,
  inLanguage: lang,
  publisher: { '@id': ORG },
});

/** Home > this page, for every page except the homepage (and the 404, which has no URL). */
export function breadcrumbSchema(t: Dict, lang: Lang, path: string) {
  const slug = path.replace(/^\/ar(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
  const names: Record<string, string> = {
    printer: t.nav.printer,
    gallery: t.nav.gallery,
    'ways-to-own': t.nav.waysToOwn,
    hygiene: t.nav.hygiene,
    'book-a-demo': t.nav.bookDemo,
    warranty: t.footer.warranty,
    privacy: t.footer.privacy,
    'thank-you': ogHeadline(t.meta.thankYou.title),
  };
  if (!slug || !names[slug]) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.schema.home, item: abs(localizedPath('/', lang)) },
      { '@type': 'ListItem', position: 2, name: names[slug], item: abs(path) },
    ],
  };
}

/** The supply, installation, training and support service (homepage and /ways-to-own/). */
export const serviceSchema = (t: Dict, lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: t.schema.serviceName,
  serviceType: t.schema.serviceName,
  description: t.schema.serviceDescription,
  provider: { '@id': ORG },
  areaServed: kuwait,
  url: abs(localizedPath('/ways-to-own/', lang)),
});

/**
 * The printer (/printer/). Its specs come from printerSpecs, the rows the page shows. None is confirmed yet
 * (all marked // TODO confirm in config.ts), the same as on the page.
 */
export const productSchema = (t: Dict, lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: t.schema.productName,
  brand: { '@type': 'Brand', name: 'BRUMA' },
  description: t.schema.productDescription,
  image: abs(`/og/${lang}-printer.png`),
  url: abs(localizedPath('/printer/', lang)),
  additionalProperty: visiblePrinterSpecs().map((spec) => ({
    '@type': 'PropertyValue',
    name: t.printer.specs.labels[spec.label],
    value: spec.value[lang],
  })),
});
