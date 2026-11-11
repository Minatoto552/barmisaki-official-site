'use client';
import { useEffect, useRef, useState } from 'react';
import { misakiGalleryAll } from '../misaki-collection';
import './misaki-showcase.css';

const AUTOPLAY_MS = 5200;
const photos = misakiGalleryAll;

// A slideshow of Misaki variations: whole photo always visible on a blurred copy of itself,
// neighbours peeking out behind, auto-advance with a progress line, and a heart button.
export function MisakiShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const swipeStart = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const heartId = useRef(0);

  const total = photos.length;
  const go = (n: number) => setActive(((n % total) + total) % total);
  const photo = photos[active];
  const prev = photos[(active - 1 + total) % total];
  const next = photos[(active + 1) % total];

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced]);

  // Keep the next photo warm so the change never shows an empty frame.
  useEffect(() => {
    new Image().src = next.src;
  }, [next.src]);

  // Centre the active thumbnail without scrolling the page itself.
  useEffect(() => {
    const row = strip.current;
    const chip = row?.children[active] as HTMLElement | undefined;
    if (!row || !chip) return;
    row.scrollTo({ left: chip.offsetLeft - row.clientWidth / 2 + chip.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
  }, [active, reduced]);

  const like = () => {
    const id = ++heartId.current;
    setHearts((list) => [...list, id]);
    window.setTimeout(() => setHearts((list) => list.filter((item) => item !== id)), 1600);
  };

  const label = String(active + 1).padStart(2, '0');

  return <div className={`ms-show${paused ? ' is-paused' : ''}`} role="region" aria-roledescription="カルーセル" aria-label="海咲の改変ギャラリー" tabIndex={0}
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    onKeyDown={(event) => { if (event.key === 'ArrowLeft') go(active - 1); if (event.key === 'ArrowRight') go(active + 1); }}>
    <div className="ms-stage"
      onPointerDown={(event) => { if (event.button === 0) { swipeStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); } }}
      onPointerUp={(event) => { if (swipeStart.current !== null && Math.abs(event.clientX - swipeStart.current) > 50) go(active + (event.clientX < swipeStart.current ? 1 : -1)); swipeStart.current = null; }}
      onPointerCancel={() => { swipeStart.current = null; }}>
      <div className="ms-bg" key={`bg-${photo.src}`} style={{ backgroundImage: `url(${photo.src})` }} aria-hidden="true" />
      <div className="ms-sparkles" aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((n) => <i key={n} style={{ '--n': n } as React.CSSProperties}>✦</i>)}</div>

      <button type="button" className="ms-ghost is-prev" onClick={() => go(active - 1)} aria-label={`前の写真（${prev.name}）`}><img src={prev.thumb} alt="" /></button>
      <button type="button" className="ms-ghost is-next" onClick={() => go(active + 1)} aria-label={`次の写真（${next.name}）`}><img src={next.thumb} alt="" /></button>

      <figure className="ms-frame" key={photo.src} style={{ '--tilt': active % 2 ? '1.2deg' : '-1.2deg' } as React.CSSProperties}>
        <img src={photo.src} alt={`${photo.name}の海咲アバター改変例`} draggable={false} />
        <figcaption><em aria-hidden="true">by</em> {photo.name}</figcaption>
      </figure>

      <span className="ms-count" aria-live="polite">{label}<small> / {String(total).padStart(2, '0')}</small></span>
      <button type="button" className="ms-like" onClick={like} aria-label="ハートを送る">
        <span aria-hidden="true">♥</span> すき
        {hearts.map((id) => <i className="ms-heart" key={id} style={{ '--x': `${((id * 37) % 90) - 45}px`, '--r': `${((id * 53) % 50) - 25}deg` } as React.CSSProperties} aria-hidden="true">♥</i>)}
      </button>
      {!reduced && <i className="ms-progress" key={active} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} aria-hidden="true" />}
    </div>

    <div className="ms-controls">
      <button type="button" onClick={() => go(active - 1)} aria-label="前の改変写真">←</button>
      <button type="button" onClick={() => go(active + 1)} aria-label="次の改変写真">→</button>
    </div>

    <div className="ms-chips" ref={strip} aria-label="改変写真を選ぶ">
      {photos.map((p, i) => <button type="button" key={p.src} aria-label={`${p.name}の改変写真 ${i + 1}`} aria-pressed={active === i} onClick={() => go(i)}><img src={p.thumb} alt="" loading="lazy" /></button>)}
    </div>
  </div>;
}
