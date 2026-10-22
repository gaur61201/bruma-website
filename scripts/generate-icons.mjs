// Generates favicons, app icons and the Open Graph image from the brand files.
// Run with `npm run icons` after a logo file changes. Output goes to public/.
// The logo is only resized and placed on a flat background: never recoloured or cropped.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BRAND = 'src/assets/brand';
const OUT = 'public';
const ICON = `${BRAND}/bruma-air-icon.png`;
// Carbon letters with a vapor crossbar: the wordmark for light (bone) backgrounds.
const WORDMARK_ON_LIGHT = `${BRAND}/bruma-air-wordmark-light.png`;

const CARBON = '#0E1113';
const BONE = '#F3EFE8';

const png = (size) => sharp(ICON).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// Icon flattened onto carbon, for platforms that apply their own mask (iOS, Android maskable).
const flatPng = (size, padding = 0) =>
  sharp(ICON)
    .resize(size - padding * 2, size - padding * 2)
    .extend({ top: padding, bottom: padding, left: padding, right: padding, background: CARBON })
    .flatten({ background: CARBON })
    .png({ compressionLevel: 9 })
    .toBuffer();

// Minimal ICO writer: an ICO file can hold PNG frames directly.
function ico(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);
  const entries = [];
  let offset = 6 + frames.length * 16;
  for (const { size, data } of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(async (size) => ({ size, data: await png(size) })));
await writeFile(`${OUT}/favicon.ico`, ico(frames));
await writeFile(`${OUT}/favicon-32x32.png`, await png(32));
await writeFile(`${OUT}/icon-192.png`, await png(192));
await writeFile(`${OUT}/icon-512.png`, await png(512));
await writeFile(`${OUT}/icon-maskable-512.png`, await flatPng(512, 64));
await writeFile(`${OUT}/apple-touch-icon.png`, await flatPng(180));

// Open Graph image, 1200x630: the wordmark on bone.
const wordmark = await sharp(WORDMARK_ON_LIGHT).resize({ width: 760 }).toBuffer();
const meta = await sharp(wordmark).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: BONE } })
  .composite([{ input: wordmark, left: Math.round((1200 - meta.width) / 2), top: Math.round((630 - meta.height) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(`${OUT}/og-image.png`);

console.log('Icons and OG image written to public/');
