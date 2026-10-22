// /llms.txt (the llms.txt convention): a plain summary of BRUMA for AI assistants. Built from config.ts and the
// dictionaries, so the facts, phone and page descriptions never drift from the site. The full page text is in
// /llms-full.txt (scripts/llms-full.mjs, written after the pages are built).
import type { APIRoute } from 'astro';
import { config, whatsappLink } from '../config';
import { localizedPath, useTranslations, type Lang } from '../i18n';
import { enCount, kwd } from '../i18n/plural';

const url = (path: string, lang: Lang) => new URL(localizedPath(path, lang), config.siteUrl).href;

function pages(lang: Lang) {
  const t = useTranslations(lang);
  return [
    ['/', t.schema.home, t.meta.home.description],
    ['/printer/', t.nav.printer, t.printer.meta.description],
    ['/gallery/', t.nav.gallery, t.galleryPage.meta.description],
    ['/ways-to-own/', t.nav.waysToOwn, t.waysPage.meta.description],
    ['/hygiene/', t.nav.hygiene, t.hygienePage.meta.description],
    ['/book-a-demo/', t.nav.bookDemo, t.bookPage.meta.description],
    ['/warranty/', t.footer.warranty, t.warrantyPage.meta.description],
    ['/privacy/', t.footer.privacy, t.privacyPage.meta.description],
  ].map(([path, name, description]) => `- [${name}](${url(path, lang)}): ${description}`);
}

export const GET: APIRoute = () => {
  const en = useTranslations('en');
  const ar = useTranslations('ar');
  const c = config;
  const governorates = en.governorates.map((g) => g.label).join(', ');
  const body = [
    '# BRUMA',
    '',
    `> ${en.identity}`,
    '',
    `${en.schema.productDescription} BRUMA sells to businesses only (nail salons, beauty salons and beauty clinics), not to consumers. Website: ${c.siteUrl}/ (English and Arabic).`,
    '',
    '## What BRUMA offers, and where',
    '',
    `- The BRUMA nail printer: prints a chosen design on a prepared nail in about ${enCount(c.printSecondsPerNail, 'second', 'seconds')}.`,
    `- Delivery and installation in your salon, anywhere in Kuwait's ${en.governorates.length} governorates: ${governorates}.`,
    `- On-site training for ${enCount(c.techniciansTrained, 'technician', 'technicians')}, and local support by WhatsApp and salon visits.`,
    `- A ${c.warrantyMonths}-month warranty, with a loaner printer if a repair takes longer than ${enCount(c.loanerWithinHours, 'hour', 'hours')}.`,
    '- Ink cartridge refills, delivered to your salon.',
    `- Two ways to own it: a monthly plan from ${kwd(c.planMonthlyKwd, 'en')} a month (the printer carries BRUMA branding), or pay once upfront (price given at the demo; your salon's name and logo can go on the printer).`,
    '',
    '## How to book a free demo',
    '',
    `- WhatsApp: ${c.phoneDisplay} (${whatsappLink(en.whatsapp.floatMessage).split('?')[0]})`,
    `- Phone: ${c.phoneDisplay}`,
    `- Form: ${url('/book-a-demo/', 'en')}`,
    `- The demo is free, takes about ${enCount(c.demoMinutes, 'minute', 'minutes')} in your salon, and comes with no obligation to buy.`,
    '',
    '## Pages (English)',
    '',
    ...pages('en'),
    '',
    '## الصفحات بالعربية (Pages in Arabic)',
    '',
    `> ${ar.identity}`,
    '',
    ...pages('ar'),
    '',
    '## Optional',
    '',
    `- [Full text of the main pages, English and Arabic](${c.siteUrl}/llms-full.txt): plain-text version of every main page.`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
