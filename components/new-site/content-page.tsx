import { SiteNavigation } from './navigation';
import { siteNavigation } from './nav-items';
import { siteImage } from '@/app/site-images';
import './subpage.css';
import './subpage-v2.css';

// Each page gets its own photo and a handwritten line in the hero.
const heroArt: Record<string, { src: string; script: string }> = {
  NEWS: { src: '/news/second-generation-introduction.png', script: 'Fresh from the bar' },
  ALBUM: { src: '/album/latest-album-fallback.jpg', script: 'Our memories' },
  'JOIN US': { src: '/atmosphere/interior-02-display.webp', script: 'Come on in' },
  'OUR TEAM': { src: '/misaki-gallery/kurin.webp', script: 'Join our cast' },
  RESPECT: { src: '/atmosphere/interior-04-display.webp', script: 'For a lovely night' },
  TOGETHER: { src: '/atmosphere/interior-06-display.webp', script: 'Stay connected' },
  SCHEDULE: { src: '/atmosphere/interior-07-display.webp', script: 'When we open' },
  ABOUT: { src: '/atmosphere/interior-01-display.webp', script: 'Our little bar' },
  GALLERY: { src: '/atmosphere/interior-05-display.webp', script: 'Inside the bar' },
  'PICK UP': { src: '/events/warabare-announcement.png', script: 'Special night' },
  GUIDE: { src: '/atmosphere/interior-08-display.webp', script: 'First visit' },
};

export function PageHero({ index, en, ja, lead }: { index: string; en: string; ja: string; lead: string }) {
  const art = heroArt[en];
  return <section className={`sp-hero${art ? ' has-art' : ''}`}>
    <div className="sp-hero-moon" aria-hidden="true" />
    {art && <div className="sp-hero-art" aria-hidden="true"><img src={art.src} alt="" /></div>}
    <div className="sp-hero-sparkles" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i } as React.CSSProperties}>✦</i>)}</div>
    <p className="sp-kicker">{index} / BAR MISAKI</p>
    {art && <p className="sp-hero-script" aria-hidden="true">{art.script}</p>}
    <h1>{en}</h1>
    <div className="sp-hero-copy"><h2>{ja}</h2><p>{lead}</p></div>
  </section>;
}

export function SectionHead({ en, note }: { en: string; note?: string }) {
  return <div className="sp-section-head"><h2><span aria-hidden="true">♥</span>{en}</h2>{note && <p>{note}</p>}</div>;
}

export function Placeholder({ label, ratio = '16 : 9' }: { label: string; ratio?: string }) {
  const image = siteImage(label);
  if (image) return <div className="sp-media" style={{ aspectRatio: ratio.replace(' : ', '/') }}><img src={image.src} alt={image.alt} loading="lazy" /></div>;
  return <div className="sp-media sp-media-empty" style={{ aspectRatio: ratio.replace(' : ', '/') }}><span><b>{label}</b><small>IMAGE TO BE ADDED</small></span></div>;
}

export function ContentPage({ children }: { children: React.ReactNode }) {
  return <main className="sp">{children}</main>;
}

export function PageNav() {
  return <SiteNavigation />;
}

export function PageFooter() {
  return <footer className="sp-footer">
    <a className="sp-footer-brand" href="/">BAR MISAKI</a>
    <nav>{siteNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
    <p>© 2026 BarMisaki. All rights reserved.</p>
  </footer>;
}
