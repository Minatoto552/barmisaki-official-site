'use client';

import { ArrowUpRight, Star, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type PointerEvent } from 'react';
import type { Cast } from '../data';
import { ImageOrPlaceholder } from '@/components/site-elements';

export function CastPortraitCard({ cast, revealed, onReveal, onMore }: { cast: Cast; revealed: boolean; onReveal: (show: boolean) => void; onMore: () => void }) {
  const surface = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(false);
  const introId = useId();

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduceMotion.current = query.matches; };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || reduceMotion.current || !surface.current) return;
    // Use the stationary wrapper so the tilt cannot feed back into its own angle.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    surface.current.style.setProperty('--tilt-x', `${(0.5 - y) * 14}deg`);
    surface.current.style.setProperty('--tilt-y', `${(x - 0.5) * 16}deg`);
    surface.current.style.setProperty('--shine-x', `${x * 100}%`);
    surface.current.style.setProperty('--shine-y', `${y * 100}%`);
  }

  function reset(event: PointerEvent<HTMLElement>) {
    surface.current?.style.setProperty('--tilt-x', '0deg');
    surface.current?.style.setProperty('--tilt-y', '0deg');
    if (event.pointerType === 'mouse') onReveal(false);
  }

  return <article className="cast-portrait" data-revealed={revealed} onPointerEnter={(event) => { if (event.pointerType === 'mouse') onReveal(true); }} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset} onKeyDown={(event) => { if (event.key === 'Escape') onReveal(false); }}>
    <div ref={surface} className="cast-portrait-surface">
      <div className="cast-portrait-photo"><ImageOrPlaceholder src={cast.images?.length ? cast.images : cast.image} alt={cast.name} focusFace /></div>
      {cast.isPickup && <div className="cast-portrait-pickup"><Star size={11} fill="currentColor" aria-hidden="true" />PICK UP</div>}
      <button type="button" className="cast-portrait-reveal" aria-label={`${cast.name}の簡単な紹介を表示`} aria-expanded={revealed} aria-controls={introId} onClick={() => onReveal(true)} />
      <div className="cast-portrait-shade" />
      <div className="cast-portrait-shine" />
      <div id={introId} className="cast-portrait-intro">
        <p className="cast-portrait-role">{cast.role}</p>
        <h2 className="display cast-portrait-name">{cast.name}</h2>
        <p className="cast-portrait-generation">{cast.generation} {cast.group}</p>
        <button type="button" className="cast-portrait-more" aria-label={`${cast.name}の詳しい紹介を見る`} onClick={onMore}>More <ArrowUpRight size={14} aria-hidden="true" /></button>
      </div>
    </div>
  </article>;
}

export function CastProfile({ cast, onClose, backLabel = 'キャスト一覧に戻る' }: { cast: Cast; onClose: () => void; backLabel?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const images = cast.images?.length ? cast.images : cast.image ? [cast.image] : [];
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  return <dialog ref={dialog} className="cast-profile" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <button autoFocus type="button" className="cast-profile-close" onClick={onClose} aria-label="紹介を閉じる"><X size={22} /></button>
    <div className="cast-profile-content">
      <p className="cast-profile-eyebrow">CAST PROFILE</p>
      <h2 id={titleId} className="display cast-profile-title">{cast.name}</h2>
      <div className="cast-profile-layout">
        <div>
          <div className="cast-profile-photo"><ImageOrPlaceholder src={photo ?? images} alt={cast.name} focusFace /></div>
          {images.length > 1 && <div className="cast-profile-thumbnails" aria-label="紹介写真">
            {images.map((src, index) => <button key={src} type="button" aria-label={`写真${index + 1}を表示`} aria-pressed={photo === src} onClick={() => setPhoto(src)}><img src={src} alt="" /></button>)}
            <button type="button" className="cast-profile-auto" aria-pressed={photo === null} onClick={() => setPhoto(null)}>自動再生</button>
          </div>}
        </div>
        <div>
          <dl className="cast-profile-facts">
            <div><dt>名前</dt><dd>{cast.name}</dd></div>
            <div><dt>所属</dt><dd>{cast.generation} {cast.group}</dd></div>
            <div><dt>役割</dt><dd>{cast.role}</dd></div>
            {cast.favorite && <div><dt>好きなもの</dt><dd>{cast.favorite}</dd></div>}
            {cast.message && <div><dt>Message</dt><dd>{cast.message}</dd></div>}
          </dl>
          {cast.xUrl && <a href={cast.xUrl} target="_blank" rel="noreferrer" className="cast-profile-social">Xを見る <ArrowUpRight size={16} /></a>}
        </div>
      </div>
      <button type="button" className="cast-profile-back" onClick={onClose}>{backLabel}</button>
    </div>
  </dialog>;
}
