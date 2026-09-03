'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock3, DoorOpen, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gallery, type Cast } from './data';
import { loadManagedCasts } from './managed-data-client';
import { FittedName, ImageOrPlaceholder, Modal } from '@/components/site-elements';
import { CastProfile } from './cast/cast-portrait';
import './pickup.css';

type NewsItem = { id: string; title: string; date: string; thumbnail: string; content: string };

export function HomeClient({ casts: initialCasts, news }: { casts: Cast[]; news: NewsItem[] }) {
  const [casts, setCasts] = useState(initialCasts);
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);
  const [profileCast, setProfileCast] = useState<Cast | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<(typeof gallery)[number] | null>(null);
  const [isAtmosphereDragging, setIsAtmosphereDragging] = useState(false);
  const [pickupProgress, setPickupProgress] = useState(0);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const atmosphereBeltRef = useRef<HTMLDivElement>(null);
  const atmosphereSetWidth = useRef(0);
  const atmosphereOffset = useRef(0);
  const atmosphereDrag = useRef({ active: false, startX: 0, startOffset: 0, moved: false });
  const pickupRef = useRef<HTMLDivElement>(null);
  const pickups = useMemo(() => casts.filter((cast) => cast.isPickup).sort((a, b) => (a.pickupOrder ?? 99) - (b.pickupOrder ?? 99)), [casts]);

  useEffect(() => { void loadManagedCasts().then((data) => data && setCasts(data)); }, []);
  useEffect(() => {
    let frame = 0;
    let last = 0;
    const measure = () => {
      const set = atmosphereBeltRef.current?.querySelector<HTMLElement>('.luxury-atmosphere-set');
      atmosphereSetWidth.current = set?.offsetWidth ?? 0;
    };
    const applyOffset = (offset: number) => {
      const width = atmosphereSetWidth.current;
      if (!width || !atmosphereBeltRef.current) return;
      atmosphereOffset.current = ((offset % width) + width) % width;
      atmosphereBeltRef.current.style.transform = `translate3d(${-atmosphereOffset.current}px,0,0)`;
    };
    const tick = (time: number) => {
      if (!last) last = time;
      const delta = time - last;
      last = time;
      if (!atmosphereDrag.current.active) applyOffset(atmosphereOffset.current + delta * 0.025);
      frame = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener('resize', measure);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, []);
  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .8, behavior: 'smooth' });
  const startAtmosphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!atmosphereRef.current) return;
    atmosphereDrag.current = { active: true, startX: event.clientX, startOffset: atmosphereOffset.current, moved: false };
    setIsAtmosphereDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveAtmosphereDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = atmosphereDrag.current;
    const width = atmosphereSetWidth.current;
    if (!width || !drag.active || !atmosphereBeltRef.current) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 5) drag.moved = true;
    atmosphereOffset.current = ((drag.startOffset - delta) % width + width) % width;
    atmosphereBeltRef.current.style.transform = `translate3d(${-atmosphereOffset.current}px,0,0)`;
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
      <div className="luxury-hero-frame">
        <video className="absolute inset-0 h-full w-full bg-[#080710] object-cover" autoPlay loop muted playsInline preload="auto"><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" /></video>
        <div className="luxury-hero-shade" /><div className="luxury-hero-lines" aria-hidden="true" />
        <div className="luxury-hero-copy"><p className="luxury-kicker">VRCHAT ORIGINAL BAR EVENT</p><h1 className="display luxury-hero-title"><span>Bar</span><em>Misaki</em></h1><p className="luxury-hero-lead">キャストもスタッフも、みんな海咲ちゃん。<br className="hidden sm:block" />月に二度だけ扉が開く、上品で少し不思議な夜。</p></div>
        <Link href="/how-to-join" className="luxury-seal"><span className="luxury-seal-ring" /><svg className="luxury-seal-orbit" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="join-seal-orbit" d="M60 60 m -47 0 a 47 47 0 1 1 94 0 a 47 47 0 1 1 -94 0" /></defs><text><textPath href="#join-seal-orbit">JOIN BAR MISAKI · CHECK THE ENTRY GUIDE · </textPath></text></svg><span className="luxury-seal-core">参加<br />方法</span></Link>
        <a href="#about" className="luxury-scroll" aria-label="次のセクションへ"><span>SCROLL</span><ArrowDown size={15} /></a>
      </div>
    </section>

    <section id="about" className="luxury-manifesto">
      <p className="luxury-ghost" aria-hidden="true">MISAKI</p><div className="luxury-section-index"><span>01</span> ABOUT</div>
      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="luxury-kicker">ABOUT BAR MISAKI</p><h2 className="display luxury-about-title"><span>海咲ちゃんが紡ぐ</span><em>やさしい夜</em></h2></div><div className="lg:pb-2"><p className="max-w-xl text-base leading-9 text-white/62 sm:text-lg">落ち着いた距離感で会話を楽しめる、海咲ちゃんだけの特別なBar。静かな高揚感と、ここでしか生まれない出会いを。</p><Link href="/how-to-join" className="luxury-text-link mt-8">HOW TO JOIN <ArrowUpRight size={18} /></Link></div></div>
      <div className="relative z-10 mx-auto mt-20 grid max-w-[1240px] grid-cols-2 border-l border-t border-white/12 md:grid-cols-4">
        {[[CalendarDays, '月2回', '不定期開催'], [Clock3, '22:50 – 24:00', '22:40 当選者入場'], [Users, '1 : 2', 'キャスト1名／お客様2名'], [DoorOpen, '2 ROTATIONS', '二部入替制']].map(([Icon, value, note], index) => <div key={String(value)} className="luxury-stat"><span className="luxury-stat-number">0{index + 1}</span><Icon size={24} strokeWidth={1.35} /><p className="display mt-10 text-2xl sm:text-3xl">{String(value)}</p><p className="mt-2 text-[11px] tracking-[.08em] text-white/42 sm:text-xs">{String(note)}</p></div>)}
      </div>
    </section>

    <section className="luxury-section luxury-atmosphere"><div className="luxury-section-index"><span>02</span> ATMOSPHERE</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">THE WORLD OF BAR MISAKI</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">店内の<em className="text-[#c9a1ff]">雰囲気</em></h2></div></div>
      <div className="luxury-full-slider luxury-atmosphere-slider mt-14"><div ref={atmosphereRef} onPointerDown={startAtmosphereDrag} onPointerMove={moveAtmosphereDrag} onPointerUp={endAtmosphereDrag} onPointerCancel={endAtmosphereDrag} onPointerLeave={(event) => { if (atmosphereDrag.current.active) endAtmosphereDrag(event); }} className={`luxury-atmosphere-track pb-4 ${isAtmosphereDragging ? 'is-dragging' : ''}`}><div ref={atmosphereBeltRef} className="luxury-atmosphere-belt">{[0, 1].map((set) => <div key={set} className="luxury-atmosphere-set">{gallery.map((item, index) => <button key={`${set}-${item.id}`} onClick={() => openGalleryItem(item)} className="luxury-gallery-card group"><ImageOrPlaceholder src={item.image} alt={item.alt} /><span className="luxury-gallery-gradient" /><span className="luxury-gallery-index">{String(index + 1).padStart(2, '0')}</span><span className="luxury-gallery-label">{item.alt}<ArrowUpRight size={18} /></span></button>)}</div>)}</div></div></div>
    </div></section>

    <section className="luxury-section luxury-pickup"><div className="luxury-section-index"><span>03</span> CAST</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">MONTHLY SELECTION</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">Pick Up <em className="text-[#c9a1ff]">Cast</em></h2></div><Link href="/cast" className="luxury-outline-link">ALL CAST <ArrowRight size={17} /></Link></div>
      <div className="luxury-full-slider mt-14"><div ref={pickupRef} onScroll={updatePickupProgress} className="no-scrollbar luxury-slider-track luxury-cast-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">{pickups.map((cast, index) => <button key={cast.id} onClick={() => setSelectedCast(cast)} className="luxury-cast-slide group"><span className="luxury-cast-image"><ImageOrPlaceholder src={cast.images?.length ? cast.images : cast.image} alt={cast.name} focusFace className="transition duration-1000 group-hover:scale-[1.035]" /><span className="luxury-cast-count">{String(index + 1).padStart(2, '0')}</span><span className="luxury-cast-pick"><Star size={10} fill="currentColor" /> PICK UP</span></span><span className="luxury-cast-copy"><small>{cast.generation} {cast.group} / {cast.role}</small><strong className="display"><FittedName name={cast.name} /></strong></span></button>)}</div></div>{!pickups.length && <div className="mt-14 border-y border-white/10 py-16 text-center text-sm tracking-[.18em] text-white/35">NEXT SELECTION COMING SOON</div>}
      <div className="luxury-slider-controls"><div className="luxury-progress" aria-hidden="true"><span style={{ width: `${Math.max(12, 12 + pickupProgress * 88)}%` }} /></div><button onClick={() => scroll(pickupRef, -1)} className="luxury-arrow-pill" aria-label="前のキャスト"><ChevronLeft size={18} /></button><button onClick={() => scroll(pickupRef, 1)} className="luxury-arrow-pill" aria-label="次のキャスト"><ChevronRight size={18} /></button></div>
    </div></section>

    <section className="luxury-section luxury-news"><div className="luxury-section-index"><span>04</span> NEWS</div><div className="mx-auto max-w-[1240px]">
      <div className="luxury-heading-row"><div><p className="luxury-kicker">LATEST INFORMATION</p><h2 className="display mt-3 text-[clamp(3.2rem,7vw,7rem)] leading-none">News</h2></div><Link href="/news" className="luxury-outline-link">VIEW MORE <ArrowRight size={17} /></Link></div>
      <div className="mt-14 border-t border-white/12">{news.slice(0, 4).map((item, index) => <Link key={item.id} href={`/news/${item.id}`} className="luxury-news-row"><span className="text-xs text-[#d7b85b]">0{index + 1}</span><time>{item.date}</time><h3>{item.title}</h3><ArrowUpRight size={20} /></Link>)}{!news.length && <div className="py-16 text-center text-sm tracking-[.18em] text-white/35">LATEST NEWS COMING SOON</div>}</div>
    </div></section>

    {selectedCast && <Modal onClose={() => setSelectedCast(null)}><div className="grid overflow-hidden md:grid-cols-[.9fr_1.1fr]"><div className="min-h-[320px]"><ImageOrPlaceholder src={selectedCast.images?.length ? selectedCast.images : selectedCast.image} alt={selectedCast.name} focusFace /></div><div className="min-w-0 p-7 sm:p-10"><p className="text-xs tracking-[.2em] text-[#d7b85b]">{selectedCast.generation} {selectedCast.group} / {selectedCast.role}</p><h2 className="display mt-4 text-[clamp(1.75rem,4vw,2.6rem)]"><FittedName name={selectedCast.name} /></h2><p className="mt-8 leading-7 text-white/68">{selectedCast.message}</p><button type="button" onClick={() => { setProfileCast(selectedCast); setSelectedCast(null); }} className="primary-button mt-8 inline-flex">プロフィールを見る</button></div></div></Modal>}
    {profileCast && <CastProfile cast={profileCast} onClose={() => setProfileCast(null)} backLabel="ピックアップに戻る" />}
    {selectedGallery && <Modal onClose={() => setSelectedGallery(null)}><div className="aspect-[16/10] overflow-hidden"><ImageOrPlaceholder src={selectedGallery.image} alt={selectedGallery.alt} /></div></Modal>}
  </main>;
}
