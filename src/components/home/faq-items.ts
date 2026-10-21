import { config } from '../../config';
import { useTranslations, type Lang } from '../../i18n';

/**
 * FAQ entries for a language: real wear-test results swap in once that flag is on, and the ink-cost
 * question is added only when flags.showInkCostFaq is on.
 */
export const faqItems = (lang: Lang) => {
  const faq = useTranslations(lang).faq;
  const items = faq.items.map((item) => ({
    q: item.q,
    a: config.flags.showWearTestResults && 'aWithResults' in item && item.aWithResults ? item.aWithResults : item.a,
  }));
  if (config.flags.showInkCostFaq) items.push({ q: faq.inkItem.q, a: faq.inkItem.a });
  return items;
};

/** FAQPage structured data built from the same entries as the visible FAQ. */
export const faqSchema = (lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: lang,
  mainEntity: faqItems(lang).map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});
