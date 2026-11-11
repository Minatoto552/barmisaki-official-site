from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

root = Path(__file__).resolve().parents[1]
files = sorted((root / 'public/cast').rglob('*'))
files = [f for f in files if f.suffix.lower() in ('.png', '.jpg', '.webp')]
sheet = Image.new('RGB', (1200, ((len(files)+5)//6)*250), '#eee6e2')
draw = ImageDraw.Draw(sheet)
for index, path in enumerate(files):
    image = Image.open(path).convert('RGB')
    image.thumbnail((190,210))
    x, y = (index % 6)*200, (index // 6)*250
    sheet.paste(image, (x+(200-image.width)//2,y))
    draw.text((x+5,y+212), path.stem, fill='black')
    draw.text((x+5,y+230), str(Image.open(path).size), fill='black')
sheet.save(root / 'cast-contact-sheet.jpg')
