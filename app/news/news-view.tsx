'use client';
import { useMemo, useState } from 'react';
import { PageFooter, PageHero, PageNav, SectionHead } from '@/components/new-site/content-page';
import { links } from '../content-data';
import { useSiteData } from '../use-site-data';
import { newsCategoryLabels, type SiteNews } from '../site-data';
import { isNewNews } from './news-data';
import './news-v2.css';

const categories: [string, string][] = [['ALL', 'すべて'], ...newsCategoryLabels];
const PAGE = 8;
const labelOf = (key: string) => newsCategoryLabels.find(([k]) => k === key)?.[1] ?? 'お知らせ';
const href = (item: SiteNews) => `/news/detail?id=${encodeURIComponent(item.id)}`;

function Meta({ item }: { item: SiteNews }) {
  return <span className="nw-meta">
    <time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time>
    <span className="nw-category">{labelOf(item.category)}</span>
    {isNewNews(item.date) && <span className="nw-badge is-new">NEW</span>}
    {item.isImportant && <span className="nw-badge is-important">重要</span>}
  </span>;
}

export default function NewsView() {
  const { data, status } = useSiteData();
  const news = useMemo(() => data?.news ?? [], [data]);
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const search = query.normalize('NFKC').toLocaleLowerCase('ja');
    return news.filter((item) => (category === 'ALL' || (category === 'IMPORTANT' ? item.isImportant : item.category === category))
      && `${item.title} ${item.content}`.normalize('NFKC').toLocaleLowerCase('ja').includes(search));
  }, [news, category, query]);
  const featured = news[0];

  return <main className="sp">
    <PageNav />
    <PageHero index="04" en="NEWS" ja="お知らせ" lead="営業日、イベント情報、キャストやワールドに関する最新情報をお届けします。" />
    <section className="sp-section">
      {featured && <a className="nw-featured" href={href(featured)}>
        <span className="nw-featured-copy">
          <small>FEATURED NEWS</small>
          <Meta item={featured} />
          <strong>{featured.title}</strong>
          {featured.summary && <span className="nw-summary">{featured.summary}</span>}
          <em>記事を読む →</em>
        </span>
        <span className="nw-featured-image">{featured.thumbnail ? <img src={featured.thumbnail} alt={featured.title} /> : <img src="/atmosphere/interior-01-display.webp" alt="BarMisaki 店内" />}</span>
      </a>}

      <SectionHead en="The latest stories." note="NEWS ARCHIVE" />

      <div className="nw-toolbar">
        <div className="nw-filters" role="group" aria-label="お知らせのカテゴリ">{categories.map(([key, label]) => <button type="button" key={key} aria-pressed={category === key} onClick={() => { setCategory(key); setLimit(PAGE); }}>{label}</button>)}</div>
        <button type="button" className="nw-search-toggle" aria-expanded={searchOpen} aria-controls="nw-search" onClick={() => { setSearchOpen((value) => !value); setQuery(''); setLimit(PAGE); }}>{searchOpen ? '× CLOSE' : '⌕ SEARCH'}</button>
      </div>
      {searchOpen && <label className="nw-search" id="nw-search"><span>タイトル・本文を検索</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(PAGE); }} placeholder="キーワードを入力" /></label>}

      {news.length > 0 && <p className="nw-count" aria-live="polite">{filtered.length} 件のお知らせ</p>}
      {status === 'error' && news.length > 0 && <p className="nw-error">更新情報を取得できませんでした。<button type="button" onClick={() => window.location.reload()}>再読み込み</button></p>}

      {news.length === 0
        ? <div className="nw-empty" aria-live="polite">
          <small>{status === 'loading' ? 'LOADING' : status === 'error' ? 'NEWS' : 'LATEST NEWS COMING SOON'}</small>
          <p>{status === 'loading' ? 'お知らせを読み込んでいます。' : status === 'error' ? 'お知らせを取得できませんでした。' : '新しいお知らせは、こちらに掲載します。'}</p>
          {status === 'error' && <button type="button" onClick={() => window.location.reload()}>再読み込み →</button>}
          {status === 'ready' && <a href={links.x} target="_blank" rel="noreferrer">最新の案内を公式Xで見る →</a>}
        </div>
        : filtered.length === 0
          ? <div className="nw-empty"><p>条件に一致するお知らせがありません。</p><button type="button" onClick={() => { setCategory('ALL'); setQuery(''); }}>絞り込みを解除 →</button></div>
          : <>
            <div className="nw-list">{filtered.slice(0, limit).map((item) => <a className="nw-row" href={href(item)} key={item.id}>
              {item.thumbnail && <img src={item.thumbnail} alt="" loading="lazy" />}
              <span className="nw-row-body"><Meta item={item} /><h3>{item.title}</h3>{item.summary && <p>{item.summary}</p>}</span>
              <span className="nw-arrow" aria-hidden="true">→</span>
            </a>)}</div>
            {filtered.length > limit && <div className="nw-more"><button type="button" onClick={() => setLimit((value) => value + PAGE)}>さらにお知らせを表示 →</button><span>{Math.min(limit, filtered.length)} / {filtered.length}</span></div>}
          </>}

      <div className="sp-actions"><a className="sp-action" href={links.x} target="_blank" rel="noreferrer">公式Xで最新情報を見る →</a></div>
    </section>
    <PageFooter />
  </main>;
}
