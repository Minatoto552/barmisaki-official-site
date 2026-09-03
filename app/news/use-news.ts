'use client';
import { useEffect, useState } from 'react';
import { normalizeNews, type NewsItem } from './news-data';

// Same Firebase collection used by the existing admin news editor.
const endpoint = 'https://barmisaki-admin-50ff9-default-rtdb.firebaseio.com/admin/content/news.json';
export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    const refresh = async () => {
      if (pending || document.hidden || controller.signal.aborted) return;
      pending = true;
      try {
        const response = await fetch(endpoint, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('News unavailable');
        const raw: unknown = await response.json();
        if (!controller.signal.aborted) { setNews(normalizeNews(raw)); setStatus('ready'); }
      } catch { if (!controller.signal.aborted) setStatus('error'); }
      finally { pending = false; }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 60000);
    const onVisible = () => { if (!document.hidden) void refresh(); };
    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', onVisible);
    return () => { controller.abort(); window.clearInterval(timer); window.removeEventListener('focus', onVisible); document.removeEventListener('visibilitychange', onVisible); };
  }, [attempt]);
  return { news, status, retry: () => { setStatus('loading'); setAttempt((value) => value + 1); } };
}
