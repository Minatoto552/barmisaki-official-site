'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { FittedName, ImageOrPlaceholder } from '@/components/site-elements';
import type { Cast } from '../data';

export function FeaturedCasts({ casts, onProfile, suspended }: { casts: Cast[]; onProfile: (cast: Cast) => void; suspended: boolean }) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const section = useRef<HTMLElement>(null);
  const lastWheel = useRef(0);
  const playing = !paused && !hovered && !suspended && !hidden && inView && !reduced && casts.length > 1;

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
    const interact = () => setPaused(true);
    select();
    api.on('select', select).on('reInit', select).on('pointerDown', interact);
    return () => { api.off('select', select).off('reInit', select).off('pointerDown', interact); };
  }, [api]);

  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [api, playing, active]);

  return <section ref={section} className="cast-featured" aria-labelledby="cast-featured-title">
    <div className="cast-featured-heading"><div><p className="cast-kicker">IN THE SPOTLIGHT</p><h2 id="cast-featured-title" className="display">Pick up cast.</h2></div><div className="cast-featured-aside"><p>今月のピックアップ</p><a href="#cast-directory">すべてのキャスト <ArrowUpRight size={15} /></a></div></div>
    <Carousel opts={{ align: 'center', containScroll: false, duration: reduced ? 0 : 35 }} setApi={setApi} className="cast-featured-carousel" aria-label="ピックアップキャスト" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest('[data-playback]')) setPaused(true); }} onKeyDown={() => setPaused(true)} onWheel={(event) => {
      // Only horizontal gestures operate the carousel; vertical page scrolling stays native.
      if (Math.abs(event.deltaX) < 15 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Date.now() - lastWheel.current < 700) return;
      lastWheel.current = Date.now();
      setPaused(true);
      if (event.deltaX > 0) api?.scrollNext(); else api?.scrollPrev();
    }}>
      <CarouselContent className="cast-featured-track">
        {casts.map((cast, index) => <CarouselItem key={cast.id} className="cast-featured-slide" aria-label={`${index + 1} / ${casts.length}：${cast.name}`} data-active={index === active}>
          <article className="cast-featured-card">
            <div className="cast-featured-image"><ImageOrPlaceholder src={cast.images?.[0] || cast.image} alt={cast.name} focusFace loading={index === 0 ? 'eager' : 'lazy'} /></div>
            <div className="cast-featured-scrim" />
            <span className="cast-featured-number">{String(index + 1).padStart(2, '0')}</span><span className="cast-featured-badge">PICK UP</span>
            <div className="cast-featured-copy"><p>{cast.generation} <span>／ {cast.role}</span></p><h3 className="display"><FittedName name={cast.name} /></h3>{cast.message && <p className="cast-featured-message">{cast.message}</p>}<button type="button" onClick={() => { setPaused(true); onProfile(cast); }} aria-label={`${cast.name}のプロフィールを見る`}>VIEW PROFILE <ArrowUpRight size={16} /></button></div>
          </article>
        </CarouselItem>)}
      </CarouselContent>
      <div className="cast-featured-controls">
        <button type="button" aria-label="前のキャスト" disabled={active === 0} onClick={() => { setPaused(true); api?.scrollPrev(); }}><ArrowLeft size={18} /></button>
        <span className="cast-featured-current">{String(active + 1).padStart(2, '0')}</span>
        <progress className="cast-featured-progress" aria-label="ピックアップの表示位置" max={casts.length} value={active + 1} />
        <span>{String(casts.length).padStart(2, '0')}</span>
        <button type="button" aria-label="次のキャスト" disabled={active === casts.length - 1} onClick={() => { setPaused(true); api?.scrollNext(); }}><ArrowRight size={18} /></button>
        {!reduced && casts.length > 1 && <button type="button" data-playback aria-label={paused ? '自動切り替えを再開' : '自動切り替えを停止'} aria-pressed={!paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
      </div>
    </Carousel>
  </section>;
}
