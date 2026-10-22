// robots.txt, built from config. While the soft-launch flag (flags.noIndex) is on, crawlers are kept out of
// the whole site. Afterwards everything is allowed, the AI assistants' crawlers are named explicitly (so
// BRUMA can be found and quoted in AI answers), and the sitemap is listed.
import type { APIRoute } from 'astro';
import { config } from '../config';

const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Bingbot'];
const open = [
  ...aiCrawlers.map((bot) => `User-agent: ${bot}\nAllow: /\n`),
  'User-agent: *\nAllow: /\n',
  `Sitemap: ${config.siteUrl}/sitemap-index.xml\n`,
].join('\n');
const closed = 'User-agent: *\nDisallow: /\n';

export const GET: APIRoute = () =>
  new Response(config.flags.noIndex ? closed : open, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
