'use client';

import { useEffect, useMemo, useState } from 'react';
import { type Cast } from '../data';
import { loadManagedCasts } from '../managed-data-client';
import { CastPortraitCard, CastProfile } from './cast-portrait';

const categories = ['すべて', '1期生', '２期生', 'スタッフ'];
const staffNames = new Set(['桜庭ルイ', 'みな_とと', 'ぽよ']);
const isStaff = (cast: Cast) => cast.role === 'STAFF' || cast.generation === 'スタッフ' || staffNames.has(cast.name);

export function CastClient({ casts: initialCasts }: { casts: Cast[] }) {
  const [casts, setCasts] = useState(initialCasts);
  const [category, setCategory] = useState('すべて');
  const [selected, setSelected] = useState<Cast | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  useEffect(() => { void loadManagedCasts().then((data) => data && setCasts(data)); }, []);
  const visible = useMemo(() => casts.filter((cast) => category === 'すべて' || (category === 'スタッフ' ? isStaff(cast) : !isStaff(cast) && `${cast.generation}${cast.group ? ` ${cast.group}` : ''}` === category)), [casts, category]);
  return <>
    <div className="cast-filters no-scrollbar" aria-label="キャストの絞り込み">
      {categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setRevealedId(null); }} className={`ui shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${category === item ? 'border-[#9d69ff] bg-[#7b39fc]' : 'border-white/10 bg-white/[.035] text-white/55 hover:text-white'}`}>{item}</button>)}
    </div>
    <div className="cast-portrait-grid">
      {visible.map((cast) => <CastPortraitCard key={cast.id} cast={cast} revealed={revealedId === cast.id} onReveal={(show) => setRevealedId((current) => show ? cast.id : current === cast.id ? null : current)} onMore={() => setSelected(cast)} />)}
    </div>
    {selected && <CastProfile cast={selected} onClose={() => setSelected(null)} />}
  </>;
}
