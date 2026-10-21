// Astro integration: after the build, wrap every visible "BRUMA" in <span translate="no"> so browser
// auto-translation leaves the brand alone ("bruma" is a Spanish and Portuguese word). Only text inside
// <body> is touched: tags and their attributes, and the contents of script, style, textarea and template
// elements, are copied as they are.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAW = new Set(['script', 'style', 'textarea', 'template']);
const BRAND = /\bBRUMA\b/g;
const WRAPPED = '<span translate="no">BRUMA</span>';

/** The index just past the tag starting at `start` (a '<'), skipping quoted attribute values. */
const tagEnd = (html, start) => {
  let quote = '';
  for (let i = start + 1; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = '';
    } else if (c === '"' || c === "'") quote = c;
    else if (c === '>') return i + 1;
  }
  return html.length;
};

export const wrapBrand = (html) => {
  const bodyStart = html.search(/<body[\s>]/i);
  if (bodyStart < 0) return html;
  let out = html.slice(0, bodyStart);
  let i = bodyStart;
  let raw = '';
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    const textEnd = lt < 0 ? html.length : lt;
    const text = html.slice(i, textEnd);
    out += raw ? text : text.replace(BRAND, WRAPPED);
    if (lt < 0) break;
    const end = tagEnd(html, lt);
    const tag = html.slice(lt, end);
    const name = /^<(\/?)([a-zA-Z][\w-]*)/.exec(tag);
    if (name) {
      const tagName = name[2].toLowerCase();
      if (!name[1] && RAW.has(tagName) && !raw) raw = tagName;
      else if (name[1] && tagName === raw) raw = '';
    }
    out += tag;
    i = end;
  }
  return out;
};

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

/** @returns {import('astro').AstroIntegration} */
export default function brandNoTranslate() {
  return {
    name: 'bruma-brand-no-translate',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let files = 0;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const next = wrapBrand(html);
          if (next !== html) {
            await writeFile(file, next);
            files++;
          }
        }
        logger.info(`Marked BRUMA as translate="no" in ${files} pages`);
      },
    },
  };
}
