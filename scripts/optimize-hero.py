"""Make the web copy of the home hero image (public/hero/cast-collection.png -> cast-collection-hero.webp)."""
from PIL import Image

src = Image.open('public/hero/cast-collection.png')
print(src.size, src.mode)
base = Image.new('RGB', src.size, (11, 11, 11))
base.paste(src, mask=src.getchannel('A') if 'A' in src.getbands() else None)
base.thumbnail((1800, 2400))
base.save('public/hero/cast-collection-hero.webp', 'WEBP', quality=82, method=6)
