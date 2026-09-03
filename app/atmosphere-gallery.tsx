'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { gallery } from './data';
import { repeatCount, slidePosition } from './cast/featured-carousel';
import './atmosphere.css';

type Space = { id: string; image: string; alt: string };
const number = (value: number) => String(value).padStart(2, '0');

export function AtmosphereGallery({ items = gallery }: { items?: Space[] }) {
  const [viewport, api] = useEmblaCarousel({ loop: items.length > 1, align: 'center', duration: 28 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const section = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const resumeAt = useRef(0);
  const dragging = useRef(false);
  const visible = useRef(false);
  const slides = useMemo(() => Array.from({ length: repeatCount(items.length) }, () => items).flat(), [items]);
  const current = items.length ? active % items.length : 0;
  const interact = () => { resumeAt.current = Date.now() + 8000; };

  useEffect(() => {
    if (!api) return;
    const select = () => setActive(api.selectedScrollSnap());
    const down = () => { dragging.current = true; interact(); };
    const up = () => { dragging.current = false; interact(); };
    api.on('select', select).on('reInit', select).on('pointerDown', down).on('pointerUp', up);
    return () => { api.off('select', select).off('reInit', select).off('pointerDown', down).off('pointerUp', up); };
  }, [api]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) section.current?.classList.add('space-revealed');
    }, { threshold: .15 });
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api || paused || expanded !== null || items.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      if (visible.current && !document.hidden && !dragging.current && Date.now() >= resumeAt.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) api.scrollNext();
      else timer = setTimeout(advance, 250);
    };
    timer = setTimeout(advance, 5000);
    return () => clearTimeout(timer);
  }, [api, active, paused, expanded, items.length]);

  useEffect(() => {
    if (expanded === null) return;
    dialog.current?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = before; };
  }, [expanded]);

  if (!items.length) return null;
  const move = (direction: number) => { interact(); if (direction < 0) api?.scrollPrev(); else api?.scrollNext(); };
  const close = () => { dialog.current?.close(); setExpanded(null); interact(); };
  const jump = (index: number) => {
    interact();
    const target = slides.reduce((best, _, i) => i % items.length === index && Math.abs(i - active) < Math.abs(best - active) ? i : best, index);
    api?.scrollTo(target);
  };
  return <section ref={section} className="space-gallery" aria-labelledby="space-title">
    <span className="space-ghost" aria-hidden="true">ATMOSPHERE</span>
    <header className="space-heading"><div><p className="space-kicker">02 / THE WORLD OF BAR MISAKI</p><h2 id="space-title">店内の<span>雰囲気</span></h2></div><p className="space-intro">光に誘われ、夜の奥へ。<br />あなたの時間が始まる場所。</p></header>
    <div className="space-carousel" role="group" tabIndex={0} aria-roledescription="カルーセル" aria-label="店内写真" onKeyDown={(e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); move(e.key === 'ArrowLeft' ? -1 : 1); } }} onFocusCapture={interact}>
      <div ref={viewport} className="space-viewport"><div className="space-track">
        {slides.map((item, i) => <div key={`${i}-${item.id}`} className="space-slide" data-position={slidePosition(i, active, slides.length)} aria-hidden={i !== active}>
          <button className="space-photo" tabIndex={i === active ? 0 : -1} aria-label={`${item.alt}を拡大表示`} onClick={() => { interact(); if (i === active) setExpanded(current); else api?.scrollTo(i); }}>
            <Image src={item.image} alt={item.alt} fill unoptimized sizes="(max-width: 640px) 86vw, 58vw" draggable={false} />
            <span className="space-shade" /><span className="space-number">{number(i % items.length + 1)}<small> / {number(items.length)}</small></span>
            <span className="space-label"><small>{item.id.replaceAll('-', ' ').toUpperCase()}</small><strong>{item.alt}</strong><span>EXPLORE THE SPACE <ArrowUpRight size={15} /></span></span>
          </button>
        </div>)}
      </div></div>
      <div className="space-bottom"><div className="space-navigation">
        <div className="space-mobile-caption"><small>{number(current + 1)} / {number(items.length)}</small><h3>{items[current].alt}</h3><p>BarMisakiの夜を、ここから。</p></div>
        <div className="space-controls"><span>{number(current + 1)}</span><div className="space-progress" role="progressbar" aria-label="現在の写真" aria-valuemin={1} aria-valuemax={items.length} aria-valuenow={current + 1}><i style={{ width: `${(current + 1) / items.length * 100}%` }} /></div><span className="space-total">{number(items.length)}</span><button aria-label="前の写真" onClick={() => move(-1)} disabled={items.length < 2}><ChevronLeft size={18} /></button><button aria-label="次の写真" onClick={() => move(1)} disabled={items.length < 2}><ChevronRight size={18} /></button><button aria-label={paused ? '自動再生を再開' : '自動再生を停止'} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
        <div className="space-thumbnails">{items.map((item, i) => <button key={item.id} onClick={() => jump(i)} aria-label={`${number(i + 1)} ${item.alt}`} aria-current={i === current ? 'true' : undefined}><Image src={item.image} alt="" width={92} height={54} unoptimized /><span>{number(i + 1)}</span></button>)}</div>
      </div><Link className="space-join" href="/how-to-join"><small>JOIN THE NIGHT</small><span>参加方法</span><ArrowUpRight size={20} /></Link></div>
    </div>
    {expanded !== null && <dialog ref={dialog} className="space-dialog" aria-label="店内写真の拡大表示" onCancel={close} onClose={() => setExpanded(null)} onKeyDown={(e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setExpanded((expanded + (e.key === 'ArrowLeft' ? -1 : 1) + items.length) % items.length); } }}><div className="space-dialog-top"><span>{number(expanded + 1)} / {number(items.length)}</span><button autoFocus onClick={close}>CLOSE <X size={18} /></button></div><div className="space-dialog-photo"><Image src={items[expanded].image} alt={items[expanded].alt} fill unoptimized sizes="95vw" /></div><div className="space-dialog-bottom"><button aria-label="前の写真" onClick={() => setExpanded((expanded - 1 + items.length) % items.length)}><ChevronLeft /></button><h3>{items[expanded].alt}</h3><button aria-label="次の写真" onClick={() => setExpanded((expanded + 1) % items.length)}><ChevronRight /></button></div></dialog>}
  </section>;
}
