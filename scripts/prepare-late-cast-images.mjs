import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');

const images = [
  ['D:/BarMisaki/２期生後期/えありーー.jpg', 'public/cast/hana-late/airy'],
  ['D:/BarMisaki/スタッフ/流歌.jpg', 'public/cast/staff/ruka'],
  ['D:/BarMisaki/２期生後期/あるふぉんす.png', 'public/cast/hana-late/alphonse'],
  ['D:/BarMisaki/２期生後期/ゆきてゃ.png', 'public/cast/hana-late/yukitya'],
  ['D:/BarMisaki/２期生後期/東雲つばき.png', 'public/cast/hana-late/shinonome-tsubaki'],
  ['D:/BarMisaki/２期生後期/mina.png', 'public/cast/hana-late/mina'],
  ['D:/BarMisaki/２期生後期/ひぃらぎ.png', 'public/cast/hana-late/hiiragi'],
];

for (const [source, destination] of images) {
  await mkdir(dirname(destination), { recursive: true });
  await sharp(source).webp({ lossless: true, effort: 4 }).toFile(`${destination}-lossless.webp`);
  await sharp(source).resize({ width: 960, withoutEnlargement: true })
    .webp({ lossless: true, effort: 4 }).toFile(`${destination}-card.webp`);
  const before = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(`${destination}-lossless.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (before.info.width !== after.info.width || before.info.height !== after.info.height || !before.data.equals(after.data)) {
    throw new Error(`Pixel mismatch: ${source}`);
  }
  console.log(`${destination}: ${before.info.width}x${before.info.height}, pixels verified`);
}
