# Fonts for the Open Graph images

Used only at build time by `src/lib/og-image.ts` (sharp's text renderer needs TrueType files). Never sent to browsers.

- `unbounded-500.ttf`: Unbounded 500, Latin subset, converted from `@fontsource/unbounded` 5.3.0 (`unbounded-latin-500-normal.woff`).
- `readex-pro-500.ttf`: Readex Pro 500, the Arabic and Latin subsets merged into one file (so Arabic titles keep Readex digits and punctuation), from `@fontsource/readex-pro` 5.3.0.

Both fonts are under the SIL Open Font License 1.1 (see the OFL files here). Converted with fontTools (WOFF to TTF, then `fontTools.merge` for Readex Pro).
