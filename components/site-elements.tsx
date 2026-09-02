'use client';

import { ArrowRight, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Cast } from '@/app/data';

export function SectionTitle({ eyebrow, children, intro, compact = false }: { eyebrow: string; children: React.ReactNode; intro?: string; compact?: boolean }) {
  return <div className={`mx-auto mb-10 text-center sm:mb-14 ${compact ? 'max-w-[1180px]' : 'max-w-3xl'}`}><p className="mb-3 text-xs font-bold tracking-[.28em] text-[#d7b85b]">{eyebrow}</p><h2 className={`display text-4xl leading-tight sm:text-6xl ${compact ? 'whitespace-nowrap' : ''}`}>{children}</h2>{intro && <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{intro}</p>}</div>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return <section className="page-hero"><div className="ambient ambient-a" /><div className="relative mx-auto max-w-4xl text-center"><p className="mb-4 text-xs font-bold tracking-[.28em] text-[#d7b85b]">{eyebrow}</p><h1 className="display text-5xl leading-[1.02] sm:text-7xl">{title}</h1>{intro && <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{intro}</p>}</div></section>;
}

export function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`placeholder relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}><div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_50%_30%,#a372ff,transparent_52%)]" /><img src="/barmisaki-icon.png" alt="" className="relative w-24 rounded-full opacity-20 mix-blend-screen sm:w-32" /><span className="absolute bottom-5 left-5 text-xs font-semibold tracking-[.18em] text-white/48">{label}</span></div>;
}

export function ImageOrPlaceholder({ src, alt, className = '', focusFace = false }: { src: string | string[]; alt: string; className?: string; focusFace?: boolean }) {
  const images = Array.isArray(src) ? src.filter(Boolean) : src ? [src] : [];
  const position = focusFace ? 'object-[center_28%]' : alt === 'けろ__' ? 'object-[center_35%]' : alt === 'ReruCh1' ? 'object-[58%_35%]' : 'object-center';
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    if (images.length < 2) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % images.length), 15000);
    return () => window.clearInterval(timer);
  }, [images.join('|')]);
  return images.length ? <div className="relative h-full w-full overflow-hidden">{images.map((image, imageIndex) => <img key={image} src={image} alt={imageIndex === index ? alt : ''} aria-hidden={imageIndex === index ? undefined : true} className={`absolute inset-0 h-full w-full object-cover ${position} transition-opacity duration-[1800ms] ease-in-out ${imageIndex === index ? 'opacity-100' : 'opacity-0'} ${className}`} />)}</div> : <Placeholder label={alt} className={className} />;
}

export function CastCard({ cast, onClick, wide = false }: { cast: Cast; onClick: () => void; wide?: boolean }) {
  return <button onClick={onClick} className={`group relative shrink-0 overflow-hidden rounded-[20px] border border-white/[.08] bg-white/[.025] text-left transition duration-300 hover:-translate-y-1 hover:border-[#9d69ff]/45 ${wide ? 'w-[74vw] max-w-[300px] snap-center sm:w-[290px]' : ''}`}><div className="relative aspect-[4/5] overflow-hidden"><ImageOrPlaceholder src={cast.images?.length ? cast.images : cast.image} alt={cast.name} className="transition duration-700 group-hover:scale-[1.035]" />{cast.isPickup && <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#7b39fc] px-2.5 py-1 text-[9px] font-bold tracking-[.1em]"><Star size={10} fill="currentColor" /> PICK UP</span>}</div><div className="flex items-end justify-between p-4 sm:p-5"><div><p className="text-[10px] tracking-[.16em] text-[#d7b85b]">{cast.role}</p><h3 className="display mt-1 text-2xl">{cast.name}</h3><p className="mt-1 text-[11px] text-white/40">{cast.generation} {cast.group}</p></div><ArrowRight size={17} className="mb-1 text-white/35 transition group-hover:translate-x-1 group-hover:text-white" /></div></button>;
}

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" onMouseDown={onClose}><div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-white/10 bg-[#100d1d] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><button onClick={onClose} className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-black/45 backdrop-blur" aria-label="閉じる"><X size={19} /></button>{children}</div></div>;
}
