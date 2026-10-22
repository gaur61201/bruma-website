// Draws a 1200×630 Open Graph image at build time with sharp (already used by astro:assets): the wordmark on
// bone, the page title in the site's own fonts (Unbounded for English, Readex Pro for Arabic, as TrueType
// copies of the self-hosted Fontsource files in src/assets/fonts/og; Pango shapes the Arabic), and the
// domain. Arabic is right-aligned with the wordmark on the right; the wordmark itself is never mirrored.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import type { Lang } from '../i18n';

const W = 1200;
const H = 630;
const PAD = 80;
const BONE = '#F3EFE8';
const CARBON = '#0E1113';
const STONE = '#5E6266';

const root = process.cwd();
const file = (p: string) => path.join(root, p);
const UNBOUNDED = 'src/assets/fonts/og/unbounded-500.ttf';
const READEX = 'src/assets/fonts/og/readex-pro-500.ttf'; // Arabic and Latin in one file
const fonts = {
  heading: { en: UNBOUNDED, ar: READEX },
  // Pango font descriptions: the family name inside each file, then the size in pixels (at 72 dpi).
  headingFont: { en: 'Unbounded Medium, 60', ar: 'Readex Pro Medium, 68' },
  latin: READEX,
};
// Carbon letters with the teal bar: the wordmark for light backgrounds.
const WORDMARK = 'src/assets/brand/bruma-air-wordmark-light.png';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Text as a transparent PNG, wrapped to `width`. */
async function text(content: string, font: string, fontfile: string, color: string, width: number, align: 'left' | 'right') {
  const { data, info } = await sharp({
    text: { text: `<span foreground="${color}">${escape(content)}</span>`, font, fontfile: file(fontfile), width, rgba: true, align, dpi: 72, wrap: 'word', spacing: 8 },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

let wordmark: Promise<{ data: Buffer; width: number; height: number }> | null = null;
const getWordmark = () =>
  (wordmark ??= sharp(fs.readFileSync(file(WORDMARK)))
    .trim()
    .resize({ height: 52 })
    .png()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => ({ data, width: info.width, height: info.height })));

export async function renderOgImage(lang: Lang, headline: string, domain: string) {
  const rtl = lang === 'ar';
  // Pango mirrors alignment for right-to-left paragraphs, so "left" lines Arabic up on the right.
  const align = 'left';
  const x = (w: number) => (rtl ? W - PAD - w : PAD);
  const site = await text(domain, 'Readex Pro Medium, 28', fonts.latin, STONE, W - 2 * PAD, align);
  const title = await text(headline, fonts.headingFont[lang], fonts.heading[lang], CARBON, W - 2 * PAD - 40, align);
  const mark = await getWordmark();

  return sharp({ create: { width: W, height: H, channels: 4, background: BONE } })
    .composite([
      { input: mark.data, left: x(mark.width), top: PAD - 8 },
      { input: title.data, left: x(title.width), top: Math.max(196, Math.round((H - title.height) / 2) + 10) },
      { input: site.data, left: x(site.width), top: H - PAD - site.height + 6 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}
