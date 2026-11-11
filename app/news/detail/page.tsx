'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageFooter, PageHero, PageNav } from '@/components/new-site/content-page';
import { MarkdownLite } from '@/components/markdown-lite';
import { useSiteData } from '../../use-site-data';
import { newsCategoryLabels } from '../../site-data';
import { isNewNews } from '../news-data';
import '../news-v2.css';

function Detail() {
  const id = useSearchParams().get('id');
  const { data, status } = useSiteData();
  const item = data?.news.find((entry) => entry.id === id);

  useEffect(() => { if (item) document.title = `${item.title} | BarMisaki`; }, [item]);

  if (!item) {
    return <section className="sp-section"><div className="nw-empty" aria-live="polite">
      {status === 'loading' && <><small>LOADING</small><p>お知らせを読み込んでいます。</p></>}
      {status === 'error' && <><small>NEWS</small><p>お知らせを取得できませんでした。</p><button type="button" onClick={() => window.location.reload()}>再読み込み →</button></>}
      {status === 'ready' && <><h1>お知らせが見つかりません</h1><p>公開が終了したか、削除された可能性があります。</p></>}
      <a href="/news">← お知らせ一覧へ</a>
    </div></section>;
  }

  return <section className="sp-section">
    <article className="nw-detail">
      <a className="nw-back" href="/news">← お知らせ一覧へ</a>
      <header>
        <small>NEWS</small>
        <span className="nw-meta">
          <time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time>
          <span className="nw-category">{newsCategoryLabels.find(([key]) => key === item.category)?.[1] ?? 'お知らせ'}</span>
          {isNewNews(item.date) && <span className="nw-badge is-new">NEW</span>}
          {item.isImportant && <span className="nw-badge is-important">重要</span>}
        </span>
        <h1>{item.title}</h1>
      </header>
      {item.thumbnail && <div className="nw-detail-image"><img src={item.thumbnail} alt={item.title} /></div>}
      <div className="nw-body"><MarkdownLite text={item.content || item.summary} /></div>
      <a className="nw-back" href="/news">BACK TO NEWS →</a>
    </article>
  </section>;
}

export default function Page() {
  return <main className="sp">
    <PageNav />
    <PageHero index="04" en="NEWS" ja="お知らせ" lead="BarMisakiからのお知らせです。" />
    <Suspense fallback={<section className="sp-section"><p className="sp-note">読み込んでいます。</p></section>}><Detail /></Suspense>
    <PageFooter />
  </main>;
}
