import type { ImageMetadata } from 'astro';
import sample01 from '../assets/gallery/sample-01.png';
import sample02 from '../assets/gallery/sample-02.png';
import sample03 from '../assets/gallery/sample-03.png';
import sample04 from '../assets/gallery/sample-04.png';
import sample05 from '../assets/gallery/sample-05.png';
import sample06 from '../assets/gallery/sample-06.png';
import sample07 from '../assets/gallery/sample-07.png';
import sample08 from '../assets/gallery/sample-08.png';
import sample09 from '../assets/gallery/sample-09.png';
import sample10 from '../assets/gallery/sample-10.png';
import sample11 from '../assets/gallery/sample-11.png';
import sample12 from '../assets/gallery/sample-12.png';
import sample13 from '../assets/gallery/sample-13.png';
import sample14 from '../assets/gallery/sample-14.png';
import sample15 from '../assets/gallery/sample-15.png';
import sample16 from '../assets/gallery/sample-16.png';
import sample17 from '../assets/gallery/sample-17.png';
import sample18 from '../assets/gallery/sample-18.png';
import sample19 from '../assets/gallery/sample-19.png';
import sample20 from '../assets/gallery/sample-20.png';
import sample21 from '../assets/gallery/sample-21.png';

// Design tiles for the gallery page (all of them, filterable by style) and the homepage marquee
// (the first 16: tiles 1-8 fill the top row, 9-16 the bottom row).
//
// These are the 21 sample designs supplied with the printer (src/assets/gallery/, listed in its
// manifest.json), in the manifest's order. Per CLAUDE.md ("Sample design photos"): use them only on the
// gallery page and in the homepage marquee, always with the visible "Sample designs" label; never add
// technician credits to them, never present them as work done in Kuwait salons, and never add an image
// showing a recognisable licensed character. Don't re-crop, resize, recolour, rename or reorder them.
//
// A credit caption ("Design by {technician}, {area}") shows only when a tile has a photo AND a
// technician AND an area, so it's for real salon photos added later, never for these samples.
export type GalleryCategory = 'gulf' | 'bridal' | 'minimal' | 'seasonal' | 'playful';
export const galleryCategories: GalleryCategory[] = ['gulf', 'bridal', 'minimal', 'seasonal', 'playful'];

export interface GalleryTile {
  category: GalleryCategory;
  image?: ImageMetadata;
  alt?: { en: string; ar: string };
  technician?: string;
  area?: { en: string; ar: string };
}

export const galleryTiles: GalleryTile[] = [
  { category: 'bridal', image: sample01, alt: { en: "Nude almond nails with white flower accents and gold dots", ar: "أظافر لوزية بلون نود مع زهور بيضاء ونقاط ذهبية" } },
  { category: 'seasonal', image: sample02, alt: { en: "Red French tips with cherry designs", ar: "أطراف فرنسية حمراء مع رسومات كرز" } },
  { category: 'minimal', image: sample03, alt: { en: "Nude nails with black bows and fine black tips", ar: "أظافر نود مع فيونكات سوداء وأطراف سوداء رفيعة" } },
  { category: 'seasonal', image: sample04, alt: { en: "Lilac floral marble nails", ar: "أظافر بنقشة رخامية زهرية بلون الليلك" } },
  { category: 'minimal', image: sample05, alt: { en: "Deep red nails with a gold heart outline", ar: "أظافر حمراء داكنة مع قلب ذهبي" } },
  { category: 'bridal', image: sample06, alt: { en: "Nude nails with raised white flowers", ar: "أظافر نود مع زهور بيضاء بارزة" } },
  { category: 'seasonal', image: sample07, alt: { en: "Nude nails with blue swirl tips", ar: "أظافر نود مع أطراف بدوامات زرقاء" } },
  { category: 'seasonal', image: sample08, alt: { en: "Nude nails with cherries and black tips", ar: "أظافر نود مع رسومات كرز وأطراف سوداء" } },
  { category: 'minimal', image: sample09, alt: { en: "Sky-blue cloud marble nails with gold details", ar: "أظافر بنقشة غيوم زرقاء مع تفاصيل ذهبية" } },
  { category: 'bridal', image: sample10, alt: { en: "Nude nails with a white bow and silver glitter tips", ar: "أظافر نود مع فيونكة بيضاء وأطراف لامعة فضية" } },
  { category: 'seasonal', image: sample11, alt: { en: "Tortoiseshell French tips with gold details", ar: "أطراف فرنسية بنقشة صدف السلحفاة مع تفاصيل ذهبية" } },
  { category: 'minimal', image: sample12, alt: { en: "Black French tips with star designs", ar: "أطراف فرنسية سوداء مع رسومات نجوم" } },
  { category: 'minimal', image: sample13, alt: { en: "Nude nails with icy blue glitter tips", ar: "أظافر نود مع أطراف لامعة بالأزرق الجليدي" } },
  { category: 'seasonal', image: sample14, alt: { en: "Nude nails with red cherries and dots", ar: "أظافر نود مع رسومات كرز ونقاط حمراء" } },
  { category: 'bridal', image: sample15, alt: { en: "Nude nails with a gold bow accent", ar: "أظافر نود مع فيونكة ذهبية" } },
  { category: 'bridal', image: sample16, alt: { en: "Nude nails with white flowers and gold dots", ar: "أظافر نود مع زهور بيضاء ونقاط ذهبية" } },
  { category: 'playful', image: sample17, alt: { en: "Pink cherry blossom nails with fox-mask designs", ar: "أظافر وردية بزهر الكرز مع رسومات قناع ثعلب" } },
  { category: 'playful', image: sample18, alt: { en: "Pastel nails with moons, stars and bunnies", ar: "أظافر بألوان باستيل مع أقمار ونجوم وأرانب" } },
  { category: 'playful', image: sample19, alt: { en: "Sky-blue nails with stars, clouds and a pink bow", ar: "أظافر زرقاء مع نجوم وغيوم وفيونكة وردية" } },
  { category: 'playful', image: sample20, alt: { en: "Pink and white nails with teddy bears and bows", ar: "أظافر وردية وبيضاء مع دببة وفيونكات" } },
  { category: 'playful', image: sample21, alt: { en: "Navy nails with gold stars and a crescent moon", ar: "أظافر كحلية مع نجوم ذهبية وهلال" } },
];

/** The homepage marquee shows the first 16 designs. */
export const homeTiles = galleryTiles.slice(0, 16);
