'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageFooter, PageHero, PageNav } from '@/components/new-site/content-page';
import { useSiteData } from '../../use-site-data';

function Detail() {
  const id = useSearchParams().get('id');
  const { data, status } = useSiteData();
  const item = data?.news.find((entry) => entry.id === id);
  return <section className="sp-section">
    {!item && <p className="sp-note">{status === 'loading' ? 'お知らせを読み込んでいます…' : 'お知らせが見つかりませんでした。'}</p>}
    {item && <article className="sp-card">
      {item.thumbnail && <div className="sp-media" style={{ aspectRatio: '16/9' }}><img src={item.thumbnail} alt={item.title} /></div>}
      <small>{item.date} / {item.category}</small>
      <h3>{item.title}</h3>
      <p style={{ whiteSpace: 'pre-wrap' }}>{item.content || item.summary}</p>
    </article>}
    <div className="sp-actions"><a className="sp-action is-ghost" href="/news">← NEWS一覧へ</a></div>
  </section>;
}

export default function Page() {
  return <main className="sp">
    <PageNav />
    <PageHero index="04" en="NEWS" ja="お知らせ" lead="BarMisakiからのお知らせ詳細です。" />
    <Suspense fallback={<section className="sp-section"><p className="sp-note">読み込んでいます…</p></section>}><Detail /></Suspense>
    <PageFooter />
  </main>;
}
