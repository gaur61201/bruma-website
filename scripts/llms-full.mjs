// Astro integration: after the build, write /llms-full.txt, the main pages' text in plain markdown for AI
// assistants (the companion to /llms.txt). It reads each built page's <main>, so it always matches what the
// page shows in that language. Left out: scripts, illustrations and other aria-hidden or decorative parts,
// photo placeholders, buttons and form fields.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://brumakw.com';
const PAGES = ['', 'printer/', 'gallery/', 'ways-to-own/', 'hygiene/', 'book-a-demo/', 'warranty/', 'privacy/'];
// Elements whose whole subtree is left out.
const SKIP = new Set(['svg', 'figure', 'button', 'select', 'textarea', 'form', 'nav', 'picture', 'img', 'dialog']);
const SKIP_CLASS = /class="[^"]*\b(photo|placeholder-media|how-illustration|sr-only-focusable)\b/;
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'col', 'area', 'embed', 'track']);
// Block elements end a line; the innermost one decides its markdown prefix.
const BLOCK = {
  h1: '## ', h2: '### ', h3: '#### ', h4: '##### ', blockquote: '> ', li: '- ', summary: '**Q:** ',
  p: '', dt: '', dd: '', caption: '', tr: '', div: '', section: '', article: '', ol: '', ul: '', table: '', details: '', dl: '',
};
// Table rows read "Label: value".
const CELL_END = { th: ': ', td: ' ' };

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
    e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (entities[e.toLowerCase()] ?? m),
  );

/** <main> of a built page as markdown lines. */
export function toMarkdown(html) {
  const main = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '')
    .replace(/<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const out = [];
  const blocks = [];
  let skipDepth = 0; // > 0 while inside a left-out subtree
  let buf = '';
  // Inline elements sit side by side on screen ("KWD" "100" "a month"): at an element boundary, put a space
  // between two letters or digits, but never next to punctuation ("BRUMA" "’s").
  let boundary = false;
  const add = (text) => {
    if (boundary && /[\p{L}\p{N}]$/u.test(buf) && /^[\p{L}\p{N}]/u.test(text)) buf += ' ';
    boundary = false;
    buf += text;
  };
  const flush = () => {
    const text = buf.replace(/\s+/g, ' ').trim();
    buf = '';
    if (!text) return;
    const line = (BLOCK[blocks[blocks.length - 1]] ?? '') + text;
    if (out[out.length - 1] !== line) out.push(line);
  };

  for (const m of main.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)|</g)) {
    const [whole, closing, rawTag, attrs = '', selfClose, text] = m;
    if (rawTag === undefined) {
      if (!skipDepth) add(decode(text ?? whole));
      continue;
    }
    const tag = rawTag.toLowerCase();
    const isVoid = VOID.has(tag) || selfClose === '/';
    boundary = true;
    if (skipDepth) {
      if (!isVoid) skipDepth += closing ? -1 : 1;
      continue;
    }
    if (closing) {
      if (tag in CELL_END) buf += CELL_END[tag];
      if (tag in BLOCK) {
        flush();
        const i = blocks.lastIndexOf(tag);
        if (i !== -1) blocks.splice(i);
      }
      continue;
    }
    if (SKIP.has(tag) || /aria-hidden="true"/.test(attrs) || SKIP_CLASS.test(attrs)) {
      if (!isVoid) skipDepth = 1;
      continue;
    }
    if (tag === 'br') add(' ');
    if (tag in BLOCK) {
      flush();
      blocks.push(tag);
    }
  }
  flush();
  return out;
}

/** @returns {import('astro').AstroIntegration} */
export default function llmsFull() {
  return {
    name: 'bruma-llms-full',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const sections = [];
        for (const lang of ['en', 'ar']) {
          for (const page of PAGES) {
            const path = (lang === 'ar' ? 'ar/' : '') + page;
            const html = await readFile(join(root, path, 'index.html'), 'utf8');
            const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
            sections.push(`---\n\n# ${title}\n\nURL: ${SITE}/${path}\nLanguage: ${lang === 'ar' ? 'Arabic' : 'English'}\n\n${toMarkdown(html).join('\n\n')}`);
          }
        }
        const head = `# BRUMA: the main pages in plain text\n\nThe text of every main page on ${SITE}, in English and then Arabic, generated from the pages at build time. For a short summary, see ${SITE}/llms.txt.\n\n`;
        await writeFile(join(root, 'llms-full.txt'), head + sections.join('\n\n') + '\n');
        logger.info(`Wrote llms-full.txt (${sections.length} pages)`);
      },
    },
  };
}
