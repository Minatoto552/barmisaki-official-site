'use client';
import { useEffect, useMemo, useState } from 'react';
import { PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { useSiteData } from '../use-site-data';
import type { SitePhoto } from '../site-data';
import './album-v2.css';

const dot = (date: string) => date.replace(/-/g, '.');

export default function AlbumView() {
  const { data, status } = useSiteData();
  const photos = useMemo(() => data?.albums ?? [], [data]);
  const [selected, setSelected] = useState<SitePhoto | null>(null);

  // Photos grouped by the date of the event, newest first.
  const groups = useMemo(() => {
    const map = new Map<string, SitePhoto[]>();
    photos.forEach((photo) => map.set(photo.date, [...(map.get(photo.date) ?? []), photo]));
    return [...map.entries()].sort(([a], [b]) => (a < b ? 1 : -1)).map(([date, items]) => ({ date, items }));
  }, [photos]);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [selected]);

  return <main className="sp">
    <PageNav />
    <PageHero index="05" en="ALBUM" ja="アルバム" lead="営業やイベントで生まれた、Bar Misakiの夜の記録。日付ごとに集合写真をご覧いただけます。" />
    <section className="sp-section">
      <SectionHead en="Night records." note="MEMORIES OF BAR MISAKI" />

      {status === 'loading' && photos.length === 0 && <div className="al-state"><small>LOADING</small><p>アルバムを読み込んでいます。</p></div>}
      {status === 'error' && photos.length === 0 && <div className="al-state"><small>ALBUM</small><p>アルバムを読み込めませんでした。時間をおいて再度お試しください。</p></div>}
      {status === 'ready' && groups.length === 0 && <div className="al-state"><small>COMING SOON</small><p>営業日の思い出を、こちらに掲載します。</p></div>}

      <div className="al-groups">{groups.map(({ date, items }, groupIndex) => <section className="al-group" key={date} aria-labelledby={`al-${date}`}>
        <header className="al-heading">
          <span>{String(groupIndex + 1).padStart(2, '0')}</span>
          <h2 id={`al-${date}`}>{dot(date)}</h2>
          <small>{items.length} PHOTOS</small>
        </header>
        <div className="al-grid">{items.map((photo, index) => <button type="button" className="al-photo" key={photo.id} onClick={() => setSelected(photo)} aria-label={`${dot(date)}の集合写真${index + 1}を拡大表示`}>
          <img src={photo.imageUrl} alt={`${dot(date)} Bar Misaki 集合写真 ${index + 1}`} loading="lazy" decoding="async" />
          <span>VIEW PHOTO</span>
        </button>)}</div>
      </section>)}</div>
    </section>

    {selected && <div className="al-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <section role="dialog" aria-modal="true" aria-label={`${dot(selected.date)}の集合写真`}>
        <button type="button" onClick={() => setSelected(null)} aria-label="拡大表示を閉じる">×</button>
        <img src={selected.imageUrl} alt={`${dot(selected.date)} Bar Misaki 集合写真`} />
        <p>{dot(selected.date)}</p>
      </section>
    </div>}
    <PageFooter />
  </main>;
}
