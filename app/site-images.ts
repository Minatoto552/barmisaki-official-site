export function siteImage(label: string): {src: string; alt: string} | undefined {
  if(label === 'KEY VISUAL') return {src:'/hero/cast-collection-hero.webp',alt:'BarMisakiのキャストたちの顔が並ぶコラージュ'};
  if(label === 'ABOUT VISUAL') return {src:'/atmosphere/interior-01-display.webp',alt:'BarMisakiの店内'};
  if(label === 'MISAKI VISUAL') return {src:'/misaki-gallery/nabechi.webp',alt:'なべち！による海咲アバターの改変例'};
  const gallery = label.match(/^GALLERY (\d+)$/);
  if(gallery) return {src:`/atmosphere/interior-${gallery[1].padStart(2,'0')}-display.webp`,alt:`BarMisaki 店内写真 ${gallery[1]}`};
  if(label==='ALBUM 01') return {src:'/album/latest-album-fallback.jpg',alt:'2026年9月18日 BarMisakiの集合写真'};
  if(label==='NEWS 01') return {src:'/news/open-today-2026-09-18.png',alt:'2026年9月18日 営業のお知らせ'};
  if(label==='NEWS 02') return {src:'/news/second-generation-introduction.png',alt:'BarMisaki 2期生キャスト紹介'};
  return undefined;
}
