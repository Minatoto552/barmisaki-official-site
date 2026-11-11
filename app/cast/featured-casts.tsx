'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { FittedName, ImageOrPlaceholder } from '@/components/site-elements';
import type { Cast } from '../data';
import { AUTOPLAY_DELAY, INTERACTION_DELAY, repeatCount, slidePosition } from './featured-carousel';

export function FeaturedCasts({ casts, onProfile, suspended, home = false }: { casts: Cast[]; onProfile: (cast: Cast) => void; suspended: boolean; home?: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resumeAt, setResumeAt] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [profileFocused, setProfileFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const section = useRef<HTMLElement>(null);
  const lastWheel = useRef(0);
  const members = useMemo(() => casts.slice(0, 9), [casts]);
  const slides = useMemo(() => Array.from({ length: repeatCount(members.length) }, () => members).flat(), [members]);
  const current = members.length ? active % members.length : 0;
  const playing = !paused && !dragging && !profileFocused && !suspended && !hidden && inView && !reduced && members.length > 1;
  const interact = useCallback(() => setResumeAt(Date.now() + INTERACTION_DELAY), []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(motion.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const select = () => setActive(api.selectedScrollSnap());
    const startDrag = () => { setDragging(true); interact(); };
    const endDrag = () => { setDragging(false); interact(); };
    select();
    api.on('select', select).on('reInit', select).on('pointerDown', startDrag).on('pointerUp', endDrag);
    return () => { api.off('select', select).off('reInit', select).off('pointerDown', startDrag).off('pointerUp', endDrag); };
  }, [api, interact]);

  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setTimeout(() => api.scrollNext(), Math.max(AUTOPLAY_DELAY, resumeAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [api, playing, active, resumeAt]);

  return <section ref={section} className={`cast-featured ${inView ? 'feature-in-view' : ''}`} aria-labelledby="cast-featured-title">
    <div className="cast-featured-heading"><div><p className="cast-kicker">{home ? 'MONTHLY SELECTION' : 'IN THE SPOTLIGHT'}</p><h2 id="cast-featured-title" className="display">{home ? <>Pick Up <em>Cast</em></> : 'Pick up cast.'}</h2></div><div className="cast-featured-aside"><p>今月のピックアップ</p><a href={home ? '/cast' : '#cast-directory'}>{home ? 'ALL CAST' : 'すべてのキャスト'} <ArrowUpRight size={15} /></a></div></div>
    {members.length > 0 && <>
    <Carousel opts={{ align: 'center', containScroll: false, loop: members.length > 1, duration: reduced ? 0 : 25 }} setApi={setApi} className="cast-featured-carousel" aria-label="ピックアップキャスト" onKeyDown={interact} onWheel={(event) => {
      // Only horizontal gestures operate the carousel; vertical page scrolling stays native.
      if (Math.abs(event.deltaX) < 15 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Date.now() - lastWheel.current < 700) return;
      lastWheel.current = Date.now();
      interact();
      if (event.deltaX > 0) api?.scrollNext(); else api?.scrollPrev();
    }}>
      <CarouselContent className="cast-featured-track">
        {slides.map((cast, index) => <CarouselItem key={`${cast.id}-${index}`} className="cast-featured-slide" aria-label={`${index % members.length + 1} / ${members.length}：${cast.name}`} aria-hidden={index !== active} data-active={index === active} data-position={slidePosition(index, active, slides.length)}>
          <article className="cast-featured-card">
            <div className="cast-featured-image"><ImageOrPlaceholder src={cast.images?.[0] || cast.image} alt={cast.name} focusFace loading={index === active ? 'eager' : 'lazy'} /></div>
            <div className="cast-featured-scrim" />
            <span className="cast-featured-number">{String(index % members.length + 1).padStart(2, '0')}</span><span className="cast-featured-badge">PICK UP</span>
            {index !== active && <button className="cast-featured-select" type="button" tabIndex={-1} aria-label={`${cast.name}を中央に表示`} onClick={() => { interact(); api?.scrollTo(index); }} />}
            <div className="cast-featured-copy"><p>{cast.generation} <span>／ {cast.role}</span></p><h3 className="display"><FittedName name={cast.name} /></h3><div className="cast-featured-details">{cast.message && <p className="cast-featured-message">{cast.message}</p>}<button type="button" tabIndex={index === active ? 0 : -1} onFocus={() => setProfileFocused(true)} onBlur={() => { setProfileFocused(false); interact(); }} onClick={() => { interact(); onProfile(cast); }} aria-label={`${cast.name}のプロフィールを見る`}>VIEW PROFILE <ArrowUpRight size={16} /></button></div></div>
          </article>
        </CarouselItem>)}
      </CarouselContent>
      <div className="cast-featured-controls">
        <button type="button" aria-label="前のキャスト" disabled={members.length < 2} onClick={() => { interact(); api?.scrollPrev(); }}><ArrowLeft size={18} /></button>
        <span className="cast-featured-current">{String(current + 1).padStart(2, '0')}</span>
        <progress className="cast-featured-progress" aria-label="ピックアップの表示位置" max={members.length} value={current + 1} />
        <span>{String(members.length).padStart(2, '0')}</span>
        <button type="button" aria-label="次のキャスト" disabled={members.length < 2} onClick={() => { interact(); api?.scrollNext(); }}><ArrowRight size={18} /></button>
        {!reduced && members.length > 1 && <button type="button" data-playback aria-label={paused ? '自動切り替えを再開' : '自動切り替えを停止'} aria-pressed={!paused} onClick={() => { setResumeAt(0); setPaused((value) => !value); }}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
      </div>
    </Carousel></>}
  </section>;
}
