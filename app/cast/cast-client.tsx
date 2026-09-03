'use client';

import { useEffect, useMemo, useState } from 'react';
import { type Cast } from '../data';
import { loadManagedCasts } from '../managed-data-client';
import { CastPortraitCard, CastProfile } from './cast-portrait';
import { FeaturedCasts } from './featured-casts';

const categories = ['すべて', '1期生', '２期生', 'スタッフ'];
const categoryEnglish = ['ALL', '1ST GENERATION', '2ND GENERATION', 'STAFF'];
const staffNames = new Set(['桜庭ルイ', 'みな_とと', 'ぽよ']);
const isStaff = (cast: Cast) => cast.role === 'STAFF' || cast.generation === 'スタッフ' || staffNames.has(cast.name);
const inCategory = (cast: Cast, category: string) => category === 'すべて' || (category === 'スタッフ' ? isStaff(cast) : !isStaff(cast) && cast.generation.normalize('NFKC') === category.normalize('NFKC'));

export function CastClient({ casts: initialCasts }: { casts: Cast[] }) {
  const [casts, setCasts] = useState(initialCasts);
  const [category, setCategory] = useState('すべて');
  const [selected, setSelected] = useState<Cast | null>(null);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  useEffect(() => { void loadManagedCasts().then((data) => data && setCasts(data)); }, []);
  const visible = useMemo(() => casts.filter((cast) => inCategory(cast, category)), [casts, category]);
  const featured = useMemo(() => casts.filter((cast) => cast.isPickup).sort((a, b) => (a.pickupOrder ?? Infinity) - (b.pickupOrder ?? Infinity)), [casts]);
  return <>
    {featured.length > 0 && <FeaturedCasts casts={featured} onProfile={setSelected} suspended={selected !== null} />}
    <section id="cast-directory" className="cast-directory" aria-labelledby="cast-directory-title">
    <div className="cast-directory-heading"><div><p className="cast-kicker">THE MEMBERS</p><h2 id="cast-directory-title" className="display">Meet the cast.</h2></div><p>写真に触れて、ひとりひとりを知る。</p></div>
    <fieldset className="cast-category-tabs" aria-label="キャストの絞り込み">
      {categories.map((item, index) => <button type="button" key={item} aria-pressed={category === item} aria-controls="cast-results" onClick={() => { setCategory(item); setRevealedId(null); }}><span className="cast-category-en">{categoryEnglish[index]}</span><span>{item}<small>{String(casts.filter((cast) => inCategory(cast, item)).length).padStart(2, '0')}</small></span></button>)}
    </fieldset>
    <div className="cast-results-heading"><output aria-live="polite">{category} <span>— {visible.length} MEMBERS</span></output><span>BAR MISAKI / CAST COLLECTION</span></div>
    <div id="cast-results" className="cast-portrait-grid" key={category}>
      {visible.map((cast) => <CastPortraitCard key={cast.id} cast={cast} revealed={revealedId === cast.id} onReveal={(show) => setRevealedId((current) => show ? cast.id : current === cast.id ? null : current)} onMore={() => setSelected(cast)} />)}
    </div>
    {visible.length === 0 && <p className="cast-empty">現在、このカテゴリの掲載はありません。</p>}
    <p className="cast-directory-end">BAR MISAKI <span>／</span> CAST & STAFF</p>
    </section>
    {selected && <CastProfile cast={selected} onClose={() => setSelected(null)} />}
  </>;
}
