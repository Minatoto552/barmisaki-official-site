// Card images come in two sizes: <name>-thumb.webp (720px, from scripts/make-card-thumbs.py) and <name>-card.webp (960px).
// Spreading the result onto an <img> lets the browser load the small one unless the card is shown large.
export function cardImage(src: string, sizes: string): { src: string; srcSet?: string; sizes?: string } {
  if (!/-card\.webp$/.test(src)) return { src };
  const thumb = src.replace(/-card\.webp$/, '-thumb.webp');
  return { src: thumb, srcSet: `${thumb} 720w, ${src} 960w`, sizes };
}

// The profile photo: the 960px card on ordinary screens and phones, the lossless original on high-density PC screens.
// Most originals are 2160px wide, which is close enough for the browser's choice.
export function profileImage(card: string, full: string): { src: string; srcSet?: string; sizes?: string } {
  if (!card || card === full || !/-card\.webp$/.test(card)) return { src: full };
  return { src: card, srcSet: `${card} 960w, ${full} 2160w`, sizes: '(min-width: 901px) 620px, 320px' };
}
