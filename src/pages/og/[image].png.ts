// The Open Graph images, one per page and language (/og/en-home.png, /og/ar-printer.png, …), drawn at build time.
import type { APIRoute, GetStaticPaths } from 'astro';
import { config } from '../../config';
import { useTranslations, type Lang } from '../../i18n';
import { renderOgImage } from '../../lib/og-image';
import { ogHeadline, ogPages, type OgPage } from '../../og';

export const getStaticPaths = (() =>
  (['en', 'ar'] as Lang[]).flatMap((lang) =>
    (Object.keys(ogPages) as OgPage[]).map((page) => ({ params: { image: `${lang}-${page}` }, props: { lang, page } })),
  )) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { lang, page } = props as { lang: Lang; page: OgPage };
  const headline = ogHeadline(ogPages[page](useTranslations(lang)));
  const png = await renderOgImage(lang, headline, new URL(config.siteUrl).host);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
