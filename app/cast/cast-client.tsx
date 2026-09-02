'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { type Cast } from '../data';
import { loadManagedCasts } from '../managed-data-client';
import { CastCard, ImageOrPlaceholder, Modal } from '@/components/site-elements';

const categories = ['すべて', '1期生', '2期生 花組', '2期生 月組', 'スタッフ'];
const staffNames = new Set(['桜庭ルイ', 'みな_とと', 'ぽよ']);
const isStaff = (cast: Cast) => cast.role === 'STAFF' || cast.generation === 'スタッフ' || staffNames.has(cast.name);

export function CastClient({ casts: initialCasts }: { casts: Cast[] }) {
  const [casts, setCasts] = useState(initialCasts);
  const [category, setCategory] = useState('すべて');
  const [selected, setSelected] = useState<Cast | null>(null);
  useEffect(() => { void loadManagedCasts().then((data) => data && setCasts(data)); }, []);
  const visible = useMemo(() => casts.filter((cast) => category === 'すべて' || (category === 'スタッフ' ? isStaff(cast) : !isStaff(cast) && `${cast.generation}${cast.group ? ` ${cast.group}` : ''}` === category)), [casts, category]);
  return <><div className="no-scrollbar mx-auto mb-9 flex max-w-4xl gap-2 overflow-x-auto pb-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`ui shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${category === item ? 'border-[#9d69ff] bg-[#7b39fc]' : 'border-white/10 bg-white/[.035] text-white/55 hover:text-white'}`}>{item}</button>)}</div><div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{visible.map((cast) => <CastCard key={cast.id} cast={cast} onClick={() => setSelected(cast)} />)}</div>{selected && <Modal onClose={() => setSelected(null)}><div className="grid overflow-hidden md:grid-cols-[.9fr_1.1fr]"><div className="min-h-[330px]"><ImageOrPlaceholder src={selected.image} alt={selected.name} /></div><div className="p-7 sm:p-10"><p className="text-xs tracking-[.2em] text-[#d7b85b]">{selected.generation} {selected.group} / {selected.role}</p><h2 className="display mt-4 text-5xl">{selected.name}</h2><div className="mt-8 space-y-5 text-sm"><div><p className="text-white/35">好きなもの</p><p className="mt-1 text-white/78">{selected.favorite}</p></div><div><p className="text-white/35">ひとこと</p><p className="mt-1 leading-7 text-white/78">{selected.message}</p></div></div>{selected.xUrl && <a href={selected.xUrl} target="_blank" rel="noreferrer" className="primary-button mt-8 inline-flex items-center gap-2">Xを見る <ArrowUpRight size={16} /></a>}</div></div></Modal>}</>;
}
