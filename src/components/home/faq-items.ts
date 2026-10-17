import { config } from '../../config';
import { useTranslations, type Lang } from '../../i18n';

/** FAQ entries for a language, with real wear-test results swapped in once the flag is on. */
export const faqItems = (lang: Lang) =>
  useTranslations(lang).faq.items.map((item) => ({
    q: item.q,
    a: config.flags.showWearTestResults && 'aWithResults' in item && item.aWithResults ? item.aWithResults : item.a,
  }));

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
