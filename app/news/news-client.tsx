'use client';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { EditorialHeading, StatusBadge } from '@/components/editorial';
import { ImageOrPlaceholder } from '@/components/site-elements';
import { filterNews, isNewNews, newsCategories, newsHref, type NewsItem } from './news-data';
import { useNews } from './use-news';
import './news.css';

function subscribeClock(notify: () => void) { const timer = window.setInterval(notify, 60000); return () => window.clearInterval(timer); }
const clockSnapshot = () => Math.floor(Date.now() / 60000) * 60000;
const serverClock = () => 0;
function subscribeLocation(notify: () => void) { window.addEventListener('popstate', notify); return () => window.removeEventListener('popstate', notify); }
const locationSnapshot = () => window.location.search;
const serverLocation = () => null;
function NewsMeta({ item }: { item: NewsItem }) {
  const now = useSyncExternalStore(subscribeClock, clockSnapshot, serverClock);
  const fresh = now > 0 && isNewNews(item.date, now);
  return <div className="news-meta"><time dateTime={item.date}>{item.date.replace(/-/g, '.')}</time><span className="news-category">{newsCategories.find(([key]) => key === item.category)?.[1]}</span>{fresh && <StatusBadge state="new" />}{item.isImportant && <StatusBadge state="important" />}</div>;
}
function NewsRows({ items }: { items: NewsItem[] }) {
  return <div className="editorial-news-list">{items.map((item) => <Link href={newsHref(item)} key={item.id} className="editorial-news-row"><NewsMeta item={item} /><h3>{item.title}</h3><ArrowRight size={20} aria-hidden="true" /></Link>)}</div>;
}
function NewsState({ status, retry }: { status: 'loading' | 'ready' | 'error'; retry: () => void }) {
  return <div className="news-empty" aria-live="polite"><p className="editorial-kicker">{status === 'loading' ? 'LOADING' : status === 'error' ? 'NEWS' : 'LATEST NEWS COMING SOON'}</p><p>{status === 'loading' ? 'お知らせを読み込んでいます。' : status === 'error' ? 'お知らせを取得できませんでした。' : '新しいお知らせは、こちらに掲載します。'}</p>{status === 'error' ? <button className="editorial-text-link" type="button" onClick={retry}>再読み込み <ArrowRight size={16} /></button> : status === 'ready' ? <a href="https://x.com/BarMisaki_VRC" className="editorial-text-link" target="_blank" rel="noreferrer">最新の案内を公式Xで見る <ArrowUpRight size={16} /></a> : null}</div>;
}
export function HomeNews() {
  const { news, status, retry } = useNews();
  return <div className="home-editorial-news">{news.length ? <NewsRows items={news.slice(0, 4)} /> : <NewsState status={status} retry={retry} />}</div>;
}
export function NewsArchive() {
  const { news, status, retry } = useNews();
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [limit, setLimit] = useState(8);
  const filtered = useMemo(() => filterNews(news, category, query), [news, category, query]);
  const featured = news[0];
  return <>
    {featured && <Link href={newsHref(featured)} className="news-featured"><div className="news-featured-copy"><p className="editorial-kicker">FEATURED NEWS</p><NewsMeta item={featured} /><h2>{featured.title}</h2>{featured.summary && <p className="news-summary">{featured.summary}</p>}<span className="editorial-text-link">記事を読む <ArrowUpRight size={20} /></span></div><div className="news-featured-image"><ImageOrPlaceholder src={featured.thumbnail || '/atmosphere/interior-01.png'} alt={featured.thumbnail ? featured.title : 'BarMisaki 店内'} /></div></Link>}
    <EditorialHeading eyebrow="NEWS ARCHIVE" title="The latest stories." />
    <div className="news-toolbar"><fieldset className="news-filters" aria-label="お知らせのカテゴリ">{newsCategories.map(([key, label]) => <button type="button" key={key} aria-pressed={category === key} onClick={() => { setCategory(key); setLimit(8); }}>{label}</button>)}</fieldset><button type="button" className="news-search-toggle" aria-expanded={searchOpen} aria-controls="news-search" onClick={() => { setSearchOpen((value) => !value); setQuery(''); setLimit(8); }}>{searchOpen ? <X size={16} /> : <Search size={16} />} SEARCH</button></div>
    {searchOpen && <label className="news-search" id="news-search"><span>タイトル・本文を検索</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(8); }} placeholder="キーワードを入力" /></label>}
    {news.length > 0 && <p className="news-result-count" aria-live="polite">{filtered.length} 件のお知らせ</p>}
    {status === 'error' && news.length > 0 && <p className="news-error">更新情報を取得できませんでした。<button onClick={retry}>再読み込み</button></p>}
    {news.length === 0 ? <NewsState status={status} retry={retry} /> : filtered.length === 0 ? <div className="news-empty"><p>条件に一致するお知らせがありません。</p><button className="editorial-text-link" onClick={() => { setCategory('ALL'); setQuery(''); }}>絞り込みを解除 <ArrowRight size={16} /></button></div> : <><NewsRows items={filtered.slice(0, limit)} />{filtered.length > limit && <div className="news-load-more"><button className="editorial-text-link" onClick={() => setLimit((value) => value + 8)}>さらにお知らせを表示 <ArrowRight size={18} /></button><span>{Math.min(limit, filtered.length)} / {filtered.length}</span></div>}</>}
  </>;
}
function LinkedText({ text }: { text: string }) {
  return <>{text.split(/(https?:\/\/[^\s<>]+)/g).map((part, index) => /^https?:\/\//.test(part) ? <a href={part} key={index} target="_blank" rel="noreferrer">{part}</a> : part)}</>;
}
export function NewsArticle() {
  const { news, status, retry } = useNews();
  const search = useSyncExternalStore(subscribeLocation, locationSnapshot, serverLocation);
  const id = search === null ? null : new URLSearchParams(search).get('id') || '';
  const item = news.find((entry) => entry.id === id || entry.slug === id);
  useEffect(() => { if (item) document.title = `${item.title} | BarMisaki`; }, [item]);
  return <main className="editorial-page news-detail-page"><article className="news-detail"><Link href="/news" className="editorial-text-link"><ArrowLeft size={16} /> お知らせ一覧へ</Link>{status === 'loading' || id === null ? <NewsState status="loading" retry={retry} /> : status === 'error' ? <NewsState status={status} retry={retry} /> : !item ? <div className="news-empty"><h1>お知らせが見つかりません</h1><p>公開が終了したか、削除された可能性があります。</p></div> : <><header className="news-detail-heading"><p className="editorial-kicker">NEWS</p><NewsMeta item={item} /><h1>{item.title}</h1></header>{item.thumbnail && <div className="news-detail-image"><Image unoptimized src={item.thumbnail} alt={item.title} width={1600} height={1000} /></div>}<div className="news-detail-body"><LinkedText text={item.content} /></div><Link href="/news" className="editorial-text-link">BACK TO NEWS <ArrowRight size={18} /></Link></>}</article></main>;
}
