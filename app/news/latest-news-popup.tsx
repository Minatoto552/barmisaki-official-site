'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ImageOrPlaceholder } from '@/components/site-elements';
import { newsCategories, newsHref } from './news-data';
import { useNews } from './use-news';
import './latest-news-popup.css';

const seenKey = 'latestNewsSeenId';

function excerpt(summary: string, content: string) {
  const source = summary.trim() || content;
  return source
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_#>-]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140);
}

export function LatestNewsPopup() {
  const { news, status } = useNews();
  const latest = news[0];
  const [openId, setOpenId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const description = useMemo(() => latest ? excerpt(latest.summary, latest.content) : '', [latest]);

  useEffect(() => {
    if (status !== 'ready' || !latest) return;
    try {
      if (window.localStorage.getItem(seenKey) !== latest.id) setOpenId(latest.id);
    } catch {
      setOpenId(latest.id);
    }
  }, [latest, status]);

  useEffect(() => {
    if (!openId) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openId]);

  if (!latest || openId !== latest.id) return null;

  function remember() {
    try { window.localStorage.setItem(seenKey, latest!.id); } catch { /* Storage can be unavailable in private browsing. */ }
  }

  function dismiss() {
    remember();
    setClosing(true);
    window.setTimeout(() => setOpenId(null), 380);
  }

  return <div className={`latest-news-overlay${closing ? ' is-closing' : ''}`} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
    <section className="latest-news-modal" role="dialog" aria-modal="true" aria-labelledby="latest-news-title" aria-describedby={description ? 'latest-news-description' : undefined}>
      <button ref={closeButton} type="button" className="latest-news-close" onClick={dismiss} aria-label="お知らせを閉じる"><X aria-hidden="true" /></button>
      <div className="latest-news-image">
        <ImageOrPlaceholder src={latest.thumbnail} alt={latest.title} loading="eager" />
        <span className="latest-news-image-number">01</span>
      </div>
      <div className="latest-news-copy">
        <p className="latest-news-kicker">LATEST NEWS</p>
        <div className="latest-news-rule" aria-hidden="true"><span /></div>
        <div className="latest-news-meta"><time dateTime={latest.date}>{latest.date.replace(/-/g, '.')}</time><span>{newsCategories.find(([key]) => key === latest.category)?.[1] || 'お知らせ'}</span></div>
        <h2 id="latest-news-title">{latest.title}</h2>
        {description && <p id="latest-news-description" className="latest-news-description">{description}</p>}
        <Link href={newsHref(latest)} className="latest-news-link" onClick={remember}>VIEW MORE <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
