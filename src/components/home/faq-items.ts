import { config } from '../../config';
import { localizedPath, useTranslations, type Lang } from '../../i18n';
import { relatedPaths, type RelatedPage } from '../../related';

type FaqItem = { q: string; a: string; link?: { href: string; label: string } };
/** A link from an answer to the page that covers it in full, with descriptive anchor text. */
const linkTo = (lang: Lang, page: RelatedPage) => ({ href: localizedPath(relatedPaths[page], lang), label: useTranslations(lang).related[page] });
const withLink = (item: { q: string; a: string }, lang: Lang, page?: RelatedPage): FaqItem =>
  page ? { q: item.q, a: item.a, link: linkTo(lang, page) } : { q: item.q, a: item.a };

/**
 * FAQ entries for a language: real wear-test results swap in once that flag is on, and the ink-cost
 * question is added only when flags.showInkCostFaq is on.
 */
export const faqItems = (lang: Lang): FaqItem[] => {
  const faq = useTranslations(lang).faq;
  // Design skills, how long it lasts, repairs, hygiene, logo: the last three link to their pages.
  const pages: (RelatedPage | undefined)[] = [undefined, undefined, 'warranty', 'hygiene', 'ways'];
  const items = faq.items.map((item, i) =>
    withLink(
      { q: item.q, a: config.flags.showWearTestResults && 'aWithResults' in item && item.aWithResults ? item.aWithResults : item.a },
      lang,
      pages[i],
    ),
  );
  if (config.flags.showInkCostFaq) items.push({ q: faq.inkItem.q, a: faq.inkItem.a });
  return items;
};

/**
 * The printer page's FAQ: its own space, products and install questions, the homepage answers on design
 * skills and repairs, and the ink-cost question only when flags.showInkCostFaq is on.
 */
export const printerFaqItems = (lang: Lang) => {
  const t = useTranslations(lang);
  const items = [
    withLink(t.printer.faq.space, lang),
    withLink(t.printer.faq.products, lang, 'hygiene'),
    withLink(t.faq.items[0], lang),
    withLink(t.faq.items[2], lang, 'warranty'),
    withLink(t.printer.faq.installs, lang),
  ];
  if (config.flags.showInkCostFaq) items.push({ q: t.faq.inkItem.q, a: t.faq.inkItem.a });
  return items;
};

/** Ways to own it: the price question links to booking a demo (where the upfront price is given). */
export const waysFaqItems = (lang: Lang) =>
  useTranslations(lang).waysPage.faq.items.map((item, i) => withLink(item, lang, i === 0 ? 'bookDemo' : undefined));

/** Book a demo: "Do I have to buy?" links to the ways to own it. */
export const bookFaqItems = (lang: Lang) =>
  useTranslations(lang).bookPage.faq.items.map((item, i) => withLink(item, lang, i === 1 ? 'ways' : undefined));

/** FAQPage structured data built from the same entries as the visible FAQ. */
export const faqSchema = (lang: Lang, items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: lang,
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});
