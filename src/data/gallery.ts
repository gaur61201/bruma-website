import type { ImageMetadata } from 'astro';

// Gallery tiles. Real photos only: no stock or AI images presented as real work.
// A credit caption ("Design by {technician}, {area}") shows only when the tile has a real photo
// AND a real technician AND area. Until then the tile renders as a labelled placeholder.
//
// To add a photo:
//   import photo1 from '../assets/gallery/photo-1.jpg';
//   { image: photo1, alt: { en: '...', ar: '...' }, technician: 'Name', area: { en: 'Salmiya', ar: 'السالمية' } }
export interface GalleryTile {
  image?: ImageMetadata;
  alt?: { en: string; ar: string };
  technician?: string;
  area?: { en: string; ar: string };
}

export const galleryTiles: GalleryTile[] = [
  {}, // TODO: real photo + credit
  {}, // TODO: real photo + credit
  {}, // TODO: real photo + credit
  {}, // TODO: real photo + credit
  {}, // TODO: real photo + credit
  {}, // TODO: real photo + credit
];
