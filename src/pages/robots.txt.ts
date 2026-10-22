// robots.txt, built from config: while the soft launch flag (flags.noIndex) is on, crawlers are kept out of
// the whole site; afterwards everything is allowed and the sitemap is listed.
import type { APIRoute } from 'astro';
import { config } from '../config';

const open = `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap-index.xml\n`;
const closed = 'User-agent: *\nDisallow: /\n';

export const GET: APIRoute = () =>
  new Response(config.flags.noIndex ? closed : open, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
