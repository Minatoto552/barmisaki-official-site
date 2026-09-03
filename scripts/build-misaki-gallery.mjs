// Generate web-sized gallery assets without changing the original cast photos.
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');

const root = process.cwd();
const mapping = await readFile(
  path.join(root, 'app/managed-data-client.ts'),
  'utf8',
);
const photos = [
  ...new Set(
    [...mapping.matchAll(/'([^']+\.(?:png|jpg))'/g)]
      .map((match) => match[1])
      .filter((src) => src.startsWith('/cast/')),
  ),
];
const output = path.join(root, 'public/misaki-gallery');
await mkdir(output, { recursive: true });
for (const src of photos) {
  const stem = path.parse(src).name;
  const input = path.join(root, 'public', src);
  await sharp(input)
    .rotate()
    .resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(path.join(output, `${stem}.webp`));
  await sharp(input)
    .rotate()
    .resize({
      width: 320,
      height: 320,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 75 })
    .toFile(path.join(output, `${stem}-thumb.webp`));
}
console.log(`Prepared ${photos.length} gallery photos and thumbnails.`);
