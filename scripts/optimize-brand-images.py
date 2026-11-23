"""Display copies of large brand / news / event images. Originals stay as they are (the OG image and favicon source keep their PNGs)."""
from pathlib import Path
from PIL import Image

def save(src, dest, width, **options):
    image = Image.open(src)
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
    if dest.endswith('.webp') and image.mode not in ('RGB', 'RGBA'):
        image = image.convert('RGBA')
    image.save(dest, **options)
    print(f'{dest}  {Path(src).stat().st_size // 1024}KB -> {Path(dest).stat().st_size // 1024}KB  {image.size}')

save('public/brand/barmisaki-cat-logo.png', 'public/brand/barmisaki-cat-logo.webp', 512, quality=90, method=6)
save('public/barmisaki-icon.png', 'public/barmisaki-icon-192.png', 192, optimize=True)
save('public/news/second-generation-introduction.png', 'public/news/second-generation-introduction.webp', 1600, quality=88, method=6)
save('public/news/open-today-2026-09-18.png', 'public/news/open-today-2026-09-18.webp', 1600, quality=88, method=6)
save('public/events/warabare-announcement.png', 'public/events/warabare-announcement.webp', 1600, quality=88, method=6)
