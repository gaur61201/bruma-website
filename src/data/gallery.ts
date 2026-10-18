import type { ImageMetadata } from 'astro';

// Gallery tiles for the two auto-scrolling rows: the first half fills the top row, the rest the
// bottom row. Real photos only: no stock or AI images presented as real work.
// A credit caption ("Design by {technician}, {area}") shows only when the tile has a real photo
// AND a real technician AND area. Until then the tile renders as a labelled placeholder.
//
// To add a photo, replace a placeholder entry:
//   import photo1 from '../assets/gallery/photo-1.jpg';
//   { image: photo1, alt: { en: '...', ar: '...' }, technician: 'Name', area: { en: 'Salmiya', ar: 'السالمية' } }
export interface GalleryTile {
  image?: ImageMetadata;
  alt?: { en: string; ar: string };
  technician?: string;
  area?: { en: string; ar: string };
}

// 16 placeholders (8 per row) until real photos and credits exist.
export const galleryTiles: GalleryTile[] = Array.from({ length: 16 }, () => ({}));
