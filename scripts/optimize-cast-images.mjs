// Lossless, full-resolution delivery copies. Original files remain untouched.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function optimize(directory) {
  let originalBytes = 0;
  let deliveryBytes = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      const totals = await optimize(path);
      originalBytes += totals.originalBytes;
      deliveryBytes += totals.deliveryBytes;
    } else if (/\.png$/i.test(entry.name)) {
      const destination = path.replace(/\.png$/i, '-lossless.webp');
      await sharp(path).webp({ lossless: true, effort: 6 }).toFile(destination);
      // Check decoded pixel equality, not just the compressed file size.
      const before = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const after = await sharp(destination).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      if (before.info.width !== after.info.width || before.info.height !== after.info.height || !before.data.equals(after.data)) {
        throw new Error(`Pixel mismatch: ${path}`);
      }
      originalBytes += (await stat(path)).size;
      deliveryBytes += (await stat(destination)).size;
      await sharp(path).resize({ width: 960, withoutEnlargement: true })
        .webp({ lossless: true, effort: 4 }).toFile(path.replace(/\.png$/i, '-card.webp'));
    }
  }
  return { originalBytes, deliveryBytes };
}
console.log(await optimize('public/cast'));
