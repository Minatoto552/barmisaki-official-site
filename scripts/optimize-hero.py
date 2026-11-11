"""Web copies of the home hero image, made from public/hero/cast-collection.png (the lossless master).

- cast-collection-hero.webp: portrait collage for phones (resized, quality 82)
- cast-collection-wide.webp: PC hero, a native-resolution crop of the master (0,944)-(2160,2342), saved lossless
"""
from PIL import Image

src = Image.open('public/hero/cast-collection.png')
print(src.size, src.mode)
base = Image.new('RGB', src.size, (11, 11, 11))
base.paste(src, mask=src.getchannel('A') if 'A' in src.getbands() else None)

wide = base.crop((0, 944, 2160, 2342))
wide.save('public/hero/cast-collection-wide.webp', 'WEBP', lossless=True, method=6)

base.thumbnail((1800, 2400))
base.save('public/hero/cast-collection-hero.webp', 'WEBP', quality=82, method=6)
