import { createRequire } from 'node:module';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const directory = path.resolve('public/atmosphere');
let originals = 0, main = 0, thumbs = 0;
for (const name of (await readdir(directory)).filter(name => /^interior-\d+\.png$/.test(name))) {
  const source = path.join(directory, name);
  const metadata = await sharp(source).metadata();
  originals += (await stat(source)).size;
  for (const [suffix, width, quality] of [['display', 1600, 85], ['thumb', 240, 78]]) {
    const output = path.join(directory, name.replace('.png', `-${suffix}.webp`));
    const info = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(output);
    if (suffix === 'display') main += info.size; else thumbs += info.size;
  }
  console.log(`${name}: ${metadata.width}x${metadata.height}`);
}
console.log(JSON.stringify({ originals, main, thumbs, reduction: `${((1 - (main + thumbs) / originals) * 100).toFixed(1)}%` }));
