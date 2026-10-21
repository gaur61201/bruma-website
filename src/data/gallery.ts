import type { ImageMetadata } from 'astro';

// Design tiles for the gallery page (all of them, filterable by style) and the homepage marquee
// (the first 16: the first half fills the top row, the rest the bottom row). Real photos only: no
// stock or AI images presented as real work.
// A credit caption ("Design by {technician}, {area}") shows only when the tile has a real photo
// AND a real technician AND area. Until then the tile renders as a labelled placeholder.
//
// To add a photo, replace a placeholder entry:
//   import photo1 from '../assets/gallery/photo-1.jpg';
//   { category: 'gulf', image: photo1, alt: { en: '...', ar: '...' }, technician: 'Name', area: { en: 'Salmiya', ar: 'السالمية' } }
export type GalleryCategory = 'gulf' | 'bridal' | 'minimal' | 'seasonal';
export const galleryCategories: GalleryCategory[] = ['gulf', 'bridal', 'minimal', 'seasonal'];

export interface GalleryTile {
  category: GalleryCategory;
  image?: ImageMetadata;
  alt?: { en: string; ar: string };
  technician?: string;
  area?: { en: string; ar: string };
}

// 24 placeholders (6 per style, interleaved) until real photos and credits exist.
export const galleryTiles: GalleryTile[] = Array.from({ length: 24 }, (_, i) => ({
  category: galleryCategories[i % galleryCategories.length],
}));

/** The homepage marquee shows the first 16 designs. */
export const homeTiles = galleryTiles.slice(0, 16);
