'use client';
import { useEffect, useRef, useState } from 'react';
import './cast-deck.css';

export type DeckMember = { id: string; name: string; card: string; generation: string };

const AUTO_MS = 3400;   // time each cast member stays in front
const REACH_PHONE = 3;  // cards shown on each side of the front one
const REACH_WIDE = 4;   // on wide screens the fan opens further
const MAX_CARDS = 12;

// Cast cards on an arc. Every card keeps its own element and only changes a position number,
// so the whole deck glides (no re-mounting, no jumps) while it rotates by itself.
export function CastDeck({ members, onOpen }: { members: DeckMember[]; onOpen: (id: string) => void }) {
  const list = members.slice(0, MAX_CARDS);
  const total = list.length;
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [reach, setReach] = useState(REACH_PHONE);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const wide = window.matchMedia('(min-width: 901px)');
    const update = () => setReach(wide.matches ? REACH_WIDE : REACH_PHONE);
    update();
    wide.addEventListener('change', update);
    return () => wide.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reduced || total < 2) return;
    const timer = window.setTimeout(() => setFront((value) => (value + 1) % total), AUTO_MS);
    return () => window.clearTimeout(timer);
  }, [front, paused, reduced, total]);

  if (total === 0) return null;

  const step = (by: number) => setFront((value) => (value + by + total) % total);
  const current = list[front];

  // Pointer position tilts the whole deck a little, like holding it in your hand.
  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || reduced) return;
    const box = event.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty('--px', String(((event.clientX - box.left) / box.width - 0.5) * 2));
    stage.current?.style.setProperty('--py', String(((event.clientY - box.top) / box.height - 0.5) * 2));
  };
  const rest = () => { stage.current?.style.setProperty('--px', '0'); stage.current?.style.setProperty('--py', '0'); };

  return <div className="nc-deck-wrap" role="group" aria-roledescription="カルーセル" aria-label="キャストのカード"
    onPointerMove={tilt} onPointerLeave={() => { rest(); setPaused(false); }} onPointerEnter={() => setPaused(true)}
    onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <span className="nc-hero-moon" aria-hidden="true" />
    <span className="nc-deck-ring" aria-hidden="true" />
    <span className="nc-deck-ring is-second" aria-hidden="true" />
    <div className="nc-deck-petals" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6, 7].map((n) => <i key={n} style={{ '--n': n } as React.CSSProperties}>{n % 3 === 0 ? '♥' : '✦'}</i>)}</div>

    <div className="nc-deck" ref={stage}>
      {list.map((member, index) => {
        let rel = ((index - front) % total + total) % total;
        if (rel > total / 2) rel -= total;
        const abs = Math.abs(rel);
        const shown = abs <= reach;
        return <button type="button" key={member.id} className={`nc-deck-card${rel === 0 ? ' is-front' : ''}`} data-abs={abs}
          style={{ '--rel': rel, '--abs': abs, '--o': shown ? 1 - abs * 0.13 : 0, zIndex: 20 - abs } as React.CSSProperties}
          tabIndex={shown ? 0 : -1} aria-hidden={!shown}
          aria-label={rel === 0 ? `${member.name}のプロフィールを見る` : `${member.name}を前に出す`}
          onClick={() => (rel === 0 ? onOpen(member.id) : setFront(index))}>
          <span className="nc-deck-photo">
            <img src={member.card} alt="" draggable={false} />
            <small>{member.name}</small>
          </span>
        </button>;
      })}
    </div>

    <div className="nc-deck-info" aria-live="polite">
      <span><em>No.{String(front + 1).padStart(2, '0')}</em>{current.generation}</span>
      <strong>{current.name}</strong>
      <button type="button" onClick={() => onOpen(current.id)}>PROFILE <b aria-hidden="true">→</b></button>
    </div>
    <div className="nc-deck-arrows">
      <button type="button" onClick={() => step(-1)} aria-label="前のキャスト">←</button>
      <button type="button" onClick={() => step(1)} aria-label="次のキャスト">→</button>
    </div>
  </div>;
}
