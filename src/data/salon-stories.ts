import type { ImageMetadata } from 'astro';

// Real salons that have agreed, in writing, to be featured. Never add sample or invented entries.
// The section renders only when config.flags.showSalonStories is true AND this list isn't empty.
export interface SalonStory {
  salon: string;
  area: { en: string; ar: string };
  quote: { en: string; ar: string };
  person?: string;
  photo?: ImageMetadata;
  photoAlt?: { en: string; ar: string };
}

export const salonStories: SalonStory[] = [];
