'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { groupAlbumsByDate, loadAlbums, type AlbumPhoto } from './album-data';
import './album.css';

export function AlbumClient() {
  const [albums, setAlbums] = useState<AlbumPhoto[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selected, setSelected] = useState<AlbumPhoto | null>(null);
  const groups = useMemo(() => groupAlbumsByDate(albums), [albums]);

  useEffect(() => {
    void loadAlbums().then((items) => { setAlbums(items); setStatus('ready'); }).catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [selected]);

  if (status === 'loading') return <div className="album-state"><span>LOADING</span><p>アルバムを読み込んでいます。</p></div>;
  if (status === 'error') return <div className="album-state"><span>ALBUM</span><p>アルバムを読み込めませんでした。時間をおいて再度お試しください。</p></div>;
  if (!groups.length) return <div className="album-state"><span>COMING SOON</span><p>営業日の思い出を、こちらに掲載します。</p></div>;

  return <>
    <div className="album-groups">
      {groups.map(({ date, photos }, groupIndex) => <section className="album-group" key={date} aria-labelledby={`album-date-${date}`}>
        <header className="album-date-heading">
          <p>{String(groupIndex + 1).padStart(2, '0')}</p>
          <h2 id={`album-date-${date}`}>{date.replaceAll('-', '.')}</h2>
          <span>{photos.length} PHOTOS</span>
        </header>
        <div className="album-grid">
          {photos.map((photo, index) => <button className="album-photo" type="button" key={photo.id} onClick={() => setSelected(photo)} aria-label={`${date.replaceAll('-', '.')}の集合写真${index + 1}を拡大表示`}>
            <img src={photo.imageUrl} alt={`${date.replaceAll('-', '.')} Bar Misaki 集合写真 ${index + 1}`} loading="lazy" decoding="async" />
            <span>VIEW PHOTO</span>
          </button>)}
        </div>
      </section>)}
    </div>
    {selected && <div className="album-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <section role="dialog" aria-modal="true" aria-label={`${selected.date.replaceAll('-', '.')}の集合写真`}>
        <button type="button" onClick={() => setSelected(null)} aria-label="拡大表示を閉じる"><X aria-hidden="true" /></button>
        <img src={selected.imageUrl} alt={`${selected.date.replaceAll('-', '.')} Bar Misaki 集合写真`} />
        <p>{selected.date.replaceAll('-', '.')}</p>
      </section>
    </div>}
  </>;
}
