'use client';
import { PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { useSiteData } from '../use-site-data';

export default function Page() {
  const { data, status } = useSiteData();
  const photos = data?.albums ?? [];
  return <main className="sp">
    <PageNav />
    <PageHero index="05" en="ALBUM" ja="アルバム" lead="営業やイベントで生まれた、BarMisakiの夜の記録。" />
    <section className="sp-section">
      <SectionHead en="Night records." note="MEMORIES OF BAR MISAKI" />
      {photos.length === 0 && <p className="sp-note">{status === 'error' ? 'アルバムを読み込めませんでした。時間をおいて再度お試しください。' : 'アルバムを読み込んでいます…'}</p>}
      <div className="sp-grid">{photos.map((photo) => <article className="sp-card" key={photo.id}>
        <div className="sp-media" style={{ aspectRatio: '4/3' }}><img src={photo.imageUrl} alt={`${photo.date} BarMisakiの記録`} loading="lazy" /></div>
        <small>{photo.date}</small>
      </article>)}</div>
    </section>
    <PageFooter />
  </main>;
}
