"""Small copies of the cast card images for grids and the deck: public/cast/**/<name>-card.webp -> <name>-thumb.webp (720px wide).
The card and lossless files are left untouched; the site offers both through srcset and the browser picks the size it needs."""
from pathlib import Path
from PIL import Image

WIDTH = 720
for card in sorted(Path('public/cast').rglob('*-card.webp')):
    thumb = card.with_name(card.name.replace('-card.webp', '-thumb.webp'))
    image = Image.open(card)
    if image.width > WIDTH:
        image = image.resize((WIDTH, round(image.height * WIDTH / image.width)), Image.LANCZOS)
    image.convert('RGB').save(thumb, 'WEBP', quality=86, method=6)
    print(f'{thumb}  {card.stat().st_size // 1024}KB -> {thumb.stat().st_size // 1024}KB')
