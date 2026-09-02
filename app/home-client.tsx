'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, DoorOpen, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gallery, type Cast } from './data';
import { loadManagedCasts } from './managed-data-client';
import { ImageOrPlaceholder, Modal } from '@/components/site-elements';

type NewsItem = { id: string; title: string; date: string; thumbnail: string; content: string };

export function HomeClient({ casts: initialCasts, news }: { casts: Cast[]; news: NewsItem[] }) {
  const [casts, setCasts] = useState(initialCasts);
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<(typeof gallery)[number] | null>(null);
  const [isAtmosphereDragging, setIsAtmosphereDragging] = useState(false);
  const [pickupProgress, setPickupProgress] = useState(0);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const atmosphereDrag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const pickupRef = useRef<HTMLDivElement>(null);
  const pickups = useMemo(() => casts.filter((cast) => cast.isPickup).sort((a, b) => (a.pickupOrder ?? 99) - (b.pickupOrder ?? 99)), [casts]);

  useEffect(() => { void loadManagedCasts().then((data) => data && setCasts(data)); }, []);
  useEffect(() => {
    let frame = 0;
    let previous = 0;
    const move = (time: number) => {
      const el = atmosphereRef.current;
      if (el) {
        const first = el.children[0] as HTMLElement | undefined;
        const duplicate = el.children[gallery.length] as HTMLElement | undefined;
        const cycleWidth = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : el.scrollWidth / 2;
        if (!atmosphereDrag.current.active && previous && cycleWidth > 1) el.scrollLeft += (time - previous) * .075;
        if (cycleWidth > 1) {
          if (el.scrollLeft >= cycleWidth) el.scrollLeft -= cycleWidth;
          if (el.scrollLeft < 0) el.scrollLeft += cycleWidth;
        }
      }
      previous = time;
      frame = window.requestAnimationFrame(move);
    };
    frame = window.requestAnimationFrame(move);
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .8, behavior: 'smooth' });
  const startAtmosphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = atmosphereRef.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const duplicate = el.children[gallery.length] as HTMLElement | undefined;
    const cycleWidth = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : el.scrollWidth / 2;
    if (cycleWidth > 1 && el.scrollLeft < 4) el.scrollLeft += cycleWidth;
    atmosphereDrag.current = { active: true, startX: event.clientX, scrollLeft: el.scrollLeft, moved: false };
    setIsAtmosphereDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveAtmosphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = atmosphereRef.current;
    const drag = atmosphereDrag.current;
    if (!el || !drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 5) drag.moved = true;
    el.scrollLeft = drag.scrollLeft - delta;
  };
  const endAtmosphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    atmosphereDrag.current.active = false;
    setIsAtmosphereDragging(false);
  };
  const openGalleryItem = (item: (typeof gallery)[number]) => {
    if (atmosphereDrag.current.moved) {
      atmosphereDrag.current.moved = false;
      return;
    }
    setSelectedGallery(item);
  };
  const updatePickupProgress = () => {
    const el = pickupRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPickupProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  return <main className="home-luxury overflow-hidden bg-[#07060d] text-white">
    <section className="luxury-hero">
      <div className="luxury-side luxury-side-left" aria-hidden="true"># BAR MISAKI　# VRCHAT　# ONE AVATAR</div>
      <div className="luxury-side luxury-side-right" aria-hidden="true">ELEGANT NIGHT　# CAST　# CONVERSATION</div>
      <div className="luxury-hero-frame">
        <video className="absolute inset-0 h-full w-full bg-[#080710] object-cover" autoPlay loop muted playsInline preload="auto"><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" /></video>
        <div className="luxury-hero-shade" /><div className="luxury-hero-lines" aria-hidden="true" />
        <div className="luxury-hero-copy"><p className="luxury-kicker">VRCHAT ORIGINAL BAR EVENT</p><h1 className="display luxury-hero-title"><span>Bar</span><em>Misaki</em></h1><p className="luxury-hero-lead">キャストもスタッフも、みんな海咲ちゃん。<br className="hidden sm:block" />月に二度だけ扉が開く、上品で少し不思議な夜。</p></div>
        <div className="luxury-hero-number" aria-hidden="true"><span>EST.</span>2025</div>
        <Link href="/how-to-join" className="luxury-seal"><span className="luxury-seal-ring" /><span className="luxury-seal-core">参加<br />方法</span></Link>
        <a href="#about" className="luxury-scroll" aria-label="次のセクションへ"><span>SCROLL</span><ArrowDown size={15} /></a>
      </div>
    </section>

    <section id="about" className="luxury-manifesto">
      <p className="luxury-ghost" aria-hidden="true">MISAKI</p><div className="luxury-section-index"><span>01</span> ABOUT</div>
      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="luxury-kicker">ABOUT BAR MISAKI</p><h2 className="display mt-5 text-[clamp(3rem,6vw,6.5rem)] leading-[.95]">海咲ちゃんが<br />紡ぐ、<em className="text-[#c9a1ff]">やさしい夜</em></h2></div><div className="lg:pb-2"><p className="max-w-xl text-base leading-9 text-white/62 sm:text-lg">落ち着いた距離感で会話を楽しめる、海咲ちゃんだけの特別なBar。静かな高揚感と、ここでしか生まれない出会いを。</p><Link href="/how-to-join" className="luxury-text-link mt-8">HOW TO JOIN <ArrowUpRight size={18} /></Link></div></div>
      <div className="relative z-10 mx-auto mt-20 grid max-w-[1240px] grid-cols-2 border-l border-t border-white/12 md:grid-cols-4">
        {[[CalendarDays, '月2回', '不定期開催'], [Clock3, '22:50 – 24:00', '22:40 当選者入場'], [Users, '1 : 2', 'キャスト1名／お客様2名'], [DoorOpen, '2 ROTATIONS', '二部入替制']].map(([Icon, value, note], index) => <div key={String(value)} className="luxury-stat"><span className="luxury-stat-number">0{index + 1}</span><Icon size={24} strokeWidth={1.35} /><p className="display mt-10 text-2xl sm:text-3xl">{String(value)}</p><p className="mt-2 text-[11px] tracking-[.08em] text-white/42 sm:text-xs">{String(note)}</p></div>)}
      </div>
    </section>

    <section className="luxury-section luxury-atmosphere"><div className="luxury-section-index"><span>02</span> ATMOSPHERE</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">THE WORLD OF BAR MISAKI</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">店内の<em className="text-[#c9a1ff]">雰囲気</em></h2></div><p className="hidden max-w-xs text-sm leading-7 text-white/45 lg:block">光、音、会話。そのすべてがゆっくりと混ざり合う、BarMisakiの夜。</p></div>
      <div className="luxury-full-slider luxury-atmosphere-slider mt-14"><div ref={atmosphereRef} onPointerDown={startAtmosphereDrag} onPointerMove={moveAtmosphereDrag} onPointerUp={endAtmosphereDrag} onPointerCancel={endAtmosphereDrag} onPointerLeave={(event) => { if (atmosphereDrag.current.active) endAtmosphereDrag(event); }} className={`no-scrollbar luxury-slider-track luxury-atmosphere-track flex gap-5 overflow-x-auto pb-4 ${isAtmosphereDragging ? 'is-dragging' : ''}`}>{[...gallery, ...gallery].map((item, index) => <button key={`${item.id}-${index}`} onClick={() => openGalleryItem(item)} className="luxury-gallery-card group"><ImageOrPlaceholder src={item.image} alt={item.alt} /><span className="luxury-gallery-gradient" /><span className="luxury-gallery-index">{String((index % gallery.length) + 1).padStart(2, '0')}</span><span className="luxury-gallery-label">{item.alt}<ArrowUpRight size={18} /></span></button>)}</div></div>
    </div></section>

    <section className="luxury-section luxury-pickup"><div className="luxury-section-index"><span>03</span> CAST</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">MONTHLY SELECTION</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">Pick Up <em className="text-[#c9a1ff]">Cast</em></h2></div><Link href="/cast" className="luxury-outline-link">ALL CAST <ArrowRight size={17} /></Link></div>
      <div className="luxury-full-slider mt-14"><div ref={pickupRef} onScroll={updatePickupProgress} className="no-scrollbar luxury-slider-track luxury-cast-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">{pickups.map((cast, index) => <button key={cast.id} onClick={() => setSelectedCast(cast)} className="luxury-cast-slide group"><span className="luxury-cast-image"><ImageOrPlaceholder src={cast.images?.length ? cast.images : cast.image} alt={cast.name} focusFace className="transition duration-1000 group-hover:scale-[1.035]" /><span className="luxury-cast-count">{String(index + 1).padStart(2, '0')}</span><span className="luxury-cast-pick"><Star size={10} fill="currentColor" /> PICK UP</span></span><span className="luxury-cast-copy"><small>{cast.generation} {cast.group} / {cast.role}</small><strong className="display">{cast.name}</strong><span>VIEW PROFILE <ArrowUpRight size={15} /></span></span></button>)}</div></div>{!pickups.length && <div className="mt-14 border-y border-white/10 py-16 text-center text-sm tracking-[.18em] text-white/35">NEXT SELECTION COMING SOON</div>}
      <div className="luxury-slider-controls"><div className="luxury-progress" aria-hidden="true"><span style={{ width: `${Math.max(12, 12 + pickupProgress * 88)}%` }} /></div><button onClick={() => scroll(pickupRef, -1)} className="luxury-arrow-pill" aria-label="前のキャスト"><ChevronLeft size={18} /></button><button onClick={() => scroll(pickupRef, 1)} className="luxury-arrow-pill" aria-label="次のキャスト"><ChevronRight size={18} /></button></div>
    </div></section>

    <section className="luxury-section luxury-news"><div className="luxury-section-index"><span>04</span> NEWS</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">LATEST INFORMATION</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">News</h2></div><Link href="/news" className="luxury-outline-link">VIEW MORE <ArrowRight size={17} /></Link></div>
      <div className="mt-14 border-t border-white/12">{news.slice(0, 4).map((item, index) => <Link key={item.id} href={`/news/${item.id}`} className="luxury-news-row"><span className="text-xs text-[#d7b85b]">0{index + 1}</span><time>{item.date}</time><h3>{item.title}</h3><ArrowUpRight size={20} /></Link>)}{!news.length && <div className="py-16 text-center text-sm tracking-[.18em] text-white/35">LATEST NEWS COMING SOON</div>}</div>
    </div></section>

    <section className="luxury-finale"><div className="luxury-finale-glow" /><p className="luxury-kicker">WELCOME TO THE SPECIAL NIGHT</p><Star className="mx-auto mt-7 text-[#d7b85b]" /><h2 className="display mt-7 text-[clamp(3.3rem,8vw,8rem)] leading-none">今夜、<em className="text-[#c9a1ff]">BarMisaki</em>で。</h2><p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/55">参加方法を確認して、月に二度だけの特別な夜へ。</p><Link href="/how-to-join" className="luxury-seal luxury-seal-static mt-12"><span className="luxury-seal-ring" /><span className="luxury-seal-core">参加<br />方法</span></Link></section>

    {selectedCast && <Modal onClose={() => setSelectedCast(null)}><div className="grid overflow-hidden md:grid-cols-[.9fr_1.1fr]"><div className="min-h-[320px]"><ImageOrPlaceholder src={selectedCast.images?.length ? selectedCast.images : selectedCast.image} alt={selectedCast.name} /></div><div className="p-7 sm:p-10"><p className="text-xs tracking-[.2em] text-[#d7b85b]">{selectedCast.generation} {selectedCast.group} / {selectedCast.role}</p><h2 className="display mt-4 text-5xl">{selectedCast.name}</h2><p className="mt-8 leading-7 text-white/68">{selectedCast.message}</p><Link href="/cast" className="primary-button mt-8 inline-flex">プロフィールを見る</Link></div></div></Modal>}
    {selectedGallery && <Modal onClose={() => setSelectedGallery(null)}><div className="aspect-[16/10] overflow-hidden"><ImageOrPlaceholder src={selectedGallery.image} alt={selectedGallery.alt} /></div></Modal>}
  </main>;
}
