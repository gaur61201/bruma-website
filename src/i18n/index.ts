import { en, type Dict } from './en';
import { ar } from './ar';

export type Lang = 'en' | 'ar';
export type { Dict };

const dictionaries: Record<Lang, Dict> = { en, ar };

/** The language of a route: anything under /ar/ is Arabic, everything else English. */
export const getLang = (url: URL): Lang => (/^\/ar(\/|$)/.test(url.pathname) ? 'ar' : 'en');

export const useTranslations = (lang: Lang): Dict => dictionaries[lang];

export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');

/** Strip the /ar prefix to get the language-neutral path, e.g. /ar/thank-you/ -> /thank-you/. */
const neutralPath = (pathname: string) => pathname.replace(/^\/ar(?=\/|$)/, '') || '/';

/** The path of the same page in the given language. */
export const localizedPath = (pathname: string, lang: Lang) => {
  const path = neutralPath(pathname);
  return lang === 'ar' ? `/ar${path}` : path;
};

/** The same page in the other language, for the language switch. */
export const alternatePath = (pathname: string, current: Lang) =>
  localizedPath(pathname, current === 'ar' ? 'en' : 'ar');

/** Replace {key} placeholders. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
