'use client';
import { useEffect, useState } from 'react';
import { fetchSiteData, loadSiteData, type SiteData } from './site-data';

export type SiteDataState = { data: SiteData | null; status: 'loading' | 'ready' | 'error' };

const REFRESH_AFTER_MS = 60_000;

// Loads the shared content once in the browser and refreshes it when the tab comes back after a while.
// Pass { albums: true } only on pages that show album photos.
export function useSiteData({ albums = false }: { albums?: boolean } = {}): SiteDataState {
  const [state, setState] = useState<SiteDataState>({ data: null, status: 'loading' });
  useEffect(() => {
    let active = true;
    let loadedAt = 0;
    const load = (first = false) => {
      loadedAt = Date.now();
      (first ? loadSiteData(albums) : fetchSiteData(albums))
        .then((data) => { if (active) setState({ data, status: 'ready' }); })
        .catch(() => { if (active) setState((current) => (current.data ? current : { data: null, status: 'error' })); });
    };
    load(true);
    const onVisible = () => { if (!document.hidden && Date.now() - loadedAt > REFRESH_AFTER_MS) load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { active = false; document.removeEventListener('visibilitychange', onVisible); };
  }, [albums]);
  return state;
}
