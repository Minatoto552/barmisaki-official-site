'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { Cast } from '../data';
import { loadManagedCasts, localCastImages } from '../managed-data-client';

type Photo = { src: string; name: string };
const localPhotos: Photo[] = Object.entries(localCastImages).flatMap(
  ([name, images]) =>
    (Array.isArray(images) ? images : [images]).map((src) => ({ src, name })),
);
const localSources = new Set(localPhotos.map((photo) => photo.src));
function imageUrl(src: string, thumbnail = false) {
  if (!localSources.has(src)) return src;
  return `/misaki-gallery/${src
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '')}${thumbnail ? '-thumb' : ''}.webp`;
}
const DURATION = 9000;

export function MisakiGallery() {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;
    void loadManagedCasts().then((data) => {
      if (mounted && data) setCasts(data);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const photos = useMemo(() => {
    const known = new Set<string>();
    return [
      ...localPhotos,
      ...casts.flatMap((cast) =>
        (cast.images?.length ? cast.images : [cast.image])
          .filter(Boolean)
          .map((src) => ({ src, name: cast.name })),
      ),
    ].filter((photo) => {
      if (known.has(photo.src)) return false;
      known.add(photo.src);
      return true;
    });
  }, [casts]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPaused(motion.matches);
    const change = () => setPaused(motion.matches);
    motion.addEventListener('change', change);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', change);
    };
  }, []);

  useEffect(() => {
    if (paused || !visible || photos.length < 2) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      if (!document.hidden) {
        elapsed.current += delta;
        setProgress(Math.min(elapsed.current / DURATION, 1));
        if (elapsed.current >= DURATION) {
          elapsed.current = 0;
          setProgress(0);
          setActive((index) => (index + 1) % photos.length);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, visible, photos.length, cycle]);

  useEffect(() => {
    const container = strip.current;
    const thumbnail = container?.children[active] as HTMLElement | undefined;
    if (container && thumbnail)
      container.scrollTo({
        left:
          thumbnail.offsetLeft -
          container.offsetLeft -
          (container.clientWidth - thumbnail.clientWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  }, [active]);

  function select(index: number) {
    setActive((index + photos.length) % photos.length);
    elapsed.current = 0;
    setProgress(0);
    setCycle((value) => value + 1);
  }
  const current = photos[active];
  return (
    <div
      className="misaki-gallery"
      ref={root}
      role="region"
      aria-roledescription="カルーセル"
      aria-label="海咲の改変ギャラリー"
    >
      <div
        className="misaki-gallery-stage"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          pointerStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (pointerStart.current !== null) {
            const delta = event.clientX - pointerStart.current;
            if (Math.abs(delta) > 50) select(active + (delta < 0 ? 1 : -1));
          }
          pointerStart.current = null;
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={`misaki-gallery-slide ${index === active ? 'is-active' : index === (active + 1) % photos.length ? 'is-next' : ''}`}
            aria-hidden={index !== active}
          >
            {Math.min(
              Math.abs(index - active),
              photos.length - Math.abs(index - active),
            ) <= 1 && (
              <>
                <img
                  className="misaki-gallery-backdrop"
                  src={imageUrl(photo.src, true)}
                  alt=""
                  draggable={false}
                />
                <img
                  className="misaki-gallery-portrait"
                  src={imageUrl(photo.src)}
                  alt={`${photo.name}の海咲アバター改変`}
                  draggable={false}
                />
              </>
            )}
          </div>
        ))}
        <div className="misaki-gallery-label">
          <p className="misaki-eyebrow">MISAKI / CAST COLLECTION</p>
          <p className="display">
            A style
            <br />
            <em>of their own.</em>
          </p>
        </div>
        <div className="misaki-gallery-card">
          <span className="misaki-gallery-count">
            <b>{String(active + 1).padStart(2, '0')}</b> /{' '}
            {String(photos.length).padStart(2, '0')}
          </span>
          <h3>{current.name}</h3>
          <p>BarMisaki / 海咲 改変フォト</p>
        </div>
      </div>
      <div className="misaki-gallery-controls">
        <button
          type="button"
          onClick={() => select(active - 1)}
          aria-label="前の写真"
        >
          <ChevronLeft size={20} />
        </button>
        <span>{current.name}</span>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={
            paused ? 'スライドの自動再生を開始' : 'スライドの自動再生を停止'
          }
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button
          type="button"
          onClick={() => select(active + 1)}
          aria-label="次の写真"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="misaki-gallery-thumbnails"
        ref={strip}
        aria-label="写真を選ぶ"
      >
        {photos.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            onClick={() => select(index)}
            aria-label={`${photo.name}の写真 ${index + 1}`}
            aria-pressed={active === index}
          >
            <img
              src={imageUrl(photo.src, true)}
              alt=""
              loading="lazy"
              draggable={false}
            />
            <span
              className="misaki-thumbnail-progress"
              style={{
                transform: `scaleX(${active === index ? progress : index < active ? 1 : 0})`,
              }}
            />
          </button>
        ))}
      </div>
      <div className="misaki-gallery-timeline" aria-hidden="true">
        <span
          style={{
            transform: `scaleX(${(active + progress) / photos.length})`,
          }}
        />
      </div>
    </div>
  );
}
