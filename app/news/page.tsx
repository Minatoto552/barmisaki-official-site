'use client';
import { PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';
import { useSiteData } from '../use-site-data';

export default function Page() {
  const { data, status } = useSiteData();
  const items = data?.news ?? [];
  return <main className="sp">
    <PageNav />
    <PageHero index="04" en="NEWS" ja="お知らせ" lead="営業日、イベント、キャストやワールドに関する最新情報をお届けします。" />
    <section className="sp-section">
      <SectionHead en="Latest information." note="NEWS / EVENT / CAST" />
      {items.length === 0 && <p className="sp-note">{status === 'error' ? 'お知らせを読み込めませんでした。時間をおいて再度お試しください。' : 'お知らせを読み込んでいます…'}</p>}
      <div className="sp-grid">{items.map((item) => <article className="sp-card" key={item.id}>
        {item.thumbnail && <div className="sp-media" style={{ aspectRatio: '16/9' }}><img src={item.thumbnail} alt={item.title} loading="lazy" /></div>}
        <small>{item.date} / {item.category}</small>
        <h3>{item.title}</h3>
        {item.summary && <p>{item.summary}</p>}
        <a href={`/news/detail?id=${encodeURIComponent(item.id)}`}>詳細を見る →</a>
      </article>)}</div>
      <div className="sp-actions"><a className="sp-action" href={links.x} target="_blank" rel="noreferrer">公式Xで最新情報を見る →</a></div>
    </section>
    <PageFooter />
  </main>;
}
